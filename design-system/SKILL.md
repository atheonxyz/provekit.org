---
name: provekit-design
description: Use this skill to generate well-branded interfaces and assets for Provekit, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- `README.md` — content, voice, visual foundations, iconography.
- `colors_and_type.css` — token CSS variables (`--pk-brand`, `--pk-ink`, `--pk-font-serif`, etc).
- `assets/` — wordmark, geometric brand shapes (hexagon / octagon / star / diamond), grain texture.
- `ui_kits/landing/` — high-fidelity React JSX recreation of the marketing site, including a `Bloom` composition primitive.
- `preview/` — small per-token review cards (colors, type, components, brand).

## Brand at a glance

- All chrome / labels / buttons: **Geist Mono ALL CAPS**, `+0.02em` tracking.
- Headlines: **Cormorant Garamond Medium 72/80**, `-0.02em`. Outfit Medium is the secondary headline.
- Body: **Outfit Regular 24/32**, mute grey `#949494`.
- Action color: `#0D74FF`. Borders are everywhere, `#D1F5FF`. Square corners, no shadows.
- Decoration: blurred pastel blooms behind crisp outlined geometric shapes.
- No emoji, no rounded corners on buttons, no gradients on chrome.
