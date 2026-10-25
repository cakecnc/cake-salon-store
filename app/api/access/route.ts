import { NextResponse } from "next/server";

const PRODUCTS = new Set(["designer-pro", "research-pro", "hashcat-pro"]);
const YEAR_SECONDS = 365 * 24 * 60 * 60;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function database() {
  const { env } = await import("cloudflare:workers");
  const db = (env as unknown as { DB?: D1Database }).DB;
  if (!db) throw new Error("DB_UNAVAILABLE");
  return db;
}

function clean(value: unknown, max = 100) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function token(length = 24) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function registrationCode() {
  const value = token(8).toUpperCase();
  return `CNC-${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}`;
}

function adminAllowed(request: Request) {
  const email = request.headers.get("oai-authenticated-user-email")?.toLowerCase();
  return Boolean(email && process.env.ACCESS_ADMIN_EMAIL && email === process.env.ACCESS_ADMIN_EMAIL.toLowerCase());
}

export async function GET(request: Request) {
  const product = new URL(request.url).searchParams.get("product") || "";
  if (!PRODUCTS.has(product)) return NextResponse.json({ error: "상품을 확인해 주세요." }, { status: 400 });
  try {
    const cookie = request.headers.get("cookie")?.match(new RegExp(`(?:^|; )cnc_access_${product}=([^;]+)`))?.[1];
    if (!cookie) return NextResponse.json({ active: false });
    const session = await (await database()).prepare(
      "SELECT expires_at FROM access_sessions WHERE token_hash = ? AND product = ? AND expires_at > ?"
    ).bind(await digest(decodeURIComponent(cookie)), product, Date.now()).first<{ expires_at: number }>();
    return NextResponse.json({ active: Boolean(session), expiresAt: session?.expires_at || null });
  } catch {
    return NextResponse.json({ active: false });
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return NextResponse.json({ error: "입력이 너무 깁니다." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "입력 형식을 확인해 주세요." }, { status: 400 });
  }

  const action = clean(body.action, 20);
  const product = clean(body.product, 30);
  if (!PRODUCTS.has(product)) return NextResponse.json({ error: "상품을 확인해 주세요." }, { status: 400 });

  try {
    const db = await database();
    if (action === "request") {
      const provider = clean(body.provider, 20);
      const reference = clean(body.reference, 100);
      const email = clean(body.email, 200).toLowerCase();
      if (!["paypal", "naver"].includes(provider) || reference.length < 4 || !emailPattern.test(email)) {
        return NextResponse.json({ error: "결제 수단, 거래번호와 이메일을 확인해 주세요." }, { status: 400 });
      }
      await db.prepare(
        "INSERT INTO purchase_requests (product, provider, reference, buyer_email, status, created_at) VALUES (?, ?, ?, ?, 'pending', ?)"
      ).bind(product, provider, reference, email, Date.now()).run();
      return NextResponse.json({ message: "확인 요청을 접수했습니다. 결제 확인 후 등록코드를 이메일로 안내합니다." });
    }

    if (action === "redeem") {
      const code = clean(body.code, 32).toUpperCase();
      if (!/^CNC-[A-F0-9]{4}(?:-[A-F0-9]{4}){3}$/.test(code)) {
        return NextResponse.json({ error: "등록코드 형식을 확인해 주세요." }, { status: 400 });
      }
      const codeHash = await digest(code);
      const record = await db.prepare(
        "SELECT id, expires_at, activation_count, max_activations FROM access_codes WHERE code_hash = ? AND product = ? AND status = 'active' AND expires_at > ?"
      ).bind(codeHash, product, Date.now()).first<{ id: number; expires_at: number; activation_count: number; max_activations: number }>();
      if (!record || record.activation_count >= record.max_activations) {
        return NextResponse.json({ error: "유효하지 않거나 사용 한도를 초과한 코드입니다." }, { status: 403 });
      }
      const sessionToken = token();
      const sessionHash = await digest(sessionToken);
      await db.batch([
        db.prepare("UPDATE access_codes SET activation_count = activation_count + 1 WHERE id = ? AND activation_count < max_activations").bind(record.id),
        db.prepare("INSERT INTO access_sessions (token_hash, code_id, product, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").bind(sessionHash, record.id, product, record.expires_at, Date.now()),
      ]);
      const response = NextResponse.json({ message: "Pro 기능이 활성화되었습니다.", expiresAt: record.expires_at });
      response.cookies.set(`cnc_access_${product}`, sessionToken, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: Math.max(60, Math.floor((record.expires_at - Date.now()) / 1000)) });
      return response;
    }

    if (action === "admin-list") {
      if (!adminAllowed(request)) return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
      const result = await db.prepare(
        "SELECT id, product, provider, reference, buyer_email, status, created_at FROM purchase_requests ORDER BY created_at DESC LIMIT 100"
      ).all();
      return NextResponse.json({ requests: result.results });
    }

    if (action === "admin-issue") {
      if (!adminAllowed(request)) return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 });
      const requestId = Number(body.requestId);
      const purchase = await db.prepare(
        "SELECT id, product, provider, reference, buyer_email, status FROM purchase_requests WHERE id = ?"
      ).bind(requestId).first<{ id: number; product: string; provider: string; reference: string; buyer_email: string; status: string }>();
      if (!purchase || purchase.status !== "pending") return NextResponse.json({ error: "대기 중인 요청을 찾을 수 없습니다." }, { status: 404 });
      const code = registrationCode();
      const expiresAt = Date.now() + YEAR_SECONDS * 1000;
      await db.batch([
        db.prepare("INSERT INTO access_codes (code_hash, product, expires_at, max_activations, activation_count, source_provider, source_reference, buyer_email, status, created_at) VALUES (?, ?, ?, 2, 0, ?, ?, ?, 'active', ?)").bind(await digest(code), purchase.product, expiresAt, purchase.provider, purchase.reference, purchase.buyer_email, Date.now()),
        db.prepare("UPDATE purchase_requests SET status = 'issued', issued_at = ? WHERE id = ? AND status = 'pending'").bind(Date.now(), purchase.id),
      ]);
      return NextResponse.json({ message: "등록코드를 발급했습니다. 이 화면에서 한 번만 표시됩니다.", code, email: purchase.buyer_email, expiresAt });
    }

    return NextResponse.json({ error: "지원하지 않는 요청입니다." }, { status: 400 });
  } catch (error) {
    if (String(error).includes("UNIQUE")) return NextResponse.json({ error: "이미 접수된 거래번호입니다." }, { status: 409 });
    if (String(error).includes("DB_UNAVAILABLE")) return NextResponse.json({ error: "등록코드 저장소가 아직 연결되지 않았습니다." }, { status: 503 });
    return NextResponse.json({ error: "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
