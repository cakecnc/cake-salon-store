import assert from "node:assert/strict";
import test from "node:test";

test("renders the production homepage metadata and content", async () => {
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
  assert.doesNotMatch(html, /\bcodex-preview\b/i);
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
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']https:\/\/cakesalon\.kr\/["']/i);
  assert.doesNotMatch(html, /A4 아이싱시트 50팩|A3 아이싱시트 25장/);
  assert.doesNotMatch(html, /빈 카트리지|Empty Cartridges|空カートリッジ|空墨盒/);
  assert.doesNotMatch(html, /localized-guide/);
});
