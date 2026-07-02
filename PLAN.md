# Eden Elle Clinic Website — Build Plan

A luxury aesthetic-clinic website reusing the proven soi-clinic stack, styled after the Élle De Marrer brand aesthetic. No blog and no AI chat for launch. Priorities: treatment pages, services, locations, contact, and a standout in-clinic tablet catalog.

---

## 1. Decisions locked in

- **Content:** Scaffold the full structure with placeholder services, prices, branches, and images. Real content swaps in later with no structural changes.
- **Content management:** Typed TypeScript data files only (`data/*.ts`), mirroring soi-clinic. No Keystatic, no CMS — simpler, since there's no blog.
- **Catalog / tablet mode:** A beautiful, impressive presentation/slideshow experience with category and per-service selection for deeper info. This is the centerpiece.
- **Booking / contact:** Both — per-service WhatsApp deep-links *and* a contact form.

---

## 2. Stack (carried over from soi-clinic)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static generation per treatment/location page |
| UI | React 19 | |
| Styling | Tailwind v4 + CSS design tokens | Driven by the provided design system (see §3) — Cormorant Garamond + Jost, warm monochrome palette |
| Animation | GSAP + `@gsap/react` | Scroll reveals, catalog transitions |
| Smooth scroll | Lenis | |
| Analytics | Vercel Analytics + Speed Insights | |
| Testing | Vitest (unit) + Playwright (e2e) | Same config as soi |
| Hosting | Vercel | `vercel.json` carried over |

**Dropped from soi:** Keystatic CMS, blog routes, AI chat / agent / MCP / brain APIs, `llms.txt` LLM-agent surface, cron/feedback/lead API routes (contact form gets one lean endpoint instead).

---

## 3. Design system (provided — `design-system/`)

A full brand & digital design system was supplied as `design-system/Design System.dc.html` plus a `Clinic Home.dc.html` mockup. This is the source of truth for the look and feel — we implement it directly rather than reusing soi's older cream/gold/Playfair tokens. Overall feel: clean, editorial, tactile; warm monochrome; generous whitespace so every screen "breathes like a spa."

**Palette (warm monochrome — gold is a whisper, never a fill):**

| Token | Hex | Use |
|---|---|---|
| Ink | `#1A1714` | Text, headlines, dark sections, footer |
| Paper | `#F7F4EF` | Primary background |
| Cloud | `#FFFFFF` | Cards, surfaces |
| Champagne | `#A08A5F` | Accent — micro-labels, hairlines, active states, one word. Use sparingly |
| Neutrals | `#5C554B` · `#8A8377` · `#B8B1A4` · `#DDD6CA` · `#EBE6DE` | Body text, muted text, borders, dividers |

**Type:**
- **Display — Cormorant Garamond** (serif, 400/500/600 + italic): headlines, hero statements, prices, pull quotes. Set large with airy letter-spacing.
- **Text — Jost** (300/400/500): body, navigation, UI. Uppercase + wide tracking (`0.28–0.42em`) for micro-labels.

**Components defined in the system (build as reusable primitives):**
- **Buttons (pill, `border-radius:999px`):** Primary = solid ink; Secondary = outlined ink; tertiary = champagne outline; Text link = champagne underline with `→`. One primary per view.
- **Forms:** underlined inputs, hairline borders, generous padding; focus deepens border to ink.
- **Cards:** Cloud bg, `18px` radius, `1px #DDD6CA` border. Treatment card = image (4:3) + champagne micro-label + serif title + body + price/book row.
- **Clinic patterns:** dark (Ink) booking-CTA band; treatment list with dotted leader lines (name · duration · price); sticky blurred header; dark footer with clinics/contact/socials.
- **Logo wordmark:** "ÉLLE DE MARRER" with a reversed "É" (`transform:scaleX(-1)`).

**Motion:** subtle Lenis smooth-scroll, GSAP reveal-on-scroll, refined hover states. Restraint over flashiness.

The `Clinic Home.dc.html` mockup already lays out the homepage (header → split hero → philosophy quote band → signature treatments grid → split feature → clinics → dark booking CTA → footer); we translate it into React/Tailwind components.

---

## 4. Site structure

```
/                       Home — hero, services overview, why-us, branches, CTA
/treatments             Services index (all categories)
/treatments/[category]  Category landing (e.g. facials, slimming)
/treatments/[category]/[treatment]   Rich treatment detail page
/catalog                In-clinic tablet presentation mode  ← centerpiece
/locations              All branches
/locations/[branch]     Single branch detail + map
/contact                Contact form + WhatsApp + info
/about                  Clinic story / brand
```

### Reused soi patterns
- `data/treatments.ts` type model (`Treatment`, `Category`) — rich, SEO-friendly fields (overview, howItWorks, steps, benefitsDetailed, idealFor, results, aftercare, FAQs). Carried over as-is; placeholder content fills it.
- `data/locations.ts` `Branch` type (address, geo, phones, hours, map embed, gallery).
- Treatment detail + category + index layouts.
- Navbar, Footer, SiteShell, smooth-scroll provider.

### Removed
- FloatingChat, agent components, blog components/routes, Keystatic route + config.

---

## 5. The catalog / tablet mode (centerpiece)

A full-screen, touch-first presentation experience for staff to walk clients through services on a tablet.

- **Landing:** elegant full-screen category selector — large tappable tiles (Facials, Slimming, Doctor's Procedures, etc.) with big imagery and gold detailing.
- **Category view:** swipeable/horizontal service showcase — each service as a full-bleed slide with name, tagline, hero image, price, and key benefits.
- **Service detail overlay:** tap any service to expand into an immersive detail card (overview, benefits, duration, "book" prompt) without leaving presentation flow.
- **Interactions:** swipe/tap navigation, GSAP slide transitions, keyboard/arrow support, large touch targets, minimal chrome (hide navbar in this mode), optional idle auto-advance slideshow.
- **Reuses the same `data/*.ts`** as the public site — one source of truth, so catalog and treatment pages never drift.

---

## 6. Booking & contact

- **WhatsApp deep-links:** each service carries a `whatsappMsg`; buttons open `wa.me` with a prefilled message (soi pattern).
- **Contact form:** lean form on `/contact` (and optionally per-treatment) posting to a single API route that emails the clinic. Needs an email provider decision (e.g. Resend) and the clinic's destination address — flagged for when we build it.

---

## 7. Phased build

**Phase 0 — Scaffold & design system**
Bootstrap Next.js 16 + Tailwind v4 in `eden-elle-website`. Translate `design-system/` into `globals.css` tokens (palette, Cormorant Garamond + Jost via `next/font`, spacing/type scale) and a small primitive library (`Button`, `Label`, `Card`, form inputs, `SectionHeading`, logo wordmark) matching the system exactly. Base layout: Navbar (sticky blurred), Footer (dark), SiteShell, Lenis provider. Rebuild the `Clinic Home.dc.html` homepage from these primitives as the first real page.

**Phase 1 — Data model & placeholder content**
Port `Treatment`/`Category`/`Branch` types. Create 3–5 placeholder categories with a few services each, 1–2 placeholder branches, placeholder imagery.

**Phase 2 — Public pages**
Home, treatments index, category pages, treatment detail pages, locations, contact, about. WhatsApp deep-links wired.

**Phase 3 — Catalog / tablet mode**
Build the presentation/slideshow experience described above.

**Phase 4 — Contact form backend**
API route + email provider + form validation.

**Phase 5 — Polish & verify**
Animations, responsive/tablet QA, metadata/SEO per page, Playwright smoke tests, Lighthouse pass. Then deploy to Vercel.

---

## 8. Professionalization roadmap

These items are the next quality bar after the base routes, data model, and initial GSAP motion are in place. The goal is to move from "working website" to "real luxury clinic presence."

### 8.1 Visual asset system

The current branded placeholders should be replaced or supplemented with a deliberate visual direction.

- **Clinic/editorial imagery:** clinic interiors, treatment rooms, skin closeups, calm model portraits, staff/doctor portraits, product textures, and branch/location photography.
- **Temporary asset strategy:** use high-quality generated or curated placeholder assets until real clinic photos are available, so the site does not feel unfinished during review.
- **Reusable image model:** each treatment, category, branch, and homepage editorial section should reference typed image metadata (`src`, `alt`, optional `caption`, optional `focalPoint`).
- **Visual consistency:** warm monochrome grading, soft natural light, tactile textures, and no generic spa stock imagery that feels disconnected from the brand.

### 8.2 Homepage editorial upgrade

The homepage should evolve beyond the mockup translation into a more editorial, brand-led experience.

- **Hero:** stronger first viewport with layered image composition, refined image reveal, and a clear immediate brand signal.
- **Philosophy section:** large serif quote, asymmetric layout, and supporting copy that explains the clinic's care philosophy.
- **Signature treatments:** cards should feel more like luxury editorial/product features than plain service cards.
- **Why Elle:** add three refined proof points such as doctor-guided care, vegan/ethical protocols, and consultation-first treatment planning.
- **Homepage rhythm:** tune spacing so the page alternates calm, image-led sections with dense information moments.

### 8.3 Treatment detail page upgrade

Treatment detail pages should become conversion-ready and confidence-building.

- **Sticky booking sidebar:** price, duration, branch availability, WhatsApp action, and consultation CTA.
- **Treatment timeline:** consultation, preparation, treatment, recovery/aftercare, expected results.
- **Concern badges:** what the treatment helps with, ideal candidates, contraindication notes where appropriate.
- **Before/after area:** designed placeholder section ready for compliant before/after content when available.
- **FAQ accordion:** per-treatment FAQs from typed data.
- **Related treatments:** recommend adjacent services in the same category.
- **Practitioner note:** doctor/esthetician recommendation block for authority and reassurance.

### 8.4 Tablet catalog centerpiece upgrade

The catalog should become the most impressive in-clinic surface.

- **Full-screen service slides:** category selection leads to swipeable/tappable service presentations with large imagery, name, tagline, price, and benefits.
- **Animated detail overlay:** tap a service for deeper details without leaving presentation flow.
- **Navigation:** touch gestures, keyboard arrows, visible progress indicator, and large staff-friendly controls.
- **Idle mode:** optional auto-advance slideshow for tablet display between consultations.
- **GSAP transitions:** refined category-to-service and service-to-detail motion, with restraint and no flashy gimmicks.
- **One source of truth:** continue reusing `data/*.ts` so public pages and tablet mode never drift.

### 8.5 Premium microinteractions

Small details should make the interface feel expensive and deliberate.

- **Buttons:** subtle magnetic or lift hover on primary actions; restrained pressed state.
- **Navigation:** active route states, smooth underline hovers, and refined mobile menu behavior.
- **Cards:** image scale, text lift, border/champagne hairline shift, and staggered reveals.
- **Images:** reveal masks, gentle parallax, and focal-point-aware framing.
- **Route transitions:** subtle page-enter motion for App Router navigation.
- **Forms:** focus states, validation states, and success/error feedback that match the design system.

### 8.6 Responsive typography and spacing pass

Luxury sites depend on deliberate spacing, especially across tablet and mobile.

- **Breakpoint tuning:** desktop, tablet, and mobile should each have intentional type sizes, section padding, and card density.
- **Header:** ensure the sticky header never feels cramped and has a polished mobile/tablet treatment.
- **Catalog:** tablet landscape and portrait modes need dedicated spacing and touch target checks.
- **No overlap:** verify long treatment names, prices, buttons, and branch details do not collide at any viewport.
- **Editorial hierarchy:** avoid oversized headings inside compact panels; reserve hero-scale type for true hero moments.

### 8.7 Trust and conversion signals

The site should make clients feel safe, informed, and ready to book.

- **Trust blocks:** doctor-led care, certified/ethical products, vegan protocols, safety-first planning, and aftercare guidance.
- **Client journey:** simple steps from consultation to treatment to aftercare.
- **Branch confidence:** clinic contact cards, hours, map links, and location-specific booking prompts.
- **Testimonials:** design a section ready for client reviews when approved copy is available.
- **Medical/aesthetic care tone:** avoid overpromising; keep benefits polished, calm, and responsible.

### 8.8 Recommended implementation order

1. Add real or generated visual assets and wire typed image metadata.
2. Upgrade the homepage editorial rhythm and trust/proof sections.
3. Enrich treatment detail pages with sticky booking, timeline, FAQs, and related treatments.
4. Expand the tablet catalog into full-screen slides and detail overlays.
5. Run a dedicated responsive typography/spacing pass.
6. Add Playwright visual smoke checks for home, treatment detail, contact, and catalog tablet viewports.

---

## 9. Open items to confirm before/during build

1. **Products vs. services** — the design system includes product cards ("ADD TO BAG"), a "PRODUCTS" nav item, and shop pricing, but your brief is services-only for launch. Confirm we drop the shop/product surfaces for now (keeping the treatment-card variant), or keep a lightweight products section.
2. **Contact form email** — which provider (Resend, etc.) and destination address.
3. **Real categories/services** — the actual service menu to model placeholders around.
4. **Branches** — the mockup shows Iloilo (flagship) + Boracay (exclusive). Confirm final locations and details.
5. **Language** — English only (like soi)? Any localization needed.
6. **Logo asset** — the system uses a reversed-É wordmark; confirm whether a real logo file will replace it.
```
