# TODO_LINKS

Every external link on the site is currently a placeholder. Replace each
`href="#"` (plus the matching `data-todo` attribute) with a real URL before
launch.

| Token         | File                                                  | Purpose                             |
| ------------- | ----------------------------------------------------- | ----------------------------------- |
| `home`        | `src/components/nav/TopBar.astro`                     | PROVEKIT wordmark (home link)       |
| `docs`        | `src/components/nav/TopBar.astro`                     | Top-bar `DOCS →` button             |
| `repo`        | `src/components/hero/Hero.astro`                      | Hero `VISIT REPO { }` (secondary)   |
| `docs`        | `src/components/hero/Hero.astro`                      | Hero `EXPLORE DOCS →` (primary)     |
| `guide`       | `src/components/install/InstallScript.astro`          | Install panel `READ GUIDE →`        |
| `github`      | `src/components/credits/EngineeringCredit.astro`      | Engineering Credit `VISIT GITHUB →` |
| `contact`     | `src/components/faq/Faq.astro`                        | FAQ strip `CONTACT US →` (mailto)   |
| `raw-results` | `src/components/benchmarks-page/BenchmarksHero.astro` | Benchmarks page `RAW RESULTS { }`   |
| `docs`        | `src/components/footer/SiteFooter.astro`              | Footer chip — DOCS                  |
| `guide`       | `src/components/footer/SiteFooter.astro`              | Footer chip — GUIDE                 |
| `telegram`    | `src/components/footer/SiteFooter.astro`              | Footer chip — TELEGRAM              |
| `twitter`     | `src/components/footer/SiteFooter.astro`              | Footer chip — TWITTER               |
| `github`      | `src/components/footer/SiteFooter.astro`              | Footer chip — GITHUB                |

The footer `BENCHMARKS` chip and the landing's `ALL BENCHMARKS →` button
already link to `/benchmarks` (internal) — they are not placeholders.

After replacing, run

```bash
grep -rn 'data-todo=' src/
```

That should return zero matches.
