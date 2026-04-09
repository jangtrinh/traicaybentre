# Phase 04 — Scoped Article Routes

**Status:** pending
**Effort:** 2-3h
**Blocks:** P05
**Blocked by:** P03

## Context

- Goal: create `[product]/kien-thuc/[slug]/page.tsx` + `[product]/tin-tuc/[slug]/page.tsx` render từ Supabase
- Legacy `src/app/kien-thuc/[slug]/page.tsx` children (6 TSX articles) UNTOUCHED
- Scoped routes handle ONLY new articles (xoài tương lai + dừa + mọi product mới)

## Key Insights

- Static generation via `generateStaticParams` từ `getAllPublishedArticleParams()` → pre-render at build
- ISR: ISR auto-revalidate theo MDX file mtime (pivot: MDX files, no Supabase)
- JSON-LD Article schema reuse `getArticleJsonLd` từ `@/lib/structured-data` (đã có)
- Breadcrumb: `Trang chủ > {product.shortName} > {Kiến thức|Tin tức} > {title}`
- Route must verify product exists in registry + article matches product → block mismatch attacks

## 🔴 Red Team Applied

- **F4 (High):** `getArticleJsonLd` hiện tại nhận `opts: {...}` object, không nhận Article entity. Must write adapter `articleToJsonLdOpts(article)` hoặc update helper để accept Article. Check `src/lib/structured-data.ts:313` signature before implementation.
- **Pivot note:** Content source = MDX files (Phase 03 done). Article type = `{ product, type, slug, urlPath, frontmatter, body, filePath }` — consume via `getArticleByUrlPath(urlPath)` từ `src/lib/articles.ts`. Rewrite page skeleton below theo MDX type shape.

## Requirements

### Functional
- `src/app/[product]/kien-thuc/[slug]/page.tsx` — render article detail
- `src/app/[product]/tin-tuc/[slug]/page.tsx` — same pattern, different `type` filter
- `notFound()` nếu product không exist, article không exist, hoặc article.product !== URL product segment
- Dynamic metadata từ article
- Related articles section (3 bài cùng product + type)
- Markdown/MDX render (choose 1 — prefer MDX via `next-mdx-remote` hoặc simple markdown via `marked` + `dompurify`)

### Non-functional
- SSG/ISR — no request-time Supabase fetch after initial build
- LCP < 2.5s on mobile
- Content sanitized (XSS safe)

## Architecture

### File `src/app/[product]/kien-thuc/[slug]/page.tsx`

```ts
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { getArticleByUrlPath, getRelatedArticles } from "@/lib/articles";
import { ArticleLayout } from "@/components/article/article-layout";
import { getArticleJsonLd, getBreadcrumbJsonLd, SITE_URL } from "@/lib/structured-data";

type Props = { params: Promise<{ product: string; slug: string }> };

export const revalidate = 3600; // fallback revalidate; on-demand via revalidateTag

export async function generateStaticParams() {
  const { getAllPublishedArticleParams } = await import("@/lib/articles");
  const all = await getAllPublishedArticleParams();
  return all.filter(a => a.type === "kien-thuc").map(a => ({ product: a.product, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: productSlug, slug } = await params;
  const urlPath = `/${productSlug}/kien-thuc/${slug}`;
  const article = await getArticleByUrlPath(urlPath);
  if (!article) return {};
  return {
    title: article.seo.title ?? article.title,
    description: article.seo.description ?? article.excerpt,
    keywords: article.seo.keywords ?? undefined,
    alternates: { canonical: `${SITE_URL}${urlPath}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${SITE_URL}${urlPath}`,
      images: article.featuredImage ? [{ url: article.featuredImage, alt: article.featuredImageAlt ?? "" }] : [],
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { product: productSlug, slug } = await params;
  const product = getProduct(productSlug);
  if (!product || product.status !== "active") notFound();

  const urlPath = `/${productSlug}/kien-thuc/${slug}`;
  const article = await getArticleByUrlPath(urlPath);
  if (!article || article.product !== productSlug || article.type !== "kien-thuc") notFound();

  const related = await getRelatedArticles(productSlug, "kien-thuc", slug, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd([
            { name: "Trang chủ", url: SITE_URL },
            { name: product.shortName, url: `${SITE_URL}/${productSlug}` },
            { name: "Kiến thức", url: `${SITE_URL}/kien-thuc` },
            { name: article.title, url: `${SITE_URL}${urlPath}` },
          ])),
        }}
      />
      <ArticleLayout article={article} product={product} related={related} />
    </>
  );
}
```

### File `src/app/[product]/tin-tuc/[slug]/page.tsx`

Same pattern, swap `kien-thuc` → `tin-tuc`. **Extract shared logic** nếu dup > 30 lines → `src/lib/article-page-helpers.ts`.

### Component `src/components/article/article-layout.tsx`

- May already exist (check) — component `article-layout.tsx` spotted trong earlier scout
- Adapt to take `article` + `product` + `related` props
- Render: breadcrumb, title, featured image, excerpt, content (markdown → HTML, sanitized), related articles grid

### MDX/Markdown rendering

Decision tree:
- If repo already uses MDX: extend
- Else: `marked` + `dompurify` on server side → simple, no bundle bloat
- **Prefer simple markdown** (YAGNI) unless marketing plan explicitly requires MDX components

## Files to Create

- `src/app/[product]/kien-thuc/[slug]/page.tsx` (~80 LOC)
- `src/app/[product]/tin-tuc/[slug]/page.tsx` (~80 LOC)
- `src/lib/article-page-helpers.ts` nếu shared logic > 30 LOC
- Markdown renderer util nếu chưa có

## Files to Modify

- `src/components/article/article-layout.tsx` — adapt props signature (check existing first)
- `src/lib/structured-data.ts` — verify `getArticleJsonLd` accept new Article type

## Files to Read

- `src/components/article-layout.tsx` — existing component
- `src/app/kien-thuc/xoai-tu-quy-la-gi/page.tsx` — reference structure (same visual style cần match)

## Implementation Steps

0. **Check `getArticleJsonLd` signature in `src/lib/structured-data.ts:313`** (F4). Current: `(opts: {...})`. Decide: (a) write local adapter `articleToJsonLdOpts(article)` OR (b) extend helper to accept `Article` entity. Prefer (a) — less surface change.
1. Check existing `src/components/article-layout.tsx` — understand current signature
2. MDX rendering: `next-mdx-remote-client` already installed (Phase 03 pivot). Reuse.
3. Adapt `article-layout.tsx` to accept structured props (non-breaking — add new mode)
4. Create `[product]/kien-thuc/[slug]/page.tsx` — consume `getArticleByUrlPath()` from `src/lib/articles.ts`
5. Create `[product]/tin-tuc/[slug]/page.tsx` (DRY: extract shared helper nếu > 30 LOC dup)
6. Write 1 test MDX file: `src/content/articles/xoai-tu-quy/kien-thuc/test-article-scoped.mdx` với `uxReviewed: true` + `publishedAt` in past
7. Navigate `/xoai-tu-quy/kien-thuc/test-article-scoped` → verify render
8. Navigate mismatched `/dua-xiem-ben-tre/kien-thuc/test-article-scoped` → verify notFound (dua-xiem is coming-soon, no route)
9. Verify JSON-LD valid (Rich Results Test)
10. `bun run build` → verify generateStaticParams execute, article pre-rendered
11. Delete test MDX file

## Todo

- [ ] Check existing article-layout.tsx
- [ ] Decide markdown renderer
- [ ] Adapt article-layout props
- [ ] Create kien-thuc scoped route
- [ ] Create tin-tuc scoped route
- [ ] Extract shared helpers nếu cần
- [ ] Supabase test article
- [ ] Render verify
- [ ] JSON-LD validation
- [ ] Build verify
- [ ] Cleanup test article

## Success Criteria

- `/xoai-tu-quy/kien-thuc/{test-slug}` renders article với breadcrumb + JSON-LD
- `/xoai-tu-quy/tin-tuc/{test-slug}` same
- Product mismatch → 404
- Slug not exist → 404
- Legacy `/kien-thuc/xoai-tu-quy-la-gi` still renders (unchanged)
- `generateStaticParams` produces params at build
- Rich Results Test pass for Article schema

## Risks

| Risk | Mitigation |
|------|------------|
| Markdown XSS | Server-side sanitize với `dompurify` (jsdom) hoặc use `marked` with safe mode |
| Dynamic routes collision với `[product]/page.tsx` | Test explicit: `/xoai-tu-quy` (product landing) vs `/xoai-tu-quy/kien-thuc/xxx` (article). Next.js file-based routing handles this. |
| Article `product` field mismatch URL → data integrity risk | Explicit check `article.product === productSlug` before render. Logged as warning server-side. |
| ISR stale cache | `revalidateTag("articles")` from publish endpoint (marketing plan will implement cron). IA plan only wires the tag. |

## Next

→ Phase 05: Global hubs `/kien-thuc`, `/tin-tuc` aggregate legacy + new, dynamic sitemap.
