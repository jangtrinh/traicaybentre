---
status: completed
domain: complicated
mode: fast
created: 2026-04-15
blockedBy: []
blocks: []
---

# SEO Keyword Ranking Improvement

## Problem
traicaybentre.com không ranking cho transactional keywords (giá, mua, đặt) dù có structured data tốt. Đối thủ chiếm top 10 vì có dedicated pages cho từng search intent.

## Solution
3 phases: trang bảng giá, trang đặt hàng, fix canonical/hreflang + freshness signals.

## Phases

| # | Phase | Status | Files |
|---|-------|--------|-------|
| 1 | [Trang bảng giá `/bang-gia`](phase-01-pricing-page.md) | done | 5 files |
| 2 | [Trang đặt hàng `/dat-hang`](phase-02-order-page.md) | done | 4 files |
| 3 | [Canonical fix + freshness + sitemap](phase-03-seo-fixes.md) | done | 4 files |

## Key Dependencies
- `src/lib/price-data.ts` — shared price source (all phases read)
- `src/content/products.ts` — RESERVED_PATHS needs updating (phase 1+2)
- `src/app/sitemap.ts` — add new routes (phase 3)
- `src/lib/structured-data.ts` — add pricing page JSON-LD (phase 1)

## Specs
- Brainstorm: `plans/specs/seo-keyword-ranking/brainstorm.md`
- Use Cases: `plans/specs/seo-keyword-ranking/usecases.md`
