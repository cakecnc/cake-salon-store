import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
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
  assert.match(html, /이미지 속 작은 글씨 대신 검색과 확대가 가능한 웹 텍스트/);
  assert.match(html, /실제 적용 사례만 담았습니다/);
  assert.match(html, /두 번째 구매인데/);
  assert.match(html, /포장이 꼼꼼하고/);
  assert.match(html, /CONTACT/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /식용 아이싱시트,아이싱시트 1팩/);
  assert.doesNotMatch(html, /A4 아이싱시트 50팩|A3 아이싱시트 25장/);
  assert.doesNotMatch(html, /빈 카트리지|Empty Cartridges|空カートリッジ|空墨盒/);
  assert.doesNotMatch(html, /localized-guide/);
});
