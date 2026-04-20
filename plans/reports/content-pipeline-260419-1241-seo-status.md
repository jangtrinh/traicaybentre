# Content Pipeline — Status & Đề xuất hôm nay (20/04/2026, T2)

## Kho content hiện tại

| Pillar | kien-thuc | tin-tuc | Tổng |
|---|---|---|---|
| Xoài Tứ Quý | 62 | 39 | **101** |
| Dừa Xiêm | 22 | 1 | **23** |
| Xoài Hoàng Kim | 4 | 1 | **5** |

## Việc vừa làm xong (session này)

- Embed 3 TikTok vào homepage (`social-video-section.tsx`) — video IDs mới xếp lên đầu
- Embed video "huyền thoại" → `lich-su-cay-xoai-tu-quy-ben-tre.mdx`
- Embed video "dinh dưỡng" → `xoai-tu-quy-co-bao-nhieu-calo.mdx`
- Embed video "visa xuất khẩu" → `thi-truong-xoai-xuat-khau-2026.mdx`
- Wire `TikTokEmbed` component vào MDX pipeline (`page.tsx`)

## Gaps SEO rõ rệt (ưu tiên cao → thấp)

### P1 · Dừa Xiêm tin-tuc trống (cấp bách — thiếu freshness signal)
- Chỉ có 1 bài: `gia-dua-xiem-ben-tre-si-2026-cho-quan-nha-hang.mdx`
- Google cần freshness → cần weekly/daily price + market analysis
- Plan Dừa Xiêm 12 bài (`260417-0854-dua-xiem-series-seo-aeo`) đã hoàn thành 12/12 kien-thuc ✅
- Thiếu: **tin-tuc series** (giá tuần, thị trường, mùa vụ, xuất khẩu, cung-cầu)

### P2 · Xoài Hoàng Kim thiếu content (5 bài tổng)
- Chỉ 4 kien-thuc + 1 tin-tuc
- Authority yếu so với Tứ Quý
- Cần: cách chọn, bảo quản, cho bé, giảm cân, so sánh vùng, calo, mùa vụ

### P3 · 2 Landing pages chưa build (KW#8, #9 — long-tail sprint)
- `/qua-bieu-trai-cay-dac-san-ben-tre` — MVP anchor section đang thiếu
- `/vua-xoai-tu-quy-gia-si` — B2B landing chưa có
- Plan: `260410-0850-long-tail-seo-30-days/phase-04`

### P4 · GSC quick wins đợt 2
- Commit `cbdae31` (18/04) đã làm 4 quick wins đợt 1
- Cần pull GSC data mới (90 ngày) → identify impression cao rank thấp

## Đề xuất hôm nay (T2 — ngày đầu tuần, phù hợp long-form)

### Option A · Dừa Xiêm tin-tuc sprint (3-5 bài)
**Lý do:** gap lớn nhất, easy win vì pillar đã có authority từ 12 bài kien-thuc.
- `gia-dua-xiem-tuan-17-2026.mdx` (tuần này 13-19/4)
- `gia-dua-xiem-tuan-18-2026.mdx` (tuần tới, future-scheduled)
- `dua-xiem-vao-vu-he-2026.mdx` (mùa vụ)
- `thi-truong-dua-xiem-xuat-khau-2026.mdx` (export)
- `dua-xiem-chuan-bi-tet-doan-ngo-2026.mdx` (seasonal)

### Option B · Hoàng Kim expand (6-8 bài kien-thuc)
**Lý do:** pillar yếu nhất, cần authority foundation.
- `cach-bao-quan-xoai-hoang-kim.mdx`
- `xoai-hoang-kim-cho-be-an-dam.mdx`
- `xoai-hoang-kim-giam-can-calo.mdx`
- `xoai-hoang-kim-mua-o-dau-ben-tre.mdx`
- `xoai-hoang-kim-gia-bao-nhieu-2026.mdx`
- `mua-vu-xoai-hoang-kim-thanh-phu.mdx`

### Option C · Landing pages (2 pages, high conversion)
**Lý do:** KW#8 + #9 có thương mại intent cao.
- `/qua-bieu-trai-cay-dac-san-ben-tre` landing + copy + schema
- `/vua-xoai-tu-quy-gia-si` B2B landing + copy + schema

### Option D · Quick wins GSC đợt 2
**Lý do:** leverage data → chỉnh title/meta → impact nhanh 1-2 tuần.
Cần Jang pull GSC data → mình phân tích → ship fixes.

## Khuyến nghị

**Ưu tiên: A (Dừa Xiêm tin-tuc)** — 3 bài đầu tuần.

- Gap lớn nhất, cơ hội SEO rõ ràng (long-tail "giá dừa xiêm", "dừa xiêm mùa hè")
- Reuse research đã có (2 research docs dừa xiêm)
- Pillar đã có authority từ 12 bài kien-thuc → tin-tuc mới sẽ được index nhanh
- Cross-sell kien-thuc articles qua internal links

**Tuần này:** A + B song song (Hoàng Kim build 1 bài/ngày).

**Cuối tuần:** D (GSC quick wins) — cần Jang pull GSC 90-day data.

## Unresolved questions

1. Xác nhận ưu tiên A/B/C/D hay kết hợp?
2. Hoàng Kim có available research data chưa (schema giá, mùa vụ) hay cần research trước?
3. Landing pages (Option C) có budget design/wireframe hay ship MVP anchor sections trước?
4. GSC data 90-day (Option D) — Jang pull được không?
