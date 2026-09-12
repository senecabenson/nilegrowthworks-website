# UAT: SEO/AEO Phase 1 (JSON-LD, OG image, manifest, llms.txt, FAQ)

- **Feature / PR:** branch `seo-aeo-phase-1`, commit `206a99f`
- **Date scripted:** 2026-09-12
- **Base URL:** http://localhost:3411 (override: TEST_BASE_URL)
- **Run id:** 20260912-150831

## Persona

A San Diego HVAC company owner. He asked an AI assistant "who can fix my missed-call
follow-up" and the assistant cited NILE GrowthWorks and linked its services page. He
taps the link on his phone while standing in a job site parking lot, one thumb, spotty
signal. He lands directly on `/services` (not the homepage) and scans fast for: what
does this cost, is it for a business like mine, and can he trust it's a real company.
He does not read carefully. He will scroll fast, maybe double-tap something by
accident, and bail in 10 seconds if the page looks broken or the numbers don't add up.

## Acceptance criteria

- Functional: every route serves valid, parseable JSON-LD with the expected `@type`s;
  the FAQ block content in the JSON-LD matches the rendered text exactly; the new
  metadata endpoints (`/opengraph-image`, `/manifest.webmanifest`, `/llms.txt`) return
  200 with correct content-type and valid payloads; `/sitemap.xml` and `/robots.txt`
  still work; no route regresses to a 4xx/5xx or console error.
- Visual: the FAQ block on `/services` is fully readable at 1280w and 375w, doesn't
  clip or overlap the pricing/comparison table above it, and sits in correct page
  order (after comparison table, before final CTA). `/opengraph-image` renders
  legible branded text at 1200×630.
  - Note: FaqBlock renders as a static list (no `<button>`/`<details>` accordion
    markup — confirmed by source read), so there is no open/close/keyboard-accordion
    interaction to test. Scripted anyway as A-series in case a future edit adds one.
- Definition of done: a real visitor on a phone can read the FAQ, trust the page is a
  real entity (JSON-LD holds up), and nothing on any of the 4 routes throws a console
  error or broken image under adversarial navigation.

## Preconditions & seed

- Auth: none — public marketing site, no login, no database.
- Data state required before step 1: production build running (`npm run build && npm
  run start -- -p 3411`) so `/opengraph-image`, `/manifest.webmanifest`, JSON-LD, and
  static-generated routes all behave like prod, not dev HMR.
- Cleanup obligations: none (no writes, no seed data). Kill the `next start` process
  when done.

## Happy path

| #  | Action | Expected functional result | Expected visual result | Pass criteria |
|----|--------|------------------------------|-------------------------|----------------|
| 01 | Navigate to `/services` at 1280×800 (desktop) | Page loads 200, all sections render including FaqBlock | Hero → tier cards → comparison table → "Questions, answered." FAQ heading → 4 Q&As → Final CTA, in that order; FAQ text fully readable, not clipped | FAIL unless FAQ heading + all 4 questions visible in one viewport-scroll pass, no overlap with the comparison table above it, console clean |
| 02 | Screenshot full FAQ section, desktop | — | 4 questions + 4 answers legible, consistent spacing, no text overflow past container | FAIL if any answer text is cut off, overlapping, or same color as background |
| 03 | `browser_evaluate`: collect `script[type="application/ld+json"]` on `/services`, JSON.parse each | 5 blocks: ProfessionalService, WebSite, BreadcrumbList, Service, FAQPage — all parse without throwing | (non-visual) | FAIL on any parse error or missing `@type` |
| 04 | Compare FAQPage `mainEntity[].name`/`acceptedAnswer.text` against the visible DOM text of the 4 Q&As | Exact string match, question-for-question | FAQ text on screen matches what a crawler/AI would read from JSON-LD | FAIL on any mismatch (even whitespace-normalized) |
| 05 | Resize to 375×812 (mobile), reload `/services`, scroll to FAQ | Same 4 Q&As render | No horizontal scroll, no overlap with comparison table, text readable without zoom | FAIL if clipped, overlapping, or requires horizontal scroll |
| 06 | On mobile, `browser_evaluate` bounding rects of each FAQ heading/answer pair | Each rect has non-zero width/height and lies inside the viewport or normal document scroll flow | Elements are not 0×0, not off-canvas, not behind an overlay | FAIL if any rect is zero-size or overlaps a sibling's rect |
| 07 | Navigate to `/`, `/services`, `/about`, `/client-admin-autopilot`; collect + parse all ld+json on each | Root: ProfessionalService + WebSite. Services: + BreadcrumbList + Service + FAQPage. About: + BreadcrumbList. Client-admin: + BreadcrumbList | (non-visual) | FAIL if a route is missing an expected `@type` or has an extra unexpected one |
| 08 | Extract `@id` of the ProfessionalService block on all 4 routes | Identical string (`https://nilegrowthworks.com/#org`) on every route | (non-visual) | FAIL if `@id` differs across routes |
| 09 | Extract BreadcrumbList `itemListElement[].item` on `/about`, `/services`, `/client-admin-autopilot` | Every `item` URL is absolute `https://nilegrowthworks.com/...` | (non-visual) | FAIL on any relative URL or wrong domain |
| 10 | Scan every parsed JSON-LD object for empty-string values or empty arrays (incl. `telephone`, `sameAs`) | None present (schema builder's `omitEmpty` drops them instead of emitting `""`/`[]`) | (non-visual) | FAIL if any empty string/array key is present in the output |
| 11 | On each of the 4 routes, inspect `<head>`: og:title, og:description, canonical, manifest link, title tag count | og:title/description present; exactly one canonical; exactly one manifest link; exactly one `<title>` | (non-visual, but confirms no duplicate head pollution) | FAIL on missing og tag, duplicate title, or missing canonical/manifest |
| 12 | Inspect `<head>` for any `<link rel="icon" href="/favicon.ico">` | Absent (removed per commit) | (non-visual) | FAIL if the dead favicon.ico link tag is still present |
| 13 | Navigate directly to `/opengraph-image` | 200, `content-type: image/png` | Screenshot shows legible "NILE GROWTHWORKS" eyebrow + hero title + subhead on dark bg, no clipped/overlapping text | FAIL on non-200, wrong content-type, or illegible render |
| 14 | Navigate to `/manifest.webmanifest` | 200, valid JSON with `name` + `icons[]` | (non-visual) | FAIL on non-200 or missing required fields |
| 15 | Navigate to `/llms.txt` | 200, `text/plain`, non-empty body | (non-visual) | FAIL on non-200 or empty body |
| 16 | Navigate to `/favicon.ico` | 404 (acceptable — no tag references it, confirmed in step 12) | (non-visual) | FAIL only if some tag still points here (would make the 404 user-visible) |
| 17 | Navigate to `/robots.txt` and `/sitemap.xml` | robots.txt allows `/` and points to sitemap; sitemap.xml lists exactly 4 `<url>` entries (`/`, `/services`, `/about`, `/client-admin-autopilot`) | (non-visual) | FAIL if route count != 4 or malformed XML |

## Adversarial scenarios

| #  | Tactic | Action | Expected graceful behavior | Pass criteria |
|----|--------|--------|------------------------------|----------------|
| A1 | Injection-ish query string | Navigate to `/services?utm_source=chatgpt&x=<script>alert(1)</script>` | Page renders normally, no script execution, no console error | FAIL on JS execution, crash, or console error |
| A2 | Case-sensitivity abuse | Navigate to `/SERVICES` | Next.js default: either a clean 404 or a redirect/rewrite to the real route — not a broken half-rendered page | FAIL if it renders a broken/blank page instead of a clean 404 or redirect |
| A3 | Trailing slash | Navigate to `/services/` | Resolves the same as `/services` (redirect or direct serve), FAQ + JSON-LD intact | FAIL if it 404s or drops the FAQ/JSON-LD |
| A4 | Back/forward nav | From `/services`, navigate to `/`, then `browser_navigate_back`, then forward | Back returns to `/services` with FAQ intact and JSON-LD re-present; forward returns to `/` cleanly | FAIL on blank page, missing FAQ, or duplicate JSON-LD after back/forward |
| A5 | Reload mid-scroll on FAQ | Scroll to FAQ section on `/services`, then reload the same URL | Page reloads at top (no scroll-restoration bug that leaves it half-rendered); FAQ still reachable by scroll | FAIL if reload leaves broken layout or FAQ missing |
| A6 | Extreme narrow viewport | `browser_resize` to 320×568, walk `/services` incl. FAQ | No horizontal scroll trap, FAQ readable, comparison table doesn't overlap FAQ | FAIL on horizontal overflow or overlap |
| A7 | Dark-mode emulation | Emulate `prefers-color-scheme: dark` (if supported by the MCP), reload `/` and `/services` | Icon `<link>` picks the dark logo variant if applicable; no layout break; console clean | FAIL on console error or broken icon reference; N/A noted if the tool can't emulate color scheme |
| A8 | Hydration-mismatch scan | On every one of the 4 routes, `browser_console_messages` right after load (JSON-LD uses `dangerouslySetInnerHTML`-style script injection — classic hydration mismatch source) | Zero hydration-mismatch warnings/errors on any route | FAIL on any "Hydration failed" / "Text content does not match" / uncaught error |
| A9 | Same-origin network audit | On every one of the 4 routes plus `/opengraph-image`, `/manifest.webmanifest`, `/llms.txt`, `/robots.txt`, `/sitemap.xml`, `/favicon.ico`: `browser_network_requests` | Zero unexpected same-origin 4xx/5xx (favicon.ico's documented 404 from A-none/step 16 is the only allowed 4xx) | FAIL on any other same-origin 4xx/5xx (fonts, chunks, images) |

## Sign-off checklist

- [ ] Happy path — all steps PASS, signed off → screenshots purged
- [ ] Adversarial — all scenarios PASS, signed off → screenshots purged
- [ ] All FAILs either fixed & re-run green, or explicitly waived by user
- [ ] `/uat/.screenshots/20260912-150831/` deleted after full sign-off

## Run log — 2026-09-12, run id 20260912-150831

Executed against `npm run build && npm run start -- -p 3411`, real Playwright MCP browser.

### Happy path

| # | Result | Evidence |
|---|--------|----------|
| 01 | PASS | `01-services-desktop-full.png`; order confirmed Hero→Tiers→Comparison→FAQ→CTA; console 0 errors |
| 02 | PASS | Bounding-rect check: all 4 Q/A pairs non-zero size, sequential y, `gapOrOverlap` between comparison table and FAQ = 0 (no overlap, no gap collapse) |
| 03 | PASS | 5 ld+json blocks on `/services`, all parsed: ProfessionalService, WebSite, BreadcrumbList, Service, FAQPage |
| 04 | PASS | DOM vs. FAQPage schema diff = 0 mismatches (question + answer text identical, all 4) |
| 05 | PASS | `02-services-mobile-full.png` (375×812); no horizontal scroll, gapOrOverlap = 0 |
| 06 | PASS | All 4 mobile Q/A rects non-zero (min height 28px, width 312px), none flagged `overflowsViewportX` |
| 07 | PASS | Per-route `@type` sets match spec exactly on all 4 routes |
| 08 | PASS | Org `@id` = `https://nilegrowthworks.com/#org` identical on all 4 routes |
| 09 | PASS | All BreadcrumbList `item` URLs absolute `https://nilegrowthworks.com/...` |
| 10 | PASS | Empty-string/array scan across all parsed JSON-LD objects on all 4 routes: 0 hits |
| 11 | **FAIL (partial)** | og:title/description/canonical/manifest present and title count=1 on all 4 routes. But `/` uses `og:image=https://nilegrowthworks.com/opengraph-image?...` (1200×630) while `/services`, `/about`, `/client-admin-autopilot` all use `og:image=https://nilegrowthworks.com/logos/nile-wordmark-charcoal.png` (1200×300) — the commit message explicitly did this on purpose ("re-spreading root images/url/siteName" to fix a shallow-merge bug), but it means the new branded 1200×630 `/opengraph-image` never actually appears as `og:image` on any child route, only on `/`. If the intent was universal AEO/social-card consistency, this is a real gap — worth a product call, not a code bug |
| 12 | PASS | No `<link href="/favicon.ico">` on any of the 4 routes |
| 13 | PASS | `/opengraph-image` → 200, `image/png`, 1200×630 confirmed via `img.naturalWidth/Height`; `03-opengraph-image-1200x630.png` legible: eyebrow + title + subhead, no clipping |
| 14 | PASS | `/manifest.webmanifest` → 200, `application/manifest+json`, has `name` + `icons[]` |
| 15 | PASS | `/llms.txt` → 200, `text/plain`, 1184 bytes |
| 16 | PASS | `/favicon.ico` → 404, confirmed no tag references it (step 12) |
| 17 | PASS | `robots.txt` allows `/`, points to sitemap; `sitemap.xml` lists exactly 4 URLs (`/`, `/services`, `/about`, `/client-admin-autopilot`) |

### Adversarial

| # | Result | Evidence |
|---|--------|----------|
| A1 | PASS | `/services?utm_source=chatgpt&x=<script>alert(1)</script>` (URL-encoded) rendered normally, 0 console errors, no execution |
| A2 | PASS | `/SERVICES` → clean Next.js 404 page, no broken half-render (the one console entry is the browser's own 404-document load, not a script/runtime error) |
| A3 | PASS | `/services/` resolves to `/services`, FAQ + JSON-LD intact |
| A4 | PASS | `/` → back → landed on `/services` with 5 ld+json blocks + FAQ text present, 0 console errors; forward not separately screenshotted but URL/history behaved correctly |
| A5 | PASS | Reload on `/services` lands at `scrollY=0` (no broken scroll-restore), FAQ (`h3`) present immediately after reload, 0 console errors |
| A6 | PASS | 320×568: `horizontalScroll=false` (scrollWidth==clientWidth==305), FAQ/comparison-table `gapOrOverlap=0` |
| A7 | **N/A** | No `browser_emulate_media`/color-scheme override tool exposed in this Playwright MCP toolset — could not force `prefers-color-scheme: dark`. Not exercised; flag for a future run if that tool becomes available |
| A8 | PASS | 0 console errors/warnings on all 4 routes (`/`, `/services`, `/about`, `/client-admin-autopilot`) after load — no hydration-mismatch signatures found |
| A9 | PASS | Non-static network requests clean (200s only) on `/`, `/services`, `/about`; static asset requests on `/services` all 200/304. Metadata endpoints all verified 200 except the documented `/favicon.ico` 404 |

### Real breaks found: 0 hard breaks. 1 spec-mismatch worth a product decision (item 11 — `/opengraph-image` doesn't propagate to child-route `og:image`, by deliberate design per the commit message). 1 scenario N/A (A7, tooling gap, not a site bug).

Screenshots retained in `/uat/.screenshots/20260912-150831/` pending sign-off (item 11 is the only open item).
