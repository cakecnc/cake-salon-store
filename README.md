# Cake Salon Bluehost designer source

This `bluehost` branch preserves the validated, standalone sticky-preview designer source. It does **not** contain the complete current Cake Salon site source, and is not wired to automatic deployment. The historical main branch remains separate and unchanged.

## Scope

Only `designer/index.html` is reproducible here. `source/public/designer-payload.txt` is the exact reviewed HTML source, including its embedded styles and browser JavaScript. It is byte-identical to the verified deployed sticky-preview designer baseline:

```text
c2280346a3584cdc3a0567eed55bdc158ee2eac6825ff22636898010f56ecaa1
```

The broader home-page migration exists as a static snapshot, not a verified complete build-source baseline. It is intentionally omitted rather than combining older site code with unverified changes. No newer Pro/payment prototype is included.

## Verify and assemble

Use Node.js 24:

```sh
cd source
npm ci
npm test
cd ..
node scripts/build-designer.mjs
```

The assembly script copies the exact reviewed source bytes to `out/designer/index.html` and rejects a changed source hash. This does not deploy the output. Changes require a new review before updating that guard. Publish only the generated HTML to an explicitly reviewed deployment target, never this repository root or its test inputs.

Server-side code, credentials, private configuration, customer data, internal notes, and generated artifacts are excluded. The original test dependencies and lockfile are preserved.
