# Cake Salon historical Designer source snapshot

This `bluehost` branch contains a previously verified **Designer-only** source snapshot, including the tutorial, streamlined layout, and PayPal purchase UI. It is **not** the complete Cake Salon site source and is **not** wired to automatic deployment. The historical main branch remains unchanged.

## Snapshot scope

`source/public/designer-payload.txt` is self-contained HTML with embedded styles and browser JavaScript. The historical verification recorded a match with an HTTP 200 response from https://cakesalon.kr/designer/ and the reviewed artifact (193,258 bytes). This is not a current-production parity claim:

```text
2806032d64b8a89cc5247968050a89403b97a615690d15c12ce08cac9140a006
```

Only `designer/index.html` is reproducible here. The broader homepage and other site routes are intentionally omitted because their complete current build-source mapping has not been verified. Do not deploy this repository as a full-site replacement. No unreviewed Pro/payment prototype or server-side payment code is included.

## Production comparison: 2026-11-13

A read-only HTTP/source comparison at approximately 02:05 UTC (11:05 KST) found:

| Evidence | Bytes | SHA256 |
| --- | ---: | --- |
| This branch's `source/public/designer-payload.txt` | 193,258 | `2806032d64b8a89cc5247968050a89403b97a615690d15c12ce08cac9140a006` |
| https://edibleicingsheet.com/designer/ | 210,606 | `47ac557fb5d65cb7f797241e8d20ce8357fe916e0bd57383a0aaab551d6f99fb` |
| https://cakesalon.kr/designer/ | 210,606 | `47ac557fb5d65cb7f797241e8d20ce8357fe916e0bd57383a0aaab551d6f99fb` |

The `bluehost-release/manifest.json` snapshot references source commit `de0cf33ebb52ac5b2ed27ccd1306b8604d6afcaa` and the 193,258-byte payload. It does not establish that the later live bytes are reproducible from this branch.

The live HTML includes the Free two-circle limit, combined circle-size/count/image controls, compact layout and bottom-menu overlap fixes, Naver purchase marked as preparing, and displayed 1/6/12-month prices of $12/$39/$69. This branch retains the older $24 PayPal direct-purchase URL. These are observed HTML differences, not verification of checkout, paid entitlement, or a recommended price change.

The 35 mm (5 × 7) and 55 mm (3 × 4) jig definitions matched in this comparison. That limited match is not full UI parity or a physical printing test.

**Do not redeploy this historical payload as the latest Designer.** First identify and preserve the source and commit that produced the live revision, reconcile later changes, and independently review tests and hash guards. The latest source-to-live mapping remains unresolved; this documentation correction does not import or deploy live HTML.

The recursive Git tree at the source commit contains no `.github/workflows/` files. This branch's assembly command produces a local artifact only; a build, test, release manifest, or PR is not proof of production deployment.

## Verify and assemble the historical snapshot

Use Node.js 24:

```sh
cd source
npm ci
npm test
cd ..
node scripts/build-designer.mjs
```

The 70 tests cover geometry, layout, existing controls, image handling, Undo, tutorial behavior, snapshot PayPal link and hidden legacy controls, and the exact reviewed HTML hash. The assembly script copies those exact bytes to `out/designer/index.html` and rejects an unexpected source hash. This does not deploy anything. Future source edits require independent review before updating the hash guard.

Older pre-streamline/pre-PayPal whole-document tests rejected the then-approved snapshot UI. Their unmodified versions are retained in `source/tests/historical/` for traceability, outside the active test glob. The snapshot tests preserve the original geometry/UX/tutorial behaviors and control-ID/safety assertions; obsolete exact-document comparisons are replaced by the exact-reviewed-snapshot SHA256 gate (not a current-production gate). Test dependencies and lockfile are unchanged. Physical printer output and payment transactions are not exercised.

Server-side code, credentials, private configuration, customer data, internal notes, and generated artifacts are excluded. Do not publish the repository root or test fixtures to a web server.
