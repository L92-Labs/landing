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
- **Content is code**: the three product cards live inline in
  `app/page.tsx` as a typed array. No CMS for three items.
- **Account/domain**: deploys to the Yaoxin Cloudflare account (same account
  as `crawl.l92-labs.com` / `drop.l92-labs.com`), targeting the apex
  `l92-labs.com`. The custom-hostname step needs zone-write credentials on
  that account beyond the read-only OAuth session available at scaffold
  time — dev (`*.workers.dev`) ships first; the apex is wired once
  zone-write access is available, per the two-phase domain rule (Worker
  must exist before `workers-domain`).

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
