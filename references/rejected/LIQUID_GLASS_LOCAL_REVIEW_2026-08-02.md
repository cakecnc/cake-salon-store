# Liquid Glass local preview review

- Knowledge ID: `AIWORK-DESIGN-LIQUID-GLASS-REJECTED-2026-08-02`
- Reviewed at: 2026-08-02 KST
- Reviewer: Mr.L
- Decision: `rejected_for_deployment`
- Deployment status: `not_started`
- Production impact: none
- Evidence level: local browser preview and source diff; not a production release

## Preview evidence

| Surface | Local preview | Observed title | Source root |
|---|---|---|---|
| AIWORK | `http://127.0.0.1:4321/` | `AIWORK | AI가 이해하고, AIWORK가 안전하게 실행합니다` | `/Users/sj/Sites/aiwork-sites-source` |
| Cake Salon shared site | `http://127.0.0.1:4322/` | `케익살롱 식용 아이싱시트 | 포토케이크 맞춤 프린팅` | `/Users/sj/Sites/cake-salon-store` |

The local preview servers returned HTTP 200 and were stopped after review. The two
preview tabs were closed after the decision was recorded.

## Implemented treatment that was reviewed

### AIWORK

- Dark navy and violet treatment.
- Glass variables use translucent surfaces, highlight lines, depth shadows and
  `backdrop-filter` blur.
- The treatment targets the header, mobile navigation, hero controls, menus,
  workbench toolbar and selected CTA controls.
- Product and long-form content surfaces remain opaque.

### Cake Salon shared site

- Burgundy-tinted shared theme for `cakesalon.kr` and `edibleicingsheet.com`.
- The `site-glass` root class applies translucent treatment to the site header,
  hero copy panel, hero caption, theme panel, buttons, promise bar and mobile CTA.
- The hero preview showed a large translucent burgundy panel over the cake image.

## Review outcome

Mr.L's review was: `디자인이 별로.`

This is a rejection of the current visual direction, not evidence that Liquid
Glass as a design language can never be used. The current implementation must not
be published, deployed or represented as an approved design.

## Operating decision

- Do not deploy the reviewed AIWORK or Cake Salon Liquid Glass changes.
- Do not push the independent Sites source changes as a release.
- Preserve all existing local changes without reset, deletion or overwrite so
  they remain available as comparison data.
- Exclude the rejected Sites changes when staging unrelated Work Board commits.
- Do not start a replacement design automatically. First obtain an explicit
  visual direction or approved reference and show a local preview again.
- A later design review must keep local preview, user approval and production
  deployment as separate states.

## Status model

`prepared -> local_previewed -> rejected_for_deployment`

Not reached: `approved`, `committed_for_release`, `pushed_for_release`, `deployed`,
`production_verified`.

## Remaining local changes

The rejected visual patch remains uncommitted in the canonical AIWORK checkout and
the two independent Sites source checkouts. It is reference material only. This
record does not certify build, accessibility, responsive behavior or production
readiness.
