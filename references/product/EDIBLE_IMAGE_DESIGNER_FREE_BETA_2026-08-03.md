# Edible Image Designer free beta decision

- Decision ID: `CNC-DESIGNER-FREE-BETA-2026-08-03`
- Product surface: `edibleicingsheet.com/designer`
- Source boundary: Cake Salon shared Sites project
- Audience: Cake Salon, Making Sweet and edibleicingsheet.com customers

## Goal

Publish the existing edible-image layout prototype as a free, privacy-first browser
tool that helps customers prepare A4 prints and then choose an icing-sheet purchase,
custom printing or business-supply inquiry.

## Decisions

- Keep the core A4 editor free during beta, without signup, payment or an output quota.
- Process customer images locally in the browser. Do not upload images or record file
  names in referral or conversion data.
- Use one public tool for all customer groups. The optional referral values are
  `cakesalon`, `edibleicingsheet` and `makingsweet`.
- Keep product purchase, custom-print consultation and bulk-supply inquiry as the
  immediate revenue paths.
- Treat cloud project storage, custom templates, batch work, team workflows and AI
  processing as possible paid features. No price, release date or payment is promised.
- Do not publish an unverified pallet quantity or claim that template coordinates have
  been proven against a physical cutting jig.

## Release boundary

- Desktop navigation: highlighted `이미지 스튜디오` link after custom design.
- Mobile navigation: a separate short `스튜디오` link because the desktop navigation is
  hidden below 900px.
- Designer route: `/designer`, backed by the self-contained static asset
  `/designer.html`.
- Search discovery: a canonical URL and sitemap entry for
  `https://www.edibleicingsheet.com/designer`, matching the existing sitemap host.

## Rejected design data

The rejected Liquid Glass treatment is not included in runtime code. Its review state
is preserved separately in
`references/rejected/LIQUID_GLASS_LOCAL_REVIEW_2026-08-02.md` as
`rejected_for_deployment`.

## Constraints

- Geometry checks in code verify bounds and conversion math, not physical printer or
  cutter alignment. Customers are instructed to print at 100% and check the 50mm
  calibration line.
- `FREE BETA` is an operating state, not a promise that future server-backed features
  will remain free.
- The shared Sites release also serves the Cake Salon hostnames; AIWORK (`aiwork.to`)
  is a separate project and is outside this release.

## Validation incident and root cause

- The first local validation on 2026-08-03 passed lint, the Sites build, artifact
  validation and the new designer route test. The pre-existing homepage test failed
  because the rendered HTML lacked `codex-preview=development`.
- Git evidence shows that initial Sites commit `fa4af7a` introduced the metadata,
  its test and the README validation contract together. SEO commit `5bb1013` later
  replaced the metadata `other` block with geographic fields but retained the test
  and README contract.
- The minimal repair restores `codex-preview=development` alongside the existing
  geographic metadata. It does not remove the established test or roll back the SEO
  fields.
- The next run exposed additional stale homepage copy assertions. Commit `f6116ee`
  intentionally replaced the long image-text guide sentence, while commit `62f87b2`
  intentionally removed the customer-review section; neither updated the older test.
- The homepage test now checks the explicit no-unverified-review notice, absence of the
  removed review quotes, the contact section anchor and the
  current Product structured data. This preserves current product decisions instead of
  restoring superseded marketing copy solely to satisfy a stale test.
- A later diagnostic confirmed that `guideNote` remains defined but is not rendered by
  the current JSX. The test therefore does not assert that dormant source-only value;
  it checks only text and structure present in the built HTML.
