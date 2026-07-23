# NILE Website — Enhancement Log

Backlog of fixes and improvements for the NILE GrowthWorks marketing site (Next.js 14, App Router). Seeded from a full read-only audit on 2026-07-22. Paths are relative to `Website/`.

**Status:** `DONE` = fixed this pass · `BACKLOG` = queued · `REVIEW` = needs Seneca's decision, do not auto-change.

**Voice rules (the bar):** no em dashes, no semicolons, no hashtags in visitor copy. 9th-grade, active voice, always contractions.

---

## Done this pass (2026-07-22)

- **DONE — Em dashes in About body copy.** `src/components/about/BrandStory.tsx` (2 spots) → split into sentences.
- **DONE — Semicolon in services copy.** `src/app/services/page.tsx` "You pick the door; …" → period.
- **DONE — Em dashes in page titles.** `src/app/{about,services,client-admin-autopilot}/layout.tsx` title + openGraph.title → middle dot `·`.
- **DONE — Double-arrow bug (`→ →`).** `MagneticButton` always appends an arrow; 6 CTA labels in `src/content/site.ts` also ended in a literal `→`, so every primary CTA rendered two. Stripped the literal `→` from all of them (nav, hero, the 3 tier CTAs, final CTA, client-admin price).
- **DONE — Client Admin Autopilot reprice.** `$500 → $1,500 flat` founding rate (first 3) + optional `$49/mo` + "pay in full, or split into two." Updated `src/content/site.ts` (`clientAdminAutopilot.price` + new `note` line rendered in `page.tsx`) and the layout `description`.
- **DONE — Named-employer metrics de-named + softened.** Stripped "ChemPoint" and "Stericycle" from the About founder story + proof stats (`src/content/site.ts`); reframed the +28%/-94% and $95M contexts as "prior enterprise role." Protects the coworkers-watching / firing-risk concern.

---

## P1 — Broken / wrong (do next)

- **IN PROGRESS — No real conversion path.** Every CTA is a raw `mailto:senecacbenson@gmail.com` (`src/content/site.ts` several, `src/components/layout/Footer.tsx`, `src/components/home/RevenueCalculator.tsx`). No scheduler, form, or CRM capture. A RevOps firm whose own site can't capture a lead is an on-brand credibility risk. Fix: add a booking link (Cal.com / GHL calendar) or a lead form, and use a branded `@nilegrowthworks.com` address. **Step 1 scheduled 7/23** — create `seneca@nilegrowthworks.com` + Porkbun forwarding (ClickUp `86e2fbapg`), then swap all `mailto:` off personal Gmail.

---

## P2 — Should fix

- **BACKLOG — Diagnostic price stated two ways.** "$500" in CTAs/meta vs "$500–$750" on the product (`src/content/site.ts` hero/calculator/comparison + `src/app/services/layout.tsx`). Pick one, or write "$500 (up to $750 depending on scope)".
- **BACKLOG — Child routes lose their social image.** `about`, `services`, `client-admin-autopilot` `layout.tsx` each define `openGraph` and shallow-merge drops the root's `images`/`url`/`siteName`. Re-include them or centralize OG in a helper.
- **BACKLOG — `/client-admin-autopilot` is an orphan.** In `src/app/sitemap.ts` (so it indexes) but linked from nowhere. Decide: campaign-only landing (then remove from sitemap) or add a nav/footer link.
- **BACKLOG — Property Management numbers disagree.** VerticalProofStrip models "3 missed placements/mo" → $8,100/mo (`site.ts`), but the calculator PM preset uses "missedPerWeek: 3" (~13/mo). Align the frequency so the preset matches the proof.
- **BACKLOG — Services heading-order jump (h1 → h3).** `src/app/services/page.tsx` h1, then `TierCard` h3s with no h2 between. Add an h2 section heading above the tier cards.
- **REVIEW — "San Diego birth educator" line is semi-identifiable.** `src/content/site.ts` (client-admin receipt). This is Seneca's own pre-approved public phrasing for the pilot client. Leave as-is unless Care objects. Do not auto-change.
- **DONE (2026-07-22) — Named-employer metrics de-named.** Was: `src/content/site.ts` attributed "+28% / -94%" and "$95M" to ChemPoint / Stericycle by name. Names removed; both reframed as "prior enterprise role." The Stericycle/ChemPoint founder-story mention was also genericized ("customer service" / "a corporate program-management office").

---

## P3 — Polish

- **BACKLOG — En dashes in ranges.** "$500K–$5M", "60–90", "4–6 weeks", etc. across `site.ts` and layouts. En dashes, not em dashes, so arguably compliant. If you want zero dash punctuation, swap to "to".
- **BACKLOG — Standardize title separator.** Root title uses `|`; child pages now use `·`. Pick one across all routes.
- **BACKLOG — Un-contracted founder quotes.** `site.ts` "It is a matter of when" → "It's"; "does not stall … there is no system" → "doesn't / there's". Or declare quotes exempt from the always-contract rule.
- **BACKLOG — `favicon.ico` 404.** `src/app/layout.tsx` references `/favicon.ico` but `public/` only has `favicon.svg`. Add the .ico or drop the line.
- **BACKLOG — Orphaned assets.** `public/videos/nile-logo-animation.{mp4,webm}` and `src/app/fonts/Geist*VF.woff` are unreferenced (hero uses the inline `AnimatedLogo` SVG; fonts load via `next/font/google`). Wire up or delete.
- **BACKLOG — Internal links do full reloads.** `MagneticButton` always renders `<a href>`; internal routes (`/services`, `/about`, `/#diagnostic`) should use `next/link`.
- **BACKLOG — Two ember CTAs above the fold.** Sticky nav CTA (`Nav.tsx`) + Hero CTA (`Hero.tsx`) both ember, both in the first viewport. Make the nav CTA ghost, or accept the sticky-nav exception.
- **BACKLOG — Nav mobile a11y.** `Nav.tsx` toggle lacks `aria-expanded`, uses a static label in both states, and the hit area is ~24px (under 44px). Add `aria-expanded`, swap the label to "Close menu" when open, pad the button.
- **BACKLOG — Duplicate logo alt.** `Nav.tsx` logo `alt="NILE GrowthWorks"` sits next to the visible wordmark, so screen readers say the brand twice. Set the logo `alt=""` (decorative).
- **BACKLOG — Calculator sliders lack `aria-valuetext`.** `RevenueCalculator.tsx` sliders announce raw numbers ("2700", "48") instead of "$2,700" / "48 hr". Mirror the visible display.
- **BACKLOG — ProblemStatement highlight bug.** `ProblemStatement.tsx` highlight list has `'systematically'` (lowercase) but copy is "Systematically", so `startsWith` never matches; the `<em>` also has conflicting `italic … not-italic`; stale comment describes an old em-dash version. Match casing, drop the dead comment.
- **BACKLOG — ComparisonTable dead em-dash marker.** `ComparisonTable.tsx` renders `—` for blank values on an inert span. No blank values exist today, but if one is added it renders an em dash. Replace with "Not included".
- **BACKLOG — Small copy/design inconsistencies.** "Revenue-operations" (hyphenated) in `about/layout.tsx` vs "Revenue operations" elsewhere; eyebrow letter-spacing varies by component (`0.2em` / `0.25em` / `0.3em`) — tokenize one value; two different "$500" offers (Diagnostic vs Client Admin) can blur — differentiate framing; unsourced stats stated as fact ("30–50% of leads", "78% go cold", "73% repeat potential", "$700 avg ticket") — cite or soften.

---

## Checked and OK (don't re-audit)

- Nav CTA `/#diagnostic` resolves (`id="diagnostic"` in `ServicesOverview.tsx`); `#calculator` resolves too.
- No hashtags in visitor copy. No `href="#"` dead links. No TODO/lorem/placeholder text.
- Global `:focus-visible` outline exists (`globals.css`). `metadataBase`, `robots.ts`, `sitemap.ts` all present; root layout has full OpenGraph + Twitter cards.
- All `<img>`/logo instances have alt or `aria-hidden`.
- Contrast on navy/ink mostly passes AA; only 12px teal-on-navy eyebrows are borderline (~4:1).
