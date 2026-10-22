import { NextResponse } from "next/server";

const API = "https://naverapihub.apigw.ntruss.com";
const CACHE_MS = 10 * 60 * 1000;
const cache = new Map<string, { until: number; data: unknown }>();
const requests = new Map<string, { count: number; until: number }>();

type SearchItem = { title: string; link: string; description?: string; thumbnail?: string };
type Point = { period: string; ratio: number };

const cleanText = (value: unknown) =>
  typeof value === "string" ? value.replace(/<[^>]*>/g, "").trim() : "";

const safeUrl = (value: unknown) => {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
};

function items(value: unknown): SearchItem[] {
  if (!value || typeof value !== "object" || !("items" in value) || !Array.isArray(value.items)) return [];
  return value.items.slice(0, 6).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const link = safeUrl(record.link);
    if (!link) return [];
    return [{
      title: cleanText(record.title),
      link,
      description: cleanText(record.description),
      thumbnail: safeUrl(record.thumbnail),
    }];
  });
}

function points(value: unknown): Point[] {
  if (!value || typeof value !== "object" || !("results" in value) || !Array.isArray(value.results)) return [];
  const first = value.results[0];
  if (!first || typeof first !== "object" || !("data" in first) || !Array.isArray(first.data)) return [];
  return first.data.flatMap((point: unknown) => {
    if (!point || typeof point !== "object") return [];
    const record = point as Record<string, unknown>;
    return typeof record.period === "string" && typeof record.ratio === "number" && Number.isFinite(record.ratio)
      ? [{ period: record.period, ratio: record.ratio }]
      : [];
  });
}

async function naver(path: string, body?: object) {
  const url = new URL(path, API);
  const response = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_API_HUB_CLIENT_ID!,
      "X-NCP-APIGW-API-KEY": process.env.NAVER_API_HUB_CLIENT_SECRET!,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`NAVER API HUB HTTP ${response.status}`);
  return response.json() as Promise<unknown>;
}

async function section<T>(field: "items" | "points", work: () => Promise<unknown>, parse: (value: unknown) => T, empty: T) {
  try {
    return { ok: true, [field]: parse(await work()) };
  } catch {
    return { ok: false, [field]: empty, error: "네이버 자료를 가져오지 못했습니다. 다시 시도해 주세요." };
  }
}

export async function POST(request: Request) {
  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 4096) return NextResponse.json({ error: "입력이 너무 깁니다." }, { status: 413 });
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("invalid body");
    input = body as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "입력 형식을 확인해 주세요." }, { status: 400 });
  }

  const productName = cleanText(input.productName);
  const description = cleanText(input.description);
  const query = [productName, description.split(/[.!?\n]/)[0].trim()].filter(Boolean).join(" ").slice(0, 100);
  const categoryId = input.shoppingCategoryId;
  if (!query || productName.length > 100 || description.length > 1000 ||
      (categoryId !== undefined && categoryId !== "" && (typeof categoryId !== "string" || !/^\d{8}$/.test(categoryId)))) {
    return NextResponse.json({ error: "제품명·설명 또는 8자리 쇼핑 카테고리 코드를 확인해 주세요." }, { status: 400 });
  }

  const clientId = request.headers.get("cf-connecting-ip") || "shared";
  const now = Date.now();
  const quota = requests.get(clientId);
  if (quota && quota.until > now && quota.count >= 20) {
    return NextResponse.json({ error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." }, { status: 429 });
  }
  requests.set(clientId, quota && quota.until > now ? { ...quota, count: quota.count + 1 } : { count: 1, until: now + 60_000 });
  if (requests.size > 1000) {
    for (const [key, value] of requests) if (value.until <= now) requests.delete(key);
  }

  if (!process.env.NAVER_API_HUB_CLIENT_ID || !process.env.NAVER_API_HUB_CLIENT_SECRET) {
    return NextResponse.json({ error: "네이버 검색 연결이 설정되지 않았습니다." }, { status: 503 });
  }

  const cacheKey = `${query}\u0000${categoryId || ""}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.until > now) return NextResponse.json(cached.data);

  const end = new Date(now);
  const start = new Date(now);
  start.setUTCDate(1);
  start.setUTCMonth(start.getUTCMonth() - 11);
  const dates = { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), timeUnit: "month" };
  const search = (kind: string) => naver(`/search/v1/${kind}?query=${encodeURIComponent(query)}&display=6&start=1`);
  const category = typeof categoryId === "string" && categoryId ? categoryId : null;
  const missingCategory = { ok: false, points: [] as Point[], error: "쇼핑 카테고리 코드가 없어 조회하지 않았습니다." };

  const [web, blog, image, trend, shoppingCategory, shoppingKeyword] = await Promise.all([
    section("items", () => search("webkr"), items, [] as SearchItem[]),
    section("items", () => search("blog"), items, [] as SearchItem[]),
    section("items", () => search("image"), items, [] as SearchItem[]),
    section("points", () => naver("/search-trend/v1/search", { ...dates, keywordGroups: [{ groupName: query, keywords: [query] }] }), points, [] as Point[]),
    category ? section("points", () => naver("/shopping/v1/categories", { ...dates, category: [{ name: query, param: [category] }] }), points, [] as Point[]) : missingCategory,
    category ? section("points", () => naver("/shopping/v1/category/keywords", { ...dates, category, keyword: [{ name: query, param: [query] }] }), points, [] as Point[]) : missingCategory,
  ]);

  const data = { query, retrievedAt: new Date(now).toISOString(), web, blog, image, trend, shoppingCategory, shoppingKeyword };
  if ([web, blog, image, trend, ...(category ? [shoppingCategory, shoppingKeyword] : [])].every((part) => part.ok)) {
    if (cache.size >= 100) cache.delete(cache.keys().next().value!);
    cache.set(cacheKey, { until: now + CACHE_MS, data });
  }
  return NextResponse.json(data);
}
