# Phase 05 — Global Hubs + Dynamic Sitemap

**Status:** pending
**Effort:** 2-3h
**Blocks:** —
**Blocked by:** P03, P04

## Context

- `/kien-thuc` hiện tại: trang list 6 bài xoài hardcoded
- `/tin-tuc` hiện tại: trang list 3 bài xoài hardcoded
- `/sitemap.ts` hiện tại: 16 URLs hardcoded
- Goal:
  1. Revamp `/kien-thuc` + `/tin-tuc` → global hubs list cả legacy (hardcoded TSX) + new (Supabase) với filter by product
  2. Dynamic sitemap từ registry + articles + legacy list
  3. **Zero change** đến URL của legacy articles, chỉ thay đổi hub pages

## Key Insights

- Hub page chỉ chứa card + link → URL đích (flat legacy hay scoped new) không quan trọng với routing
- **Legacy articles already registered in `src/lib/knowledge-data.ts` (`KNOWLEDGE_ARTICLES`) + `src/lib/blog-data.ts` (`BlogPost`)** — reuse, do NOT create new manifest (red-team F2)
- Extend 2 existing files với `product` + `urlPath` fields (additive, backward compat)
- New MDX articles + legacy extended entries merge → unified list → filter UI by product client-side

## 🔴 Red Team Applied

- **F2 (Critical):** DELETE spec cho `src/content/legacy-articles.ts`. Reuse `src/lib/knowledge-data.ts` + `src/lib/blog-data.ts` instead. Extend interfaces additively với `product?: string` + `urlPath?: string` fields.
- **F6 (High):** REMOVE `/lien-he` khỏi sitemap — page không tồn tại.
- **F10 (Medium):** Sitemap phải `export const dynamic = "force-static"` + `revalidate = 3600` để tránh cold-start timeout khi walk MDX filesystem.

## Requirements

### Functional
- `/kien-thuc` hub: show all kien-thuc articles (legacy + new), filter by product chip, sort by publishedAt desc
- `/tin-tuc` hub: same pattern, type=tin-tuc
- Filter UI = client component, URL query param `?product=xoai-tu-quy` (shareable link)
- Sitemap include: static pages + products from registry + all articles (legacy + new)
- Legacy manifest: single source of truth cho 9 TSX articles

### Non-functional
- Hub SSG/ISR
- Sitemap regenerate on article publish (tag-based revalidation)

## Architecture

### Extend existing `src/lib/knowledge-data.ts` + `src/lib/blog-data.ts`

Instead of creating a new manifest, extend existing interfaces additively:

```ts
// src/lib/knowledge-data.ts (modify)
export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  // NEW fields (backward compatible):
  product?: string;      // default "xoai-tu-quy" if undefined
  urlPath?: string;      // default `/kien-thuc/${slug}` if undefined
}
```

Same pattern cho `BlogPost` in `blog-data.ts` (type "tin-tuc"):
```ts
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  coverImage: { src: string; alt: string };
  // NEW (optional):
  product?: string;
  urlPath?: string;
}
```

**Rule**: legacy entries không set `product`/`urlPath` → defaults apply (all legacy = xoai-tu-quy, urlPath = `/kien-thuc/${slug}` or `/tin-tuc/${slug}`). Future extension: nếu có new article scoped, set `urlPath` explicit.

Hub pages giờ merge: MDX articles (từ `getAllPublishedArticles`) + legacy entries (từ `KNOWLEDGE_ARTICLES` + `BLOG_POSTS` arrays).

### Merge helper `src/lib/articles.ts` (extend)

```ts
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge-data";
import { BLOG_POSTS } from "@/lib/blog-data"; // verify name at implementation

export type UnifiedArticle = {
  source: "legacy" | "mdx";
  slug: string;
  product: string;
  type: ArticleType;
  urlPath: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: string;
};

function legacyKnowledgeToUnified(a: KnowledgeArticle): UnifiedArticle {
  const product = a.product ?? "xoai-tu-quy";
  return {
    source: "legacy",
    slug: a.slug,
    product,
    type: "kien-thuc",
    urlPath: a.urlPath ?? `/kien-thuc/${a.slug}`,
    title: a.title,
    excerpt: a.description,
    featuredImage: null,
    publishedAt: a.date,
  };
}

function legacyBlogToUnified(p: BlogPost): UnifiedArticle {
  const product = p.product ?? "xoai-tu-quy";
  return {
    source: "legacy",
    slug: p.slug,
    product,
    type: "tin-tuc",
    urlPath: p.urlPath ?? `/tin-tuc/${p.slug}`,
    title: p.title,
    excerpt: p.description,
    featuredImage: p.coverImage.src,
    publishedAt: p.date,
  };
}

export function getUnifiedArticles(type?: ArticleType): UnifiedArticle[] {
  const mdxArticles = getAllPublishedArticles(type);
  const mdxUnified = mdxArticles.map(a => ({
    source: "mdx" as const,
    slug: a.slug,
    product: a.product,
    type: a.type,
    urlPath: a.urlPath,
    title: a.frontmatter.title,
    excerpt: a.frontmatter.metaDescription ?? "",
    featuredImage: a.frontmatter.ogImage ?? null,
    publishedAt: a.frontmatter.publishedAt,
  }));
  const legacyKnow = type === "tin-tuc" ? [] : KNOWLEDGE_ARTICLES.map(legacyKnowledgeToUnified);
  const legacyBlog = type === "kien-thuc" ? [] : BLOG_POSTS.map(legacyBlogToUnified);
  return [...mdxUnified, ...legacyKnow, ...legacyBlog].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
```

### Hub page `src/app/kien-thuc/page.tsx` (revamp)

```ts
import { Suspense } from "react";
import { getUnifiedArticles } from "@/lib/articles";
import { getActiveProducts } from "@/lib/products";
import { ArticleHubClient } from "@/components/article/article-hub-client";

export const metadata = { /* existing metadata, unchanged */ };

export default async function KienThucHubPage() {
  const articles = await getUnifiedArticles("kien-thuc");
  const products = getActiveProducts();
  return <ArticleHubClient articles={articles} products={products} type="kien-thuc" />;
}
```

Existing `kien-thuc/[slug]/page.tsx` legacy children **untouched** — only `page.tsx` at hub level changes.

### Client component `src/components/article/article-hub-client.tsx`

- Search params hook `useSearchParams` để read `?product=...`
- Chip filter: "Tất cả" + chip per active product
- Card grid từ filtered articles
- Each card linked to `article.urlPath` (legacy flat hoặc scoped new — hub doesn't care)

### Dynamic sitemap `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/lib/products";
import { getUnifiedArticles } from "@/lib/articles";

// F10: force-static + ISR revalidate để tránh cold-start timeout khi walk MDX filesystem
export const dynamic = "force-static";
export const revalidate = 3600;

const BASE = "https://traicaybentre.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // F6: /lien-he removed — page không tồn tại
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/san-pham`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/nguon-goc`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kien-thuc`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/tin-tuc`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/giao-hang/ha-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/giao-hang/tp-hcm`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/giao-hang/da-nang`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
  const products = getActiveProducts().map(p => ({
    url: `${BASE}/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));
  const articles = getUnifiedArticles().map(a => ({
    url: `${BASE}${a.urlPath}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...statics, ...products, ...articles];
}
```

**Critical**: sitemap MUST include all 12 legacy URLs (verify via diff with current `sitemap.ts`). Note: 12 not 13 — `/lien-he` removed.

## Files to Create

- `src/components/article/article-hub-client.tsx` (new, ~120 LOC)

## Files to Modify

- `src/lib/knowledge-data.ts` — extend interface với optional `product` + `urlPath` (additive)
- `src/lib/blog-data.ts` — same
- `src/app/kien-thuc/page.tsx` — revamp to use hub client
- `src/app/tin-tuc/page.tsx` — same
- `src/app/sitemap.ts` — dynamic + force-static
- `src/lib/articles.ts` — add `getUnifiedArticles` merging MDX + knowledge-data + blog-data

## Files to Read

- Existing `src/app/kien-thuc/page.tsx` + `tin-tuc/page.tsx` — preserve SEO metadata
- Each legacy article `page.tsx` — extract title, excerpt, publishedAt, featuredImage for manifest
- `src/app/sitemap.ts` — ensure new sitemap is strict superset of old

## Implementation Steps

0. **AUDIT `KNOWLEDGE_ARTICLES` + `BLOG_POSTS` metadata** (residual from red-team): grep từng entry, verify fields needed by hub cards (title, description, date, category, coverImage for blog). If missing `publishedAt`-like field or image, add defensively. Compare với 9 legacy TSX page metadata (extract from `export const metadata` blocks) — ensure no drift.
1. Extend interfaces `KnowledgeArticle` + `BlogPost` với optional `product` + `urlPath` (additive only)
2. Add `getUnifiedArticles` to `articles.ts`
3. Create `article-hub-client.tsx`
4. Revamp `kien-thuc/page.tsx` + `tin-tuc/page.tsx`
5. Write dynamic `sitemap.ts`
6. **Diff check**: compare old sitemap URLs vs new sitemap output (script or manual) — all 13 legacy URLs MUST present
7. `bun run build` → verify sitemap.xml generated
8. Navigate `/kien-thuc` → see all 6 legacy articles listed
9. Navigate `/kien-thuc?product=xoai-tu-quy` → filter works
10. Navigate `/tin-tuc` → 3 legacy articles
11. Verify click legacy card → goes to legacy URL (e.g. `/kien-thuc/xoai-tu-quy-la-gi`), renders correctly

## Todo

- [ ] Extract legacy article metadata (9 files)
- [ ] Write `legacy-articles.ts` manifest
- [ ] Add `getUnifiedArticles`
- [ ] Create hub client component
- [ ] Revamp kien-thuc hub page
- [ ] Revamp tin-tuc hub page
- [ ] Write dynamic sitemap
- [ ] Sitemap diff verification (old ⊆ new)
- [ ] Build + navigate test
- [ ] Filter query param test

## Success Criteria

- `/kien-thuc` renders 6 legacy articles + any published new articles
- `/tin-tuc` renders 3 legacy articles + any published new articles
- Filter by product works via URL query
- `/sitemap.xml` contains all 13 legacy URLs (verified by diff)
- `/sitemap.xml` contains all active product pages
- `/sitemap.xml` contains all published Supabase articles (currently 0 → 0 new entries)
- Legacy article pages still render correctly when clicked from hub
- No regression in hub page metadata/SEO

## Risks

| Risk | Mitigation |
|------|------------|
| Missing 1 legacy URL from new sitemap | Automated diff: write `scripts/verify-sitemap-superset.ts` reading old sitemap list, assert all present in new |
| Hub filter client component breaks SSR | Test both JS-on and JS-off (noscript fallback shows full list) |
| Legacy manifest drift from actual pages | Comment in manifest file: "Mirror of metadata in src/app/kien-thuc/*/page.tsx. Update both together." |
| `getUnifiedArticles` slow with many Supabase rows | Indexes + limit query; pagination if >100 |

## Next

→ Phase 06: Catalog hub + Navigation updates.
