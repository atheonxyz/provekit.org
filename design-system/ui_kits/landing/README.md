# Landing UI kit

High-fidelity recreation of the Provekit marketing landing page (`v1.2` from the Figma).

## Files

- `index.html` — full landing scrolled top-to-bottom, 1600px content width.
- `Header.jsx` — fixed top nav: wordmark left, `DOCS →` + menu right.
- `Hero.jsx` — `INTRODUCING PROVEKIT` panel: serif headline + sub-deck + two CTAs.
- `InstallSection.jsx` — `INSTALL SCRIPT` panel with the BASH code block.
- `FeatureCards.jsx` — three numbered feature cards (Modularity / Mobile-friendly / Light-weight) with bloom + geometric shape.
- `PartnersSection.jsx` — `BUILT FOR PERFORMANCE AND PRIVACY` panel with partner wordmarks.
- `BenchmarkSection.jsx` — split BENCHMARKS panel with bullet list left, comparison chart right, two stat tiles below.
- `FaqSection.jsx` — FREQUENTLY ASKED QUESTIONS panel with accordion rows + CONTACT US footer.
- `Footer.jsx` — chip nav + giant `PROVEKIT` wordmark.
- `Bloom.jsx` — reusable pastel-bloom composition (blurred discs + geometric shape).

## Notes

- All buttons use square corners. There are zero box-shadows in the design.
- Section tabs are 47px tall, sit flush with the panel's top-left corner.
- Page is full-bleed; content is constrained to 1600px wide with 160px left/right gutter on a 1920px viewport. Below 1600 it scales down.
