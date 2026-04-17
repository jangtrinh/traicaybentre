# Content Information Architecture Audit — traicaybentre.com

**Report generated:** 2026-04-17 13:01 | **Scope:** Pillar/cluster structure, internal linking, topical authority, content depth

---

## Content Score: 64/100

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Coverage** | 72 | 3 products, 6 pillars active. Heavy xoài-tu-quy bias; xoài-hoang-kim & dửa-xiem underserved. |
| **Depth** | 68 | xoài-tu-quy articles avg ~1140 words (solid). xoài-hoang-kim & dừa avg 670 words (thin). |
| **Internal linking** | 65 | Related articles present. Pillar-aware ranking enabled. Hero article links weak (hardcoded paths, inconsistent). |
| **Hierarchy** | 58 | Breadcrumb: home → hub → article. No product-scoped hubs; all content surfaces via `/kien-thuc` & `/tin-tuc` only. |
| **Topical clarity** | 54 | Pillar taxonomy exists but underutilized: only 61 of 116 MDX articles tagged. xoài-hoang-kim has 0 pillar tags. |

---

## Inventory: 116 Articles (100 MDX + 6 legacy)

| Product | kien-thuc | tin-tuc | Total | Pillar coverage |
|---------|-----------|---------|-------|-----------------|
| **xoài-tu-quy** | 61 | 39 | 100 | 5/6 active (61 tagged) |
| **xoài-hoang-kim** | 4 | 1 | 5 | 0 tagged → critical gap |
| **dừa-xiem-ben-tre** | 10 | 1 | 11 | Unverified (assumed inherit) |

**Pillar distribution (xoài-tu-quy only):**
- meo-thuong-thuc: 30 articles (49%) — *over-represented*
- heritage-bentre: 17 articles (28%)
- so-sanh-giong: 9 articles (15%)
- ky-thuat-bao-quan: 3 articles (5%)
- gia-thi-truong: 2 articles (3%) — *under-represented for price-sensitive keyword cluster*

**Missing pillar:** `giao-hang-theo-vung` defined in `articles.ts` (l. 47) but 0 articles tagged.

---

## Critical Findings

### [HIGH] Pillar Taxonomy Not Applied to Secondary Products
- **File:** `src/content/articles/{product}/kien-thuc/*.mdx`
- **Evidence:** xoài-hoang-kim 4 articles: zero `pillar:` frontmatter. dừa-xiem 10 articles: pillar tags not set.
- **IA impact:** Articles cannot be discovered via pillar-aware related-article ranking. Homepage hub samples from all pillars but xoài-hoang-kim articles orphaned from this discovery path.
- **Fix:** Add pillar tags to all 15 xoài-hoang-kim & dừa-xiem articles. Recommend: `so-sanh-giong` (hoang-kim vs tu-quy) + `meo-thuong-thuc` (dừa dishes).

### [HIGH] Product-Scoped Hub Pages Missing
- **File:** `src/app/[locale]/[product]/page.tsx`, `src/app/[locale]/kien-thuc/page.tsx`
- **Evidence:** All kien-thuc articles surface via `/kien-thuc` global hub only. No `/xoai-hoang-kim/kien-thuc/` or `/dua-xiem-ben-tre/kien-thuc/` hub.
- **IA impact:** Users on xoài-hoang-kim product page have no contextual content hub. Cross-product SEO authority diluted: Google crawls 116 articles from 2 generic hubs instead of 3 product-specific hubs. Related articles from *other products* surface in "Bài liên quan" (ranking: same product + pillar). Data structure allows it; UI doesn't.
- **Fix:** Create `/[product]/kien-thuc/` and `/[product]/tin-tuc/` dynamic routes. Filter `getAllPublishedArticles()` by product. Example: `/xoai-hoang-kim/kien-thuc/` → shows only 4 hoang-kim articles + global nav breadcrumb: home > xoài hoàng kim > kiến thức > article.

### [MEDIUM] Pillar Imbalance — meo-thuong-thuc Over-Clustered
- **Evidence:** 30/61 xoài-tu-quy articles (49%) tagged `meo-thuong-thuc`. Price pillar only 2 articles.
- **IA impact:** Cluster is too broad (cooking tips, eating tricks, nutrition, recipes). Topical authority fragmented across subtopics instead of unified pillar. Related-article ranking prioritizes article sibling matching over cross-product authority.
- **Recommendation:** Audit 30 mẹo articles; split into 2 sub-pillars if content supports: `meo-an-uong` (consumption tips) + `cong-thuc-che-bien` (recipes). Update `PILLAR_LABELS` mapping. Rebalance to 15-20 per cluster.

### [MEDIUM] Pricing Content Orphaned
- **File:** `src/lib/sitemap-quality-filter.ts` (l. 20-40)
- **Evidence:** 39 tin-tuc articles, many are weekly/monthly price reports (gia-xoai-tu-quy-tuan-20, bao-gia-thang-04). These are **excluded from sitemap** (ephemeral slug filter) but **remain fully crawlable via internal links**.
- **IA impact:** Price pages are high-intent (commercial keywords: "giá xoài", "báo giá xoài") but deprioritized in crawl budget. Homepage hub excludes ephemeral slugs → price articles never linked from highest-authority page. Related articles rendering works → links exist but are "hidden" from Google's first crawl.
- **Fix:** Add 1-2 evergreen price articles to pillar structure (e.g., "Bảng giá xoài tứ quý 2026" linked under `gia-thi-truong`). Keep weekly/monthly reports in sitemap exclusion (correct). But ensure homepage hub includes ≥1 price pillar article to seed the cluster.

### [MEDIUM] Thin Content on Secondary Products
- **Evidence:** xoài-hoang-kim avg 669 words (range: 544–738). dừa avg 907 words. xoài-tu-quy avg 1140 words.
- **IA impact:** Thinner articles = fewer internal link targets = less crawl depth. Secondary products underrepresented in Google's index relative to xoài-tu-quy.
- **Fix:** Expand hoang-kim & dừa cluster articles to 800–1200 words. Add 2 new hoang-kim pillar articles: "Hoàng kim giá bao nhiêu 2026" (price) + "Tửu cách chọn xoài hoàng kim" (selection tips). Ensure word counts ≥800.

### [LOW] Related Articles Linking Incomplete
- **File:** Sample: `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi.mdx` (l. 125–132)
- **Evidence:** MDX end-matter has hardcoded relative links: `/xoai-tu-quy/kien-thuc/cach-chon-xoai-tu-quy-ngon`, but link text is just `{title}` or article title. No "Related topics" section.
- **IA impact:** Authors manually type related-link URLs; risk of 404s on renames. Anchor text is repetitive (not diverse). Example: "Bài liên quan: [Cách chọn xoài tứ quý ngon](/xoai-tu-quy/kien-thuc/cach-chon-xoai-tu-quy-ngon)" — only 1 link style.
- **Fix:** Keep manual links in MDX (author-curated context). But add auto-generated related articles section at bottom (already present in page template, l. 209). Ensure anchor text diversity (title + description snippet).

---

## Content Map

### xoài-tứ-quý (100 articles, maturity: **HIGH**)
**Pillars:**
- **heritage-bentre** (17): CDĐL history, terroir, vùng trồng, nguồn gốc
- **mẹo-thưởng-thức** (30): cách chọn, bảo quản, làm chín, ăn, ích lợi sức khỏe
- **so-sánh-giống** (9): vs cát hòa lộc, cát chu, chuyên đề so sánh
- **kỹ-thuật-bảo-quản** (3): lưu trữ, bao bì, khí hậu kiểm soát
- **giá-&-thị-trường** (2): báo giá, dự báo — **thin cluster**

**Tin-tức:** 39 articles (weekly prices, market reports, seasonal prep, recipes, history stories)

---

### xoài-hoàng-kim (5 articles, maturity: **CRITICAL GAP**)
**Kien-thuc articles:**
1. xoai-hoang-kim-la-gi-khac-tu-quy-thuong.mdx (738w) — intro pillar article
2. cach-an-xoai-hoang-kim-ngon-nhat.mdx (724w)
3. xoai-hoang-kim-qua-bieu-vip-hop-dep.mdx (671w)
4. xoai-hoang-kim-vs-cat-hoa-loc-vs-tu-quy.mdx (544w) — shortest

**Gaps:**
- 0 pillar tags → orphaned from homepage hub rotation
- No price/seasonal content (vs xoài-tu-quy's 39 tin-tuc articles)
- No heritage/history article (compare: xoài-tu-quy has 17 heritage articles)
- No selection/storage how-to (only 1 eating tips article)

**Required to launch as distinct product:**
- 2–3 new pillar articles (price, heritage, selection)
- Retag 4 existing articles with appropriate pillars
- Add 5–10 tin-tuc articles (news peg, seasonal, market reports)

---

### dừa-xiêm-bến-tre (11 articles, maturity: **EMERGING**)
**Kien-thuc articles:**
- 5-mon-uong-tu-dua-xiem-ben-tre (949w)
- Rau-cau-dua-ben-tre-cong-thuc-cach-lam (1176w) — longest
- Dua-ben-tre-cau-chuyen-xu-dua-vua-thanh-phu (1055w) — heritage
- Storage, nutrition, variety-compare, drink recipes

**Gaps:**
- Only 1 tin-tuc (vs xoài's 39–40)
- No pillar tags visible; assumed category inheritance not verified
- No price/seasonal content
- Thin "What is dừa xiêm" intro article (should be ≥1200w pillar)

**Required:**
- Create proper pillar structure (recommend: heritage, recipes/usage, nutrition, variety-compare, storage)
- Tag all 11 existing articles
- Add 8–12 tin-tuc articles
- Expand "dua-so-la-gi" intro to 1200w+ with detailed CDĐL info

---

## Internal Linking Topology

### Flow 1: Homepage → Content (Working)
Homepage → HomepageKnowledgeHub (l. 12–94 in src/components/homepage-knowledge-hub.tsx)
- Renders 12 pillar-diverse articles via `getHomepageFeaturedArticles(12)`
- Rounds-robin articles across pillars to ensure coverage
- Excludes ephemeral slugs (weekly prices, seasonal) — correct crawl-budget strategy
- 2 CTAs: "Xem tất cả kiến thức" (/kien-thuc) + "Tin tức thị trường" (/tin-tuc)

**Issue:** 12 featured articles sampled from ALL products. If xoài-hoang-kim pillar-tagged correctly, it may crowd homepage ahead of dừa (currently 0 tags = auto-excluded).

### Flow 2: Kien-thuc Hub → Articles (Working)
`/kien-thuc` → lists 116 MDX + 6 legacy articles, newest first
- Merged KNOWLEDGE_ARTICLES (legacy static) + getAllPublishedArticles("kien-thuc")
- Breadcrumb: home > kiến thức > article
- Related articles auto-ranked: same product + pillar + type → cross-type pillar fallback

**Issue:** Global hub doesn't partition by product. User on xoài-hoang-kim product page has no product-scoped content gateway.

### Flow 3: Article → Related Articles (Working)
`src/lib/articles.ts#getRelatedArticles()` (l. 206–246)
- Rank order: (1) same product + same pillar + same type > (2) same product + same pillar + opposite type > (3) same product + same type
- Renders up to 6 related articles in "Bài liên quan" section
- Fallback: if no pillar, ranks by type only

**Quality:** solid algorithm for hub-and-spoke. But secondary products (hoang-kim, dừa) have few articles per pillar → related list may be sparse or repeat.

### Flow 4: Footer / Global Nav (TBD)
No footer observed in audit scope. Assume standard: home, products, knowledge hub, news hub, contact, policies.

---

## Recommendations: Next 5 Articles to Write

**Priority tier:** Impact on SEO + IA completeness + commercial value

1. **xoài-hoang-kim-la-gi-pillar-expansion** (1500w, `heritage-bentre` pillar)
   - Topic: Origin, CDĐL status (if any), terroir vs xoài-tu-quy
   - Keyword: "xoài hoàng kim là gì", "xoài hoàng kim bến tre"
   - Unblocks: pillar-aware related articles for all 4 hoang-kim pages

2. **xoai-hoang-kim-gia-bao-nhieu-2026** (800–1000w, `gia-thi-truong` pillar)
   - Topic: Current pricing, wholesale/retail, seasonal, vs tu-quy price gap
   - Keyword: "giá xoài hoàng kim", "mua xoài hoàng kim"
   - Unblocks: price pillar for hoang-kim; enables tin-tuc clustering

3. **dua-xiem-ben-tre-la-gi-expanded** (1200w, `heritage-bentre` pillar)
   - Topic: Expand thin intro; add CDĐL (if exists), terroir, water % age
   - Keyword: "dừa xiêm bến tre là gì", "dừa xiêm vs dừa tây"
   - Unblocks: seed dừa product topical authority

4. **xoai-hoang-kim-cach-bao-quan** (900w, `ky-thuat-bao-quan`)
   - Topic: Storage methods, shelf life, ripening, vs xoài-tu-quy shelf life
   - Keyword: "cách bảo quản xoài hoàng kim"
   - Unblocks: 2nd hoang-kim pillar; cross-pillar related articles

5. **dua-xiem-ben-tre-ba-o-gia-hom-nay** (800w, ephemeral `gia-thi-truong`)
   - Topic: Weekly/monthly coconut pricing, market conditions
   - Keyword: "giá dừa xiêm bến tre", "dừa xiêm bao nhiêu tiền"
   - Unblocks: tin-tuc content loop for dừa product

---

## Internal Linking Fixes

### Add product-scoped hub routes
```typescript
// src/app/[locale]/[product]/[type]/page.tsx (new)
// Route: /xoai-hoang-kim/kien-thuc, /dua-xiem-ben-tre/tin-tuc, etc.
const articles = getAllPublishedArticles(type).filter(a => a.product === product);
const breadcrumb = home > {product.name} > {type.label} > (articles)
```
**Impact:** +3 intermediate hubs seeding product-specific crawl paths. Reduces global hub cardinality pressure.

### Backfill pillar tags (hotfix)
```yaml
# xoai-hoang-kim/* .mdx files: add to frontmatter
pillar: [so-sanh-giong OR heritage-bentre] # based on content
slot: [A|B|C] # for marketing scheduling

# dua-xiem-ben-tre/* .mdx files: add to frontmatter
pillar: [heritage-bentre OR meo-thuong-thuc OR ky-thuat-bao-quan]
```
**Impact:** Unlocks homepage hub sampling for 15 secondary product articles.

### Extend price pillar
Add 1 evergreen pricing article per product:
- xoài-tu-quy: already has 2 (sufficient)
- xoài-hoang-kim: add "xoai-hoang-kim-gia-bao-nhieu-2026" (recommend monthly freshness)
- dừa: add "dua-xiem-ben-tre-bao-gia-2026"

Tag all 3 with `pillar: gia-thi-truong` for homepage rotation.

---

## Passes (Strengths)

✅ **Breadcrumb hierarchy working:** home > hub/product > article rendering correctly  
✅ **Related articles auto-ranking:** pillar-aware matching reduces manual link maintenance  
✅ **Ephemeral sitemap filtering:** crawl budget concentrated on evergreen content (not distracted by weekly prices)  
✅ **FAQ schema rendering:** articles with `faq:` frontmatter generate FAQPage structured data  
✅ **xoài-tu-quy content depth:** 61 pillar-tagged articles + 39 tin-tuc; solid topical coverage  
✅ **Multi-product routing:** URL taxonomy /{product}/{type}/{slug} scales cleanly  

---

## Warnings (Tech Debt)

⚠️ **MDX hero articles hardcode relative paths:** `cach-chon-xoai-tu-quy-ngon` slug hardwired → rename breaks links. No slug alias / redirect config visible. Recommend frontmatter field `slug_aliases: [old-slug]` if rename needed.

⚠️ **Related articles may be sparse for secondary products:** hoang-kim 4 articles + only 1 tagged → even with auto-ranking, "Bài liên quan" will show ≤2 articles. User perceived as thin. Fix: pillar tagging (short term) + new content (long term).

⚠️ **Homepage hub uses round-robin, not relevance ranking:** `getHomepageFeaturedArticles()` (l. 254–280) buckets articles by pillar then alternates. Does NOT weight by word count, engagement, or freshness. Secondary products with thin articles rotate at same cadence as mature products. Recommend: weight by article age + Brix score (metadata) if available.

---

## Unresolved Questions

1. **Does xoài-hoang-kim or dừa-xiêm-bến-tre have Chỉ dẫn địa lý (CDĐL)?** Search results offline; dừa likely has one (GI protected coconut). Should confirm and add to heritage pillar intro articles.

2. **Why is hoang-kim only 5 articles and dừa 11?** Was there a launch date difference? Are more being written? Need visibility into content calendar.

3. **What is the "giao-hang-theo-vung" pillar?** Defined in enum (l. 46, articles.ts) but 0 articles use it. Is this a future pillar or dead code? Recommend remove or seed with 1–2 geo-targeted articles.

4. **Are there geo-targeted landing pages for regional delivery?** Saw `/giao-hang/ha-noi`, `/giao-hang/tp-hcm`, etc. in route list. Do these link to product pages or content? If not, they're orphaned—consider seeding with region-specific reviews or shipping FAQs.

5. **Is there a tag/category index?** No `/tags/` or `/category/` observed. Would improve topic discoverability. Recommend: add `/kien-thuc/pillar/{pillarSlug}` faceted pages.

---

**Report end | 2026-04-17**
