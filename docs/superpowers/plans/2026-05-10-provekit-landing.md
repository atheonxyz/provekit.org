# ProveKit Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `provekit.org` as a real, deployable Astro static site that matches the Figma design, ships < 5 KB JS, and hits Lighthouse 98+/100/100/100.

**Architecture:** Astro 4 (static) + Tailwind v4 (CSS-first `@theme` config, no JS config file needed) + self-hosted fonts via `@fontsource`. Two tiny vanilla TS scripts handle reveal-on-scroll and copy-to-clipboard; everything else is server-rendered HTML.

**Tech Stack:** Astro 4 · Tailwind CSS v4 (via `@tailwindcss/vite`) · TypeScript strict · pnpm · Vitest · Playwright · Lighthouse CI · Cloudflare Pages.

**Spec:** [`docs/superpowers/specs/2026-05-10-provekit-landing-design.md`](../specs/2026-05-10-provekit-landing-design.md)

**Note on spec deviation:** The spec lists `tailwind.config.mjs`. Tailwind v4 with `@tailwindcss/vite` configures via the `@theme` CSS directive in `src/styles/tokens.css` and does not need a JS config file. We omit `tailwind.config.mjs`. All other spec details unchanged.

**License:** MIT (per spec default; user did not override).

---

## Phase 1 — Foundation

### Task 1: Preserve existing artifacts and initialize the repo

**Files:**
- Create: `reference/Provekit Landing.html` (move)
- Create: `reference/colors_and_type.css` (move)
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `LICENSE`

- [ ] **Step 1: Move the Figma export and tokens into `reference/`**

```bash
mkdir -p reference
mv "Provekit Landing.html" reference/
mv colors_and_type.css reference/
```

- [ ] **Step 2: Verify the reference files exist and the working directory is clean**

```bash
ls reference/ && ls
# Expect: reference/ contains both files; working dir top-level no longer has them.
```

- [ ] **Step 3: Initialize git**

```bash
git init -b main
```

- [ ] **Step 4: Write `.gitignore`**

```gitignore
node_modules
dist
.astro
.DS_Store
.env
.env.local
.env.*.local
.lighthouseci
playwright-report
test-results
.vitest-cache
*.log
```

- [ ] **Step 5: Write `.nvmrc`**

```
22
```

- [ ] **Step 6: Write `LICENSE` (MIT)**

```
MIT License

Copyright (c) 2026 ProveKit contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 7: Initial commit**

```bash
git add .gitignore .nvmrc LICENSE reference/ docs/
git commit -m "chore: initialize repo with preserved Figma reference and license"
```

---

### Task 2: Scaffold the Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Enable corepack so `pnpm` is available**

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm --version
# Expect: 9.x or newer
```

- [ ] **Step 2: Write `package.json`**

```json
{
  "name": "provekit-org",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint . --ext .astro,.ts,.tsx,.js,.mjs",
    "format": "prettier --write \"**/*.{astro,ts,tsx,js,mjs,css,md,json}\"",
    "format:check": "prettier --check \"**/*.{astro,ts,tsx,js,mjs,css,md,json}\"",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "lhci": "lhci autorun"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.2.1",
    "@fontsource/geist-mono": "^5.1.0",
    "@fontsource/outfit": "^5.1.0",
    "@tailwindcss/vite": "^4.0.0",
    "astro": "^4.16.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.4",
    "@lhci/cli": "^0.14.0",
    "@playwright/test": "^1.49.0",
    "@types/node": "^22.10.0",
    "eslint": "^9.16.0",
    "eslint-plugin-astro": "^1.3.1",
    "prettier": "^3.4.0",
    "prettier-plugin-astro": "^0.14.1",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "typescript": "^5.7.2",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 3: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://provekit.org',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "*.d.ts"],
  "exclude": ["dist", "node_modules", "reference"]
}
```

- [ ] **Step 5: Install dependencies**

```bash
pnpm install
# Expect: lockfile created, no errors.
```

- [ ] **Step 6: Verify the bare Astro project starts**

```bash
pnpm exec astro --version
# Expect: 4.x version printed.
```

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml astro.config.mjs tsconfig.json
git commit -m "feat: scaffold astro 4 + tailwind v4 + sitemap baseline"
```

---

### Task 3: Tooling — ESLint, Prettier, EditorConfig

**Files:**
- Create: `.editorconfig`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Create: `eslint.config.mjs`

- [ ] **Step 1: Write `.editorconfig`**

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 2: Write `.prettierrc.json`**

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    { "files": "*.astro", "options": { "parser": "astro" } }
  ]
}
```

- [ ] **Step 3: Write `.prettierignore`**

```
dist
node_modules
.astro
pnpm-lock.yaml
reference
```

- [ ] **Step 4: Write `eslint.config.mjs`**

```js
import eslintPluginAstro from 'eslint-plugin-astro';

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'reference/**'],
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
```

- [ ] **Step 5: Run linter and formatter to confirm config loads**

```bash
pnpm format:check || pnpm format
pnpm lint
# Expect: no errors. (Prettier may rewrite files on first run; that's fine.)
```

- [ ] **Step 6: Commit**

```bash
git add .editorconfig .prettierrc.json .prettierignore eslint.config.mjs
git commit -m "chore: add eslint, prettier, and editorconfig"
```

---

### Task 4: Design tokens migrated to Tailwind v4 `@theme`

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
/* Provekit design tokens — migrated from reference/colors_and_type.css.
 * Body-copy mute color darkened from #949494 to #6E6E6E to clear WCAG AA on canvas.
 */
@import 'tailwindcss';

@theme {
  /* Ink + surfaces */
  --color-ink: #2d2d2b;
  --color-ink-alt: #2d2d30;
  --color-mute: #6e6e6e;       /* contrast-safe body mute */
  --color-mute-soft: #949494;  /* decorative-only */
  --color-mute-2: #808080;
  --color-mute-3: #b7b7b7;

  --color-canvas: #f8feff;
  --color-surface: #ffffff;
  --color-surface-tint: rgb(190 225 255 / 0.04);

  --color-line: #d1f5ff;
  --color-line-soft: #eef7ff;
  --color-line-mid: #bceeff;

  /* Brand + accents */
  --color-brand: #0d74ff;
  --color-brand-hover: #0a66e0;
  --color-brand-ink: #a2d0fc;

  /* Pastel blooms */
  --color-bloom-cyan: #a2d0fc;
  --color-bloom-cyan-hot: rgb(0 190 255 / 0.9);
  --color-bloom-orange: #fdcc91;
  --color-bloom-orange-2: #ffe5c6;
  --color-bloom-pink: #ff9aa0;
  --color-bloom-pink-2: #ffdee7;
  --color-bloom-coral: #f9c7c0;
  --color-bloom-magenta: #de00ff;
  --color-bloom-purple: #7b00ff;
  --color-bloom-cyan-2: #00fff2;
  --color-bloom-red-hot: #ff7f7f;
  --color-bloom-orange-hot: #ffc57f;

  /* Toolkit / chart colours */
  --color-toolkit-1: #de00ff;
  --color-toolkit-2: #e91900;
  --color-toolkit-3: #0d74ff;

  /* Type */
  --font-sans: 'Outfit', system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, 'SF Mono', monospace;

  --text-display: 72px;
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 28px;
  --text-body: 24px;
  --text-mono: 24px;

  /* Motion */
  --ease-pk: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Layout */
  --gutter-min: 20px;
  --gutter-max: 160px;
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import './tokens.css';

@layer base {
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    background: var(--color-canvas);
    color: var(--color-ink);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  :focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  ::selection {
    background: var(--color-brand);
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  .pk-gutter {
    padding-inline: clamp(var(--gutter-min), 6vw, var(--gutter-max));
  }

  .pk-eyebrow {
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-mute);
  }

  .pk-display {
    font-size: clamp(40px, 6vw, var(--text-display));
    line-height: 1.05;
    letter-spacing: -0.02em;
    font-weight: 500;
    color: var(--color-ink);
  }

  .pk-h2 {
    font-size: clamp(28px, 4vw, var(--text-h2));
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-weight: 500;
  }

  .pk-h3 {
    font-size: var(--text-h3);
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 500;
  }

  .pk-body {
    font-size: clamp(16px, 1.4vw, 20px);
    line-height: 1.5;
    color: var(--color-mute);
  }

  .pk-mono {
    font-family: var(--font-mono);
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .pk-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 52px;
    padding: 0 20px;
    border: 0;
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 120ms var(--ease-pk), opacity 120ms var(--ease-pk);
  }
  .pk-btn--primary {
    background: var(--color-brand);
    color: #fff;
  }
  .pk-btn--primary:hover {
    background: var(--color-brand-hover);
  }
  .pk-btn--secondary {
    background: #f1f1f1;
    color: var(--color-ink);
  }
  .pk-btn--secondary:hover {
    background: #e8e8e8;
  }
  .pk-btn--ghost {
    background: transparent;
    color: var(--color-ink);
    border: 1px solid var(--color-line);
  }
  .pk-btn--ghost:hover {
    background: var(--color-line-soft);
  }

  .pk-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 36px;
    padding: 0 14px;
    border-radius: 9999px;
    background: #fff;
    border: 1px solid var(--color-line);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-ink);
  }

  .pk-bloom {
    position: absolute;
    inset: 0;
    pointer-events: none;
    filter: blur(36px) saturate(1.05);
    opacity: 0.85;
  }
  .pk-bloom--cyan {
    background:
      radial-gradient(closest-side at 30% 35%, var(--color-bloom-cyan), transparent 70%),
      radial-gradient(closest-side at 70% 65%, var(--color-bloom-cyan-hot), transparent 65%);
  }
  .pk-bloom--orange {
    background:
      radial-gradient(closest-side at 35% 40%, var(--color-bloom-orange), transparent 70%),
      radial-gradient(closest-side at 70% 60%, var(--color-bloom-orange-hot), transparent 65%);
  }
  .pk-bloom--pink {
    background:
      radial-gradient(closest-side at 30% 40%, var(--color-bloom-pink), transparent 70%),
      radial-gradient(closest-side at 70% 60%, var(--color-bloom-magenta), transparent 70%);
  }

  .pk-reveal {
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 600ms var(--ease-pk), transform 600ms var(--ease-pk);
  }
  .pk-reveal.is-visible {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/
git commit -m "feat: migrate design tokens to tailwind v4 @theme"
```

---

## Phase 2 — Layout shell

### Task 5: BaseLayout with fonts and meta

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `public/favicon.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#0D74FF" />
  <path d="M10 9h7.2c2.65 0 4.5 1.7 4.5 4.2 0 2.45-1.85 4.2-4.5 4.2H13v6.6h-3V9zm3 2.6v3.2h3.7c1.2 0 2-.65 2-1.6 0-.95-.8-1.6-2-1.6H13z" fill="#fff"/>
</svg>
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/500.css';
import '@fontsource/outfit/600.css';
import '@fontsource/geist-mono/400.css';
import '~/styles/global.css';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const {
  title,
  description,
  canonical = 'https://provekit.org',
  ogImage = '/og-image.png',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL(ogImage, canonical).toString()} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, canonical).toString()} />

    <!-- Structured data -->
    <script type="application/ld+json" set:html={JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ProveKit',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description,
      url: canonical,
      license: 'https://opensource.org/licenses/MIT',
    })} />
  </head>
  <body>
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow">
      Skip to content
    </a>
    <slot />
    <script type="module" src="/src/scripts/reveal.ts"></script>
  </body>
</html>

<style is:global>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  .focus\:not-sr-only:focus {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro public/favicon.svg
git commit -m "feat: base layout with fonts, meta, and JSON-LD"
```

---

### Task 6: Page shell with section landmarks

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro` (placeholder shell — components are filled in Phase 3)**

```astro
---
import BaseLayout from '~/layouts/BaseLayout.astro';
---
<BaseLayout
  title="Provekit — Client-side zero-knowledge, built for the real world"
  description="Provekit is a lightweight, modular ZK toolkit designed from the ground up for client-side execution."
>
  <header class="pk-gutter pt-6"></header>
  <main id="main">
    <section aria-labelledby="hero-title" class="pk-gutter"></section>
    <section aria-labelledby="install-title" class="pk-gutter"></section>
    <section aria-labelledby="features-title" class="pk-gutter"></section>
    <section aria-labelledby="credit-title" class="pk-gutter"></section>
    <section aria-labelledby="benchmarks-title" class="pk-gutter"></section>
    <section aria-labelledby="faq-title" class="pk-gutter"></section>
  </main>
  <footer class="pk-gutter"></footer>
</BaseLayout>
```

- [ ] **Step 2: Verify dev server starts and the shell renders without errors**

```bash
pnpm dev &
sleep 5
curl -sf http://localhost:4321/ > /dev/null && echo "OK"
kill %1
# Expect: OK
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: index.astro shell with section landmarks"
```

---

## Phase 3 — Sections

### Task 7: TopBar component

**Files:**
- Create: `src/components/nav/TopBar.astro`
- Modify: `src/pages/index.astro` — add `<TopBar />` inside `<header>`

- [ ] **Step 1: Create `src/components/nav/TopBar.astro`**

```astro
---
---
<nav class="flex items-center justify-between" aria-label="Primary">
  <a href="/" class="pk-mono text-sm font-medium tracking-[0.12em]" aria-label="Provekit home">
    PROVEKIT
  </a>
  <a href="#" class="pk-pill" data-todo="docs">
    DOCS
  </a>
</nav>
```

- [ ] **Step 2: Wire it into `src/pages/index.astro`**

Replace the empty `<header>` with:

```astro
<header class="pk-gutter pt-6">
  <TopBar />
</header>
```

And add at the top of the frontmatter:

```astro
import TopBar from '~/components/nav/TopBar.astro';
```

- [ ] **Step 3: Commit**

```bash
git add src/components/nav/TopBar.astro src/pages/index.astro
git commit -m "feat(nav): top bar with wordmark and docs pill"
```

---

### Task 8: Hero section

**Files:**
- Create: `src/components/hero/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/hero/Hero.astro`**

```astro
---
---
<div class="relative pt-24 pb-32 md:pt-32 md:pb-40">
  <div class="pk-bloom pk-bloom--cyan absolute -right-20 bottom-0 h-[60%] w-[55%]" aria-hidden="true"></div>

  <div class="relative max-w-4xl">
    <p class="pk-eyebrow pk-reveal">INTRODUCING PROVEKIT</p>
    <h1 id="hero-title" class="pk-display pk-reveal mt-6">
      Client-side zero-knowledge,<br />built for the real world.
    </h1>
    <p class="pk-body pk-reveal mt-8 max-w-2xl">
      Provekit is a lightweight, modular ZK toolkit designed from the ground up for client-side execution.
    </p>
    <div class="pk-reveal mt-10 flex flex-wrap gap-3">
      <a href="#" class="pk-btn pk-btn--primary" data-todo="repo">
        <span aria-hidden="true">{'{ }'}</span>
        Visit Repo
      </a>
      <a href="#" class="pk-btn pk-btn--ghost" data-todo="docs">Explore Docs</a>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Wire into `src/pages/index.astro`**

Add to imports:
```astro
import Hero from '~/components/hero/Hero.astro';
```
Replace the empty `<section aria-labelledby="hero-title">`:
```astro
<section aria-labelledby="hero-title" class="pk-gutter">
  <Hero />
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/Hero.astro src/pages/index.astro
git commit -m "feat(hero): headline, sub, and ctas with cyan bloom"
```

---

### Task 9: InstallScript section + copy-to-clipboard

**Files:**
- Create: `src/scripts/copy.ts`
- Create: `src/components/install/InstallScript.astro`
- Test: `src/scripts/copy.test.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write the failing test**

```ts
// src/scripts/copy.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyText } from './copy';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

describe('copyText', () => {
  it('writes the given string to the clipboard', async () => {
    const ok = await copyText('cargo install provekit-cli');
    expect(ok).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('cargo install provekit-cli');
  });

  it('returns false when clipboard fails', async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(new Error('denied'));
    const ok = await copyText('x');
    expect(ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test
# Expect: FAIL — module './copy' has no export 'copyText'.
```

- [ ] **Step 3: Implement `src/scripts/copy.ts`**

```ts
export async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const trigger = target.closest<HTMLElement>('[data-copy]');
    if (!trigger) return;
    const value = trigger.dataset.copy ?? '';
    void copyText(value).then((ok) => {
      const label = trigger.querySelector<HTMLElement>('[data-copy-label]');
      if (!label) return;
      const original = label.textContent;
      label.textContent = ok ? 'Copied' : 'Failed';
      window.setTimeout(() => {
        label.textContent = original;
      }, 1500);
    });
  });
}
```

- [ ] **Step 4: Add Vitest config so the test resolves under `~`**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
});
```

Install jsdom:

```bash
pnpm add -D jsdom
```

- [ ] **Step 5: Run the test to confirm it passes**

```bash
pnpm test
# Expect: PASS, 2 tests.
```

- [ ] **Step 6: Create `src/components/install/InstallScript.astro`**

```astro
---
const command = 'cargo install provekit-cli';
---
<div class="grid gap-12 py-24 md:grid-cols-2 md:items-center">
  <div>
    <p class="pk-eyebrow pk-reveal">INSTALL SCRIPT</p>
    <h2 id="install-title" class="pk-h2 pk-reveal mt-4">
      To install Provekit, run this simple install script.
    </h2>
    <p class="pk-body pk-reveal mt-6 max-w-md">
      Discover Provekit. Check out the comprehensive guide for a seamless introduction and installation.
    </p>
    <a href="#" class="pk-btn pk-btn--primary pk-reveal mt-8" data-todo="guide">Read Guide</a>
  </div>

  <figure class="pk-reveal relative overflow-hidden rounded-md border border-[color:var(--color-line)] bg-white">
    <figcaption class="flex items-center justify-between border-b border-[color:var(--color-line)] px-4 py-3">
      <span class="pk-mono text-xs text-[color:var(--color-mute)]">BASH</span>
      <button
        type="button"
        class="pk-mono text-xs text-[color:var(--color-mute)] hover:text-[color:var(--color-ink)]"
        data-copy={command}
        aria-label="Copy install command"
      >
        <span data-copy-label>Copy</span>
      </button>
    </figcaption>
    <pre class="overflow-x-auto px-5 py-6 font-mono text-base text-[color:var(--color-ink)]"><code>{command}</code></pre>
  </figure>
</div>
```

- [ ] **Step 7: Wire into `src/pages/index.astro`**

Add to imports:
```astro
import InstallScript from '~/components/install/InstallScript.astro';
```
Replace the empty install section:
```astro
<section aria-labelledby="install-title" class="pk-gutter">
  <InstallScript />
</section>
```
Also add the script tag at end of `<body>` in `BaseLayout.astro`:
```astro
<script type="module" src="/src/scripts/copy.ts"></script>
```

- [ ] **Step 8: Commit**

```bash
git add src/scripts/copy.ts src/scripts/copy.test.ts src/components/install/InstallScript.astro src/layouts/BaseLayout.astro src/pages/index.astro vitest.config.ts package.json pnpm-lock.yaml
git commit -m "feat(install): code panel with copy-to-clipboard"
```

---

### Task 10: Feature grid (3 cards with bloom illustrations)

**Files:**
- Create: `src/components/features/FeatureCard.astro`
- Create: `src/components/features/FeatureGrid.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/features/FeatureCard.astro`**

```astro
---
interface Props {
  index: string;
  title: string;
  body: string;
  bloom: 'cyan' | 'orange' | 'pink';
  glyph: 'modular' | 'mobile' | 'feather';
}
const { index, title, body, bloom, glyph } = Astro.props;

const glyphMap = {
  modular: '<rect x="14" y="14" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="40" y="14" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="14" y="40" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/><rect x="40" y="40" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>',
  mobile: '<rect x="22" y="10" width="30" height="54" rx="6" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="37" cy="56" r="2" fill="currentColor"/>',
  feather: '<path d="M14 50 L50 14 c8 0 14 6 14 14 L28 64 H14 z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M14 64 L36 42" stroke="currentColor" stroke-width="1.5" fill="none"/>',
};
---
<article class="pk-reveal relative flex h-full flex-col gap-6 rounded-md border border-[color:var(--color-line)] bg-white p-8">
  <div class="relative h-44 w-full overflow-hidden rounded">
    <div class={`pk-bloom pk-bloom--${bloom}`} aria-hidden="true"></div>
    <svg viewBox="0 0 74 74" class="relative h-full w-full text-[color:var(--color-ink)]" aria-hidden="true">
      <Fragment set:html={glyphMap[glyph]} />
    </svg>
  </div>

  <div class="flex items-baseline gap-3">
    <span class="pk-mono text-xs text-[color:var(--color-mute)]">{index}</span>
    <h3 class="pk-mono text-sm tracking-[0.12em]">{title}</h3>
  </div>
  <p class="pk-body text-base">{body}</p>
</article>
```

- [ ] **Step 2: Create `src/components/features/FeatureGrid.astro`**

```astro
---
import FeatureCard from './FeatureCard.astro';
---
<div class="py-24">
  <p class="pk-eyebrow pk-reveal">CORE FEATURES</p>
  <h2 id="features-title" class="sr-only">Core features</h2>
  <div class="mt-10 grid gap-6 md:grid-cols-3">
    <FeatureCard
      index="1"
      title="MODULARITY"
      body="Cleanly separates proving, verification, and compilation into independent components — easy to customize and extend."
      bloom="cyan"
      glyph="modular"
    />
    <FeatureCard
      index="2"
      title="MOBILE FRIENDLY"
      body="Designed for client-side proving. Generates zero-knowledge proofs directly on a user's device, without heavy server infrastructure."
      bloom="orange"
      glyph="mobile"
    />
    <FeatureCard
      index="3"
      title="LIGHT WEIGHT"
      body="Built in Rust with optimized field arithmetic. Provekit keeps resource usage minimal so it runs efficiently even on constrained hardware."
      bloom="pink"
      glyph="feather"
    />
  </div>
</div>
```

- [ ] **Step 3: Wire into `src/pages/index.astro`**

```astro
import FeatureGrid from '~/components/features/FeatureGrid.astro';
// ...
<section aria-labelledby="features-title" class="pk-gutter">
  <FeatureGrid />
</section>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/features/ src/pages/index.astro
git commit -m "feat(features): three feature cards with css blooms"
```

---

### Task 11: Engineering credit section

**Files:**
- Create: `src/components/credits/EngineeringCredit.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/credits/EngineeringCredit.astro`**

```astro
---
const partners = [
  { letter: 'W', name: 'world', href: '#' },
  { letter: 'A', name: 'atheon', href: '#' },
  { letter: 'R', name: 'reilabs', href: '#' },
];
---
<div class="grid gap-12 py-24 md:grid-cols-2 md:items-center">
  <div>
    <p class="pk-eyebrow pk-reveal">BUILT FOR PERFORMANCE AND PRIVACY</p>
    <h2 id="credit-title" class="pk-h2 pk-reveal mt-4">
      Engineered by some of the best technical brains.
    </h2>
    <ul class="pk-reveal mt-8 flex flex-wrap items-center gap-6" data-todo="partner-logos">
      {partners.map((p) => (
        <li>
          <a href={p.href} class="flex items-center gap-2 text-[color:var(--color-mute)] hover:text-[color:var(--color-ink)]">
            <span class="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] pk-mono text-xs">
              {p.letter}
            </span>
            <span class="pk-mono text-sm">{p.name}</span>
          </a>
        </li>
      ))}
    </ul>
    <a href="#" class="pk-btn pk-btn--ghost pk-reveal mt-10" data-todo="github">Visit GitHub</a>
  </div>

  <figure class="pk-reveal relative aspect-square w-full max-w-md justify-self-center md:justify-self-end" aria-hidden="true">
    <svg viewBox="0 0 400 400" class="h-full w-full">
      <defs>
        <radialGradient id="hexGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-bloom-cyan)" stop-opacity="0.6" />
          <stop offset="100%" stop-color="var(--color-bloom-cyan)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#hexGrad)" />
      <g fill="none" stroke="var(--color-ink)" stroke-width="1.25" opacity="0.85">
        <polygon points="200,60 320,130 320,270 200,340 80,270 80,130" />
        <polygon points="200,100 285,150 285,250 200,300 115,250 115,150" />
        <polygon points="200,140 250,170 250,230 200,260 150,230 150,170" />
        <line x1="200" y1="60" x2="200" y2="340" />
        <line x1="80" y1="130" x2="320" y2="270" />
        <line x1="80" y1="270" x2="320" y2="130" />
      </g>
    </svg>
  </figure>
</div>
```

- [ ] **Step 2: Wire into `src/pages/index.astro`**

```astro
import EngineeringCredit from '~/components/credits/EngineeringCredit.astro';
// ...
<section aria-labelledby="credit-title" class="pk-gutter">
  <EngineeringCredit />
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/credits/ src/pages/index.astro
git commit -m "feat(credits): engineering credit with partners and hex svg"
```

---

### Task 12: Benchmarks section + bar chart

**Files:**
- Create: `src/components/benchmarks/BenchmarkChart.astro`
- Create: `src/components/benchmarks/Benchmarks.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/benchmarks/BenchmarkChart.astro`**

```astro
---
const data = [
  { metric: 'Metric 1', toolkit1: 60, toolkit2: 78, provekit: 100 },
  { metric: 'Metric 2', toolkit1: 70, toolkit2: 65, provekit: 95 },
  { metric: 'Metric 3', toolkit1: 55, toolkit2: 72, provekit: 88 },
];
const colors = {
  toolkit1: 'var(--color-toolkit-1)',
  toolkit2: 'var(--color-toolkit-2)',
  provekit: 'var(--color-toolkit-3)',
};
---
<figure class="space-y-6" aria-label="Benchmark comparison">
  <div class="flex flex-wrap items-center gap-4 pk-mono text-xs">
    {(['toolkit1', 'toolkit2', 'provekit'] as const).map((k) => (
      <span class="inline-flex items-center gap-2">
        <span class="inline-block h-2 w-6 rounded-full" style={`background:${colors[k]}`}></span>
        {k === 'provekit' ? 'PROVEKIT' : k.replace('toolkit', 'TOOLKIT ')}
      </span>
    ))}
  </div>
  <div class="space-y-5">
    {data.map((row) => (
      <div>
        <div class="pk-mono text-xs text-[color:var(--color-mute)] mb-2">{row.metric.toUpperCase()}</div>
        <div class="space-y-1.5">
          {(['toolkit1', 'toolkit2', 'provekit'] as const).map((k) => (
            <div class="h-3 rounded-full bg-[color:var(--color-line-soft)]">
              <div class="h-full rounded-full" style={`width:${row[k]}%;background:${colors[k]}`}></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
  <div class="flex flex-wrap gap-8 pt-2">
    <div>
      <div class="pk-display text-[clamp(36px,4vw,56px)]" style="color:var(--color-toolkit-3)">+36%</div>
      <div class="pk-mono text-xs text-[color:var(--color-mute)]">FASTER</div>
    </div>
    <div>
      <div class="pk-display text-[clamp(36px,4vw,56px)]" style="color:var(--color-toolkit-3)">+24%</div>
      <div class="pk-mono text-xs text-[color:var(--color-mute)]">LIGHTER</div>
    </div>
  </div>
</figure>
```

- [ ] **Step 2: Create `src/components/benchmarks/Benchmarks.astro`**

```astro
---
import BenchmarkChart from './BenchmarkChart.astro';
const points = [
  {
    n: '1.',
    title: 'Proving time',
    body: 'Provekit generates proofs ~36% faster than comparable client-side toolkits on commodity hardware.',
  },
  {
    n: '2.',
    title: 'Memory footprint',
    body: 'A streamlined Rust core keeps the resident set ~24% lighter than the next nearest toolkit.',
  },
  {
    n: '3.',
    title: 'Verification cost',
    body: 'Verifier circuits compile to a fraction of the gate count, keeping cost low on chain and off.',
  },
];
---
<div class="grid gap-12 py-24 md:grid-cols-2 md:items-start">
  <div>
    <p class="pk-eyebrow pk-reveal">BENCHMARKS</p>
    <h2 id="benchmarks-title" class="pk-h2 pk-reveal mt-4">
      A client-side ZK toolkit that excels in every aspect.
    </h2>
    <ol class="pk-reveal mt-10 space-y-8">
      {points.map((p) => (
        <li class="grid grid-cols-[auto_1fr] gap-4">
          <span class="pk-mono text-sm text-[color:var(--color-mute)]">{p.n}</span>
          <div>
            <div class="pk-mono text-sm">{p.title}</div>
            <p class="pk-body mt-2 text-base">{p.body}</p>
          </div>
        </li>
      ))}
    </ol>
    <a href="#" class="pk-btn pk-btn--ghost pk-reveal mt-10" data-todo="benchmarks">All Benchmarks</a>
  </div>

  <div class="pk-reveal rounded-md border border-[color:var(--color-line)] bg-white p-8">
    <BenchmarkChart />
  </div>
</div>
```

- [ ] **Step 3: Wire into `src/pages/index.astro`**

```astro
import Benchmarks from '~/components/benchmarks/Benchmarks.astro';
// ...
<section aria-labelledby="benchmarks-title" class="pk-gutter">
  <Benchmarks />
</section>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/benchmarks/ src/pages/index.astro
git commit -m "feat(benchmarks): metric callouts and svg-style bar chart"
```

---

### Task 13: FAQ section

**Files:**
- Create: `src/content/faq.ts`
- Create: `src/components/faq/FaqItem.astro`
- Create: `src/components/faq/Faq.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/content/faq.ts`**

```ts
export interface FaqEntry {
  q: string;
  a: string;
}

export const faqEntries: FaqEntry[] = [
  {
    q: 'What exactly is Provekit?',
    a: 'A lightweight, modular zero-knowledge proving toolkit written in Rust. It is designed for client-side execution, so proofs can be generated directly on a user\'s device — including mobile — without heavy server infrastructure.',
  },
  {
    q: 'Does it work in the browser?',
    a: 'Yes. Provekit compiles to WebAssembly and runs in modern browsers, with a footprint small enough to ship in production web apps.',
  },
  {
    q: 'What ZK proof system does it use?',
    a: 'Provekit uses a SNARK backend optimized for client-side proving and on-chain verification. See the docs for current scheme details and roadmap.',
  },
  {
    q: 'How does it compare to other ZK toolkits?',
    a: 'On commodity hardware, Provekit generates proofs ~36% faster than comparable client-side toolkits and uses ~24% less memory. See the benchmarks page for the full methodology.',
  },
  {
    q: 'Is it production-ready?',
    a: 'Provekit is actively developed by World, Atheon, and Reilabs and is being used in production-track integrations. Treat the latest release notes and benchmarks as the source of truth.',
  },
  {
    q: 'Where can I get help?',
    a: 'Open an issue on GitHub or join the Telegram listed in the footer.',
  },
];
```

- [ ] **Step 2: Create `src/components/faq/FaqItem.astro`**

```astro
---
interface Props { q: string; a: string; index: number; }
const { q, a, index } = Astro.props;
const open = index === 0;
---
<details class="group border-b border-[color:var(--color-line)] py-6" open={open}>
  <summary class="flex cursor-pointer list-none items-center justify-between gap-6">
    <span class="pk-h3">{q}</span>
    <span class="pk-mono text-xl text-[color:var(--color-mute)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
  </summary>
  <p class="pk-body mt-4 max-w-3xl">{a}</p>
</details>
```

- [ ] **Step 3: Create `src/components/faq/Faq.astro`**

```astro
---
import FaqItem from './FaqItem.astro';
import { faqEntries } from '~/content/faq';
---
<div class="grid gap-12 py-24 md:grid-cols-[1fr_2fr] md:items-start">
  <div>
    <p class="pk-eyebrow pk-reveal">FREQUENTLY ASKED QUESTIONS</p>
    <h2 id="faq-title" class="pk-h2 pk-reveal mt-4">
      Comprehensive list of answers to all your questions.
    </h2>
    <p class="pk-body pk-reveal mt-6">Need more information or help?</p>
    <a href="mailto:hello@provekit.org" class="pk-btn pk-btn--primary pk-reveal mt-6" data-todo="contact">Contact Us</a>
  </div>
  <div class="pk-reveal">
    {faqEntries.map((entry, i) => <FaqItem q={entry.q} a={entry.a} index={i} />)}
  </div>
</div>
```

- [ ] **Step 4: Wire into `src/pages/index.astro`**

```astro
import Faq from '~/components/faq/Faq.astro';
// ...
<section aria-labelledby="faq-title" class="pk-gutter">
  <Faq />
</section>
```

- [ ] **Step 5: Commit**

```bash
git add src/content/ src/components/faq/ src/pages/index.astro
git commit -m "feat(faq): content-driven faq with native details"
```

---

### Task 14: Footer

**Files:**
- Create: `src/components/footer/SiteFooter.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create `src/components/footer/SiteFooter.astro`**

```astro
---
const product = [
  { label: 'Docs', href: '#', todo: 'docs' },
  { label: 'Guide', href: '#', todo: 'guide' },
  { label: 'Benchmarks', href: '#', todo: 'benchmarks' },
];
const community = [
  { label: 'Telegram', href: '#', todo: 'telegram' },
  { label: 'Twitter', href: '#', todo: 'twitter' },
  { label: 'GitHub', href: '#', todo: 'github' },
];
const year = new Date().getFullYear();
---
<div class="border-t border-[color:var(--color-line)] py-16">
  <div class="grid gap-12 md:grid-cols-3 md:items-start">
    <div>
      <a href="/" class="pk-mono text-sm font-medium tracking-[0.12em]">PROVEKIT</a>
      <p class="pk-body mt-4 max-w-xs text-base">
        Client-side zero-knowledge, built for the real world.
      </p>
    </div>
    <nav aria-label="Product" class="space-y-3">
      <h3 class="pk-mono text-xs text-[color:var(--color-mute)]">PRODUCT</h3>
      <ul class="space-y-2">
        {product.map((l) => (
          <li><a href={l.href} class="pk-mono text-sm hover:text-[color:var(--color-brand)]" data-todo={l.todo}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
    <nav aria-label="Community" class="space-y-3">
      <h3 class="pk-mono text-xs text-[color:var(--color-mute)]">COMMUNITY</h3>
      <ul class="space-y-2">
        {community.map((l) => (
          <li><a href={l.href} class="pk-mono text-sm hover:text-[color:var(--color-brand)]" data-todo={l.todo}>{l.label}</a></li>
        ))}
      </ul>
    </nav>
  </div>
  <p class="pk-mono mt-12 text-xs text-[color:var(--color-mute)]">
    © {year} Provekit · World × Atheon × Reilabs
  </p>
</div>
```

- [ ] **Step 2: Wire into `src/pages/index.astro`**

```astro
import SiteFooter from '~/components/footer/SiteFooter.astro';
// ...
<footer class="pk-gutter">
  <SiteFooter />
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/footer/ src/pages/index.astro
git commit -m "feat(footer): site footer with two link columns"
```

---

## Phase 4 — Polish

### Task 15: Reveal-on-scroll observer (vanilla TS)

**Files:**
- Create: `src/scripts/reveal.ts`
- Test: `src/scripts/reveal.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/scripts/reveal.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

let observerCb: IntersectionObserverCallback | null = null;
class FakeIO implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  constructor(cb: IntersectionObserverCallback) { observerCb = cb; }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
}
beforeEach(() => {
  document.body.innerHTML = '<p class="pk-reveal" id="x">hi</p>';
  vi.stubGlobal('IntersectionObserver', FakeIO as any);
});

describe('reveal', () => {
  it('adds is-visible to intersecting elements', async () => {
    await import('./reveal');
    const el = document.getElementById('x')!;
    observerCb?.(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(el.classList.contains('is-visible')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
pnpm test src/scripts/reveal.test.ts
# Expect: FAIL — module './reveal' not found.
```

- [ ] **Step 3: Implement `src/scripts/reveal.ts`**

```ts
function init() {
  const targets = document.querySelectorAll<HTMLElement>('.pk-reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  targets.forEach((el) => io.observe(el));
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}

export {};
```

- [ ] **Step 4: Run test to confirm it passes**

```bash
pnpm test src/scripts/reveal.test.ts
# Expect: PASS.
```

- [ ] **Step 5: Commit**

```bash
git add src/scripts/reveal.ts src/scripts/reveal.test.ts
git commit -m "feat(motion): vanilla intersection-observer reveal"
```

---

### Task 16: Responsive QA pass

**Files:**
- Create: `tests/visual.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Install Playwright browsers**

```bash
pnpm exec playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'tablet', use: { viewport: { width: 800, height: 1100 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
});
```

- [ ] **Step 3: Create `tests/visual.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('renders all sections without horizontal scroll', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Client-side zero-knowledge');
  await expect(page.locator('#install-title')).toBeVisible();
  await expect(page.locator('#features-title')).toBeAttached();
  await expect(page.locator('#credit-title')).toBeVisible();
  await expect(page.locator('#benchmarks-title')).toBeVisible();
  await expect(page.locator('#faq-title')).toBeVisible();

  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalScroll).toBe(false);
});

test('faq toggles open and closed', async ({ page }) => {
  await page.goto('/');
  const first = page.locator('#faq-title ~ *').locator('details').first();
  await expect(first).toHaveAttribute('open', '');
  await first.locator('summary').click();
  await expect(first).not.toHaveAttribute('open', '');
});
```

- [ ] **Step 4: Run e2e tests**

```bash
pnpm test:e2e
# Expect: all 6 tests (2 specs × 3 viewports) pass.
```

If a test fails, fix the underlying responsive issue (most likely cause: a fixed-width child overflowing on the mobile viewport). Re-run until green.

- [ ] **Step 5: Commit**

```bash
git add tests/ playwright.config.ts
git commit -m "test: e2e responsive smoke across mobile/tablet/desktop"
```

---

## Phase 5 — SEO and assets

### Task 17: Sitemap, robots, OG image

**Files:**
- Create: `public/robots.txt`
- Create: `public/og-image.svg` (rasterized to PNG by following step)
- Create: `public/og-image.png`

- [ ] **Step 1: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://provekit.org/sitemap-index.xml
```

- [ ] **Step 2: Create `public/og-image.svg`** (1200×630 OG card)

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="bg" cx="80%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#A2D0FC" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#F8FEFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#F8FEFF"/>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="160" font-family="Outfit, sans-serif" font-size="22" letter-spacing="2" fill="#6E6E6E">PROVEKIT</text>
  <text x="80" y="320" font-family="Outfit, sans-serif" font-size="80" font-weight="500" fill="#2D2D2B">Client-side</text>
  <text x="80" y="410" font-family="Outfit, sans-serif" font-size="80" font-weight="500" fill="#2D2D2B">zero-knowledge.</text>
  <text x="80" y="540" font-family="Geist Mono, monospace" font-size="22" letter-spacing="2" fill="#6E6E6E">CARGO INSTALL PROVEKIT-CLI</text>
</svg>
```

- [ ] **Step 3: Rasterize SVG to PNG**

Install sharp once and run a small inline script:

```bash
pnpm add -D sharp
node --input-type=module -e "import sharp from 'sharp'; await sharp('public/og-image.svg').resize(1200,630).png().toFile('public/og-image.png');"
```

Expected: `public/og-image.png` created, ~30–80 KB.

- [ ] **Step 4: Confirm sitemap is generated by `@astrojs/sitemap`**

```bash
pnpm build
ls dist/sitemap-index.xml dist/sitemap-0.xml
# Expect: both files present.
```

- [ ] **Step 5: Commit**

```bash
git add public/robots.txt public/og-image.svg public/og-image.png package.json pnpm-lock.yaml
git commit -m "feat(seo): robots, sitemap, og card"
```

---

## Phase 6 — Quality gates and deploy

### Task 18: Lighthouse CI configuration

**Files:**
- Create: `lighthouserc.json`
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist",
      "url": ["http://localhost/index.html"],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop"
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.98 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "categories:best-practices": ["error", { "minScore": 1.0 }],
        "categories:seo": ["error", { "minScore": 1.0 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

- [ ] **Step 2: Create `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm check
      - run: pnpm test
      - run: pnpm build
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - run: pnpm lhci
```

- [ ] **Step 3: Run Lighthouse locally to confirm budgets**

```bash
pnpm build && pnpm lhci
# Expect: all four assertions pass (98+/100/100/100).
```

If any score drops below the budget, fix the underlying issue before continuing. Most likely failures and fixes:
- **Performance < 98:** unused CSS, font weights not subset — confirm only Outfit 400/500/600 + Geist Mono 400 are imported.
- **Accessibility < 100:** color contrast, missing aria labels.
- **Best Practices < 100:** mixed-content, console errors.
- **SEO < 100:** missing meta description, no canonical.

- [ ] **Step 4: Commit**

```bash
git add lighthouserc.json .github/workflows/ci.yml
git commit -m "ci: lighthouse, lint, typecheck, vitest, playwright pipeline"
```

---

### Task 19: TODO_LINKS.md and placeholder audit

**Files:**
- Create: `TODO_LINKS.md`

- [ ] **Step 1: Audit placeholder anchors**

```bash
grep -rn 'data-todo=' src/ | sort
# Capture every match — these are the URLs to replace.
```

- [ ] **Step 2: Write `TODO_LINKS.md`**

```markdown
# TODO_LINKS

Replace every placeholder anchor before launch. Each row points to the exact source location where the URL is hard-coded as `#` and tagged with a `data-todo` attribute.

| Token             | File                                                  | Purpose                                |
| ----------------- | ----------------------------------------------------- | -------------------------------------- |
| `docs`            | `src/components/nav/TopBar.astro`                     | Top-bar Docs pill                      |
| `repo`            | `src/components/hero/Hero.astro`                      | Hero "Visit Repo" primary CTA          |
| `docs`            | `src/components/hero/Hero.astro`                      | Hero "Explore Docs" ghost CTA          |
| `guide`           | `src/components/install/InstallScript.astro`          | Install section "Read Guide" CTA       |
| `partner-logos`   | `src/components/credits/EngineeringCredit.astro`      | World / Atheon / Reilabs href list     |
| `github`          | `src/components/credits/EngineeringCredit.astro`      | "Visit GitHub" CTA                     |
| `benchmarks`      | `src/components/benchmarks/Benchmarks.astro`          | "All Benchmarks" CTA                   |
| `contact`         | `src/components/faq/Faq.astro`                        | "Contact Us" mailto                    |
| `docs` `guide` `benchmarks` | `src/components/footer/SiteFooter.astro`    | Footer Product column                  |
| `telegram` `twitter` `github` | `src/components/footer/SiteFooter.astro`  | Footer Community column                |

After replacing, run:

    grep -rn 'data-todo=' src/

This should return zero matches. Then delete this file (or keep as a launch checklist).
```

- [ ] **Step 3: Commit**

```bash
git add TODO_LINKS.md
git commit -m "docs: enumerate placeholder urls in todo_links"
```

---

### Task 20: README and CONTRIBUTING

**Files:**
- Create: `README.md`
- Create: `CONTRIBUTING.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# provekit.org

The marketing site for [Provekit](https://provekit.org), a client-side zero-knowledge proving toolkit built in Rust by World, Atheon, and Reilabs.

## Stack

- Astro 4 (static)
- Tailwind v4 via `@tailwindcss/vite`
- TypeScript strict
- pnpm
- Vitest + Playwright + Lighthouse CI

## Local development

    pnpm install
    pnpm dev          # http://localhost:4321

Other scripts:

    pnpm build        # production static build to ./dist
    pnpm preview      # preview the built site
    pnpm check        # astro typecheck
    pnpm lint         # eslint
    pnpm format       # prettier --write
    pnpm test         # unit tests (vitest)
    pnpm test:e2e     # responsive smoke (playwright)
    pnpm lhci         # lighthouse budgets

## Deployment

Cloudflare Pages auto-detects Astro. Connect the repo, framework preset = Astro, build = `pnpm build`, output = `dist/`. Preview deploys per PR are enabled by default.

## Replace placeholder URLs

The site ships with `href="#"` for every external link. See [`TODO_LINKS.md`](./TODO_LINKS.md) for the complete list and source locations.

## License

MIT — see [LICENSE](./LICENSE).
```

- [ ] **Step 2: Write `CONTRIBUTING.md`**

```markdown
# Contributing

Thanks for considering a contribution.

- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `ci:`).
- All changes must pass `pnpm format:check`, `pnpm lint`, `pnpm check`, `pnpm test`, `pnpm test:e2e`, and `pnpm lhci` locally before opening a PR.
- Keep components under ~150 lines. If a component grows beyond that, split it.
- New copy: avoid placeholder text and keep tone aligned with §6 of the design spec.
- New visuals: prefer SVG and CSS gradients; do not introduce raster images on the critical path.
```

- [ ] **Step 3: Commit**

```bash
git add README.md CONTRIBUTING.md
git commit -m "docs: readme and contributing guide"
```

---

### Task 21: Final verification + Cloudflare Pages handoff

**Files:**
- (No new files — verification and documentation only.)

- [ ] **Step 1: Run the full local pipeline**

```bash
pnpm format:check
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm test:e2e
pnpm lhci
# Expect: every command exits 0.
```

- [ ] **Step 2: Visual diff against the original Figma render**

Open the new build and the original side by side:

```bash
pnpm preview --host 127.0.0.1 --port 4321 &
sleep 3
open "http://127.0.0.1:4321"
open "reference/Provekit Landing.html"
```

Compare:
- Hero layout, eyebrow color, button stack
- Feature card blooms — hue, blur, glyph crispness
- Engineering credit hex art and partner row
- Benchmark bar chart proportions and callouts
- FAQ open/close motion
- Footer column rhythm

If a visible regression exists, fix and re-run pipeline.

- [ ] **Step 3: Confirm shipped JS budget**

```bash
find dist -name '*.js' -exec wc -c {} + | tail -1
# Expect: total under 5120 bytes (5 KB).
```

If over budget, audit `dist/_astro/*.js` for accidental imports (e.g., a React island slipping in).

- [ ] **Step 4: Confirm zero raster images on critical path**

```bash
grep -rE '<img|background-image:' dist/index.html || echo "no raster on critical path"
# Expect: "no raster on critical path"
```

- [ ] **Step 5: Cloudflare Pages**

The repo is deploy-ready. To connect:

1. Push to GitHub: `git remote add origin <repo>` then `git push -u origin main`.
2. In Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git, pick the repo.
3. Framework preset: Astro.
4. Build command: `pnpm build`.
5. Output directory: `dist`.
6. Environment variables: none required.
7. Save and deploy.

Document the production URL in `README.md` once issued.

- [ ] **Step 6: Final commit and tag**

```bash
git add README.md
git commit --allow-empty -m "chore: provekit.org v0.1 launch candidate"
git tag v0.1.0
```

---

## Self-review (run after writing the plan; not a separate task)

1. **Spec coverage:** every section of the spec maps to a task — Stack §3 → Tasks 1–4; Structure §4 → all tasks; IA §5 → Tasks 7–14; Content §6 → Tasks 8–14; Visual §7 → Tasks 4, 8, 10–12, 15; Responsive §8 → Tasks 4, 16; A11y §9 → Tasks 5, 13, BaseLayout focus styles in 5; Perf §10 → Tasks 4, 18, 21; SEO §11 → Tasks 5, 17; Tooling §12 → Tasks 3, 18; Placeholders §13 → Task 19; Acceptance §15 → Task 21.
2. **Placeholder scan:** no TBD/TODO inline; every code step has full code; no "similar to Task N" references.
3. **Type consistency:** `copy.ts` exports `copyText`, used in `InstallScript.astro` via `data-copy`/`data-copy-label` attributes — matches. `reveal.ts` adds class `is-visible` matching `pk-reveal.is-visible` in `global.css`. FAQ `FaqEntry` type matches consumer in `Faq.astro`.
