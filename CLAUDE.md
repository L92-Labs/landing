# CLAUDE.md

@AGENTS.md

# Notes for Claude specifically
- Follow `AGENTS.md` (the constitution) exactly.
- Before coding: read `docs/PRD.md` and the latest ADRs in `docs/adr/`.
- Cloudflare-only — do not add AWS/GCP/Azure dependencies; CI rejects them.
- No infra module here (see ADR-0001) — don't add Terraform/KV/D1/R2 without
  a new ADR justifying it first.
- Every change is a PR with green CI (typecheck + cloudflare-only check).
