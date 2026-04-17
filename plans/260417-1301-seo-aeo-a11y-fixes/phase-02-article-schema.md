# Phase 2 — Article Schema Enhancements

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (C1, C3, H1, H5 + 4 best-SEO adds)
- Related shipped: `plans/260409-0754-seo-aeo-xoai-tu-quy/phase-01-technical-seo-aeo.md` (Article schema baseline)
- Depends on: Phase 3 (author Person schema fields)

## Overview

- **Priority:** P0/P1 (4 audit fixes + 4 best-SEO upgrades)
- **Status:** pending
- **Effort:** 90 min
- **Description:** Polish Article JSON-LD and metadata on article route. Close C1 hreflang gap, C3 speakable selector mismatch, H1 dateModified stale, H5 description overflow. Upgrade to TechArticle/NewsArticle per type. Add ImageObject, self-hreflang, ISO 8601 with Asia/Ho_Chi_Minh offset.

## Key Insights

- Audit finding C3: CSS selector `#aeo-answer, blockquote` declared in speakable schema but NO element in 91 article MDX has `id="aeo-answer"` — speakable score zero. Wrap first MDX child or inject wrapper.
- `TechArticle` ranks higher in SERP rich results for how-to/technical queries vs generic `Article` (per Google docs). `/kien-thuc/*` = knowledge = TechArticle. `/tin-tuc/*` = news = NewsArticle.
- ISO 8601 with timezone is explicit ranking signal for Google fresh-content algorithm (TZ-naive dates parse as UTC).
- Self-referential hreflang (page listed in its own alternates) is W3C-compliant and prevents Google from treating alt-locale pages as duplicates.

## Requirements

**Functional:**
- C1: Article metadata `alternates.languages = { vi: canonical, 'x-default': canonical }`
- C3: First MDX rendered block wrapped in `<div id="aeo-answer">` OR inject wrapper via ArticleLayout
- H1: `ArticleFrontmatter.updatedAt?: string`; `dateModified = updatedAt ?? publishedAt`
- H5: `metaDescription` trimmed to ≤160 chars via helper; append "…" if truncated
- Best-SEO 1: Emit `TechArticle` for type `kien-thuc`, `NewsArticle` for `tin-tuc`
- Best-SEO 2: Emit `ImageObject` for hero image with `caption`, `contentUrl`, `contentLocation.name`
- Best-SEO 3: hreflang includes self (locale-specific canonical)
- Best-SEO 4: All date fields = ISO 8601 with `+07:00` offset (Asia/Ho_Chi_Minh) — append if frontmatter is date-only

**Non-functional:**
- `getArticleJsonLd()` signature stays backward-compatible (all new fields optional)
- `structured-data.ts` < 200 lines already; adds ~60 lines → OK (split if exceeds)
- `truncateDescription` pure util, testable

## Architecture

```
src/app/[locale]/[product]/[type]/[slug]/page.tsx
    ├─ generateMetadata() 
    │    ├─ C1: add alternates.languages
    │    └─ H5: call truncateDescription(fm.metaDescription)
    ├─ default export
    │    ├─ H1: dateModified = fm.updatedAt ?? fm.publishedAt  
    │    ├─ Best-SEO 4: ensureIsoWithOffset(date)
    │    ├─ Best-SEO 1: getArticleJsonLd({ schemaType: fm.type === "tin-tuc" ? "NewsArticle" : "TechArticle", ... })
    │    └─ Best-SEO 2: imageObject (if hero image present)

src/lib/articles.ts
    └─ ArticleFrontmatter.updatedAt?: string   (H1)

src/lib/structured-data.ts
    ├─ getArticleJsonLd() — accept schemaType, imageObject, author (Person), dateModified with offset
    ├─ truncateDescription(text, maxLen=160): string
    ├─ ensureIsoWithOffset(iso): string    (append +07:00 if missing)
    └─ getHeroImageObject(opts)

src/components/article-layout.tsx (OR page.tsx)
    └─ C3: wrap MDXRemote first-block child with <div id="aeo-answer">
         — simplest: wrap entire MDXRemote inside <div id="aeo-answer"> since
           speakable can select whole content, first paragraph via CSS
           `#aeo-answer > p:first-child` if needed later
```

**Decision for C3:** wrap `<MDXRemote />` render in `<div id="aeo-answer">...</div>` at page level. Simpler than AST-walk + MDX injection. Covers entire article for voice/read-aloud; Google SpeakableSpecification accepts broad match.

## Related Code Files

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/[product]/[type]/[slug]/page.tsx` (lines 73-101, 128-135, 180-186)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/articles.ts` (line 62 ArticleFrontmatter — add `updatedAt?`)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/structured-data.ts` (lines 351-382 getArticleJsonLd — extend)

**Do not modify:**
- `src/components/article-layout.tsx` (out of scope for C3 — wrap at page.tsx is cleaner)

## Implementation Steps

1. **articles.ts:** Add `updatedAt?: string` to `ArticleFrontmatter` interface (between `author?` and `pillar?`). JSDoc comment: `/** Optional ISO date — falls back to publishedAt for dateModified */`.

2. **structured-data.ts:** Add utilities near top:
   ```ts
   export function truncateDescription(text: string, maxLen = 160): string {
     if (text.length <= maxLen) return text;
     return text.slice(0, maxLen - 1).trimEnd() + "…";
   }
   export function ensureIsoWithOffset(iso: string): string {
     // If string already has +HH:MM or Z, leave it. Else append +07:00.
     if (/(?:Z|[+-]\d{2}:\d{2})$/.test(iso)) return iso;
     // Handle date-only "YYYY-MM-DD" → "YYYY-MM-DDT00:00:00+07:00"
     if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return `${iso}T00:00:00+07:00`;
     return `${iso}+07:00`;
   }
   ```

3. **structured-data.ts:** Extend `getArticleJsonLd`:
   ```ts
   export function getArticleJsonLd(opts: {
     title: string;
     description: string;
     url: string;
     datePublished: string;
     dateModified: string;
     image?: string;
     imageCaption?: string;        // NEW — for ImageObject
     contentLocation?: string;      // NEW — "Bến Tre, Việt Nam"
     schemaType?: "Article" | "TechArticle" | "NewsArticle";  // NEW
     author?: { ... };              // Phase 3 delivers shape
   }) {
     const type = opts.schemaType ?? "Article";
     const image = opts.image
       ? {
           "@type": "ImageObject",
           url: opts.image,
           contentUrl: opts.image,
           caption: opts.imageCaption ?? opts.title,
           ...(opts.contentLocation && {
             contentLocation: { "@type": "Place", name: opts.contentLocation },
           }),
         }
       : `${SITE_URL}/images/xoai-real-2.jpg`;
     return {
       "@context": "https://schema.org",
       "@type": type,
       headline: opts.title,
       description: opts.description,
       url: opts.url,
       datePublished: ensureIsoWithOffset(opts.datePublished),
       dateModified: ensureIsoWithOffset(opts.dateModified),
       image,
       author: opts.author ?? {
         "@type": "Organization",
         name: "Trái Cây Bến Tre",
         url: SITE_URL,
       },
       publisher: { /* existing */ },
       inLanguage: "vi",
       mainEntityOfPage: opts.url,
     };
   }
   ```

4. **page.tsx generateMetadata:**
   ```ts
   import { truncateDescription } from "@/lib/structured-data";
   ...
   const desc = truncateDescription(fm.metaDescription);
   return {
     title: fm.title,
     description: desc,
     keywords: [...].join(", "),
     alternates: {
       canonical,
       languages: { vi: canonical, "x-default": canonical },
     },
     openGraph: { ..., description: desc },
     twitter: { ..., description: desc },
   };
   ```

5. **page.tsx default export (articleJsonLd call):**
   ```ts
   const articleJsonLd = getArticleJsonLd({
     title: fm.title,
     description: truncateDescription(fm.metaDescription),
     url: canonical,
     datePublished: fm.publishedAt,
     dateModified: fm.updatedAt ?? fm.publishedAt,
     image: fm.ogImage ? `${SITE_URL}${fm.ogImage}` : undefined,
     imageCaption: fm.title,
     contentLocation: "Bến Tre, Việt Nam",
     schemaType: article.type === "tin-tuc" ? "NewsArticle" : "TechArticle",
     // author: Phase 3 plugs in Person schema from authors.ts
   });
   ```

6. **page.tsx MDX wrap for C3:**
   ```tsx
   <div id="aeo-answer">
     <MDXRemote source={article.body} options={...} />
   </div>
   ```

7. Verify with:
   - `npx tsc --noEmit`
   - `bun run build`
   - `bun dev` → visit article → view source → JSON-LD has `@type: TechArticle`, ISO date `+07:00`, ImageObject with caption
   - Google Rich Results Test paste URL

## Todo List

- [ ] Add `updatedAt?` field to ArticleFrontmatter (articles.ts)
- [ ] Add `truncateDescription` + `ensureIsoWithOffset` helpers (structured-data.ts)
- [ ] Extend `getArticleJsonLd` signature + body (structured-data.ts)
- [ ] Update `generateMetadata` — hreflang languages + trim description (page.tsx)
- [ ] Update article page render — schemaType + imageObject + dateModified logic (page.tsx)
- [ ] Wrap `<MDXRemote>` in `<div id="aeo-answer">` (page.tsx)
- [ ] Typecheck + build clean
- [ ] Rich Results Test green for 1 `/kien-thuc` + 1 `/tin-tuc` article

## Success Criteria

- View source on `/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi` shows `"@type":"TechArticle"` + `datePublished` with `+07:00` + `ImageObject` with `caption`
- View source on `/xoai-tu-quy/tin-tuc/gia-xoai-*` shows `"@type":"NewsArticle"`
- `<link rel="alternate" hreflang="vi">` + `<link rel="alternate" hreflang="x-default">` both present in article `<head>`
- `<meta name="description">` ≤160 chars (Grep: `<meta name="description" content="([^"]{161,})"`)
- DOM has `<div id="aeo-answer">` wrapping article body
- Rich Results Test: no errors on Article/TechArticle/NewsArticle schema

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Existing articles rely on old getArticleJsonLd signature positional-like usage | Low | Medium | Signature extends with optional fields only — backward-compat. Check all callers: only one at page.tsx:128 |
| `updatedAt` mis-typed in future articles breaks validation | Low | Low | Optional field, fallback to publishedAt. No validation added — YAGNI |
| Description truncation mid-Vietnamese diacritic char | Low | Low | Substring on code units safe for UTF-8; tests: "ừ" survives slice; "…" ellipsis char is 1 code unit |
| TechArticle vs Article ranking regression | Low | Medium | Google accepts both; TechArticle is subtype. Revert by setting schemaType to undefined |
| Hreflang pointing vi-only article to x-default causes duplicate | Low | Medium | Both point same URL — W3C-compliant self-reference. Audit confirmed (line 187: "Giữ gọn, tránh Google flag duplicate") |
| `<div id="aeo-answer">` wrapping entire body bloats speakable target | Low | Low | Google picks first paragraphs by default; wrap is CSS-neutral |

## Security Considerations

- JSON-LD is server-rendered, no user input interpolated raw — titles/descriptions escape via JSON.stringify in `<script type="application/ld+json">`. Already pattern in codebase.
- No XSS vector introduced. Frontmatter is author-controlled MDX, already trusted.

## Next Steps

→ [Phase 3: Author E-E-A-T](phase-03-author-eeat.md) — Person schema author type; consumed by Phase 2's `author` param in getArticleJsonLd
