# i18n Completeness Audit — Vietnamese Hardcoded Text

**Date:** 2026-04-13
**Auditor:** code-reviewer
**Scope:** All 10 EN pages + all .tsx/.ts source files under src/

---

## Section 1: Pages with BUG Vietnamese Text (Must Fix)

### 1.1 Homepage `/en` — PARTIAL i18n

Most sections translated via message keys. **BUGs found:**

| Vietnamese Text | Source File | Issue |
|---|---|---|
| `"Video từ vườn xoài Tứ Quý"` (x2) | `src/components/social-video-section.tsx:20,28` | Embed titles hardcoded in SOCIAL_EMBEDS array |
| `"Video từ vườn trái cây Bến Tre"` | `src/components/social-video-section.tsx:36` | Same |
| `"Khách review xoài Tứ Quý"` | `src/components/social-video-section.tsx:44` | Same |
| `"Bài viết từ Fanpage"` (x3) | `src/components/social-video-section.tsx:52,59,67` | Same |

### 1.2 `/en/xoai-tu-quy` — PARTIAL i18n

Most content translated. **BUGs found:**

| Vietnamese Text | Source File | Issue |
|---|---|---|
| `"đ/kg"` | `src/components/product/xoai-tu-quy-landing.tsx:207` | Currency unit hardcoded |
| `"Xe lạnh"` / `"Xe lạnh / Bay"` | `src/components/product/xoai-tu-quy-landing.tsx:39-41` | SHIPPING_ROUTES method labels |
| `"Hà Nội"` / `"Đà Nẵng"` | `src/components/product/xoai-tu-quy-landing.tsx:40-41` | City names in shipping — EXPECTED (proper nouns) |
| All `PRICE_DATA` fields (name, description, badge, note, weight) | `src/lib/price-data.ts:24-61` | Entire price data file is Vietnamese-only, no i18n |
| Gallery image alt texts (6 items) | `src/components/product/xoai-tu-quy-landing.tsx:140-161` | Alt texts hardcoded Vietnamese |

### 1.3 `/en/xoai-hoang-kim` — Uses i18n (13 t() calls)

**BUGs found:** Metadata in `src/content/products.ts` is Vietnamese-only (title, description, keywords, ogTitle, ogDescription, tagline) — rendered in `<head>` for all locales.

### 1.4 `/en/dua-xiem-ben-tre` — Uses i18n (27 t() calls)

**Same as 1.3:** Metadata from `products.ts` is Vietnamese-only.
- `"Xe lạnh"` / `"Xe lạnh / Bay"` in shipping routes — same issue as xoai-tu-quy.

### 1.5 `/en/nguon-goc` — Uses i18n (30 t() calls)

Metadata Vietnamese (`src/app/[locale]/nguon-goc/page.tsx:15-32`). Most body content translated via message keys.

### 1.6 `/en/san-pham` — PARTIAL i18n

Gift section translated. **BUGs found:**

| Vietnamese Text | Source File | Issue |
|---|---|---|
| `"— vựa tư vấn riêng."` | `src/app/[locale]/san-pham/page.tsx:119` | Hardcoded tail text after t() call |
| Entire `ProductCatalog` component | `src/components/product/product-catalog.tsx` | ZERO i18n — all UI text hardcoded |
| `"Trái cây đặc sản Bến Tre"` | product-catalog.tsx:101 | Section tag |
| `"Các loại trái cây" / "từ vựa"` | product-catalog.tsx:104-106 | Section title |
| `"Vựa Trái Cây Bến Tre liên kết..."` | product-catalog.tsx:109-111 | Section description |
| `"Quanh năm"` / `"Mùa: T4, T5..."` | product-catalog.tsx:16-18 | formatSeason() |
| `"Xem chi tiết"` | product-catalog.tsx:56 | CTA link |
| `"Sắp ra mắt"` / `"Đang chuẩn bị"` | product-catalog.tsx:39,65 | Status badges |
| Metadata (title, desc, keywords, OG) | san-pham/page.tsx:13-31 | All Vietnamese |
| Breadcrumbs | san-pham/page.tsx:34-37 | `"Trang chủ"`, `"Sản phẩm"` |
| Product data (name, tagline, heroImageAlt) | `src/content/products.ts` | Used directly in catalog cards |

### 1.7 `/en/kien-thuc` — ZERO i18n (0 t() calls)

**Entire page is Vietnamese.** All text hardcoded in `src/app/[locale]/kien-thuc/page.tsx`:
- Metadata (title, description, keywords, OG)
- Breadcrumbs (`"Trang chủ"`, `"Kiến thức"`)
- Hero section (`"Hướng dẫn đầy đủ"`, `"Kiến Thức"`, `"Xoài Tứ Quý"`, paragraph)
- `"Đọc tiếp"` link text
- `"Khám phá thêm"` section heading
- All internal link labels
- Article data from `src/lib/knowledge-data.ts` (titles, descriptions, categories)
- Pillar labels from `src/lib/articles.ts` PILLAR_LABELS (all Vietnamese)

### 1.8 `/en/tin-tuc` — ZERO i18n (0 t() calls)

**Entire page is Vietnamese.** All text hardcoded in `src/app/[locale]/tin-tuc/page.tsx`:
- Metadata (title, description, keywords, OG)
- Breadcrumbs
- Hero section (`"Vựa Thạnh Phú, Bến Tre"`, `"Tin Tức & Báo Giá"`, etc.)
- `"Đọc tiếp"` link text
- Article data from `src/lib/blog-data.ts` (titles, descriptions, categories)

### 1.9 `/en/giao-hang/tp-hcm` — ZERO i18n (0 t() calls)

**Entire page is Vietnamese.** All text hardcoded in `src/app/[locale]/giao-hang/tp-hcm/page.tsx`:
- Metadata, breadcrumbs, hero text
- WHY_CHOOSE array (4 bullets)
- FAQ array (3 Q&A pairs)
- All section headings and descriptions
- CTA buttons and internal links

### 1.10 `/en/giao-hang/ha-noi` — ZERO i18n (0 t() calls)

**Entire page is Vietnamese.** Same pattern as tp-hcm.

### 1.11 `/en/giao-hang/[city]` (60+ dynamic pages) — ZERO i18n (0 t() calls)

**Entire page is Vietnamese.** All text hardcoded in `src/app/[locale]/giao-hang/[city]/page.tsx`:
- Metadata template strings
- Hero section
- Shipping detail cards (`"Thời gian"`, `"Phí ship"`, `"Đóng gói"`)
- FAQ template strings (4 Q&A)
- Internal link labels
- City data from `src/content/cities.ts` (all notes in Vietnamese)

---

## Section 2: Source Files with Hardcoded Vietnamese (Must Fix)

### CRITICAL — Zero i18n Files (entire files need i18n wiring)

| File | Lines | Content Type |
|---|---|---|
| `src/app/[locale]/kien-thuc/page.tsx` | 165 | Full page — 0 t() calls |
| `src/app/[locale]/tin-tuc/page.tsx` | 177 | Full page — 0 t() calls |
| `src/app/[locale]/giao-hang/tp-hcm/page.tsx` | ~200 | Full page — 0 t() calls |
| `src/app/[locale]/giao-hang/ha-noi/page.tsx` | ~200 | Full page — 0 t() calls |
| `src/app/[locale]/giao-hang/da-nang/page.tsx` | ~200 | Full page — 0 t() calls |
| `src/app/[locale]/giao-hang/[city]/page.tsx` | 257 | Full page — 0 t() calls |
| `src/components/product/product-catalog.tsx` | 125 | Full component — 0 t() calls |

### CRITICAL — Data Files with No i18n

| File | Content |
|---|---|
| `src/lib/price-data.ts` | All tier names, descriptions, badges, notes — used in xoai-tu-quy landing |
| `src/lib/blog-data.ts` | All blog titles, descriptions, categories — used in tin-tuc and homepage |
| `src/lib/knowledge-data.ts` | All knowledge titles, descriptions, categories — used in kien-thuc |
| `src/lib/articles.ts` (PILLAR_LABELS) | Category labels for articles — Vietnamese only |
| `src/content/products.ts` | Product names, taglines, SEO metadata, zalo messages — used across catalog |
| `src/content/cities.ts` | City notes, method labels — used in all giao-hang pages |
| `src/lib/landing-data.ts` | Product descriptions, tags, badges — used in homepage product section |
| `src/lib/fomo-toast-data.ts` | Customer names, ORDER_TEMPLATES fallback, TOAST_CITIES, defaultTimeAgo |
| `src/lib/vua-xoai-images.ts` | All image alt texts |
| `src/lib/mon-xoai-images.ts` | All image alt texts |
| `src/lib/structured-data.ts` | Business name, descriptions, FAQ answers — visible in search results |

### HIGH — Partial i18n Files (have t() but also hardcoded Vietnamese)

| File | Hardcoded Items |
|---|---|
| `src/components/social-video-section.tsx` | SOCIAL_EMBEDS titles (7 items) |
| `src/components/product/xoai-tu-quy-landing.tsx` | `"đ/kg"`, gallery alt texts, SHIPPING_ROUTES methods |
| `src/app/[locale]/san-pham/page.tsx` | Metadata, breadcrumbs, `"— vựa tư vấn riêng."` |
| `src/app/[locale]/layout.tsx` | Default metadata (title, description, keywords, OG) |
| `src/app/[locale]/nguon-goc/page.tsx` | Metadata (though body uses i18n) |
| All knowledge sub-pages under `kien-thuc/*/page.tsx` | Full hardcoded content |
| All blog sub-pages under `tin-tuc/*/page.tsx` | Full hardcoded content |

---

## Section 3: Expected Vietnamese (No Fix Needed)

These are proper nouns that correctly appear in all locales:

| Category | Examples |
|---|---|
| Product brand names | Xoai Tu Quy, Xoai Hoang Kim, Dua Xiem |
| Geographic names | Thanh Phu, Ben Tre, Ba Tri, Binh Dai, Cho Lach |
| Farm/business names | Vuon ong Ba, Vuon chu Tam, Nha vuon Thanh Phu |
| Person names | Anh Phuc, Chi Lan, Anh Toan, Chi Huong, Anh Hung |
| Certification references | CDDL #00124 |
| City names | Ha Noi, TP.HCM, Da Nang (when used as location data) |
| Phone number | 0932 585 533 |

---

## Section 4: Summary

### Totals

| Metric | Count |
|---|---|
| **BUG pages (with untranslated content)** | **10 of 10** |
| **Pages with ZERO i18n** | **6** (kien-thuc, tin-tuc, tp-hcm, ha-noi, da-nang, [city]) |
| **Components with ZERO i18n** | **1** (product-catalog) |
| **Data files needing i18n** | **10** |
| **Total source files needing fixes** | **~25** |

### Priority Order

**P0 — Blocking (entire pages completely Vietnamese on /en):**
1. `giao-hang/[city]/page.tsx` — affects 60+ pages
2. `giao-hang/tp-hcm/page.tsx` — high-traffic static page
3. `giao-hang/ha-noi/page.tsx` — high-traffic static page
4. `kien-thuc/page.tsx` — hub page
5. `tin-tuc/page.tsx` — hub page
6. `product-catalog.tsx` — visible on /san-pham

**P1 — High (data files rendering Vietnamese on EN):**
7. `price-data.ts` — price tiers visible on product landing
8. `content/products.ts` — product metadata in <head> for all locales
9. `content/cities.ts` — city notes on all shipping pages
10. `blog-data.ts` / `knowledge-data.ts` — article titles/descriptions
11. `articles.ts` PILLAR_LABELS — category pills
12. `landing-data.ts` — homepage product cards (though partially overridden by data.products in messages)
13. `structured-data.ts` — appears in Google search results

**P2 — Medium (partial fixes in otherwise-i18n files):**
14. `social-video-section.tsx` embed titles
15. `xoai-tu-quy-landing.tsx` — `"đ/kg"`, gallery alts, shipping method labels
16. `san-pham/page.tsx` — metadata, breadcrumbs, tail text
17. `layout.tsx` — default metadata
18. Image alt texts in `vua-xoai-images.ts`, `mon-xoai-images.ts`
19. `fomo-toast-data.ts` — fallback templates (already has i18n override path)

### Architecture Note

The codebase has a split pattern:
- **Homepage sections** (hero, products, testimonials, contact, FAQ, social, footer, header) — well-i18n'd via `useTranslations`/`getTranslations`
- **Product landings** (xoai-tu-quy, hoang-kim, dua-xiem) — partially i18n'd (body yes, metadata/data no)
- **Content hub pages** (kien-thuc, tin-tuc) — ZERO i18n
- **Shipping pages** (all giao-hang) — ZERO i18n
- **Data files** — all Vietnamese-only, no locale-aware access pattern

To fix systematically: the data files need locale-aware accessor functions (similar to how `data.products` in messages overrides `landing-data.ts`), and the zero-i18n pages need `getTranslations` wiring with corresponding message keys in en/ko/ja.json.

### Metadata Pattern Issue

All `export const metadata: Metadata` objects are statically exported Vietnamese text. Next.js `generateMetadata()` with i18n should be used instead, pulling from message files. This affects SEO for all non-Vietnamese locales — Google sees Vietnamese meta titles/descriptions on English pages.
