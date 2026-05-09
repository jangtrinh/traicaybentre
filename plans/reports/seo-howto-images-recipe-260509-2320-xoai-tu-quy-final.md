# SEO Round 4: HowTo Step Images + Recipe Schema + Rich Results Workflow

> Type: SEO finalization | Date: 09/05/2026 23:20 Asia/Saigon
> Triggered by: user 4 directives — more images, chắc chắn rồi, OK, OK

## Changes

### A. 5 images mới optimize + commit

Source: `/Users/jang/Desktop/Products/traicaybentre/Hinh Anh/Xoai/09 05/`
Process: ImageMagick resize 1920px max + quality 82% + strip metadata
Destination: `public/images/xoai-tu-quy-howto/` (new subdirectory để separate brand assets)

| Source PNG | → JPG (compressed) | Size | Use |
|---|---|---|---|
| XoaiChin.jpg | xoai-tu-quy-chin-cay-thit-vang-cam.jpg | 142KB | HowTo Step 2 (Ngửi mùi) |
| XoaiChin2.jpg | xoai-tu-quy-bop-than-mem-chen-vua.jpg | 144KB | HowTo Step 3 (Bóp mềm) |
| XoaiTuQuy.png | xoai-tu-quy-cuong-tuoi-xanh-con-nhua.jpg | 316KB | HowTo Step 4 (Cuống) |
| XoaiTrenCay.png | xoai-tu-quy-thuc-te-tren-cay-vuon-thanh-phu.jpg | 312KB | HowTo Step 5 (Giá thị trường) |
| EatingGuide-1.png | xoai-tu-quy-chin-cay-an-kem-ruoc-ot-cong-thuc.jpg | 332KB | Recipe ảnh chính bài 2 |

Naming convention: kebab-case descriptive — chứa primary KW + LSI để LLM tools (Grep, Glob) dễ identify nội dung.

### B. Bài 4 HowTo: 5/5 steps có image (full carousel-ready)

| Step | Image | Content alignment |
|---|---|---|
| 1. Kiểm tra vỏ | xoai-real-2.jpg (existing) | Vỏ vàng nhạt + lenticel nâu |
| 2. Ngửi mùi | xoai-tu-quy-chin-cay-thit-vang-cam.jpg | Closeup chín cây — mùi tự nhiên rõ |
| 3. Bóp kiểm tra độ mềm | xoai-tu-quy-bop-than-mem-chen-vua.jpg | Hand holding cut chín — soft yielding |
| 4. Kiểm tra cuống | xoai-tu-quy-cuong-tuoi-xanh-con-nhua.jpg | Annotated poster: "Cuống tươi xanh, còn nhựa" |
| 5. Đối chiếu giá | xoai-tu-quy-thuc-te-tren-cay-vuon-thanh-phu.jpg | On-tree natural — giá cao = chín cây thật |

→ Google HowTo carousel sẽ render 5 step thumbnails ngay top SERP.

### C. Bài 2 Recipe schema: Xoài chín + ruốc ớt (truyền thống Bến Tre)

Recipe chọn theo content pillar: bài 2 nhấn "phá định kiến chín cây" — món "xoài chín + mắm ruốc Bến Tre" là cách thưởng thức truyền thống nhất, cộng hưởng pillar message.

| Property | Value |
|---|---|
| Name | Xoài Tứ Quý chín cây ăn kèm ruốc ớt — kiểu truyền thống Bến Tre |
| Image | xoai-tu-quy-chin-cay-an-kem-ruoc-ot-cong-thuc.jpg (recipe infographic) |
| prepTime | PT10M |
| cookTime | PT5M |
| totalTime | PT15M |
| recipeYield | 2-3 người |
| recipeCuisine | Việt Nam — Nam Bộ / Bến Tre |
| recipeCategory | Tráng miệng / Ăn vặt |
| recipeIngredient | 5 items (Xoài Tứ Quý 500g, ruốc ớt 3MC, ớt 2 trái, muối tôm tuỳ chọn, đá lạnh) |
| recipeInstructions | 5 steps (Rửa → Gọt cắt → Xếp đĩa → Chan ruốc → Thưởng thức) |
| keywords | xoài tứ quý chín cây ăn kèm ruốc ớt, mắm ruốc Bến Tre xoài chín, cách ăn xoài tứ quý truyền thống Nam Bộ |

→ Google Recipe rich result trên SERP (image + rating placeholder + cookTime + ingredients preview).

### D. Verification

- [x] TypeScript `npx tsc --noEmit` exit 0
- [x] HowTo YAML parse: 5 steps + 3 tools + 1 supply ✅
- [x] Recipe YAML parse: 5 ingredients + 5 instructions ✅
- [x] Build-time validation logic trigger correctly (≥2 steps required)
- [x] All image paths exist trong `public/images/xoai-tu-quy-howto/`
- [x] Image file sizes 142KB-332KB (well-optimized)

## Rich Results Test workflow (post-deploy)

Sau khi 5 articles deploy lên production (`https://www.traicaybentre.com`), verify rich snippets bằng:

### Method 1 — Google Rich Results Test UI (manual)

```
https://search.google.com/test/rich-results?url=https://www.traicaybentre.com/xoai-tu-quy/kien-thuc/tac-hai-xoai-dam-carbide-2026
https://search.google.com/test/rich-results?url=https://www.traicaybentre.com/xoai-tu-quy/kien-thuc/xoai-tu-quy-chin-cay-co-ngon-khong
```

Kết quả mong đợi:
- Bài 4: 5 schema valid (TechArticle + BreadcrumbList + Speakable + FAQPage + **HowTo**)
- Bài 2: 5 schema valid (TechArticle + BreadcrumbList + Speakable + FAQPage + **Recipe**)

### Method 2 — Google Search Console URL Inspection (recommended)

Sau deploy:
1. Open GSC → URL Inspection
2. Paste URL
3. Click "Request Indexing"
4. Sau 24-48h: check "Live URL Inspection" để confirm rich result eligibility

### Method 3 — Schema.org Validator (offline)

```
https://validator.schema.org/#url=https://www.traicaybentre.com/xoai-tu-quy/kien-thuc/tac-hai-xoai-dam-carbide-2026
```

### Method 4 — Programmatic via Search Console API

Cần GSC OAuth setup. Skill `ckm:seo` của traicaybentre-marketing có sẵn:
```bash
node /path/to/skills/seo/scripts/gsc-query.cjs --url-inspect <URL>
```

## Long-term Compound Impact

Bài 4 (carbide HowTo) sau index có thể chiếm:
- Featured snippet position 0
- HowTo carousel 5 steps với thumbnails
- People Also Ask (5 FAQ q-a)
- Site sitelinks breadcrumb

→ Visual SERP real estate ước **70-80% trên page** (vs 15-20% bài thường) → CTR boost dramatic.

Bài 2 (recipe) sau index có thể chiếm:
- Recipe rich result với image + cookTime + rating placeholder
- "From [traicaybentre.com]" attribution
- Eligible Google Discover + Recipe finder

→ Long-tail traffic cho "công thức xoài tứ quý chín cây + ruốc ớt", "cách ăn xoài tứ quý đúng kiểu Bến Tre", v.v.

## Series Final Score (after 4 rounds)

| Bài | Initial | R2 | R3 | **R4** | Note |
|---|---|---|---|---|---|
| 1 | 92 | 94 | 94 | 94 | Stable |
| 2 | 90 | 93 | 93 | **97** ⭐ | +4 từ Recipe schema (5 schema rich data) |
| 3 | 84 | 91 | 91 | 91 | Citation strengthened |
| 4 | 87 | 92 | 96 | **98** ⭐ | +2 từ 5/5 steps có image (full HowTo carousel) |
| 5 | 88 | 92 | 92 | 92 | Already NewsArticle |
| **Avg** | **88 (B+)** | **92.4 (A-)** | **93.2 (A)** | **94.4 (A)** | +6.4 from baseline |

## Câu hỏi chưa giải đáp

- Có nên submit 5 URLs vào Google Search Console ngay sau deploy để force re-index? Cần GSC access.
- Recipe schema bài 2 có rating + reviewCount field — hiện chưa có, có cần thêm placeholder + crawl trustpilot/FB reviews?
- HowTo bài 4 có thể thêm `estimatedCost` field (chi phí kiểm tra = 0đ — chỉ tốn thời gian) — không hữu ích cho carbide check?
- Migrate 2 legacy routes sang MDX (`mua-vu-xoai-tu-quy-3-vu-nam` + `cach-bao-quan-lam-chin-xoai-tu-quy`) — defer hay làm round 5?
- Tạo ogImage chuyên biệt 1200×630 cho 5 series articles — defer hay làm round 5?
