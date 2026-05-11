# Provekit Design System

Provekit is a lightweight, modular **zero-knowledge (ZK) toolkit** designed from the ground up for client-side execution. It is built in Rust with optimised field arithmetic, focused on generating ZK proofs directly on a user's device — without heavy server infrastructure.

The brand combines **technical, almost diagrammatic precision** (mono type, dashed construction lines, geometric outlines) with **soft, luminous pastel blooms** that give the otherwise wireframe-y compositions a sense of dimension and energy.

## Source materials

- **Figma:** "Provekit Landing.fig" — single page, single frame `/Page-1/v1.2` (1920 × 6273). Mounted as a virtual filesystem during creation; not assumed accessible to readers.
- **Wordmark:** `uploads/Provekit Wordmark.svg` (lifted into `assets/wordmark-original.svg`).
- **Brand graphics:** the Figma uses centred geometric forms (hexagonal flower, nested octagon-diamond, interlocking star, layered diamond) over diffused radial pastel glows. Crisp outlined geometry sits over blurred luminous backgrounds, so each shape feels like it is emitting light.

## Products represented

Only one product surface was provided: a **marketing landing page** for Provekit (`v1.2`). It contains the full brand: hero, install script, core features, partners section ("Engineered by some of the best technical brains" — featuring world / atheon / reilabs), benchmark comparison, FAQ and footer with the giant `PROVEKIT` wordmark.

There is no mobile/app product, no docs site, and no second product surface in the supplied materials.

---

## Index

Root files:

- `README.md` — this file.
- `SKILL.md` — Agent Skill manifest (cross-compatible with Claude Code).
- `colors_and_type.css` — design tokens (CSS variables) for colours, type, semantic styles.
- `assets/` — logos, geometric shapes, grain texture.
- `fonts/` — local copy of webfonts (loaded via Google Fonts in `colors_and_type.css`).
- `preview/` — design-system review cards rendered to the Design System tab.
- `ui_kits/landing/` — high-fidelity recreation of the Provekit landing page.

## Content fundamentals

Provekit's voice is **technical, restrained, and quietly confident**. The page leads with a precise claim and backs it up with engineering-flavoured detail — never marketing fluff.

- **Casing.** All chrome, badges, buttons and category labels are **ALL CAPS in Geist Mono** with `letter-spacing: 0.02em` (e.g. `INTRODUCING PROVEKIT`, `INSTALL SCRIPT`, `CORE FEATURES`, `READ GUIDE`, `VISIT GITHUB`, `BENCHMARKS`, `DOCS`, `TELEGRAM`, `GITHUB`). Headlines are **sentence case** in a serif (Cormorant Garamond) or geometric sans (Outfit). Body copy is sentence case.
- **Pronouns.** No "we" or "I". The product is referred to in the third person ("Provekit is…", "Designed for client-side proving"). When the reader is addressed, it's a soft "your" ("optimize your strategies", "all your questions").
- **Tone words.** _Lightweight, modular, client-side, optimized, minimal, efficient, constrained hardware, real world._ It reads like an engineering README, not a sales page.
- **Headline rhythm.** Two-line serif headlines paired with a one-sentence sans-serif sub-deck in muted grey:
  - _"Client-side zero-knowledge, built for the real world"_ → "Provekit is a lightweight, modular ZK toolkit designed from the ground up for client-side execution."
  - _"To install Provekit run this simple install script"_ → "Discover Provekit! Check out our comprehensive guide for a seamless introduction and installation."
  - _"Engineered by some of the best technical brains"_
  - _"A client-side ZK toolkit that excels in every aspect"_
  - _"Comprehensive list of answers to all your questions"_
- **Microcopy.** Buttons are 1–2 words, mono, all-caps: `DOCS`, `READ GUIDE`, `VISIT REPO {}`, `EXPLORE DOCS`, `VISIT GITHUB`, `ALL BENCHMARKS`, `CONTACT US`. Section badges sit in the top-left of each panel: `INTRODUCING PROVEKIT`, `INSTALL SCRIPT`, `CORE FEATURES`, `BUILT FOR PERFORMANCE AND PRIVACY`, `BENCHMARKS`, `FREQUENTLY ASKED QUESTIONS`.
- **No emoji.** None in the source. Don't introduce them.
- **No exclamation points** in headlines or body. One slipped into the install copy ("Discover Provekit!") but it's not a brand pattern — avoid.
- **Vibe.** Precision instrument with a soft glow. Lab notebook meets mood ring.

## Visual foundations

### Palette

Two accents over a clinical white. The blue is the action colour; the pastel cyan is the structural colour (borders, faint section dividers).

| Token              | Hex                               | Use                                        |
| ------------------ | --------------------------------- | ------------------------------------------ |
| `--ink`            | `#2D2D2B`                         | All headlines, button labels, primary text |
| `--ink-alt`        | `#2D2D30`                         | FAQ question text (a hair cooler)          |
| `--canvas`         | `#F8FEFF`                         | Page background                            |
| `--surface`        | `#FFFFFF`                         | Panel / card background                    |
| `--surface-tinted` | `rgba(190,225,255,0.04)`          | The 80px spacer strips between panels      |
| `--line`           | `#D1F5FF`                         | All borders + dividers, 1–2 px             |
| `--line-soft`      | `#EEF7FF`                         | Dashed construction marks, hairlines       |
| `--brand`          | `#0D74FF`                         | Primary action / accent fill               |
| `--brand-ink`      | `#A2D0FC`                         | Wordmark / large display fills             |
| `--mute`           | `#949494`                         | Sub-deck copy (also `#808080`, `#B7B7B7`)  |
| `--bloom-cyan`     | `#A2D0FC` / `rgba(0,190,255,0.9)` | Feature icon halo                          |
| `--bloom-orange`   | `#FDCC91` / `#FFE5C6`             | Pastel bloom                               |
| `--bloom-pink`     | `#FF9AA0` / `#FFDEE7`             | Pastel bloom                               |
| `--bloom-magenta`  | `#DE00FF` / `#7B00FF`             | Hot accents in the modularity icon         |
| `--toolkit-1`      | `#DE00FF`                         | Benchmark bar 1                            |
| `--toolkit-2`      | `#E91900`                         | Benchmark bar 2                            |
| `--toolkit-3`      | `#0D74FF`                         | Benchmark bar 3 (Provekit)                 |

### Typography

- **Display.** _Outfit Medium_ — 72 / 80, letter-spacing -0.02em. Used for the main hero and section headlines.
- **Display sans.** _Outfit Medium / Light_ — 72, 48, 28. Outfit Light 48 is the benchmark stat (`+36% Faster`).
- **Body.** _Outfit Regular_ — 24/32 for sub-decks; _Outfit Medium 28_ for FAQ questions.
- **Mono / chrome.** _Geist Mono Regular_ — 24, 1.0 line-height, letter-spacing +0.02em. Every badge, button label, code block, and footer link.
- **Specialty.** _Host Grotesk Medium_ — used once at 36px on the "atheon" partner lockup. Treat as one-off.

Type rules:

- Headlines never appear in mono.
- Buttons and category badges never appear in serif or sans.
- Sub-decks are always Outfit Regular 24, colour `--mute`.
- Numbers in feature cards (`1`, `2`, `3`) are Geist Mono 24 in their own square cell.

### Layout system

- 1600px content width, 160px page gutters in a 1920 viewport. Two faint 1-px verticals at `x=158` and `x=1760` mark this gutter.
- Sections are **stacked panels** with a 1-px `--line` border on every side. Between panels sits an 80-px translucent strip (`--surface-tinted`) — the only "air" the layout uses.
- Each panel has a top-left **category tab**: a small bordered rectangle holding the mono ALL-CAPS label, sticking up from the panel's interior so it reads like a folder tab.
- Inside a panel, content uses 48–72 px padding. Headlines anchor to the top-left of the inner rectangle, sub-decks sit 16 px below, primary CTAs sit ~48 px below the sub-deck.
- The header is a fixed 76-px bar with the same `--line` border treatment, full-width, white.
- The footer carries a giant `PROVEKIT` wordmark in `--brand-ink` (#A2D0FC) — full-bleed, partially clipped at the bottom.

### Background & motifs

- **Hero background.** White with a faint pastel grain (`assets/grain-texture.png`, opacity 0.2, `mix-blend-mode: overlay`). Two diagonal **wireframe diamonds** with dashed construction marks and small filled circles at vertex points overlay the corners — they read as schematic / circuit-board diagrams.
- **Geometric icons.** Each "core feature" card centres a stacked geometric form (hexagonal flower, nested octagon, interlocking star) on a flat pastel disc. The geometry is white-stroked, the disc is one solid colour, no gradient.
- **Pastel blooms.** Whenever a section needs a "decorative side", it gets ~5 stretched ellipses in pastel cyan/orange/pink/yellow with extreme blur (`filter: blur(60–120px)`), grouped behind a centred crisp geometric form. Set `mix-blend-mode: overlay` and overlay the same grain texture at 20%.
- **Construction lines.** Long dashed cyan lines, `1–2 px`, with small filled discs at intersections — used in the hero and footer. Never decorative-only; they always meet at vertices.

### Borders, radii, shadows

- **Borders are everywhere.** 1 px `--line` between every adjacent surface; the design's structure comes almost entirely from borders, not shadows.
- **No box-shadows.** The design ships with zero drop-shadows. All depth comes from coloured fills + blur on background blooms.
- **Corner radius.** _Almost zero._ Buttons, panels, badges, code blocks — all are perfectly rectangular. The only round shapes are the bloom discs, the icon discs, and the construction-marker dots. **Never round corners on buttons or cards.**
- **Code-block frame.** Inset frame: outer container has `--line` border, inner has its own `--line` border, "BASH" label sits inside the inner frame, copy icon sits in its own bordered square cell to the right.
- **No transparency on chrome.** All panels are opaque white.

### Components — buttons

- **Primary.** `background: --brand (#0D74FF)`; label `Geist Mono 24 #FFFFFF`; padding `8px 16px`; right-side 24×24 icon (arrow / external-link). Square corners. No hover shadow.
- **Secondary.** `background: #F1F1F1`; label `Geist Mono 24 #2D2D2B`; same shape; right-side icon `#2D2D2B`. Used for `VISIT REPO`.
- **Ghost / nav tab.** No fill, 1-px border `--line`, label `Geist Mono 24 #2D2D2B`. Used for footer chips (`DOCS`, `GUIDE`, `BENCHMARKS`, `TELEGRAM`, `TWITTER`, `GITHUB`) and toolkit-name chips next to the benchmark chart.
- **Hover/press states.** Not visible in the static design. Suggested rules: hover → `--brand` shifts to `#0A66E0`; secondary → `#E8E8E8`. No size shift, no shadow.

### Iconography

See ICONOGRAPHY below.

### Animation

The Figma is static, so animation is inferred from the geometric/circuit-board language:

- **Easing.** Default `cubic-bezier(0.2, 0.8, 0.2, 1)` (gentle, technical). Avoid bounce.
- **Entrances.** Construction-line vibe: dashes draw in left→right; circles fade in at vertices last. Geometric icons rotate slowly (8–12s linear loop) like an engineering diagram waking up.
- **Blooms.** Slow scale 1 → 1.05 → 1 over 6s, opacity 0.85 → 1.
- **Hover.** Buttons fade label opacity; never transform-scale.

---

## Iconography

Provekit is **icon-light**. There is no consistent icon library in the design — almost all "iconography" is either:

1. **Geometric brand shapes** (hexagonal flower, octagon, star, diamond) used as feature illustrations. These are stored in `assets/shape-*.svg`.
2. **Tiny utility glyphs** drawn ad hoc:
   - `→` arrow on every primary button
   - `{ }` curly-brace pair on `VISIT REPO`
   - `📋` copy-pages glyph on the install code block
   - `☰` hamburger in the header
   - `+` toggle on FAQ rows
   - Small filled discs `●` at construction-line intersections
3. **Partner logos** ("world", "atheon", "reilabs") — third-party wordmarks rendered at ~36–48 px high.

There is **no built-in icon font, no Lucide / Heroicons usage, and no emoji** in the source. To stay on-brand without inventing new SVGs:

- For the small set above, draw inline 24×24 SVGs with `stroke: currentColor; stroke-width: 2; fill: none; stroke-linecap: square` — the Figma's lines are square-capped, not round.
- If you need additional UI icons (search, settings, copy, link), use **[Lucide](https://lucide.dev)** at 24×24, `stroke-width: 2`, `stroke-linecap: square` — flagged as a substitution since the brand has no icon set of its own.
- Never substitute emoji.
- Never substitute filled icons; this brand is line-only at chrome size.

Larger illustrative shapes (the geometric "feature" forms) live in `assets/shape-hexagon.svg`, `shape-octagon.svg`, `shape-star.svg`, `shape-diamond.svg`. Always use them on top of a flat-coloured circle (`--bloom-cyan` / `#FFB02E` orange / `#FF4F7B` pink), never on a gradient.

---

## Font substitution flag

All four typefaces — **Cormorant Garamond, Outfit, Geist Mono, Host Grotesk** — are loaded from Google Fonts via `colors_and_type.css`, which is the same source the Figma uses. No local TTFs were provided, and none are needed.

If you want self-hosted copies for offline use, please drop `.woff2` files into `fonts/` and I'll switch the `@import` over to `@font-face` rules.

---

## Asks

- Do you have a docs site or app surface to add as a second UI kit? Right now there is only the landing page.
- Are the partner wordmarks (`world`, `atheon`, `reilabs`) approved for use, or placeholders? They're rendered as text in the recreation.
- Confirm `#0D74FF` as the canonical brand blue (it appears 13× in the Figma, but no token sheet was supplied).
