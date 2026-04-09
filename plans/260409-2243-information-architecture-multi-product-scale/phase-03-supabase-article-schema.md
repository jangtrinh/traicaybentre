# Phase 03 — MDX Article System (formerly Supabase Article Schema)

**Status:** ✅ DONE (revised approach)
**Effort:** 2-3h (already executed during marketing plan setup)
**Blocks:** P04, P05
**Blocked by:** P01 (registry — currently hardcoded whitelist, swap when P01 done)

> **PIVOT NOTE (2026-04-09 23:15):** This phase originally specced a Supabase
> `articles` table. After joint review with marketing plan, we pivoted to
> **MDX files in repo** (`src/content/articles/{product}/{type}/{slug}.mdx`)
> for KISS reasons:
> - Git = source of truth, version-controlled, PR-reviewable
> - No DB query for article reads → faster ISR pages
> - No publish cron needed → ISR `publishedAt` gate handles scheduling
> - Vercel free tier compatible (1 cron remaining for price crawler)
> - Cost: ~$15-25/mo total (vs $35-45 with Supabase + Vercel Pro)
>
> All Phase 04+05 routes/sitemap consume MDX via `src/lib/articles.ts` helpers.
> Schema requirements (product-scoped, type enum, status gating, RLS-equivalent
> visibility filter) are satisfied by frontmatter + path conventions.

## Context

- Marketing plan `260409-2215` uses MDX directly to author 90 bài
- IA plan needs MDX as content source for **NEW articles** (xoài future + dừa + new fruits)
- **Legacy TSX articles NOT migrated to MDX** — kept hardcoded, avoid SEO risk
- Helpers in `src/lib/articles.ts` (single file, < 200 LOC)

## Key Insights

- Folder convention `{product}/{type}/{slug}.mdx` mirrors URL pattern from Phase 04
- `type` enum (`kien-thuc` | `tin-tuc`) derived from sub-folder name
- `product` derived from top-level folder, validated against KNOWN_PRODUCTS whitelist
  (TODO: replace with import from `@/content/products` after Phase 01)
- `urlPath` computed: `/${product}/${type}/${slug}` — single source of truth for canonical URL
- `status` flow simplified to **2 boolean gates** in frontmatter:
  1. `uxReviewed: true` — UX writing review pass complete (mandatory)
  2. `publishedAt <= now()` — scheduled time elapsed
- Both gates enforced server-side in `getAllPublishedArticles()` — no draft leak
- ISR auto-revalidates (no cron needed for publish flip)

## Requirements

### Functional
- Folder structure `src/content/articles/{product}/{type}/{slug}.mdx`
- Frontmatter contract enforced (fail fast at build if required fields missing)
- Helper `src/lib/articles.ts` exports:
  - `getArticleByUrlPath(urlPath)` — single article lookup
  - `getArticlesByProduct(product, type?)` — list per product
  - `getAllPublishedArticles(type?)` — global list, newest first
  - `getRelatedArticles(product, type, excludeSlug, limit)` — related cards
  - `getAllPublishedArticleParams()` — `generateStaticParams` source
- Visibility gates enforced consistently across all helpers

### Non-functional
- No DB query → reads are O(files), fast on small N
- Type-safe via exported `Article`, `ArticleType`, `ArticleFrontmatter` interfaces
- `server-only` import guard prevents client bundling

## Frontmatter Contract

```yaml
---
title: "Xoài Tứ Quý là gì?"
publishedAt: "2026-04-10T07:00:00+07:00"
primaryKeyword: "xoài tứ quý là gì"
metaDescription: "..."
uxReviewed: false           # MANDATORY gate
# Optional
secondaryKeywords: ["..."]
ogImage: "/og/..."
uxPassModel: "claude-sonnet-4-6"
author: ai
pillar: heritage-bentre     # marketing topic cluster
slot: A                     # marketing scheduling slot (A=07h, B=12h, C=20h)
faq:
  - q: "..."
    a: "..."
geoCity: "Hà Nội"            # for GEO landing articles
geoRegion: "miền Bắc"
---
```

## Helpers Spec (`src/lib/articles.ts`)

```ts
export type ArticleType = "kien-thuc" | "tin-tuc";
export type ArticleSlot = "A" | "B" | "C";
export type ArticlePillar =
  | "gia-thi-truong" | "ky-thuat-bao-quan" | "so-sanh-giong"
  | "giao-hang-theo-vung" | "meo-thuong-thuc" | "heritage-bentre";

export interface Article {
  product: string;          // path-derived
  type: ArticleType;        // path-derived
  slug: string;             // path-derived
  urlPath: string;          // computed `/${product}/${type}/${slug}`
  frontmatter: ArticleFrontmatter;
  body: string;             // raw MDX
  filePath: string;
}

export function getArticleByUrlPath(urlPath: string): Article | null;
export function getArticlesByProduct(product: string, type?: ArticleType): Article[];
export function getAllPublishedArticles(type?: ArticleType): Article[];
export function getRelatedArticles(product: string, type: ArticleType, excludeSlug: string, limit?: number): Article[];
export function getAllPublishedArticleParams(): Array<{ product: string; type: ArticleType; slug: string }>;
```

## Files Created (✅ DONE)

- ✅ `src/lib/articles.ts` (196 LOC, single file per spec)
- ✅ `src/content/articles/xoai-tu-quy/kien-thuc/sample-xoai-tu-quy-la-gi.mdx` (sample with `uxReviewed: false` to verify gate)
- ✅ Deps installed: `gray-matter`, `next-mdx-remote-client`

## Files NOT Created (pivot dropped)

- ❌ ~~`supabase/migrations/20260409224300_create_articles.sql`~~ — N/A, using MDX
- ❌ ~~Supabase `articles` table~~ — dropped via migration `20260409160926_drop_articles_table_pivot_to_mdx.sql`

## Files Kept (Supabase still used for non-article data)

- ✅ `supabase/migrations/20260409155839_articles_prices_metrics.sql` — `price_history` + `content_metrics` + `holiday_calendar` tables
- ✅ `src/lib/supabase-server.ts` — service-role client (for price crawler + metrics)
- ✅ `src/lib/supabase-public.ts` — anon client (for public price reads)

## Implementation Status

- [x] Folder structure created
- [x] Sample MDX with frontmatter contract
- [x] Helpers in single `src/lib/articles.ts` file
- [x] Visibility gates implemented (uxReviewed + publishedAt)
- [x] generateStaticParams source helper
- [x] Typecheck pass
- [x] Hardcoded KNOWN_PRODUCTS whitelist (swap to registry after IA Phase 01)

## Success Criteria

- ✅ TS types compile clean
- ✅ Loader walks nested folders correctly
- ✅ Visibility gates filter draft / future-dated articles
- ✅ Sample article renders via `getArticleByUrlPath('/xoai-tu-quy/kien-thuc/sample-xoai-tu-quy-la-gi')` returns null (uxReviewed: false → blocked, gate works)
- [ ] Phase 04 routes consume helpers without modification

## Risks (revised)

| Risk | Mitigation |
|------|------------|
| KNOWN_PRODUCTS hardcode drifts from registry | Phase 01 deliverable: replace with `import { products } from "@/content/products"` |
| Frontmatter typo silently breaks article | Loader throws on missing required fields → build fails fast |
| Two gates inconsistent across helpers | All helpers funnel through `getAllPublishedArticles()` filter chain |
| MDX render XSS in Phase 04 | Use `next-mdx-remote-client` (sanitized by default) |

## Security Considerations

- `server-only` import guard prevents client bundling of `node:fs`
- MDX execution sandboxed by `next-mdx-remote-client`
- No user-generated content → no untrusted MDX
- Frontmatter parsed with `gray-matter` (safe YAML)

## Next

→ Phase 04 builds `[product]/[type]/[slug]/page.tsx` consuming `getArticleByUrlPath` + `getRelatedArticles`. No changes to Phase 04 spec needed — helper signatures match exactly.
