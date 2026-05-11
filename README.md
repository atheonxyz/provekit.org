# provekit.org

The marketing site for [Provekit](https://provekit.org), a client-side
zero-knowledge proving toolkit built in Rust by World, Atheon, and Reilabs.

The site is a 1:1 port of the official Provekit Design System. The canonical
source materials (JSX components, tokens, brand README, raster assets and
SVG wordmarks) live under [`design-system/`](./design-system); the Astro
components in [`src/components/`](./src/components) mirror them.

## Stack

- Astro 4 (static; fixed 1600 × N stage, centered with 88px gutters)
- Tailwind v4 via `@tailwindcss/vite`
- TypeScript strict (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- pnpm
- Vitest + Playwright + Lighthouse CI

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

Other scripts:

```bash
pnpm build        # production static build to ./dist
pnpm preview      # preview the built site
pnpm check        # astro typecheck
pnpm lint         # eslint
pnpm format       # prettier --write
pnpm test         # unit tests (vitest)
pnpm test:e2e     # responsive smoke (playwright)
pnpm lhci         # lighthouse budgets
```

## Pages

- `/` — landing: hero · install · features · partners · benchmarks · faq · footer
- `/benchmarks` — full benchmark page: hero · methodology · 3 metric details · summary table

## Deployment

Cloudflare Pages auto-detects Astro. Connect the repo, framework preset =
Astro, build command = `pnpm build`, output directory = `dist/`. Preview
deploys per PR are enabled by default.

## Replace placeholder URLs

Every external link starts as `href="#"`. See [`TODO_LINKS.md`](./TODO_LINKS.md)
for the complete list and source locations. Run `grep -rn 'data-todo=' src/`
to verify there are zero unresolved links before launch.

## License

MIT — see [LICENSE](./LICENSE).
