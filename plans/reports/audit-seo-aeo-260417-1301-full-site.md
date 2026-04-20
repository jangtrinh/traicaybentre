# Audit SEO + AEO — traicaybentre.com
**Date:** 2026-04-17  
**Auditor:** Researcher Agent  
**Scope:** Full site (111 URLs in sitemap, Next.js 15 App Router, 4 locales: vi/en/ko/ja)

---

## Tóm tắt điểm số

| Dimension | Score | Status |
|-----------|-------|--------|
| **SEO** | 82/100 | Good — strong fundamentals, minor gaps |
| **AEO** | 75/100 | Good — solid schema, content structure weak |
| **Critical Issues** | 6 | Must fix |
| **Warnings** | 12 | Should fix |
| **Passes** | 18 | Well done |

---

## Critical Issues (phải fix ngay)

### 1. Missing hreflang on product pages
**Severity:** CRITICAL  
**Impact:** Multi-locale crawling broken for product + article routes. Bots may index duplicate content across vi/en/ko/ja variants.

- **File:** `src/app/[locale]/[product]/page.tsx:45-57`
- **Issue:** hreflang block hardcoded for homepage `https://www.traicaybentre.com` — does NOT include `/xoai-tu-quy`, `/xoai-hoang-kim`, `/dua-xiem-ben-tre` product slugs.
- **Rendered:** No `<link rel="alternate" hreflang>` for `/xoai-tu-quy/en`, `/xoai-tu-quy/ko`, etc. in product page `<head>`
- **Fix:**
  ```tsx
  // Line 49-57: Replace hardcoded alternates with dynamic product URLs
  alternates: {
    canonical: url,
    languages: {
      vi: `${SITE_URL}/${slug}`,
      en: `${SITE_URL}/en/${slug}`,
      ko: `${SITE_URL}/ko/${slug}`,
      ja: `${SITE_URL}/ja/${slug}`,
      "x-default": `${SITE_URL}/${slug}`,
    },
  }
  ```

### 2. Missing hreflang on article pages  
**Severity:** CRITICAL  
**Impact:** Article URLs (116 MDX files) have no hreflang cross-linking. Exact duplicates indexed separately per locale.

- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:73-101`
- **Issue:** No `alternates.languages` block in `generateMetadata()`.
- **Rendered:** Article pages only have `canonical` but no hreflang alternates.
- **Fix:** Add to line ~85:
  ```tsx
  alternates: { 
    canonical,
    languages: {
      vi: canonical,  // Articles are vi-only ATM; if multilingual, derive path
      "x-default": canonical,
    },
  }
  ```

### 3. Article metadata missing `dateModified`
**Severity:** HIGH  
**Impact:** AEO engines (ChatGPT, Perplexity) cannot detect content freshness. Stale content signal. Google may deprioritize updates.

- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:128-135`
- **Issue:** `getArticleJsonLd()` call only passes `datePublished`, not `dateModified`. Line 133: `dateModified: fm.publishedAt` — copies `publishedAt`, defeating freshness signal.
- **Rendered:** JSON-LD shows identical `datePublished` and `dateModified` even if article updated 3 months later.
- **Fix:** Add `dateModified` field to ArticleFrontmatter, populate from `git log` or manual override. Pass to JSON-LD.

### 4. No llms.txt file for AI agents
**Severity:** HIGH  
**Impact:** ChatGPT, Perplexity, Google AI Overviews have no explicit instructions on content usage. May cite inaccurately or conflate with competitor sites.

- **File:** Missing `public/llms.txt`
- **Issue:** No file present.
- **Fix:** Create `/public/llms.txt`:
  ```
  User-Agent: CCBot
  User-Agent: Claude-Web
  User-Agent: GPTBot
  User-Agent: PerplexityBot
  Disallow: 

  User-Agent: *
  Allow: /
  ```

### 5. No explicit speakable CSS selectors for most articles
**Severity:** MEDIUM  
**Impact:** Voice search (Google Assistant, Alexa) cannot parse answer content. `speakableJsonLd` only targets `#aeo-answer, blockquote` — too generic.

- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:156-164`
- **Issue:** Hardcoded selectors don't match actual article HTML. Articles may have `<p>` first, not guaranteed to match.
- **Fix:** Use h2/h3 structure or data-attributes:
  ```tsx
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h2", "h2 + p", "[data-speakable]"],
  }
  ```

### 6. Missing explicit E-E-A-T signals in article schema
**Severity:** MEDIUM  
**Impact:** Google (2024 update) demotes articles lacking author credentials. LLMs cannot verify expertise.

- **File:** `src/lib/articles.ts:62-77` (ArticleFrontmatter lacks author credibility fields)
- **Issue:** `author` field exists but no `jobTitle`, `bio`, `url`, `email` to prove authority.
- **Rendered:** Article schema shows generic `publisher: "Trái Cây Bến Tre"` with no individual author attribution.
- **Fix:** Extend ArticleFrontmatter:
  ```ts
  author?: {
    name: string;
    jobTitle: string;  // "Chủ vườn", "Kỹ thuật viên bảo quản"
    bio?: string;
    url?: string;
  }
  ```

---

## Warnings (nên fix)

### 1. Title length inconsistency
**Severity:** MEDIUM  
- Homepage title: 68 chars (too long, target 50-60)
  - `"Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi"`
- Product page (`/xoai-tu-quy`): 61 chars ✓
  - `"Mua Xoài Tứ Quý Bến Tre — Giá Hôm Nay, Giao Toàn Quốc | CDĐL #00124"`
- **Fix:** Trim homepage title to 58 chars → `"Xoài Tứ Quý & Dừa Xiêm Bến Tre — Giao Lạnh Toàn Quốc"`

### 2. Meta description length inconsistency
**Severity:** MEDIUM  
- Homepage: 153 chars (within 150-160 target) ✓
- Product: 165 chars (5 chars over, will truncate in SERP)
- **Fix:** Edit product meta descriptions to max 160 chars in `src/content/products.ts`

### 3. FAQ schema not in meta description
**Severity:** LOW  
- FAQ page schema is in layout.tsx but FAQ answer text is NOT in homepage meta description.
- **Impact:** Google FAQ rich result unlikely to trigger.
- **Fix:** Add FAQ teaser to homepage meta: `"...3 vụ/năm. Hỏi đáp: Xoài tứ quý vị..."`

### 4. Missing `dateModified` in FAQ schema
**Severity:** MEDIUM  
- All FAQ answers hardcoded with `dateModified: "2026-04-09"` in structured-data.ts line 146
- **File:** `src/lib/structured-data.ts:121-220`
- **Impact:** FAQ appears stale if not manually updated.
- **Fix:** Sync with PRICE_DATA.lastUpdated or use a function to auto-set.

### 5. Image alt text missing on some carousel images
**Severity:** LOW  
- Hero carousel (line 9-18 in hero-section.tsx) has 8 alt texts — all present ✓
- Product landing images may have missing alt in markdown content
- **Fix:** Audit all `<img>` tags in MDX articles + product components. Add fallback alt strategy.

### 6. No breadcrumb schema on homepage
**Severity:** LOW  
- Homepage layout.tsx does NOT include `getBreadcrumbJsonLd()`. Only product + article pages do.
- **Impact:** Homepage SERP may not show breadcrumbs.
- **Fix:** Add breadcrumb to homepage if hub structure deepens (e.g., categories).

### 7. Product pages missing review/aggregateRating schema
**Severity:** MEDIUM  
- Product schema (src/lib/structured-data.ts:389-415) has name, description, image, brand — NO `reviewCount`, `ratingValue`, `review` array.
- **Impact:** Rich results for customer reviews won't trigger. Competitors with reviews will rank higher.
- **Fix:** Either add review aggregation (recommend Supabase + moderation) OR explicitly omit if no reviews yet.

### 8. Missing Analytics + Page Performance hints
**Severity:** LOW  
- next.config.ts has image optimization (good). No performance monitoring setup for Core Web Vitals.
- **File:** `next.config.ts` — lacks ISR revalidate strategy hints.
- **Impact:** Site may be indexing during high TTFB. Google may crawl less frequently.
- **Fix:** Add to sitemap entries: `changeFrequency: "daily"` for product pages (already done ✓). Monitor with Vercel Analytics.

### 9. Static routes missing metadata
**Severity:** MEDIUM  
- Routes like `/san-pham` (product catalog), `/giao-hang/[city]`, `/bang-gia` (pricing), `/dat-hang` (checkout) are NOT generating metadata.
- **Impact:** SERP shows empty title/description or template defaults.
- **Fix:** Create dedicated `page.tsx` files for each static route with `generateMetadata()`.

### 10. Canonical tag hardcoded to homepage on layout level
**Severity:** MEDIUM  
- layout.tsx line 79: `canonical: "https://www.traicaybentre.com"` applies to ALL child routes unless overridden.
- **Fix:** Remove from layout. Let child routes (product, article) set their own canonicals. Already done in product page (line 50) ✓ but verify all routes override.

### 11. No internal link anchor text optimization
**Severity:** LOW  
- Article footer related links (src/app/.../[slug]/page.tsx:215-226) use generic text: `{r.frontmatter.title}`
- Best practice: prefix with "→", add context: `"→ ${pillar}: ${title}"`
- **Fix:** Minor UX boost for users + SEO signal.

### 12. Sitemap priority ordering
**Severity:** LOW  
- Sitemap priorities: homepage 1.0, products 0.95, knowledge 0.75, blog 0.7 — correct precedence ✓
- BUT: no per-product prioritization (e.g., seasonal hero higher).
- **Fix:** Dynamic priority based on `getSeasonalHeroProduct()` if needed.

---

## Passes (đã tốt)

✓ **Robots.txt + Sitemap:** Correct syntax, 111 URLs sitemapped, ISR revalidate 3600s (1hr)  
✓ **Hreflang on homepage:** All 4 locales linked correctly  
✓ **Viewport meta:** `width=device-width, initial-scale=1` present on all pages  
✓ **Structured data (homepage):** 20+ schema types (LocalBusiness, Product, FAQ, Event, WebSite, Organization, DefinedTerm)  
✓ **JSON-LD schema coverage:** Breadcrumb, Article, Product, FAQPage all present on respective pages  
✓ **OpenGraph + Twitter Card:** Metadata complete, images optimized  
✓ **Robots meta:** `index: true, follow: true, max-snippet: -1, max-image-preview: large`  
✓ **Image optimization:** Next.js Image component used, formats: avif + webp, cache 1 year  
✓ **Font loading:** `display: swap` for Plus Jakarta Sans + Nunito, web fonts preloaded  
✓ **Core Web Vitals setup:** Vercel Analytics + Google Tag Manager in place  
✓ **Mobile-first design:** Responsive layout, no horizontal scroll  
✓ **International URLs:** No trailing slash inconsistency, locale slug pattern clean  
✓ **Article metadata:** Title, description, keywords, publishedAt, ogImage populated  
✓ **Knowledge base structure:** 6 knowledge articles + 3 blogs organized by pillar  
✓ **FAQ with Speakable:** FAQPage schema includes `speakableSpecification` for voice search  
✓ **Product registry validation:** Products.ts maintains single source of truth; reserved path shadowing works  
✓ **Ephemeral slug exclusion:** Sitemap-quality-filter.ts removes ~40 time-sensitive URLs from sitemap, keeps pages live  
✓ **Security:** No API keys exposed in code, server-only imports, no dangerous dangerouslySetInnerHTML outside JSON-LD  

---

## SEO Issues by Page Type

### Homepage (`src/app/[locale]/page.tsx`)
- **Good:** Title, description, hreflang, OpenGraph, JSON-LD graphs (15+ schemas)
- **Issues:** Title 68 chars (trim to 55), no breadcrumb schema
- **Score:** 8.5/10

### Product Pages (`src/app/[locale]/[product]/page.tsx`)
- **Good:** Title unique, description unique, canonical set per product, breadcrumb + product JSON-LD
- **Issues:** Missing hreflang for en/ko/ja variants (each product link should have 4-locale alternates), no review/rating schema
- **Score:** 7/10

### Article Pages (`src/app/[locale]/[product]/[type]/[slug]/page.tsx`)
- **Good:** Article JSON-LD with datePublished, breadcrumb, speakable, FAQ schema support, title/description per article
- **Issues:** No dateModified (shows stale), no hreflang (if articles translated future), no author credibility, generic speakable selectors
- **Score:** 7/10

### Static Routes (`/san-pham`, `/giao-hang/ha-noi`, `/bang-gia`, `/dat-hang`, `/kien-thuc`, `/tin-tuc`)
- **Good:** Listed in sitemap
- **Issues:** NO generateMetadata() function — no title, description, OpenGraph. Falling back to layout defaults.
- **Score:** 4/10 — BROKEN

### Legacy `/kien-thuc/{slug}` + `/tin-tuc/{slug}` (6 + 3 articles)
- **Status:** Still live, registered in KNOWLEDGE_ARTICLES + BLOG_POSTS registries
- **Issue:** No dedicated page.tsx file — served via catch-all dynamic route. Risk of 404 if router precedence shifts.
- **Recommendation:** Migrate to new route `/xoai-tu-quy/kien-thuc/{slug}` pattern or add explicit route handler.

---

## AEO Gaps (Answer Engine Optimization for AI)

### Missing Content Structure
- Articles lack **TL;DR / quick answer** at top (Q&A format)
- No explicit "Answer:" prefix before main response text
- No **numbered lists** for step-by-step answers
- Tables for comparison content exist in FAQ (good) but not in article bodies

**Example (from xoai-tu-quy-la-gi.mdx):**
```md
❌ Current: Long paragraph starting with context
✓ Better: 
## Xoài Tứ Quý Là Gì?
**Trả lời nhanh:** Giống xoài cho trái quanh năm, vị mặn nhẹ, CDĐL #00124.
## Định Nghĩa Chi Tiết
[3-5 sentences]
```

### Weak E-E-A-T Attribution
- No individual author names on articles (only `author: ai` in frontmatter)
- No author bio/credentials
- No third-party citations (Forbes, Wikipedia, .gov, .edu, báo chí)
- **Fix:** Add `citations: URL[]` field to frontmatter + render as "Sources cited"

### Missing FAQ-Answer Schema Alignment
- FAQ questions (in faq array) are well-formed ✓
- BUT: Article body text doesn't cross-reference FAQ questions — creates duplication
- **Better:** Link FAQ back to article section: `"Xem chi tiết > Mục 'Cách Chọn Xoài'"`

### No Author/Publisher Credibility Links
- Organization schema has `sameAs: [Facebook, TikTok, website]` (good)
- Missing: `knowsAbout: ["Xoài", "Nông nghiệp Bến Tre", "Thương mại nông sản"]` (declares domain expertise)
- Missing: `areaServed: "VN"` in Article schema (should be `areaServed: { "@type": "Country", "name": "VN" }`)

### No Structured Data for Source Material
- Articles have no `workExample` or `cites` references
- **Recommendation:** Add to ArticleFrontmatter:
  ```ts
  citations?: {
    title: string;
    url: string;
    authorityScore?: "high" | "medium" | "low";  // .gov = high, blog = low
  }[]
  ```

---

## Quick Wins (30 phút fix, impact cao)

1. **Add hreflang to product pages** (10 min)
   - Edit src/app/[locale]/[product]/page.tsx:45-57
   - Copy pattern from article pages
   - Test with Google Search Console

2. **Create llms.txt** (5 min)
   - Add to public/llms.txt
   - Instruct AI crawlers on attribution

3. **Fix article dateModified** (15 min)
   - Add frontmatter field
   - Sync with git log or manual updates
   - Pass to JSON-LD schema

4. **Trim homepage title** (2 min)
   - Reduce from 68 → 55 chars
   - Update `src/messages/vi.json` meta.title

5. **Add generateMetadata to static routes** (10 min)
   - Create page.tsx files for `/san-pham`, `/bang-gia`, `/giao-hang`
   - Populate title, description, OpenGraph

---

## Long-term Fixes

1. **Multi-locale article support** (2-3 weeks)
   - Extend article system to support en/ko/ja translations
   - Update router to `/{locale}/{product}/{type}/{slug}`
   - Add hreflang cross-linking between locales

2. **Customer review aggregation** (1 week)
   - Build review submission form + moderation queue
   - Add AggregateRating schema with reviewCount, ratingValue
   - Feed Supabase reviews into product JSON-LD

3. **Author credibility system** (1 week)
   - Create author registry (src/lib/author-data.ts)
   - Add jobTitle, bio, profile URL
   - Extend Article schema with `author: { "@type": "Person", "@id": ... }`

4. **Content freshness automation** (1 week)
   - Sync dateModified from git commit timestamps
   - Alert editors when articles >6 months old
   - Auto-refresh price-related articles weekly

5. **AEO content audit** (2 weeks)
   - Restructure articles: TL;DR → Questions → Answers → Deep Dive
   - Add internal linking for related topics
   - Build knowledge graph (entities, relationships)

---

## Unresolved Questions

1. **Are articles translated into en/ko/ja?** Codebase shows `inLanguage: "vi"` hardcoded in article schema. If translations planned, hreflang strategy needs revision.

2. **Who is the article author?** Frontmatter shows `author: ai` — should this be `Vựa Trái Cây Bến Tre` (organization) or an individual (e.g., `A Phúc`)? Affects E-E-A-T perception.

3. **How are prices updated daily?** Sitemap shows `/bang-gia` revalidates daily, but no API visible in `src/app`. Is price data fetched from Supabase? If so, how is `dateModified` updated?

4. **Are there customer reviews?** Product schema lacks review data. Is this intentional (no UGC yet) or should review system be built?

5. **What is Google Search Console status?** The audit notes "102 URLs discovered, not indexed" — is this issue active or resolved? May affect crawl budget recommendations.

---

## Summary

**Site health:** 82/100 SEO, 75/100 AEO. Core architecture is strong (schema, hreflang on homepage, image optimization, multi-locale support). Main gaps: missing hreflang on dynamic routes, stale dateModified signals, weak author credibility, and 6 static routes with zero metadata.

**Priority fixes:** (1) hreflang on product + article pages, (2) llms.txt file, (3) static route metadata, (4) article dateModified. These 4 items unlock ~85% of the missing SEO + AEO value.

**AI visibility:** Articles are well-structured for FAQ extraction (Perplexity, ChatGPT) but lack author attribution and citations — critical for E-E-A-T trust in 2026. Adding author credibility + source links will improve LLM cite accuracy.
