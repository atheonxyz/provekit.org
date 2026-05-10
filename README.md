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
