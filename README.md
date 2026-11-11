# Cake Salon current Designer source

This `bluehost` branch contains the current verified **Designer-only** source, including the tutorial, streamlined layout, and PayPal purchase UI. It is **not** the complete Cake Salon site source and is **not** wired to automatic deployment. The historical main branch remains unchanged.

## Verified scope

`source/public/designer-payload.txt` is self-contained HTML with embedded styles and browser JavaScript. Its bytes match a fresh HTTP 200 response from https://cakesalon.kr/designer/ and the reviewed deployed artifact (193,258 bytes):

```text
2806032d64b8a89cc5247968050a89403b97a615690d15c12ce08cac9140a006
```

Only `designer/index.html` is reproducible here. The broader homepage and other site routes are intentionally omitted because their complete current build-source mapping has not been verified. Do not deploy this repository as a full-site replacement. No unreviewed Pro/payment prototype or server-side payment code is included.

## Verify and assemble

Use Node.js 24:

```sh
cd source
npm ci
npm test
cd ..
node scripts/build-designer.mjs
```

The 70 tests cover geometry, layout, existing controls, image handling, Undo, tutorial behavior, current PayPal link and hidden legacy controls, and the exact reviewed HTML hash. The assembly script copies those exact bytes to `out/designer/index.html` and rejects an unexpected source hash. This does not deploy anything. Future source edits require independent review before updating the hash guard.

Older pre-streamline/pre-PayPal whole-document tests rejected the current approved UI. Their unmodified versions are retained in `source/tests/historical/` for traceability, outside the active test glob. Current tests preserve the original geometry/UX/tutorial behaviors and control-ID/safety assertions; obsolete exact-document comparisons are replaced by the stronger exact-current-production SHA256 gate. Test dependencies and lockfile are unchanged. Physical printer output and payment transactions are not exercised.

Server-side code, credentials, private configuration, customer data, internal notes, and generated artifacts are excluded. Do not publish the repository root or test fixtures to a web server.
