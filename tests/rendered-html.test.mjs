import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { Script } from "node:vm";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders verified homepage content and navigation", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /cakecnc@daum\.net/);
  assert.match(html, /아이싱시트 1팩/);
  assert.match(html, /맞춤 프린팅 서비스/);
  assert.match(html, /네이버 스마트스토어에서 구매하기/);
  assert.match(html, /1:1 맞춤 제작 문의/);
  assert.match(html, /A4 · 25장 구성/);
  assert.match(html, /40,000원/);
  assert.match(html, /6,840원부터/);
  assert.match(html, /최소 주문 1팩/);
  assert.match(html, /실제 적용 사례만 담았습니다/);
  assert.match(html, /확인되지 않은 후기나 제휴사는 표시하지 않습니다/);
  assert.doesNotMatch(html, /두 번째 구매인데|포장이 꼼꼼하고/);
  assert.match(html, /id="contact"/);
  assert.match(html, /href="\/designer"/);
  assert.match(html, /이미지 스튜디오/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /케익살롱 A4 식용 아이싱시트 25장/);
  assert.doesNotMatch(html, /A4 아이싱시트 50팩|A3 아이싱시트 25장/);
  assert.doesNotMatch(html, /빈 카트리지|Empty Cartridges|空カートリッジ|空墨盒/);
  assert.doesNotMatch(html, /localized-guide/);
});

test("serves the free local-only designer from the clean route", async () => {
  const designerHtml = await readFile(
    new URL("../dist/client/designer.html", import.meta.url),
    "utf8",
  );
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("designer-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const requestedAssets = [];
  const env = {
    ASSETS: {
      fetch: async (request) => {
        requestedAssets.push({
          method: request.method,
          path: new URL(request.url).pathname,
        });
        return new Response(designerHtml, {
          status: 200,
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      },
    },
  };
  const ctx = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const response = await worker.fetch(
    new Request("http://localhost/designer?ref=makingsweet", {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );

  assert.equal(response.status, 200);
  assert.deepEqual(requestedAssets, [{ method: "GET", path: "/designer.html" }]);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /FREE BETA/);
  assert.match(html, /Cake Salon·Making Sweet/);
  assert.match(html, /rel="canonical" href="https:\/\/www\.edibleicingsheet\.com\/designer"/);
  assert.match(html, /이미지는 이 기기 안에서만 처리/);
  assert.match(html, /MAX_IMAGE_PIXELS = 16_000_000/);
  assert.match(html, /\.toBlob\(/);
  assert.match(html, /aria-label="Cake Salon wordmark"/);
  assert.match(html, /src="\/cnc-logo\.jpeg" alt="C&amp;C Corporation logo"/);
  assert.match(html, /프로그램 소스와 UI 디자인에 대한 저작권을 주장합니다/);
  assert.match(html, /상표·화상디자인·특허 등록을 위한 권리화 절차를 진행 중입니다/);
  assert.match(html, /patent registration preparations are in progress/);
  assert.ok(html.includes("As Shakespeare reminds us, “What’s past is prologue.”"));
  assert.doesNotMatch(html, /셰익스피어가 일깨워 주듯/);
  const printSheetMarkup = html.match(/<div id="printSheet"[^>]*>[\s\S]*?<\/div>/i)?.[0];
  assert.ok(printSheetMarkup, "designer must contain its isolated print sheet");
  assert.doesNotMatch(printSheetMarkup, /cnc-logo|권리 안내|What’s past/i);
  assert.doesNotMatch(html, /®|patent pending|registered|patented|등록상표|특허등록/i);
  assert.doesNotMatch(html, /INTERNAL PROTOTYPE/);
  assert.doesNotMatch(html, /792 packs/);
  assert.doesNotMatch(html, /<script[^>]+src=/i);
  const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(inlineScript, "designer must contain its local inline script");
  assert.doesNotThrow(() => new Script(inlineScript[1], {
    filename: "designer.inline.js",
  }));

  const rejectedMethod = await worker.fetch(
    new Request("http://localhost/designer", { method: "POST" }),
    env,
    ctx,
  );
  assert.equal(rejectedMethod.status, 405);
  assert.equal(rejectedMethod.headers.get("allow"), "GET, HEAD");
  assert.equal(requestedAssets.length, 1);
});
