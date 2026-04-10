---
title: "Information Architecture — Multi-Product Scale"
description: "Scale vựa từ mono-product (Xoài Tứ Quý) sang multi-product (+ Dừa Xiêm Bến Tre + N loại tương lai). Hybrid Legacy-Preserving, SEO-first zero redirect."
status: shipped
priority: P1
effort: 3-5d
branch: main
tags: [ia, routing, seo, scalability, products-registry, mdx]
created: 2026-04-09
updated: 2026-04-09
domain: complex
mode: hard
---

# IA Multi-Product Scale — Hybrid Legacy-Preserving

**Source:** `plans/reports/brainstorm-260409-2243-information-architecture-multi-product-scale.md`
**Hard constraint:** **SEO-first — ZERO redirect legacy URLs. Không đụng URL đã rank.**

## Goal

Scale site từ mono-product (chỉ Xoài Tứ Quý) sang multi-product (thêm Dừa Xiêm Bến Tre + N loại tương lai) mà:
1. Không đụng 1 URL legacy nào (`/xoai-tu-quy`, 6 bài `/kien-thuc/*`, 3 bài `/tin-tuc/*`, `/nguon-goc`, `/giao-hang/*`)
2. Thêm loại trái mới = 1 entry registry + assets (zero code change routing)
3. Topic cluster cho content MỚI: `/{product}/kien-thuc/[slug]`, `/{product}/tin-tuc/[slug]`
4. Content source = Supabase-backed (align với marketing-daily-articles plan)
5. Global hubs `/kien-thuc` + `/tin-tuc` = filter aggregation (list legacy + new)

## Acceptance Criteria

- [ ] Zero drop GSC impressions/clicks cho 13 URL legacy trong 4 tuần post-launch
- [ ] Thêm loại trái mới = chỉnh `src/content/products.ts` + thêm assets, không chỉnh route code
- [ ] LCP/INP không regress vs baseline hiện tại (Lighthouse CI)
- [ ] Typecheck/lint/build pass
- [ ] `/xoai-tu-quy` render identical (visual diff 0%)
- [ ] Marketing plan (`260409-2215`) có thể resume sau khi Phase 04+05 done — URL pattern + Supabase schema sẵn sàng

## Phases

| # | Phase | Status | Effort | Files | Blocking |
|---|-------|--------|--------|-------|----------|
| 01 | [Foundation & Products Registry](phase-01-foundation-and-registry.md) | ✅ done | 2-3h | 3 new | — |
| 02 | [Dynamic Product Template](phase-02-dynamic-product-template.md) | ✅ done | 3-4h | 2 new, 1 delete | P01 |
| 03 | [MDX Article System](phase-03-supabase-article-schema.md) | ✅ done | 2-3h | `src/lib/articles.ts` + `src/content/articles/` | P01 (whitelist hardcoded for now) |
| 04 | [Scoped Article Routes](phase-04-scoped-article-routes.md) | ✅ done (pre-shipped during MDX pivot) | 2-3h | `[product]/[type]/[slug]/page.tsx` | P03 |
| 05 | [Global Hubs + Dynamic Sitemap](phase-05-global-hubs-and-sitemap.md) | ✅ done | 2-3h | sitemap.ts + 2 interfaces | P03, P04 |
| 06 | [Catalog Hub + Navigation](phase-06-catalog-hub-and-navigation.md) | ✅ partial (catalog done, header dropdown deferred) | 3-4h | /san-pham + catalog + footer | P01, P02 |
| 07 | [Homepage Seasonal Hero + /nguon-goc rewrite](phase-07-homepage-seasonal-hero.md) | ⏸ deferred (YAGNI — only 1 active product, no visual change needed; resume khi dua-xiem launch) | 3-4h | 4-5 files | P01, P06 |
| 08 | [Verify & Acceptance](phase-08-verify-and-acceptance.md) | ✅ done (core checks) | 2-3h | build + tree verify | ALL |

**Scope lock:** Plan này **không** bao gồm launch Dừa Xiêm Bến Tre (content + landing). Đó là plan riêng sau khi infra ready. Xoài legacy TSX articles **không migrate** — giữ nguyên hardcoded.

## Red Team Review

**Session:** 2026-04-09 23:15 | **Report:** `reports/red-team-260409-2315-ia-multi-product-plan.md`
**Findings:** 12 total (12 accepted, 0 rejected)
**Severity:** 3 Critical, 5 High, 4 Medium

| # | Finding | Severity | Disposition | Applied To |
|---|---------|----------|-------------|------------|
| 1 | Type collision `Product` → rename `ProductEntry` | Critical | Accept | P01 |
| 2 | Legacy manifest duplicate → reuse `knowledge-data.ts` + `blog-data.ts` | Critical | Accept | P05 |
| 3 | Broken hero image paths → scout real paths | Critical | Accept | P01 |
| 4 | `getArticleJsonLd` signature mismatch → adapter | High | Accept | P04 |
| 5 | `getProductJsonLd` missing → add as P02 deliverable | High | Accept | P02 |
| 6 | `/lien-he` doesn't exist → remove from URL map/sitemap/nav | High | Accept | plan.md, P05, P06 |
| 7 | Header LOC overflow → mandatory extract before dropdown | High | Accept | P06 |
| 8 | Registry ordering inverted → P01 blocking checkbox for whitelist swap | High | Accept | P01 |
| 9 | Migration mid-state collision → single atomic commit | Medium | Accept | P02 |
| 10 | Sitemap MDX read at request time → `force-static` + revalidate | Medium | Accept | P05 |
| 11 | `/nguon-goc` rewrite scope → LOCKED additive only | Medium | Accept | P07 |
| 12 | Coming-soon in `generateStaticParams` → active only + no link in catalog | Medium | Accept | P02, P06 |

## Key Decisions (locked tại brainstorm)

1. **Approach C′ Hybrid Legacy-Preserving** — zero redirect legacy
2. **Brand**: unified TraiCayBenTre
3. **Homepage**: seasonal hero rotate theo tháng + product showcase section
4. **Dừa slug**: `/dua-xiem-ben-tre`
5. **Catalog hub**: `/san-pham` (URL mới)
6. **CTA**: per-product Zalo pre-fill + ContactSection homepage (⚠️ `/lien-he` KHÔNG tồn tại — removed per red-team F6)
7. **About**: giữ `/nguon-goc` H1 + intro 200 words untouched, ADD sections below (additive only, red-team F11 locked)
8. **Content xoài tương lai**: `/xoai-tu-quy/kien-thuc/[slug]` (scoped)
9. **Product template**: dynamic từ registry
10. **Content source MỚI**: ~~Supabase-backed~~ → **MDX files in repo** (`src/content/articles/{product}/{type}/{slug}.mdx`) — pivoted 2026-04-09 23:15 cho KISS/free tier. Legacy TSX articles KHÔNG migrate
11. ~~IA blocks marketing-daily-articles~~ → **Marketing plan unblocked** sau khi Phase 03 done với MDX. Phase 04 routes consume `src/lib/articles.ts` helpers

## Current State (scouted)

- **Legacy content** = hardcoded TSX pages (1 route/bài, ~366 LOC/bài inline JSX)
- **Legacy routes** đã có JSON-LD Article schema (`@/lib/structured-data`)
- **No CMS/MD/Supabase content table yet** — Supabase dùng cho pricing/leads (check Phase 03)
- **12 legacy URLs** cần preserve (revised from 13 — `/lien-he` removed, doesn't exist):
  - `/xoai-tu-quy`, `/nguon-goc`, `/kien-thuc`, `/tin-tuc`
  - 6 `/kien-thuc/*` + 3 `/tin-tuc/*`
  - `/giao-hang/{ha-noi,tp-hcm,da-nang}` (neutral, không đụng)

## Architecture Overview

```
src/
  app/
    [product]/                       ← NEW dynamic product route
      page.tsx                       ← render từ registry
      kien-thuc/[slug]/page.tsx      ← scoped article (new)
      tin-tuc/[slug]/page.tsx        ← scoped article (new)
    san-pham/page.tsx                ← NEW catalog hub
    xoai-tu-quy/                     ← DELETE sau Phase 02 verify (dynamic [product] replaces)
    kien-thuc/                       ← GIỮ NGUYÊN (legacy articles + /kien-thuc list)
      page.tsx                       ← revamp → global hub (list all, filter)
      [legacy articles]              ← UNTOUCHED
    tin-tuc/                         ← GIỮ NGUYÊN (same pattern as kien-thuc)
    nguon-goc/page.tsx               ← additive sections, GIỮ H1 + intro (F11)
    sitemap.ts                       ← dynamic + force-static + revalidate=3600 (F10)
  content/
    products.ts                      ← NEW registry (type ProductEntry, not Product)
    articles/                        ← DONE (P03) MDX files
  lib/
    products.ts                      ← NEW helpers (getSeasonalHeroProduct, etc.)
    articles.ts                      ← DONE (P03) MDX reader; P01 swap KNOWN_PRODUCTS → getProductSlugs
    knowledge-data.ts                ← EXTEND với optional product + urlPath (F2)
    blog-data.ts                     ← EXTEND với optional product + urlPath (F2)
    structured-data.ts               ← ADD getProductJsonLd (F5); check getArticleJsonLd signature (F4)
```

## Risks & Mitigation

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | Static `/xoai-tu-quy/page.tsx` conflict với dynamic `[product]/page.tsx` | HIGH | Next.js: static thắng dynamic. Plan: implement dynamic + verify parity → delete static cuối Phase 02. Feature flag nếu cần rollback. |
| 2 | Dynamic `[product]` accidentally matches legacy routes (`/kien-thuc`, `/nguon-goc`, `/san-pham`, `/giao-hang`, `/tin-tuc`) | CRITICAL | `[product]/page.tsx` phải `notFound()` nếu slug không trong registry. Whitelist strict. Unit test cover reserved paths. |
| 3 | Content source conflict với marketing plan | RESOLVED | Phase 03 pivoted sang MDX files (Git-native). Marketing plan unblocked. |
| 4 | Visual regression xoài landing post-migrate | HIGH | Phase 02 E2E visual diff old vs new. Pixel-perfect required. |
| 5 | Global hub `/kien-thuc` revamp làm hỏng `/kien-thuc/[slug]` (legacy articles) | MEDIUM | Next.js: `page.tsx` + nested `[slug]/page.tsx` độc lập. Chỉ đụng `/kien-thuc/page.tsx`, không đụng legacy children. |
| 6 | Sitemap dynamic miss legacy URLs | HIGH | Phase 05 sitemap test: snapshot so sánh — tất cả 12 legacy URLs phải present. |
| 7 | `/nguon-goc` rewrite làm rớt ranking | MEDIUM | Preserve H1 "xoài tứ quý" keywords, chỉ thêm section về vựa + multi-product. Keyword density stable. |
| 8 | MDX filesystem walk in sitemap → cold start timeout | MEDIUM | `force-static` + `revalidate = 3600` (F10). Plus `generateStaticParams` for articles (build-time). |
| 9 | Type `Product` collision với `landing-data.ts` | CRITICAL | Rename new type to `ProductEntry` (F1). Verify typecheck post-create. |
| 10 | Duplicate legacy article manifest | CRITICAL | Reuse `knowledge-data.ts` + `blog-data.ts`, extend additively (F2). |
| 11 | Header LOC > 200 cap after dropdown | HIGH | Mandatory extract `desktop-nav.tsx` + `mobile-menu-trigger.tsx` first (F7). |

## SEO Safeguards (hard constraint enforcement)

- ❌ **Zero `redirects()` entry trong `next.config.ts`** — tuyệt đối không redirect legacy
- ✅ Canonical URL per page (từ `urlPath` nếu có, else tự động)
- ✅ JSON-LD Product schema cho `[product]/page.tsx` (từ registry metadata)
- ✅ JSON-LD Article schema cho scoped articles (reuse `@/lib/structured-data`)
- ✅ Breadcrumb schema product-scoped: `Trang chủ > Xoài Tứ Quý > Kiến thức > {title}`
- ✅ Internal linking: product page → cả 6 legacy `/kien-thuc/*` (boost equity)
- ✅ Sitemap include cả legacy URLs + dynamic new URLs
- ✅ GSC baseline snapshot trước launch (Phase 08)

## Dependencies

**Blocks:** None (marketing plan unblocked after Phase 03 MDX pivot)

**Blocked by:** None

**Coordinates with:** `260409-2215-marketing-daily-articles` — marketing authors MDX directly into `src/content/articles/{product}/{type}/`. IA Phase 04 routes will render those files. No DB dependency.

## Next Steps

1. User review plan + approve
2. Execute Phase 01 → 08 sequentially via `/ck:cook`
3. Phase 08 acceptance → unblock marketing plan
4. Separate plan: Launch Dừa Xiêm Bến Tre (content + landing + images)
