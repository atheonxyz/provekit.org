# Contributing

Thanks for considering a contribution.

- Use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `ci:`).
- All changes must pass `pnpm format:check`, `pnpm lint`, `pnpm check`, `pnpm test`, `pnpm test:e2e`, and `pnpm lhci` locally before opening a PR.
- Keep components under ~150 lines. If a component grows beyond that, split it.
- New copy: avoid placeholder text and keep tone aligned with §6 of the design spec.
- New visuals: prefer SVG and CSS gradients; do not introduce raster images on the critical path.
