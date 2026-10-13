# Service Works Commercial Roofing demo — "THE PLANT ROOM"

**LOCAL ONLY — never deployed, never sent.** Built 2026-10-13 as a cold-pitch demo for
Service Works Commercial Roofing LLC (commercial-only roofer: TPO/EPDM/mod-bit,
restoration, maintenance programs; Tampa Bay + Ft. Myers). Preview screenshots only;
deploy to Vercel only with Emmanuel's explicit approval.

## Concept
**THE PLANT ROOM** — the roof sold as an industrial asset, not a house feature. The
whole site is dressed as plant-room documentation: dark charcoal-steel ground,
steel-blue blueprint grid lines, one safety-yellow accent used **only** on primary
CTAs. Copy is written in B2B facility-manager language — downtime, leaks over
inventory, the roof as a budget line item — and kept lean per the 2026-10-02 rule.

The hero sells the booking, not the company: a 4-step "Book a roof walk-through"
stepper (building type → square footage → roof age → callback time) with progress
bar and per-step chip selection; the final step composes a `mailto:` with the answers
prefilled (handoff line states the mechanism upfront). The phone is the secondary
path as a bare `tel:` link.

## Art-direction triple
**industrial / blunt / spec-driven** — charcoal-steel ground (#15181d, tinted, never
pure black), steel-blue (#9fb4c9 / #2b3542) grid, safety yellow (#ffd21f) on CTAs
only. Saira Condensed 600/700/800 display + IBM Plex Mono 400/500/600 utility —
extreme scale gap between 11px mono spec labels and the ~7rem display H1. One custom
`--ease` (`cubic-bezier(.19,1,.22,1)`) for all motion; entrances are blur-to-sharp
(text) and clip-path wipe (photos) only — never fade-ups; everything completes with
zero interaction via a 3.5s backstop (asserted in QA). Kill-soft-UI: 1px solid
borders, 0 radius, zero shadows; the only allowed blur is frosted-glass HUD chips
over the hero photo.

## Broken-grid rule (one rule, everywhere)
**Every section eyebrow sits one column in from the content edge** — `margin-left:
56px` on desktop, `16px` on mobile, via a `--indent` token on every `.eyebrow`.

## Signature interactive elements
1. **Roof-system layer explorer** — SVG cross-section of a commercial roof stack
   (walk pads+coating → 60-mil TPO → cover board → tapered ISO → steel deck →
   HVAC curb); clicking or keyboard-activating a layer updates a spec readout panel
   with real trade language (¼″/ft taper, heat-welded seams, 20-yr NDL).
2. **TCO tool: "Cost per year, not per square foot"** — square-footage slider
   (5k–100k) driving three live bars (silicone restoration $2.90/ft/12yr, EPDM
   $5.50/ft/25yr, TPO $5.90/ft/25yr) sorted by $/yr, cheapest flagged. The honest
   kicker is printed under it: restoration buys 10–15 years at a third of a
   tear-off; a 20+ year hold wins the per-year math on replacement.

## Motif (counted: ONE)
**Crosshair registration mark (+)** — favicon glyph, brand mark, eyebrow marker,
care-list bullets, mobile-bar call glyph. Nothing else decorative competes (frosted
HUD chips are instrumentation, per the playbook).

## Named enemy
"The drone-only estimate" — answered by the insider-ritual headline and the process
ladder: *"Every quote starts with a core sample. We cut into the roof and read
what's wet. Dry bones or a sponge — that decides restoration vs. re-roof."*

## Insider-ritual headline
"EVERY QUOTE STARTS WITH A CORE SAMPLE." — backed by the photo log, infrared scan,
and the line "A welded seam, up close. Probes, not promises."

## Distinctness vs the other roofing demos
- **jrjb-roofing** (charcoal/terracotta roofline): ours is charcoal-steel + blueprint
  grid + safety yellow; commercial-only, zero residential.
- **cardinal-roofing** ("THE SHELL": annotated cross-section + layer explorer,
  cardinal red, Barlow Condensed): ours shares the explorer *pattern* but as a
  5-layer industrial stack in steel-blue with Saira Condensed, commercial framing.
- **carl-martin-roofing** ("THE LEDGER": ledger paper, cloth green, copper,
  Rokkitt, inspection stepper): no paper, no green; yellow accent; mono utility.
- **all-area-roofing** (full-bleed STORM DAMAGE orange, Oswald, ZIP estimator):
  ours is dark industrial, yellow, TCO math tool, no storm language.
- **dockside-roofing** ("THE HARBOR": teal/brass, review-pin map, vertical edge
  nav): no map, no pins, no teal; customer-vocabulary nav (TPO/EPDM/Restoration).
- **roofing-solutions-tampa** ("THE WARRANTY": certificate hero): ours is a math
  tool + cross-section, not a certificate.
- **premier-metal-roof**: metal-specific, residential-leaning; ours is flat-roof
  commercial only.

## QA summary (qa/qa.py, headless Chromium, systematic)
- **Zero console/page errors, zero dead anchors, zero horizontal overflow** at
  390px and 1440px (second run; first run caught a real mobile stat-card overflow
  — grid items' min-content blew 1fr tracks — fixed with `min-width:0` + smaller
  mobile numerals, re-run green).
- All 4 images load; all reveals complete with no interaction (backstop asserted).
- Stepper: Next starts disabled, enables on chip pick, advances through all steps,
  done state composes a correct `mailto:mlong@serviceworksroofing.com` with the
  answers (asserted), Back hidden on done step.
- Layer explorer: keyboard Enter on layer 4 updates readout to "Steel deck"
  (asserted).
- TCO: slider to 50,000 renders 3 rows, area reads "50,000" (asserted).
- Clock chip renders Tampa time + OPEN NOW / next-dispatch state (asserted).
- Mobile: hamburger opens/closes, nav closes on link tap, sticky bottom bar
  appears after the hero and hides over the final CTA (asserted); desktop nav
  hidden on mobile; phone number always visible in mobile header (never behind
  the hamburger).
- Source checks: phone, tel:, mailto:, license, from-prices, services, RoofingContractor
  + FAQPage JSON-LD, absolute og-image URLs — all in server HTML (JS-off safe);
  no runtime font/CDN hotlinking; only the hand-written `--ease` used.
- Fixed during QA: header brand + CTA text wrapping (nowrap), mobile stat
  overflow, sticky-bar test scroll depth (smooth-scroll + hero taller than 1400px
  on mobile).

## Substitute QA (claude.ai critique parked by standing rule)
- **Blur test**: desktop fixations = H1 mass first, yellow primary CTA second
  (header CTA third). Mobile: H1 then the full-width yellow CTA. PASS.
- **Five-question friend test**: (1) what — commercial re-roof/restoration +
  45-min walk-through booking, CLEAR; (2) price — "from $2.90/sq ft" in hero,
  per-system FROM prices, live TCO totals, CLEAR; (3) length — 9 sections but
  lean copy; justified for a $50K+ B2B considered purchase (full objection
  stack per playbook), no cut; (4) trust — ★ 4.7, GAF-certified, FL license,
  core-sample ritual, photo log, per-square flat pricing, enemy line
  (drone-only estimates); (5) exit depth — no single leak found; lowest-
  friction risk is the final-step mailto handoff on mobile, mitigated by the
  stated handoff line ("This opens your email with everything filled in").
- **Read-aloud test**: all 9 display headlines read clean ("A flat roof never
  fails quietly." / "Cost per year, not per square foot." / "Every quote starts
  with a core sample." / "Your roof is a line item. Budget it."). No
  brochure-speak; no rewrites needed.
- **Subtraction audit** (phone, form/stepper, services, trust line, prices,
  email): all present in server HTML. PASS.
- **Trade-literacy photo audit**: hero (TPO seams, HVAC on curbs, drain with
  clamping ring, parapet) PASS; seam-weld (hot-air welder + seam roller, no
  open flame) PASS; walk-through (IR thermal camera, vest, curbs) PASS;
  coating (masked line, EPDM-to-silicone) PASS.

## Files
- `index.html` — all copy, OG/Twitter meta with absolute deploy URLs,
  RoofingContractor + FAQPage JSON-LD
- `styles.css` — design system (Saira Condensed + IBM Plex Mono, charcoal steel /
  blueprint / safety yellow, one `--ease`)
- `app.js` — stepper, layer explorer, TCO tool, live Tampa clock, hamburger,
  mobile bar, reveals
- `favicon.svg` — crosshair motif on charcoal
- `fonts/` — local woff2 (Saira Condensed 600/700/800, IBM Plex Mono 400/500/600)
  + `fonts.css`
- `images/` — 4 original AI-generated photorealistic work photos (webp), all
  trade-literacy checked
- `og-image.jpg` — 1200x630, cropped from the hero photo
- `screenshots/` — desktop/mobile hero + full-page captures
- `qa/qa.py` + `qa/results.json` — the systematic check

## Notes for the pitch email
- Prospect weakness to mention: thin form-only homepage, no email shown. This
  demo leads with phone + email as visible links and a 4-step walk-through
  booking.
- Price anchor: restoration from $2.90/sq ft; per-system FROM prices on the
  bento; license #CCC0577411 and GAF-certified are demo placeholders to
  confirm with the business.
- Demo deploy slug: `service-works-roofing-demo-iodine-53s-projects.vercel.app`
