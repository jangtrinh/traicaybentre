# Convert Research → MDX Articles

**Ngày:** 21/04/2026
**Nguồn:** `docs/research/` (7 bài research dài-form)
**Status:** ✅ DONE — 6 bài converted, build passed

## Result

| # | Source | Target MDX | Word | Status |
|---|---|---|---|---|
| 1 | `di-cho-khong-bi-gat-5-chieu-lua-thi-truong-trai-cay.md` | `xoai-tu-quy/kien-thuc/di-cho-khong-bi-gat-5-chieu-lua-trai-cay.mdx` | ~1700 | ✅ |
| 2 | `dua-xiem-ben-tre-giong-vung-trong-khan-hang-mua-he.md` | `dua-xiem-ben-tre/kien-thuc/dua-xiem-ben-tre-12-giong-phan-bo-khan-hang-mua-he.mdx` | ~1550 | ✅ |
| 3 | `so-sanh-xoai-uc-vn-va-xoai-tu-quy-thanh-phu.md` | `xoai-tu-quy/kien-thuc/so-sanh-xoai-uc-r2e2-xoai-tu-quy-thanh-phu-dinh-duong.mdx` | ~2300 | ✅ |
| 4 | `thi-truong-trai-cay-vn-q1-2026-va-impact-chien-tranh-my-iran.md` | `xoai-tu-quy/tin-tuc/thi-truong-trai-cay-vn-q1-2026-chien-tranh-my-iran.mdx` | ~1750 | ✅ |
| 5 | `xoai-tu-quy-huu-co-vs-bai-ban-phan-tich-chuyen-sau.md` | `xoai-tu-quy/kien-thuc/xoai-tu-quy-huu-co-vs-bai-ban-phan-tich-sau.mdx` | ~2200 | ✅ |
| 6 | `xoai-tu-quy-post-harvest-science.md` | `xoai-tu-quy/kien-thuc/xoai-tu-quy-khoa-hoc-sau-thu-hoach-post-harvest.mdx` | ~2000 | ✅ |
| 7 | `xoai-tu-quy-so-sanh-4-vung-trong.md` | SKIP (đã có bản summary) | - | ⏭ |

## Issues fixed during build

1. **MDX `<` trong table cells** — MDX parser coi `<10` là JSX tag. Fix: đổi thành "dưới 10" / "\<10".
2. **Pillar `san-pham-su-dung`** — không có trong `messages/vi.json` `pillarLabels`. Fix: đổi sang `an-toan-thuc-pham`.

## Pre-existing pillar issues (không phải từ conversion này)

Build còn warn `MISSING_MESSAGE` cho pillar của bài cũ: `giong-dua`, `huong-vi`, `cong-thuc-che-bien`, `gioi-thieu-giong`, `gia-ca`, `mua-o-dau`. Các pillars này ở MDX bài cũ nhưng chưa map i18n — tồn tại trước conversion này. Không ảnh hưởng build (chỉ cảnh báo).

## Next

- [ ] Commit + push 6 bài mới
- [ ] Sau khi merge, trigger syndicate (WP/Blogger/Tumblr)
- [ ] Optional: sửa pillar labels còn thiếu cho bài cũ (separate task)
