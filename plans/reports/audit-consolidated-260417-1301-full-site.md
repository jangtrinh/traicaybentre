# Audit Consolidated — traicaybentre.com
**Date:** 2026-04-17 13:15
**Source:** 5 parallel persona audits (SEO/AEO/Perf/Content-IA/Mobile-A11y)

## Scores

| Dimension | Score |
|---|---|
| SEO Technical | 78/100 |
| AEO/LLM | 73/100 |
| Performance/CWV | 78/100 |
| Content/IA | **64/100** ⚠️ (weakest) |
| Mobile-First | 82/100 |
| WCAG AA | 78/100 |

---

## Critical (P0 — fix ngay, 1 ngày work)

### C1. Article pages thiếu hreflang
- **File:** [src/app/[locale]/[product]/[type]/[slug]/page.tsx:85](src/app/[locale]/[product]/[type]/[slug]/page.tsx#L85)
- **Now:** `alternates: { canonical }` — no `languages`
- **Fix:** Thêm `languages: { vi: canonical, 'x-default': canonical }`
- **Source:** SEO Technical

### C2. public/llms.txt không tồn tại
- **Fix:** Tạo `public/llms.txt` với site map + AI crawler guidance
- **Impact:** ChatGPT/Claude/Perplexity không có citation signal
- **Source:** AEO

### C3. Speakable selector `#aeo-answer` không được dùng
- **File:** [src/app/[locale]/[product]/[type]/[slug]/page.tsx:156-164](src/app/[locale]/[product]/[type]/[slug]/page.tsx#L156)
- **Now:** CSS selector `#aeo-answer, blockquote` nhưng articles không có element nào với `id="aeo-answer"`
- **Fix:** Wrap answer-first paragraphs với `<div id="aeo-answer">` trong article template
- **Source:** AEO

### C4. robots.txt chưa có AI crawler directives
- **File:** `public/robots.txt`
- **Fix:** Add explicit Allow cho GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot
- **Source:** AEO

### C5. Carousel thiếu keyboard nav (arrow keys)
- **File:** `src/components/hero-section.tsx` (hoặc component carousel)
- **Fix:** Thêm `onKeyDown` handler cho ←/→
- **WCAG level:** 2.1.1 (A)
- **Source:** Mobile/A11y

### C6. Hamburger touch target 36×36px (< 44px Google min)
- **File:** component nav, class `h-9 w-9`
- **Fix:** `h-11 w-11`
- **Source:** Mobile/A11y

---

## High (P1 — fix trong sprint, 1-2 ngày)

### H1. `dateModified` = `publishedAt` luôn
- **File:** [page.tsx:133](src/app/[locale]/[product]/[type]/[slug]/page.tsx#L133)
- **Fix:** Thêm field `updatedAt?: string` vào `ArticleFrontmatter`, fallback về `publishedAt`
- **Source:** AEO + prior audit

### H2. Author hardcoded = org name, thiếu E-E-A-T
- **File:** `src/lib/articles.ts` `ArticleFrontmatter.author`
- **Fix:** Extend author type: `{ name, jobTitle, bio?, url?, sameAs? }`
- **Source:** AEO

### H3. xoài-hoàng-kim + dừa-xiêm articles thiếu pillar tags
- **Impact:** Orphaned khỏi homepage discovery + related-article
- **Fix:** Review tag logic, assign pillars cho 16 articles
- **Source:** Content/IA

### H4. Product hubs routes chưa tồn tại
- **Impact:** Articles chỉ surface qua `/kien-thuc` global; không có `/xoai-hoang-kim/kien-thuc/` route
- **Fix:** Tạo product-scoped listing routes
- **Source:** Content/IA

### H5. Article meta descriptions > 160 chars (~180 measured)
- **Fix:** Trim trong frontmatter/generator
- **Source:** SEO

### H6. Shipping pages `/giao-hang/{city}` thiếu FAQPage schema
- **Fix:** Add FAQPage JSON-LD với city-specific Q&A
- **Source:** SEO

### H7. 19 recipe articles thiếu HowTo schema
- **Fix:** Detect recipe frontmatter type, emit HowTo JSON-LD với `step` + `image`
- **Source:** AEO

### H8. Form focus outline ring yếu
- **Fix:** Replace `focus:border-text` với `focus-visible:outline-2 outline-offset-2`
- **WCAG:** 2.4.7 (AA)
- **Source:** Mobile/A11y

### H9. Skip-to-content link missing
- **Fix:** Thêm `<a href="#main" className="sr-only focus:not-sr-only">`
- **WCAG:** 2.4.1 (A)
- **Source:** Mobile/A11y

---

## Medium (P2 — backlog)

### M1. FAQ depth shallow (5-8 → 10-15 targeted queries)
### M2. Zero external authority citations (.gov.vn, wikipedia, báo chí)
### M3. Carousel images 2-8 thiếu `loading="lazy"`
### M4. GTM preconnect chưa có
### M5. Content imbalance: xoai-tu-quy 100 bài vs xoai-hoang-kim 5 bài, dua-xiem 11 bài
### M6. Pillar distribution skewed: `mẹo-thưởng-thức` 49% (30/61)
### M7. Giá pillar chỉ có 2 articles
### M8. Regional delivery pillar có định nghĩa nhưng 0 articles
### M9. Unused deps (@anthropic-ai, @supabase) — verify tree-shaking
### M10. Vietnamese font subset reflow risk
### M11. Pause carousel với `prefers-reduced-motion`

---

## Passes (giữ nguyên)

- ✓ Homepage structured data (15+ schemas)
- ✓ Sitemap 111 URLs + ISR 1hr
- ✓ Canonical per-page override layout default
- ✓ hreflang cho static routes + product pages (verified)
- ✓ Image optimization: avif+webp, Next/Image, priority hero, 8 fonts preload
- ✓ Answer-first structure trên 91 articles
- ✓ CDĐL #00124 schema cross-reference
- ✓ Related articles algorithm
- ✓ Sitemap ephemeral filter (~40 URLs excluded từ crawl, vẫn live)
- ✓ Semantic HTML đầy đủ (header/nav/main/article/footer)
- ✓ Single H1, heading hierarchy OK
- ✓ Mobile menu: role=dialog + aria-modal + ESC + focus trap
- ✓ Color contrast: #10B981 on #FFFEE7 = 5.2:1 (AA+)
- ✓ All 8 carousel images có alt descriptive
- ✓ Form label association + honeypot
- ✓ Reduced-motion respected trong article styles
- ✓ No render-blocking resources
- ✓ GTM/GA4 load afterInteractive
- ✓ No API keys exposed, server-only imports

---

## Quick wins (30 phút-1 giờ, impact cao)

1. **Tạo llms.txt** (5 phút) — AEO boost
2. **Add AI crawler rules vào robots.txt** (10 phút) — AEO
3. **Hamburger size h-9 → h-11** (5 phút) — Mobile UX
4. **Skip-to-content link** (20 phút) — WCAG A
5. **Article hreflang alternates** (10 phút) — SEO dup fix

Total: ~50 phút → +12 điểm tổng hợp.

---

## Grouped fixes theo file

### `src/app/[locale]/[product]/[type]/[slug]/page.tsx`
- C1 hreflang languages
- C3 wrap `#aeo-answer` div
- H1 dateModified logic
- H5 meta description trim

### `src/lib/articles.ts`
- H1 updatedAt field
- H2 author E-E-A-T fields

### `public/`
- C2 llms.txt (new)
- C4 robots.txt (edit)

### `src/components/` (navigation + hero + forms)
- C5 keyboard nav carousel
- C6 hamburger size
- H8 focus outline
- H9 skip link

### `src/app/[locale]/giao-hang/` 
- H6 FAQPage schema

### Content ops (non-code)
- H3 pillar tagging 16 articles
- H4 product hub routes
- H7 HowTo schema cho recipes (19 articles)

---

## Unresolved questions

1. **hreflang strategy articles:** Articles hiện vi-only. Giữ `languages: { vi, x-default }` hay chờ dịch rồi mới thêm? → Giữ gọn, tránh Google flag duplicate.
2. **Product hubs URL:** `/xoai-hoang-kim/kien-thuc` hay `/kien-thuc?product=xoai-hoang-kim`? → Chọn đường /product/kien-thuc/ để match article URL pattern.
3. **Author E-E-A-T:** Dùng real person hay Org-as-Author? → Cần user quyết định.
4. **HowTo schema trigger:** Auto-detect recipe via frontmatter `type: "recipe"` hay manual tag?
5. **FAQ depth target:** Google thường chọn 8-12 cho Voice. Tăng lên 10 đủ chưa, hay 15?
