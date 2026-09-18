<!--
This project follows AGENTS.md (DRY / SOLID / KISS, Cloudflare-only, every change a PR).
Fill in the summary; check the boxes. Delete sections that don't apply.
-->

## Summary
<!-- What & why. Reference the PRD section / ADR / issue this addresses. -->

## Checklist
- [ ] `docs/PRD.md` updated if scope changed
- [ ] ADR added (`docs/adr/NNNN-*.md`) if this is a non-trivial decision
- [ ] `pnpm typecheck` passes locally
- [ ] No off-platform (AWS/GCP/Azure) dependencies — Cloudflare-only
- [ ] Secrets are NOT in code (`wrangler secret` if that ever applies)
- [ ] Tested on `dev` (`*.workers.dev`) before requesting review

## How to test
<!-- Commands or a URL an reviewer can hit. -->

## Risk / rollback
<!-- What could break; how to roll back (revert + `wrangler rollback`). -->
