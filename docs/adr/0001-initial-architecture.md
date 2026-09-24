# ADR-0001 — Initial architecture (landing)

Date: 2026-09-18 · Status: Accepted

## Context
`landing` is the L92 Labs homepage. It was scaffolded from cf-bootstrap's
`vinext-hono` template, which pairs a vinext frontend with a Hono API and
ships auth/billing demo routes by default. None of that applies here: the
page has no state, no user accounts, and nothing to bill. Carrying the demo
`apps/api`, `packages/shared`, Better Auth pages, and Terraform-managed KV
namespaces forward would be dead weight for a static marketing page.

## Decision
- **Frontend only**: `apps/web` — [vinext](https://vinext.io/) (Next.js App
  Router API on Vite) compiled to a single Cloudflare Worker. No `apps/api`,
  no `packages/shared`.
- **No resource modules**: no R2/KV/D1/queues. The Worker serves static
  assets (`ASSETS` binding) plus vinext's SSR shell with CDN-only response
  caching (no KV data cache — nothing here needs per-key caching).
- **No Terraform**: with zero Cloudflare resources to provision, the
  `infra/` Terragrunt scaffold cf-bootstrap normally generates was dropped.
  Deploy is `wrangler deploy` directly against the target account.
- **Content is code**: the product cards live inline in
  `app/page.tsx` as a typed array. No CMS for three items.
- **Account/domain**: deploys to the Yaoxin Cloudflare account (same account
  as `crawl.l92-labs.com` / `drop.l92-labs.com`), on the apex `l92-labs.com`.
  Wired via `wrangler`'s `routes: [{ pattern: "l92-labs.com", custom_domain:
  true }]` (Workers Custom Domains — Cloudflare manages the DNS record and
  cert for you), not a Terraform `workers-domain` module, per the "no infra"
  decision above. Two-phase order still applies: the Worker was deployed to
  `*.workers.dev` first, then the custom domain was attached once a scoped
  Cloudflare API token existed. `cf-bootstrap creds mint` refused (it expects
  a project-owned R2 state bucket that this repo intentionally never
  created), so the token was cut directly against the Cloudflare API using
  the `yaoxin` master token registered via `cf-bootstrap accounts add`
  (Workers Scripts Write + Workers Routes Write + Account Settings Read).
- **Worker name**: `landing-page-l92-labs`, not the shorter `landing-web` it
  was first deployed as — the Yaoxin account already runs an unrelated
  `yaoxinyu-landing-page` Worker for a different domain
  (`yaoxinyu.tw`/`yaoxinyu.com.tw`), and a plain `landing-*` name is too easy
  to confuse with it in `wrangler deployments` / the dashboard. Once renamed,
  `workers.dev` preview stayed disabled (Wrangler turns it off by default
  once a `custom_domain` route is set) — `l92-labs.com` is the only URL.

## Consequences
- Cloudflare-only, same as every L92 Labs repo: no AWS/GCP/Azure services.
- No CI deploy secret is wired yet (`INFRA_ENV` in `.github/workflows/deploy.yml`
  from the template doesn't apply without Terraform state) — CI runs
  typecheck + the cloudflare-only dependency check only until a
  `CLOUDFLARE_API_TOKEN` deploy secret is added.
- Adding a 4th product, or any real interactivity, is just editing
  `app/page.tsx` and redeploying — no infra change needed for content.
- If this page ever needs state (a contact form, a waitlist), that's a new
  ADR and a `kv`/`d1` module added deliberately, not carried by default.

## How to change this
Write `docs/adr/000N-<topic>.md`. Mark superseded ADRs as such; never delete them.
