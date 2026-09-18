# PRD — landing

## Vision
The public homepage for L92 Labs: one page that shows what the org has shipped
and links out to each product.

## Problem
L92 Labs has three live products (Agentdrop, Flarecrawl, Domain Idea Agent)
and no single place that says so. `l92-labs.com` should answer "what is this
org" in one screenshot.

## Personas
1. A visitor who followed a link to one of the products and wants to see
   what else the org builds.
2. An agent builder evaluating whether to use one of the MCP-exposed tools.

## Goals
- One static page: hero (org mark + tagline) + a card per product (name,
  one-liner, screenshot, link to the live app, link to the repo).
- Fast, no client-side data fetching, no layout shift.

## Non-goals (v1)
- No auth, no billing, no forms, no backend API.
- No CMS — content is hardcoded in `app/page.tsx`; edit and redeploy when a
  new product ships or copy changes.
- No R2/KV/D1 — nothing to store.

## Modules / resources in use
None. This is a single Cloudflare Worker serving static assets + SSR shell
via vinext. See [ADR-0001](adr/0001-initial-architecture.md).

## Open questions
- None open for v1.

## Milestones
- [x] MVP on `*.workers.dev` (dev) — https://landing-web.yaoxin-yu-intelligent-technology.workers.dev
- [x] Custom domain wired: apex **https://l92-labs.com** (Workers Custom
      Domain, auto-managed DNS + cert)
- [ ] Add a 4th card when the next product ships
