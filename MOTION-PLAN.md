# Making Elle De Marrer feel alive — motion & interactivity plan

## What I found in the scan

The site is architecturally strong: clean Next.js 16 App Router, a coherent warm-monochrome design system (Cormorant + Jost), Lenis smooth scroll, and GSAP scroll reveals already wired in `components/motion-layer.tsx`. Nothing is broken.

What makes it feel a little cool and static today:

- **Motion is one-note.** Almost everything is the same "fade-up + blur-in on scroll." There's no hover life, no navigation feedback, no continuous ambient movement.
- **Every image is a flat CSS gradient placeholder** (`ImagePanel`). They sit completely still, so large parts of each page read as dead grey space.
- **The header is inert** — no active-page indicator, no scroll behaviour, and on mobile it just stacks with no menu.
- **Buttons, links and cards** have only a minimal hover (a 1px lift), so interactions feel flat rather than responsive.

Per your direction, this plan focuses on **motion and interactivity** (not imagery sourcing, copy, or palette changes).

## The plan (all additive, all respecting `prefers-reduced-motion`)

1. **Living image panels** — give the placeholder panels a slow "breathing" gradient drift plus a soft sheen sweep so they feel warm and alive instead of dead grey. Biggest bang-for-buck while real photos don't exist yet.

2. **Magnetic, tactile buttons** — primary CTAs subtly pull toward the cursor and get a light-sweep sheen on hover, with a crisp pressed state. Text links grow their champagne underline and nudge their arrow.

3. **Living header** — hides on scroll-down, glides back on scroll-up, condenses once you leave the top of the page, shows an animated active-route indicator, and gets a real animated mobile menu.

4. **Richer scroll choreography** — word-by-word reveal on the philosophy quote and major headings, an underline that draws itself under section eyebrows, and enhanced hero/image parallax with gentle scale.

5. **Cards that respond** — a cursor-following champagne "spotlight" glow plus refined image scale and lift on treatment and location cards.

6. **A trust marquee** — a slow, continuously scrolling band of the clinic's values ("Doctor-guided · Vegan protocols · Aftercare-first…") that adds constant, calm movement.

7. **Subtle route transitions** — a soft page-enter fade so moving between pages feels intentional rather than a hard cut.

## Guardrails

Everything degrades to fully static under `prefers-reduced-motion: reduce`, stays within the existing champagne/ink/paper design tokens, and is layered on top of the current components so nothing existing breaks. Motion is kept restrained — this reads as an expensive, calm clinic, not a flashy landing page.
