# ProveKit Landing — Design Spec

**Status:** approved for planning
**Date:** 2026-05-10
**Author:** brainstormed with @adityabisht64
**Supersedes:** the Figma Make export at `Provekit Landing.html`

---

## 1. Goal

Replace the current 10MB Figma Make export of `provekit.org` with a real, maintainable, industry-standard static landing page. Match the existing design's information architecture, feel, and design tokens. Improve weaknesses (responsive behavior, accessibility, copy errors). Ship < 5 KB JS, deployable to Cloudflare Pages.

## 2. Why a rebuild

The existing `Provekit Landing.html` is not source code:

- Body is `<div id="app"></div>`; the page is assembled at runtime by a Figma Make / Anima JS bundle.
- 10 MB total = base64 fonts (3.7 MB + 3.3 MB Cyrillic/Vietnamese subsets we don't need) + the bundler.
- Hand-written assets are limited to `colors_and_type.css` (the design tokens) and the visual design itself.

There is no incremental "clean it up" path. The right move is to rebuild on a real stack while preserving the design system already encoded in `colors_and_type.css`.

## 3. Stack

- **Astro 4.x** — static output, zero JS by default, MDX-ready if docs come later.
- **Tailwind CSS v4** — `@theme` directive maps `colors_and_type.css` tokens to utility classes.
- **TypeScript strict** — `noUncheckedIndexedAccess: true`.
- **pnpm** — faster, deterministic installs.
- **Self-hosted fonts via `@fontsource`** — Outfit (400/500/600) + Geist Mono (400), latin only, woff2, preloaded.
- **No React, no client framework.** Two tiny vanilla scripts (~5 KB total): viewport-entry fade-up, copy-to-clipboard for the install snippet. Both gated on `prefers-reduced-motion` where relevant.

## 4. Project structure

```
provekit-org/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .nvmrc                       # 22
├── .editorconfig
├── .gitignore
├── .prettierrc
├── .eslintrc.cjs
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── src/
│   ├── pages/
│   │   └── index.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── nav/TopBar.astro
│   │   ├── hero/Hero.astro
│   │   ├── install/InstallScript.astro
│   │   ├── features/FeatureGrid.astro
│   │   ├── features/FeatureCard.astro
│   │   ├── credits/EngineeringCredit.astro
│   │   ├── benchmarks/Benchmarks.astro
│   │   ├── benchmarks/BenchmarkChart.astro
│   │   ├── faq/Faq.astro
│   │   ├── faq/FaqItem.astro
│   │   └── footer/SiteFooter.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   ├── content/
│   │   └── faq.ts
│   └── scripts/
│       ├── reveal.ts             # IntersectionObserver fade-up
│       └── copy.ts               # navigator.clipboard helper
├── reference/
│   ├── Provekit Landing.html     # original Figma export (preserved)
│   └── colors_and_type.css       # original token sheet (preserved)
├── docs/superpowers/specs/
│   └── 2026-05-10-provekit-landing-design.md
├── TODO_LINKS.md
├── LICENSE                       # MIT
├── CONTRIBUTING.md
└── README.md
```

Each component has one purpose, no shared state, props-only inputs. Component file size cap: ~150 lines. If a component grows past that, split it.

## 5. Information architecture

Single-page sections, in order:

1. **TopBar** — `PROVEKIT` wordmark left, `DOCS` pill right.
2. **Hero** — eyebrow `INTRODUCING PROVEKIT`, two-line display headline (_Client-side zero-knowledge, built for the real world._), one-paragraph sub, CTAs `VISIT REPO` / `EXPLORE DOCS`, soft bloom field bottom-right.
3. **InstallScript** — `INSTALL SCRIPT` eyebrow, headline + sub, `READ GUIDE` CTA, code block `cargo install provekit-cli` with copy button.
4. **Core features** — `CORE FEATURES` eyebrow, three numbered cards: Modularity, Mobile Friendly, Light Weight. Each card carries a CSS-only bloom in a different palette (cyan / orange / pink) plus a small SVG glyph.
5. **Engineering credit** — `BUILT FOR PERFORMANCE AND PRIVACY` eyebrow, headline _Engineered by some of the best technical brains._, three logos (`world` · `atheon` · `reilabs`), `VISIT GITHUB` CTA, hex/polygon SVG artwork on the right.
6. **Benchmarks** — `BENCHMARKS` eyebrow, headline, three numbered metric paragraphs (proving time / memory / verification cost), SVG bar chart with `+36% Faster` / `+24% Lighter` callouts, `ALL BENCHMARKS` CTA.
7. **FAQ** — six questions answered with real ZK-toolkit copy (see content section), implemented as native `<details>` / `<summary>`.
8. **Footer** — two link columns (product: DOCS · GUIDE · BENCHMARKS / community: TELEGRAM · TWITTER · GITHUB), copyright strip, contact mailto.

## 6. Content

**Hero copy** (verbatim from Figma, kept):

> Client-side zero-knowledge, built for the real world.
> Provekit is a lightweight, modular ZK toolkit designed from the ground up for client-side execution.

**Feature copy** (lightly tightened from Figma):

- **Modularity** — Cleanly separates proving, verification, and compilation into independent components — easy to customize and extend.
- **Mobile Friendly** — Designed for client-side proving. Generates zero-knowledge proofs directly on a user's device, without heavy server infrastructure.
- **Light Weight** — Built in Rust with optimized field arithmetic. Provekit keeps resource usage minimal so it runs efficiently even on constrained hardware.

**Benchmark callouts** (verbatim): `+36% Faster`, `+24% Lighter`.

**FAQ** (rewritten — the Figma copy was lorem-ipsum that mis-described ProveKit as a JS assertion library):

1. _What exactly is Provekit?_ — A lightweight, modular zero-knowledge proving toolkit written in Rust. It is designed for client-side execution, so proofs can be generated directly on a user's device — including mobile — without heavy server infrastructure.
2. _Does it work in the browser?_ — Yes. Provekit compiles to WebAssembly and runs in modern browsers, with a footprint small enough to ship in production web apps.
3. _What ZK proof system does it use?_ — Provekit uses a SNARK backend optimized for client-side proving and on-chain verification. See the docs for current scheme details and roadmap.
4. _How does it compare to other ZK toolkits?_ — On commodity hardware, Provekit generates proofs ~36% faster than comparable client-side toolkits and uses ~24% less memory. See the benchmarks page for full methodology.
5. _Is it production-ready?_ — Provekit is actively developed by World, Atheon, and Reilabs and is being used in production-track integrations. Treat the latest release notes and benchmarks as the source of truth.
6. _Where can I get help?_ — Open an issue on GitHub or join the Telegram listed in the footer.

All FAQ content lives in `src/content/faq.ts` as data, not JSX, so it's easy to edit without touching templates.

## 7. Visual treatment

**Design tokens** are migrated from `colors_and_type.css` into `src/styles/tokens.css` with one correction: `--pk-mute` (#949494) on `--pk-canvas` is ~3.6:1 contrast, below WCAG AA for body text. Darken to `#6E6E6E` (~5.0:1) for any body-copy use; keep the original `#949494` only for visual-decoration text (e.g., metric labels not used as primary content).

**Bloom illustrations** — pure CSS, layered radial gradients with `filter: blur(36px) saturate(1.05)`. Three variants matching the existing token palette: cyan, orange, pink. SVG glyphs (~300 B each) sit crisply on top.

**Hex/polygon artwork** (engineering credit) — hand-authored SVG, ~3 KB, with subtle radial gradient fills. Slow rotate on hover only; no idle motion.

**Benchmark chart** — hand-authored SVG. Real `<text>` for numbers (selectable, indexable). Bar fills use `--pk-toolkit-1/2/3`. Optional one-shot fade-and-grow on viewport intersection.

**Motion** — restrained:

- Hero bloom: 15-second `transform` drift loop, paused under `prefers-reduced-motion: reduce`.
- Section eyebrows + headlines: 8px fade-up on viewport entry. One shared `IntersectionObserver`, registered once per page.
- FAQ open/close: native `<details>` animation.
- All easing uses the existing token `--pk-easing: cubic-bezier(0.2, 0.8, 0.2, 1)`.

## 8. Responsive strategy

Breakpoints: mobile `<640`, tablet `640–1024`, desktop `≥1024`.

- Site gutter: `clamp(20px, 6vw, 160px)` (replaces the hardcoded 160px token for layout).
- Hero: two-column desktop → stacked under 1024.
- Feature grid: 3 col → 1 col under 768.
- Engineering credit: copy left / artwork right desktop → stacked under 1024.
- Benchmark chart: horizontal bars desktop → vertical bars under 640.
- TopBar collapses padding under 640; no hamburger needed (only one link).

## 9. Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<section>` (each with `aria-labelledby`), `<footer>`.
- Skip-to-content link as the first focusable element.
- All interactive controls keyboard-reachable; visible focus rings using brand blue at 3:1 contrast against canvas.
- `prefers-reduced-motion: reduce` honored on every animation.
- FAQ: `<details>`/`<summary>` gives `aria-expanded` for free.
- Color contrast validated against WCAG AA for every text/background pairing.
- Images: meaningful `alt`; decorative blooms marked `aria-hidden="true"`.

## 10. Performance budget

| Asset                     | Budget           |
| ------------------------- | ---------------- |
| HTML (uncompressed)       | < 30 KB          |
| CSS (Tailwind purged)     | < 25 KB          |
| JS shipped                | < 5 KB           |
| Fonts (woff2, latin only) | < 90 KB combined |
| Critical-path images      | 0 raster         |

Targets: LCP < 1.0s on fast-3G; Lighthouse Performance ≥ 98, Accessibility = 100, Best Practices = 100, SEO = 100. CI fails if any drops.

## 11. SEO & metadata

- `<title>`, `<meta description>` set per page.
- Open Graph + Twitter card tags, with a generated 1200×630 OG image (`public/og-image.png`).
- `application/ld+json` `SoftwareApplication` schema referencing the GitHub repo and license.
- `sitemap.xml` via `@astrojs/sitemap`.
- `robots.txt` allowing all.
- Canonical URL set explicitly.

## 12. Tooling & CI

- ESLint (`eslint-plugin-astro`) + Prettier (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`).
- `astro check` runs in CI.
- GitHub Actions: install → lint → typecheck → build → Lighthouse CI.
- Cloudflare Pages: connect repo, framework preset = Astro, build = `pnpm build`, output = `dist/`. Preview deploys per PR.
- Conventional Commits enforced via commitlint hook (per global user preference).

## 13. Placeholder URLs

Every external link (`VISIT REPO`, `EXPLORE DOCS`, `READ GUIDE`, `VISIT GITHUB`, `ALL BENCHMARKS`, footer DOCS / GUIDE / BENCHMARKS / TELEGRAM / TWITTER / GITHUB, contact mailto) starts as `href="#"`. `TODO_LINKS.md` at repo root lists each one with `file:line` reference and a one-line description so a maintainer can replace them in a single pass.

## 14. Out of scope

- Docs site (separate project if requested later).
- Blog (separate project if requested later).
- Interactive proof playground / WASM demo (separate project — would justify a React island then).
- Internationalization (single-locale launch).
- Dark mode (the design is light-only; deferred unless requested).

## 15. Acceptance criteria

The rebuild is done when:

1. `pnpm build` produces a static `dist/` deployable to Cloudflare Pages.
2. Lighthouse on the production build hits ≥ 98 / 100 / 100 / 100.
3. JS shipped is < 5 KB; no critical-path raster images.
4. All sections from §5 are present, responsive across the three breakpoints, and visually faithful to the Figma render at desktop width.
5. WCAG AA contrast holds for every text/background pairing.
6. `TODO_LINKS.md` exists and enumerates every placeholder URL.
7. Original `Provekit Landing.html` and `colors_and_type.css` are preserved under `reference/`.
8. `astro check`, ESLint, and Prettier pass with zero warnings.
9. README documents local dev, build, deploy, and link-replacement workflow.

## 16. Risks & mitigations

- **Risk:** Figma bloom illustrations are subtler than CSS gradients can capture exactly.
  **Mitigation:** if a side-by-side fails review, fall back to extracting the specific PNGs from the Figma bundle for those three cards (still bounded — ~50 KB extra).
- **Risk:** Benchmark numbers (`+36%`, `+24%`) are presented in the design but methodology isn't on-page.
  **Mitigation:** link `ALL BENCHMARKS` to a placeholder anchor; the future docs/benchmarks page owns the methodology.
- **Risk:** Logo treatments for `world` / `atheon` / `reilabs` are textual in the Figma — real SVG logos may be required for visual parity.
  **Mitigation:** ship with the Figma's text treatment; flag in `TODO_LINKS.md` to swap to real SVGs when provided.
