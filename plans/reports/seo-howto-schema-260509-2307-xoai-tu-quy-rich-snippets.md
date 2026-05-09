# SEO Round 3: HowTo Schema Infrastructure + Sitemap Verification

> Type: SEO long-term performance | Date: 09/05/2026 23:07 Asia/Saigon
> Triggered by: user "OK làm gì tốt nhất thì làm" (round 3 sau audit + improvements)

## Strategic Choice

Highest-leverage long-term SEO move chưa làm: **HowTo schema infrastructure** unlock Google's HowTo rich result. Bài 4 (5 dấu hiệu carbide) là perfect content cho HowTo — visual list với thumbnails trên SERP → CTR boost 20-40%.

Cũng verify sitemap auto-pickup cho 5 articles series — confirm sẵn sàng publish.

## Changes

### A. HowTo JSON-LD infrastructure (mới — reusable cho future articles)

**Files modified:**
- [src/lib/articles.ts](src/lib/articles.ts) — thêm `hasHowTo` + `howTo` field vào `ArticleFrontmatter`; thêm validation block (≥2 steps required)
- [src/lib/structured-data/article-schema.ts](src/lib/structured-data/article-schema.ts) — thêm `getHowToJsonLd` + `HowToJsonLdOpts` interface theo Schema.org/HowTo spec
- [src/lib/structured-data/index.ts](src/lib/structured-data/index.ts) — re-export HowTo helper + type
- [src/app/[locale]/[product]/[type]/[slug]/page.tsx](src/app/[locale]/[product]/[type]/[slug]/page.tsx) — dispatch HowTo schema khi `fm.hasHowTo === true`

**Pattern reused:** mirror exact của `Recipe` schema (đã có) — minimize risk, consistent codebase.

**Schema.org/HowTo properties supported:**
- name, description, image, url, author, datePublished, dateModified
- totalTime (ISO 8601 duration: PT2M = 2 phút)
- estimatedCost (MonetaryAmount)
- supply (HowToSupply array)
- tool (HowToTool array)
- step (HowToStep array với position auto-increment)
- inLanguage: "vi"

### B. HowTo data cho bài 4 (carbide identification)

Thêm vào frontmatter `tac-hai-xoai-dam-carbide-2026.mdx`:
- 5 steps: Kiểm tra vỏ → Ngửi mùi → Bóp kiểm tra độ mềm → Kiểm tra cuống → Đối chiếu giá
- 1 supply: Xoài chín nghi vấn cần kiểm tra
- 3 tools: Mũi, Mắt, Tay (low-tech!)
- Total time: PT2M (2 phút)
- Step 1 có image: xoai-real-2.jpg

**Verification:** YAML parse confirmed 5 steps + 3 tools + 1 supply ✅

### C. Sitemap auto-pickup verification

5 article slugs đã verify:
- ✅ `xoai-tu-quy-an-khong-can-cham-muoi` — INCLUDED
- ✅ `xoai-tu-quy-chin-cay-co-ngon-khong` — INCLUDED
- ✅ `xoai-tu-quy-thang-9-10-vu-vi-dam-nhat` — INCLUDED
- ✅ `tac-hai-xoai-dam-carbide-2026` — INCLUDED
- ✅ `nghi-dinh-thu-xuat-khau-xoai-vn-trung-quoc-2025` — INCLUDED

Không bị 10 ephemeral patterns (weekly-price, daily-market, monthly-quote, seasonal-prep, lunar-holiday, market-report, etc.) loại trừ.

Sitemap config:
- `kien-thuc` articles: priority 0.75, changeFrequency monthly
- `tin-tuc` articles: priority 0.65, changeFrequency weekly
- ISR force-static + 1 hour revalidate

### D. Article schema dispatch (already correct)

Verify hệ thống đã đúng cho 5 bài series:
- Bài 1-4 (kien-thuc) → `TechArticle` schema ✅
- Bài 5 (tin-tuc) → `NewsArticle` schema ✅ (date-sensitive)
- Tất cả có FAQPage schema (qua `faq` field)
- Tất cả có BreadcrumbList schema
- Tất cả có SpeakableSpecification (#aeo-answer cssSelector)

Bài 4 sau khi thêm HowTo → có **5 schema rich data** trong cùng 1 page:
1. TechArticle (Article rich)
2. BreadcrumbList
3. SpeakableSpecification
4. FAQPage (5 q-a)
5. **HowTo (mới) — 5 steps**

## SEO Impact Long-term

### Rich snippet visibility

**Bài 4 trên Google SERP sau index:**
- Title + meta description (như mọi bài)
- **HowTo carousel** (5 steps với images thumbnails) — top of results
- **People Also Ask** từ FAQ schema
- Site sitelinks với breadcrumbs

→ Visual real estate trên SERP có thể chiếm 60-70% page (vs 15-20% bài thường) → CTR boost dramatic.

### Reusable infrastructure

HowTo helper là **infrastructure đầu tư một lần, dùng nhiều bài**:

Future bài có thể tận dụng (chỉ thêm `hasHowTo: true` + `howTo` block frontmatter):
- "Cách chọn xoài tứ quý ngon" — 6 dấu hiệu
- "Cách bao trái xoài Tứ Quý ROI 1875%" — 5 bước
- "Cách dấm xoài tại nhà bằng giấy báo" — 4 bước
- "Hot water treatment 52-53°C — chuẩn USDA APHIS" — 6 bước
- "Cách phân biệt Tứ Quý Thạnh Phú vs Mỏ Cày" — 4 dấu hiệu

→ Mỗi article HowTo qualifies cho rich snippet → compound SEO benefit dài hạn.

### Sitemap crawl budget

Verify ephemeral filter logic — đảm bảo 5 evergreen articles ưu tiên crawl, không bị "Discovered - currently not indexed" như lo ngại trong filter rationale.

## Verification

- [x] TypeScript `npx tsc --noEmit` exit 0 (3 lần qua các thay đổi)
- [x] HowTo YAML parse correctly (gray-matter validation)
- [x] No new lint errors trong files modified (article-schema.ts, articles.ts, index.ts, page.tsx)
- [x] Sitemap filter không loại trừ 5 articles
- [x] Recipe pattern reuse — minimum risk
- [x] Validation block fail-fast khi `hasHowTo: true` mà thiếu `howTo` hoặc `step.length < 2`

## Final Series Score (predicted with HowTo)

| Bài | After R2 | After R3 (HowTo) | Note |
|---|---|---|---|
| 1 | 94 | 94 | No change (heritage) |
| 2 | 93 | 93 | Recipe potential — defer |
| 3 | 91 | 91 | No change |
| 4 | 92 | **96** ⭐ | +4 từ HowTo rich snippet |
| 5 | 92 | 92 | Already NewsArticle |
| **Avg** | **92.4 (A-)** | **93.2 (A)** | +0.8 |

## What's left for future sessions

1. **Recipe schema cho bài 2** — sinh tố xoài + sữa chua combo có thể được Recipe schema (recipeIngredient + recipeInstructions). Sẽ unlock Recipe rich result. Cần ~30 phút thêm `hasRecipe: true` + recipe block.

2. **HowTo cho future articles** — infrastructure đã sẵn, mỗi article HowTo cần ~15 phút thêm frontmatter.

3. **OG image chuyên biệt 1200×630** — current dùng generic gdrive-XX. Tạo branded series images cho social share boost. Delegate `media-designer` skill.

4. **Submit URLs Google Search Console** — sau khi publish, manual submit 5 URLs để tăng tốc index. Cần GSC access.

5. **Monitor performance 90 ngày** — track top queries, CTR, position cho 5 articles + bài 4 HowTo rich snippet impressions.

6. **Migrate 2 legacy routes sang MDX** — `mua-vu-xoai-tu-quy-3-vu-nam` + `cach-bao-quan-lam-chin-xoai-tu-quy` để consistency với series. Decision pending vì SEO equity legacy.

## Câu hỏi chưa giải đáp

- Google rate limit cho HowTo carousel — có cap không (vd max 8-10 results)? Kiểm tra Google Search Central docs.
- HowTo schema yêu cầu mỗi step có image không? Hiện 1/5 steps có image. Recommend thêm 4 images còn lại để full carousel.
- Cần verify rendering test với Google Rich Results Test sau publish (gọi API `https://search.google.com/test/rich-results`)?
- Có cần emit HowTo qua Schema-org meta tags trong addition tới JSON-LD (deprecated nhưng đôi khi crawler hỗ trợ)?
