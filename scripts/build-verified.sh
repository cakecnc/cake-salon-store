#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
node --input-type=module - \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${SITES_BUILD_KILL_AFTER:-10s}" \
  "${vinext}" build <<'NODE'
import { spawn } from "node:child_process";

const [timeoutValue, killAfterValue, command, ...args] = process.argv.slice(2);
const units = { ms: 1, s: 1_000, m: 60_000, h: 3_600_000 };
const duration = (value) => {
  const match = /^(\d+(?:\.\d+)?)(ms|s|m|h)$/.exec(value);
  if (!match) throw new Error(`Invalid duration: ${value}`);
  return Number(match[1]) * units[match[2]];
};
const timeoutMs = duration(timeoutValue);
const killAfterMs = duration(killAfterValue);

const child = spawn(command, args, {
  detached: process.platform !== "win32",
  stdio: "inherit",
});
const signalChild = (signal) => {
  if (!child.pid) return;
  try {
    process.kill(process.platform === "win32" ? child.pid : -child.pid, signal);
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
  }
};

let timedOut = false;
let killTimer;
const timeoutTimer = setTimeout(() => {
  timedOut = true;
  console.error(`Build timed out after ${timeoutValue}; sending SIGTERM.`);
  signalChild("SIGTERM");
  killTimer = setTimeout(() => signalChild("SIGKILL"), killAfterMs);
}, timeoutMs);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => signalChild(signal));
}

const { code, signal } = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code, signal) => resolve({ code, signal }));
});
clearTimeout(timeoutTimer);
clearTimeout(killTimer);
if (timedOut) process.exitCode = 124;
else if (signal) process.kill(process.pid, signal);
else process.exitCode = code ?? 1;
NODE

"${script_dir}/validate-artifact.sh"
