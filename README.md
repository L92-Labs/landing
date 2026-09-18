# landing

The [L92 Labs](https://l92-labs.com) homepage. One static page: hero + a card
per product, each linking to its live app and repo.

| | URL |
|--|-----|
| **Prod** | https://l92-labs.com |
| **Worker** | `landing-page-l92-labs` (named to avoid clashing with the unrelated `yaoxinyu-landing-page` Worker already on this account) |

## Layout

```
apps/web/            vinext App Router frontend — port 3001 (vinext default)
  app/page.tsx        the whole page — product cards are a typed array here
  app/brand.css        design tokens (palette/type/spacing)
  app/globals.css      layout + component styles
  public/               logo, favicon, product screenshots
docs/PRD.md           what this is, kept current
docs/adr/             architecture decisions (see 0001 for why this is
                      frontend-only, no infra)
```

See [ADR-0001](docs/adr/0001-initial-architecture.md) for why this repo has
no `apps/api`, no Terraform, and no Cloudflare resource modules — it's a
static page with nothing to store.

## Getting started

```bash
pnpm install
pnpm dev   # http://localhost:3001
```

## Deploy

```bash
cd apps/web
pnpm deploy   # wrangler deploy via vinext-cloudflare, targets the account
              # selected by `wrangler login` / CLOUDFLARE_API_TOKEN
```

No `.env.infra`, no Terraform apply — there's nothing to provision. The
custom hostname (`l92-labs.com`) is a Workers Custom Domain, declared in
`apps/web/wrangler.jsonc` (`routes: [{ pattern: "l92-labs.com", custom_domain:
true }]`) — Cloudflare manages the DNS record and certificate.

## License

MIT — same as the other L92 Labs repos.
