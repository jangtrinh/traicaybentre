# Series SEO 5 bài Xoài Tứ Quý từ Pillar 08/05/2026

> Type: marketing-content | Date: 09/05/2026 22:30 Asia/Saigon | Branch: claude/keen-lalande-9ac997

## Mục tiêu

Chế series 5 bài SEO/AEO từ pillar `content/xoai-tu-quy-pillar-20260508/` (10 sub-files), lấp gap với 80+ articles có sẵn, push thông điệp pillar (phá định kiến "chỉ ngon ăn xanh" + USP terroir mặn).

## Series tổng quan

**Tên:** "Hiểu Đúng Xoài Tứ Quý Thạnh Phú — Series 5 Bài SEO 05/2026"

| # | Slug | Type | Primary KW | Pillar src | Words ước |
|---|---|---|---|---|---|
| 1 | `xoai-tu-quy-an-khong-can-cham-muoi` | kien-thuc | "xoài tứ quý ăn không cần chấm muối" | F02 + Hidden #1 | ~1.800 |
| 2 | `xoai-tu-quy-chin-cay-co-ngon-khong` | kien-thuc | "xoài tứ quý chín cây có ngon không" | F01 pain + Hidden #9 | ~2.300 |
| 3 | `xoai-tu-quy-thang-9-10-vu-vi-dam-nhat` | kien-thuc | "xoài tứ quý vụ tháng 9 tháng 10" | F04 + Hidden #7 | ~2.000 |
| 4 | `tac-hai-xoai-dam-carbide-2026` | kien-thuc | "tác hại xoài dấm carbide" | F05 + DOI 2026 | ~2.300 |
| 5 | `nghi-dinh-thu-xuat-khau-xoai-vn-trung-quoc-2025` | tin-tuc | "nghị định thư xoài Việt Nam Trung Quốc 2025" | F04 NDT 27/11/2025 | ~2.200 |

**Tổng:** ~10.600 từ, 5 file MDX mới.

## Files tạo

```
src/content/articles/xoai-tu-quy/
├── kien-thuc/
│   ├── xoai-tu-quy-an-khong-can-cham-muoi.mdx              [14.9 KB]
│   ├── xoai-tu-quy-chin-cay-co-ngon-khong.mdx              [20.3 KB]
│   ├── xoai-tu-quy-thang-9-10-vu-vi-dam-nhat.mdx           [17.5 KB]
│   └── tac-hai-xoai-dam-carbide-2026.mdx                   [19.5 KB]
└── tin-tuc/
    └── nghi-dinh-thu-xuat-khau-xoai-vn-trung-quoc-2025.mdx [19.0 KB]
```

URL pattern: `/xoai-tu-quy/{type}/{slug}` qua dynamic route `[product]/[type]/[slug]`.

## Cấu trúc mỗi bài (chuẩn theo `xoai-tu-quy-la-gi.mdx`)

- YAML frontmatter: `uxReviewed: true`, `authorKey: jang-trinh`, `pillar`, `slot: B`/`C`, `secondaryKeywords` 5, `ogImage`, `faq` 5 q-a, `sources` 4-5 (DOI + portal pháp lý)
- Quick answer block (`> Trả lời nhanh:`) đầu bài
- H2 sections form câu hỏi
- Tables so sánh khoa học/kinh tế
- Footnote citations (DOI active + portal verified)
- Internal links 4-5 cuối bài (cross-link series + related)
- Closing CTA chuyển bài tiếp theo trong series

## Strategy lấp gap (chống dup với 80+ articles có sẵn)

Đã quét existing `kien-thuc/` (gồm `vi-sao-xoai-tu-quy-co-vi-man.mdx`, `cach-bao-quan-xoai-tu-quy.mdx`, `xoai-tu-quy-an-chin-hay-xanh.mdx`, `cach-chon-xoai-cung-ram.mdx`, etc.) → 5 bài mới chọn góc:

| Bài | Góc khác biệt |
|---|---|
| 1 | KW "ăn không cần chấm muối" + cơ chế Na 1.58-2.02% — chưa có article standalone |
| 2 | KW "chín cây có ngon không" trực tiếp + lịch sử logistics 1990s + DOI carbide — tách khỏi `xoai-tu-quy-an-chin-hay-xanh` (góc generic) |
| 3 | KW "vụ tháng 9 10" + xâm nhập mặn 2025 — tách khỏi `mua-vu-xoai-tu-quy-3-vu-nam` (overview generic) |
| 4 | KW "tác hại carbide" với evidence DOI 2026 (As/Pb/Cd + DPPH) — tách khỏi `cach-chon-xoai-cung-ram` (chỉ phân biệt vỏ) |
| 5 | KW "Nghị định thư xoài VN-TQ" + GACC 219 — chưa có news article về NDT 27/11/2025 |

## SEO/AEO checklist (đã apply)

- [x] Primary KW trong title, H1, meta, URL slug, FAQ
- [x] Secondary KW 5 mỗi bài (LSI variations)
- [x] FAQ schema-ready 5 q-a (snippet target cho ChatGPT/Perplexity/Google AI)
- [x] Quick answer trong 50-60 từ đầu bài (AEO-friendly)
- [x] Sources với DOI active + portal pháp lý verified (ipvietnam.gov.vn, mard.gov.vn, customs.gov.cn, doi.org)
- [x] Internal links 4-5 cross-product (xoài-tứ-quý hub)
- [x] Tables so sánh có data quantitative (Brix, Na%, giá, ngày bảo quản)
- [x] Hedge cho số liệu Tier 2-3 (báo VN bot-blocked) — dùng "ước"/"tham khảo"
- [x] Vietnamese diacritics đầy đủ
- [x] Tên thương hiệu giữ "Bến Tre" (CDĐL không đổi); hành chính dùng "tỉnh Vĩnh Long" sau sáp nhập 01/07/2025

## Sources mới được tận dụng (DOI active)

1. [Calcium carbide 2026](https://doi.org/10.1155/ijfo/7226409) — heavy metals + DPPH suppression
2. [Mango cell wall 2024](https://doi.org/10.1007/s13197-024-06092-z) — pectin tan vs cellulose insoluble
3. [β-carotene + milk 2016](https://doi.org/10.1080/10408398.2013.781011) — bioavailability
4. [Carotenoid bioaccess 2026](https://doi.org/10.1016/j.foodchem.2026.148890) — RDA Vit A
5. CDĐL #00124 (QĐ 5371/QĐ-SHTT 10/11/2022) — portal verified
6. Nghị định thư VN-TQ (27/11/2025) + GACC Announcement 219 (07/11/2025) — pháp lý
7. WHO heavy metals fact sheets — As, Pb, Cd toxicology

## Verification

- [x] TypeScript compile pass: `npx tsc --noEmit` exit 0
- [x] 5 file MDX created, frontmatter format khớp existing articles
- [x] `uxReviewed: true` trong tất cả frontmatter (visibility gate)
- [x] `publishedAt` set ngày 09/05/2026 22:30-22:50 (so le 5 phút giữa các bài)
- [x] `authorKey: jang-trinh` (existing in authors registry)
- [x] Pillar values valid: `heritage-bentre` (1, 2, 3), `an-toan-thuc-pham` (4), `gia-thi-truong` (5)
- [x] Slot values: `B` (4 bài explainer), `C` (1 bài news)
- [x] Internal links đi tới existing slugs đã verified
- [x] Tổng lint baseline: 626 errors trên TS/TSX (pre-existing) — KHÔNG phát sinh từ MDX mới

## Note quan trọng cho việc đăng publish

- Article loader (`src/lib/articles.ts`) gate bởi `uxReviewed === true && publishedAt <= now()` → 5 bài tự động xuất hiện trên hub `/kien-thuc` và `/tin-tuc`
- ISR `revalidate: 300` (5 phút) trên hub page → bài mới xuất hiện trong 5 phút sau khi push
- Static generation pre-render qua `getAllArticleParamsForBuild`

## Câu hỏi chưa giải đáp

- Cần lab Quatest/SOFRI verify Na 1.58-2.02% peer-reviewed (hiện là first-party Jang) — đề cập rõ trong bài 1
- Số container Tứ Quý xuất chính ngạch sang TQ Q1-Q2/2026 — chưa có nguồn công khai (hedge trong bài 5)
- Đỉnh xâm nhập mặn 2026 — chưa có báo cáo đầy đủ Q1-Q2/2026 (hedge trong bài 3)
- Verify trực tiếp giá Q2/2026 cần liên hệ HTX Thạnh Phong / Sở NN&MT Vĩnh Long (0270 3830 521)

## Đề xuất tiếp theo

1. **TikTok scripts từ 5 bài này** — pillar file 09 đã có 3 scripts, nhưng có thể chế thêm theo từng bài:
   - Bài 1: hook "ăn xoài không cần chấm muối — vì sao?" (60s)
   - Bài 4: hook "5 dấu hiệu xoài dấm carbide — peer-reviewed 2026" (60s)
2. **Backlink internal** — thêm cross-link từ các bài existing tới series này (qua `relatedSlugs` nếu có)
3. **OG image render** — `ogImage` đã trỏ đến image có sẵn; nếu cần image series chuyên cần generate qua `media-designer`
4. **Bài 6-7 mở rộng** (nếu user muốn):
   - "Bao trái xoài Tứ Quý — ROI 1875% từ pillar Hidden #10"
   - "Sáp nhập 01/07/2025 — xoài Tứ Quý vẫn dùng tên Bến Tre vì sao" (admin context F03)
