# Cake Salon historical designer baseline

This `bluehost` branch preserves a HISTORICAL standalone sticky-preview designer baseline. It is NOT the current production designer: later tutorial and PayPal UI updates superseded it. Do not deploy this historical baseline or use it to roll back production. It does **not** contain the complete current Cake Salon site source, and is not wired to automatic deployment. The historical main branch remains separate and unchanged.

## Scope

Only `designer/index.html` is reproducible here. `source/public/designer-payload.txt` is the exact reviewed HTML source, including its embedded styles and browser JavaScript. It is byte-identical to the previously deployed sticky-preview baseline, not the current live file:

```text
c2280346a3584cdc3a0567eed55bdc158ee2eac6825ff22636898010f56ecaa1
```

The broader home-page migration exists as a static snapshot, not a verified complete build-source baseline. It is intentionally omitted rather than combining older site code with unverified changes. No later tutorial, PayPal UI, or Pro/payment work is included. Current production source must be independently identified and verified before any deployment is connected.

## Verify and assemble

Use Node.js 24:

```sh
cd source
npm ci
npm test
cd ..
node scripts/build-designer.mjs
```

The assembly script copies the exact reviewed source bytes to `out/designer/index.html` and rejects a changed source hash. This does not deploy the output. Changes require a new review before updating that guard. The generated historical HTML is for regression reproduction only. Do not deploy it over current production.

Server-side code, credentials, private configuration, customer data, internal notes, and generated artifacts are excluded. The original test dependencies and lockfile are preserved.
