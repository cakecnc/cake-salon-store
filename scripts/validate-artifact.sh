#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

worker="${SITES_PROJECT_ROOT}/dist/server/index.js"
wrangler="${SITES_PROJECT_ROOT}/dist/server/wrangler.json"
hosting="${SITES_PROJECT_ROOT}/dist/.openai/hosting.json"
static_headers="${SITES_PROJECT_ROOT}/dist/client/_headers"
designer_payload="${SITES_PROJECT_ROOT}/dist/client/designer-payload.txt"
designer_route_collision="${SITES_PROJECT_ROOT}/dist/client/designer.html"

[[ -f "${worker}" ]] || {
  echo "Missing Sites Worker entry: dist/server/index.js" >&2
  exit 66
}
[[ -f "${hosting}" ]] || {
  echo "Missing packaged Sites manifest: dist/.openai/hosting.json" >&2
  exit 66
}
[[ -f "${wrangler}" ]] || {
  echo "Missing generated Worker config: dist/server/wrangler.json" >&2
  exit 66
}
[[ -f "${static_headers}" ]] || {
  echo "Missing static response headers: dist/client/_headers" >&2
  exit 66
}
[[ -f "${designer_payload}" ]] || {
  echo "Missing Worker-served designer payload: dist/client/designer-payload.txt" >&2
  exit 66
}
[[ ! -e "${designer_route_collision}" ]] || {
  echo "Route-colliding static asset must be absent: dist/client/designer.html" >&2
  exit 66
}
for expected in \
  "/designer*" \
  "Content-Security-Policy:" \
  "Permissions-Policy:" \
  "Referrer-Policy:" \
  "X-Content-Type-Options: nosniff"; do
  grep -Fq "${expected}" "${static_headers}" || {
    echo "Missing static response header rule: ${expected}" >&2
    exit 66
  }
done

node --input-type=module - "${worker}" "${hosting}" "${wrangler}" <<'NODE'
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const [workerPath, hostingPath, wranglerPath] = process.argv.slice(2);
JSON.parse(await readFile(hostingPath, "utf8"));
const wrangler = JSON.parse(await readFile(wranglerPath, "utf8"));
if (wrangler.assets?.binding !== "ASSETS" ||
    !["/designer", "/designer/"].every((path) => wrangler.assets?.run_worker_first?.includes(path))) {
  throw new Error("dist/server/wrangler.json must route /designer through the ASSETS-bound Worker first");
}

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("sites-validation", `${process.pid}-${Date.now()}`);
const worker = await import(workerUrl.href);
if (!worker.default || typeof worker.default.fetch !== "function") {
  throw new Error("dist/server/index.js must have an ESM default export with fetch(request, env, ctx)");
}
NODE

echo "Validated Sites artifact: ESM Worker default.fetch and hosting manifest are present."
