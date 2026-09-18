# DESIGN.md — landing

The design system for `apps/web`. Palette derived by hand from the org mark
(`apps/web/public/logo.png`) — blue → purple gradient on near-black.

## 1. Brand tokens
Defined in `apps/web/app/brand.css` — the only place raw colors/fonts live.
Components consume the role vars (`--bg`, `--text`, `--primary`, …), never
raw hex values.

## 2. Canonical token home
- `apps/web/app/brand.css` — palette, roles, type scale, spacing.
- `apps/web/public/logo.png`, `favicon.png`, `apple-touch-icon.png` — marks.
- This file — layout/component rules below.

## 3. Type scale
| Token | Size | Use |
| --- | --- | --- |
| `--fs-display` | `clamp(2.25rem, 4vw+1rem, 3.75rem)` | hero headline |
| `--fs-h2` | `clamp(1.5rem, 1.5vw+1rem, 2rem)` | card titles |
| `--fs-body` | `1rem` | body copy |
| `--fs-sm` | `0.875rem` | nav, captions, links |

## 4. Spacing & layout
- 4px base grid: `--space-1` … `--space-16` (4/8/12/16/24/32/48/64).
- Max content width `--container: 72rem`; gutter `--gutter: 1rem`.

## 5. Color roles
`--bg`, `--surface`, `--surface-2`, `--text`, `--text-muted`, `--border`,
`--primary` (blue), `--primary-2` (purple, gradient accent), `--primary-fg`.
Single dark theme for v1 — no light mode toggle.

## 6. Components
- `.card` — product card: screenshot (16:10, `object-fit: cover`, top-
  aligned) + body (title, one-liner, two links). Hover: lift 2px, border
  lightens. 150ms ease-out.
- `.hero` — centered mark + gradient headline + one line of copy.
- `.nav` / `.footer` — minimal, text links only.

## Rules
- Only `brand.css` defines raw colors/fonts. Components use roles/scales.
- New UI = new token in `brand.css` + a line here, not a one-off inline value.
