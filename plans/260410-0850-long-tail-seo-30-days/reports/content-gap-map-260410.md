# Content Gap Map — 10 Long-tail Keywords

**Date:** 2026-04-10
**Method:** Codebase title/H1/meta/primaryKeyword audit per page

## Gap analysis

### KW#2: `cách bảo quản xoài tứ quý bến tre`

**Existing pages (DUPLICATE — resolve first):**

| Source | Page | Current title | Exact KW match? | Gap |
|---|---|---|---|---|
| Legacy TSX | `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` | "Cách Bảo Quản & Làm Chín Xoài Tứ Quý Tại Nhà — Hướng Dẫn Đầy Đủ 2026" | **Partial** — missing "bến tre" | Add "Bến Tre" to title |
| MDX | `/xoai-tu-quy/kien-thuc/cach-bao-quan-xoai-tu-quy` | "Cách Bảo Quản Xoài Tứ Quý Lâu Nhất — Chín và Chưa Chín" | **Partial** — missing "bến tre" | Set `uxReviewed: false` (F5 duplicate gate) |

**Decision:** Legacy TSX = canonical (established URL). MDX = gate off. Optimize legacy title: add "Bến Tre".
**Edit:** Title → `"Cách Bảo Quản Xoài Tứ Quý Bến Tre Tại Nhà — 7-14 Ngày Không Hỏng"`

---

### KW#3: `xoài tứ quý bến tre ăn sống hay chín`

**Existing:** MDX `/xoai-tu-quy/kien-thuc/xoai-tu-quy-an-chin-hay-xanh`
**Current title:** "Xoài Tứ Quý Ăn Chín Hay Xanh Ngon Hơn? Tuỳ Món Bạn Ơi"
**primaryKeyword:** `xoài tứ quý ăn chín hay xanh`
**Exact KW match?** **No** — "ăn sống hay chín" ≠ "ăn chín hay xanh". Different user phrasing. Also missing "bến tre".

**Gaps:**
- Title: no "bến tre", no "ăn sống"
- H1: same as title
- Slug: `an-chin-hay-xanh` (NOT renaming per F5 safety)

**Edits (keep URL, change metadata):**
- Title → `"Xoài Tứ Quý Bến Tre Ăn Sống Hay Chín? — Hướng Dẫn Theo Món"`
- primaryKeyword → `"xoài tứ quý bến tre ăn sống hay chín"`
- metaDescription → `"Xoài Tứ Quý Bến Tre ăn sống hay chín? Ăn sống (xanh) giòn chấm muối ớt, chín ngọt Brix 16-18°. Tùy món — gỏi, sinh tố, hay tráng miệng."`
- Add H2 early: "Xoài Tứ Quý Bến Tre — ăn sống hay chín?"

---

### KW#4: `mua xoài bến tre chính gốc ở đâu hà nội`

**Existing:** `/giao-hang/ha-noi`
**Current title:** "Xoài Tứ Quý Giao Hà Nội — 48h Từ Vựa Thạnh Phú"
**Exact KW match?** **No** — missing "mua", "chính gốc", "ở đâu"

**Gaps:**
- Title: doesn't answer "ở đâu"
- Meta: doesn't address "chính gốc" trust signal
- Body: likely no H2 matching exact search query
- Also: MDX `xoai-tu-quy-giao-ha-noi.mdx` exists → check for duplicate

**Edits:**
- Title → `"Mua Xoài Bến Tre Chính Gốc Ở Đâu Hà Nội? — Giao 48h Từ Vựa"`
- metaDescription → `"Mua xoài Bến Tre chính gốc ở đâu Hà Nội? Đặt trực tiếp từ vựa Thạnh Phú CDĐL #00124. Giao lạnh 48h xe lạnh/bay. Gọi: 0932 585 533."`
- Add H2: "Mua xoài Bến Tre chính gốc ở đâu Hà Nội?"
- Add FAQ: "Làm sao biết xoài Bến Tre chính gốc?" (QR truy xuất, CDĐL)
- Check MDX `xoai-tu-quy-giao-ha-noi.mdx` for cannibalization risk

---

### KW#6: `đặt dừa xiêm bến tre online ship toàn quốc`

**Existing:** `/dua-xiem-ben-tre` (dua landing, mới ship hôm nay)
**Current title:** "Dừa Xiêm Bến Tre (Dừa Sọ) — Gọt Sẵn, Nước Ngọt, Giao Toàn Quốc"
**Exact KW match?** **No** — missing "đặt", "online"

**Gaps:**
- Title: misses transactional intent "đặt ... online"
- Body: doesn't have section "Đặt online ship toàn quốc"
- No FAQ section (valuable for FAQPage schema)

**Edits:**
- Title → `"Đặt Dừa Xiêm Bến Tre Online — Dừa Sọ Gọt Sẵn, Ship Toàn Quốc"`
- ogTitle → `"Đặt Dừa Xiêm Bến Tre Online — Ship Lạnh Toàn Quốc Từ Vựa"`
- Add H2 section: "Đặt dừa xiêm Bến Tre online ship toàn quốc" (ordering steps + CTA)
- Add 5-question FAQ section
- Add FAQPage JSON-LD

---

### KW#9: `vựa xoài tứ quý bến tre giá sỉ`

**Existing:** MDX `/xoai-tu-quy/tin-tuc/bao-gia-si-xoai-tu-quy-thang-4`
**Current title:** "Báo giá sỉ xoài tứ quý tháng 4/2026 — bảng giá theo loại và số lượng"
**Exact KW match?** **No** — title is temporal (tháng 4), missing "bến tre", "vựa"

**Gaps:**
- Temporal: tháng 4/2026 → stale after April
- No "vựa" keyword (entity signal)
- No "Bến Tre" in title
- This is a tin-tuc (news) article, not an evergreen landing

**Strategy per F9:** MVP anchor section `#gia-si` trên `/xoai-tu-quy` instead of dedicated landing. Optimize the MDX article title too.

**Edits (MDX):**
- Title → `"Vựa Xoài Tứ Quý Bến Tre Giá Sỉ — Bảng Giá 2026 Theo Loại"`
- primaryKeyword → `"vựa xoài tứ quý bến tre giá sỉ"`
- Drop temporal "tháng 4" from title (giữ trong body)

**New anchor section (xoai landing):**
- Add H2 `#gia-si`: "Vựa xoài Tứ Quý Bến Tre — giá sỉ" (300 words + pricing table + CTA)

---

### KW#10: `xoài bến tre có gì đặc biệt`

**Existing candidates:**
| MDX | primaryKeyword | Gap |
|---|---|---|
| `tho-nhuong-thanh-phu-xoai.mdx` | "thổ nhưỡng Thạnh Phú trồng xoài" | Title/KW don't match target |
| `cau-chuyen-nguoi-trong-xoai-thanh-phu.mdx` | "câu chuyện người trồng xoài Thạnh Phú" | Title/KW don't match target |

Neither article targets "xoài bến tre có gì đặc biệt" directly.

**Strategy options:**
A) Write new MDX: `xoai-ben-tre-co-gi-dac-biet.mdx` — umbrella storytelling article
B) Optimize `tho-nhuong-thanh-phu-xoai.mdx` to include the phrase in H1/meta

**Recommended:** (A) New article — more comprehensive, cover all angles (terroir, CDĐL, taste, history), link to both existing articles for depth.

---

## Missing (no existing page)

| KW# | Keyword | Action |
|---|---|---|
| 1 | xoài tứ quý bến tre 1 kg bao nhiêu trái | NEW MDX blog FAQ |
| 5 | dừa xiêm bến tre khác dừa xiêm miền tây như thế nào | NEW MDX blog compare (first dừa article!) |
| 7 | xoài thạnh phú loại 1 giá bao nhiêu | NEW MDX blog price guide |
| 8 | quà biếu trái cây đặc sản bến tre | MVP anchor `#qua-bieu-ben-tre` trên `/san-pham` |

---

## Summary: action items for Phase 02

| KW# | Action type | Page | Primary edit |
|---|---|---|---|
| 2 | Optimize title + gate MDX duplicate | Legacy `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` + MDX `uxReviewed: false` | Title + meta add "Bến Tre" |
| 3 | Optimize metadata (keep URL) | MDX `xoai-tu-quy-an-chin-hay-xanh.mdx` | Title + primaryKeyword + H2 add "ăn sống" |
| 4 | Optimize title + add H2 FAQ | TSX `/giao-hang/ha-noi/page.tsx` | Title "mua chính gốc ở đâu" + FAQ section |
| 6 | Optimize metadata + add H2/FAQ | `dua-xiem-ben-tre-landing.tsx` + `products.ts` | Title "đặt online" + H2 ordering steps + FAQ |
| 9 | Optimize MDX title + add anchor section on xoai landing | MDX + `/xoai-tu-quy` | Title drop temporal, add #gia-si section |
| 10 | New article (Phase 03) | NEW MDX `xoai-ben-tre-co-gi-dac-biet.mdx` | Umbrella storytelling |

## User handoff tasks (human-only)

- [ ] **SERP audit**: Google search 10 keywords (incognito, Vietnamese locale), record top 5 per keyword → fill `reports/serp-audit-10-keywords.md`
- [ ] **Volume validation (F1)**: Keyword Planner / Ahrefs per keyword → volume + CPC → annotate gap map
- [ ] **GSC baseline**: Export 28-day performance per keyword → `reports/gsc-baseline-260410.csv`
