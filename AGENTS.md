# AGENTS.md — landing

The law for humans and AI agents working in this repo. Read this and
`docs/PRD.md` + `docs/adr/` **before** making changes. Decisions go in a new ADR.

## What this is
The L92 Labs homepage: a single static-feeling page on Cloudflare Workers,
built with [vinext](https://vinext.io/) (Next.js App Router API on Vite). No
backend, no auth, no storage — see
[ADR-0001](docs/adr/0001-initial-architecture.md) for why this repo has no
`apps/api` and no Terraform, unlike its sibling repos.

## Principles (non-negotiable)
- **DRY / SOLID / KISS.** No clever abstractions ahead of need. This is a
  handful of product cards in an array — keep it that simple until there's a
  real reason not to.
- **Cloudflare-only.** No AWS / GCP / Azure SDKs or services. CI rejects
  off-platform deps (see `.github/workflows/check.yml`).
- **Every change is a PR.** Small, reviewable, green CI. No direct pushes to main.
- **Secrets never in code.** This repo currently has none — if that changes,
  use `wrangler secret`, never commit a value.

## Layout
```
apps/web/    vinext frontend — app/page.tsx is the whole page (product cards),
             app/brand.css + app/globals.css are the design tokens/styles,
             public/ has the logo, favicon, and product screenshots
docs/PRD.md  what we're building (keep current)
docs/adr/    architecture decision records (append-only; one per decision)
.github/     CI: check (typecheck/cloudflare-only)
```

## Day-to-day commands
```
pnpm install
pnpm dev                      # web :3001 (vinext)
pnpm typecheck
cd apps/web && pnpm deploy     # wrangler deploy via vinext-cloudflare
```

## Agent rules
1. Read `docs/PRD.md` + the latest ADRs before implementing. Update the PRD
   when scope changes (e.g. a 4th product card, real interactivity).
2. Any non-trivial decision → write a new numbered ADR (`docs/adr/NNNN-*.md`).
3. If this page ever needs a Cloudflare resource (KV, D1, R2), that's a new
   ADR first — don't add infra speculatively.
4. Keep `pnpm typecheck` + the cloudflare-only check green.
5. Open a PR; CI must pass.
6. Production path: green on `*.workers.dev` (dev) → wire the custom
   hostname (`l92-labs.com`) via `wrangler` → promote. Never deploy a red main.
