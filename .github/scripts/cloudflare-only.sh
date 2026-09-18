#!/usr/bin/env bash
# Enforce Cloudflare-only dependencies: reject AWS/GCP/Azure/other-cloud SDKs.
# Runs in CI (`.github/workflows/check.yml`). Exit non-zero on a violation.
set -euo pipefail

deny='^(@aws-sdk/|aws-sdk|@google-cloud/|firebase-admin|@azure-|azure-|aliyun|@opentelemetry.*aws|datadog|sentry.*for|@sentry/(?!node)|mongodb$|@elastic|stripe)' \
  shopt -s globstar nullglob
violations=()
for f in **/package.json; do
  # skip node_modules
  case "$f" in *node_modules*) continue;; esac
  # extract dependency names (keys of dependencies / devDependencies blocks)
  names=$(jq -r '(.dependencies // {}) + (.devDependencies // {}) | keys[]?' "$f" 2>/dev/null || true)
  for dep in $names; do
    if printf '%s\n' "$dep" | grep -Eq "$deny"; then
      violations+=("$f -> $dep")
    fi
  done
done

if [ ${#violations[@]} -gt 0 ]; then
  echo "Cloudflare-only violation(s) — off-platform dependency found:" >&2
  printf '  %s\n' "${violations[@]}" >&2
  echo "This project runs on Cloudflare Workers. Use R2/KV/D1/Queues/AI instead." >&2
  exit 1
fi
echo "Cloudflare-only: OK"
