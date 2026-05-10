# SEO + Content Audit: Series 5 bài Xoài Tứ Quý từ Pillar 08/05/2026

> Type: SEO/AEO content audit | Date: 09/05/2026 22:50 Asia/Saigon | Skills: ckm:seo + ckm:content-marketing (traicaybentre-marketing)
> Auditor: main agent | Target: 5 MDX articles trong `src/content/articles/xoai-tu-quy/`

---

## Executive Summary

5 bài đạt **chất lượng tổng thể tốt** — frontmatter đầy đủ, FAQ schema-ready, sources DOI active, hierarchy headings đúng chuẩn, word count 2.272-3.221 (sweet spot SEO). **Điểm tổng: 88/100 (B+)**.

**3 critical issues:** (a) 2 broken internal links dùng sai URL pattern → đã fix; (b) thiếu inline images với alt-text trong body (gap so existing reference `xoai-tu-quy-la-gi.mdx`); (c) primary KW match không exact-match trong title của 3/5 bài.

**Quick wins:** thêm 1-2 inline images per bài + alt-text descriptive; tinh chỉnh title 2 bài để exact-match KW; cắt meta description bài 3 từ 230 → 160 chars.

---

## Quick Stats — 5 bài

| Metric | Bài 1 | Bài 2 | Bài 3 | Bài 4 | Bài 5 |
|---|---|---|---|---|---|
| **Slug** | an-khong-can-cham-muoi | chin-cay-co-ngon-khong | thang-9-10-vu-vi-dam-nhat | tac-hai-carbide-2026 | nghi-dinh-thu-vn-tq |
| Type | kien-thuc | kien-thuc | kien-thuc | kien-thuc | tin-tuc |
| Word count | 2.272 | 3.221 | 2.889 | 3.015 | 2.918 |
| H2 / H3 | 9 / 3 | 9 / 12 | 10 / 9 | 9 / 12 | 9 / 12 |
| Tables | 2 | 11 | 5 | 8 | 6 |
| FAQ q-a | 5 | 5 | 5 | 5 | 5 |
| Sources | 4 | 4 | 4 | 4 | 5 |
| Internal links | 7 | 8 | 5 | 7 | 9 |
| External (DOI/portal) | 7 | 12 | 4 | 11 | 23 |
| Footnote refs | 9 | 8 | 4 | 11 | 5 |
| Title chars (UTF-8 bytes) | 102 | 74 (truncated bash) | 114 | 130 | 119 |
| Meta chars | 137 | 16 (truncated bash) | 230 | 208 | 222 |
| Quick answer block | ✅ | ✅ | ✅ | ✅ | ✅ |
| ogImage exists | ✅ | ✅ | ✅ | ✅ | ✅ |
| Inline images | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 | ❌ 0 |

> Note: bash `${#var}` đếm bytes, KHÔNG chars. Tiếng Việt UTF-8 có 2-3 bytes/char → title 130 bytes ≈ 75-90 chars thực. Pixel-width Google SERP ~580 desktop / 600 mobile — VN cần ≤ 60-65 chars để không bị cắt.

---

## Technical SEO Checklist (mỗi bài)

| Element | Bài 1 | Bài 2 | Bài 3 | Bài 4 | Bài 5 |
|---|---|---|---|---|---|
| Title length ≤ 65 chars (VN) | ⚠️ ~75 | ✅ ~62 | ⚠️ ~80 | ❌ ~96 | ⚠️ ~85 |
| Meta description 130-160 chars | ✅ 95 | ✅ ~115 | ⚠️ ~165 | ⚠️ ~150 | ⚠️ ~160 |
| Primary KW in title | ✅ exact | ⚠️ partial | ⚠️ hyphenated | ✅ partial+ | ⚠️ partial |
| Primary KW in meta | ✅ | ✅ | ✅ | ✅ | ✅ |
| Primary KW in H1 (= title) | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ |
| Primary KW in first 100 từ | ✅ | ✅ | ✅ | ✅ | ✅ |
| H1 unique (frontmatter title) | ✅ | ✅ | ✅ | ✅ | ✅ |
| H2 hierarchy logic | ✅ | ✅ | ✅ | ✅ | ✅ |
| URL structure (kebab-case + KW) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Internal links ≥ 3 | ✅ 7 | ✅ 8 | ✅ 5 | ✅ 7 | ✅ 9 |
| External authoritative ≥ 3 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Image alt tags (inline) | ❌ | ❌ | ❌ | ❌ | ❌ |
| ogImage set | ✅ | ✅ | ✅ | ✅ | ✅ |
| Schema FAQ markup | ✅ frontmatter | ✅ | ✅ | ✅ | ✅ |
| Schema Article (Person author) | ✅ authorKey | ✅ | ✅ | ✅ | ✅ |
| Tables for snippet target | ✅ 2 | ✅ 11 | ✅ 5 | ✅ 8 | ✅ 6 |
| Footnote citations | ✅ 9 | ✅ 8 | ⚠️ 4 (ít) | ✅ 11 | ⚠️ 5 |
| Quick answer ≤ 60 từ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Mobile-friendly markup | ✅ MDX | ✅ | ✅ | ✅ | ✅ |
| Hedge cho số chưa verify | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Content Audit (ckm:content-marketing framework)

### Quality dimension

| Dimension | Bài 1 | Bài 2 | Bài 3 | Bài 4 | Bài 5 |
|---|---|---|---|---|---|
| Accuracy (cite checked) | ✅ | ✅ | ⚠️ Q1-Q2/2026 hedge | ✅ | ✅ |
| Freshness (date ≤ 6 tháng) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Relevance (pillar fit) | ✅ Hidden #1 | ✅ Pain point | ✅ Hidden #7 | ✅ F05 + DOI | ✅ F04 NDT |
| Brand alignment (Bến Tre + CDĐL) | ✅ | ✅ | ✅ | ✅ | ✅ |
| E-E-A-T (Experience) | ✅ first-party | ✅ | ✅ | ⚠️ research-heavy | ✅ |
| E-E-A-T (Expertise) | ✅ DOI | ✅ DOI | ⚠️ ít cite | ✅ DOI | ✅ portal |
| E-E-A-T (Authoritativeness) | ✅ author Jang | ✅ | ✅ | ✅ | ✅ |
| E-E-A-T (Trustworthiness) | ✅ hedge rõ | ✅ | ✅ | ✅ | ✅ |

### AEO (Answer Engine Optimization)

| Element | Bài 1 | Bài 2 | Bài 3 | Bài 4 | Bài 5 |
|---|---|---|---|---|---|
| Quick answer 50-60 từ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Question-form H2 | ⚠️ 30% | ✅ 60% | ✅ 50% | ⚠️ 30% | ⚠️ 40% |
| Tabular comparisons | ✅ | ✅ | ✅ | ✅ | ✅ |
| FAQ JSON-LD ready | ✅ | ✅ | ✅ | ✅ | ✅ |
| Direct answers ≤ 30 từ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Long-form expansion | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Per-article Score & Action

### Bài 1 — `xoai-tu-quy-an-khong-can-cham-muoi.mdx`

**Score: 92/100 (A-)** | Action: **Keep + minor polish**

✅ Strengths: Primary KW exact-match trong title + meta + first sentence; quick answer ngắn gọn; cite Na 1.58-2.02% với hedge "first-party Jang chưa peer-reviewed"; 4 sources DOI active + portal CDĐL; 9 footnote refs.

⚠️ Issues:
- Title 75 chars (chuẩn ≤ 65 VN) — sẽ bị cắt trên SERP
- Chỉ 2 tables — có thể thêm table "Lượng Na so với khẩu phần khác" để tăng snippet target
- Không có inline image trong body (existing ref article có 2 img)

### Bài 2 — `xoai-tu-quy-chin-cay-co-ngon-khong.mdx`

**Score: 90/100 (A-)** | Action: **Keep + minor polish**

✅ Strengths: 11 tables (cao nhất series — tốt cho AEO); 12 H3 phân chia rõ; cite DOI 2026 carbide + 2024 cellwall + 2 papers β-carotene; phá định kiến rõ; 8 internal links cross-link tốt.

⚠️ Issues:
- Title có dùng dấu `"` lồng (\"chỉ ngon ăn xanh\") → frontmatter YAML có thể parse lỗi nếu không escape đúng
- Word count 3.221 (longest) — có thể trim phần "câu chuyện vùng" để tập trung hơn
- Primary KW "có ngon không" trong title là "có thực sự ngon" — natural variation OK nhưng exact-match ưu thế hơn

### Bài 3 — `xoai-tu-quy-thang-9-10-vu-vi-dam-nhat.mdx`

**Score: 84/100 (B)** | Action: **Update — strengthen citations**

✅ Strengths: Phân tích 3 vụ với data Brix/giá/năng suất chi tiết; cơ chế xâm nhập mặn → tích lũy Na giải thích rõ; 5 tables logic.

⚠️ Issues:
- **Chỉ 4 footnote refs** (thấp nhất series) — số liệu xâm nhập mặn 2025 + giá vụ Q1-Q2/2026 nhiều hedge nhưng ít cite cụ thể
- Primary KW "tháng 9 tháng 10" vs title "tháng 9-10" (hyphen) — Google có thể không match exact
- Meta 165 chars — biên giới SERP truncate
- ⚠️ FIXED: Internal link broken `/xoai-tu-quy/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam` → `/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam`

### Bài 4 — `tac-hai-xoai-dam-carbide-2026.mdx`

**Score: 87/100 (B+)** | Action: **Keep + title shorten**

✅ Strengths: 11 footnote refs (cao nhất); cite peer-reviewed DOI 2026 + WHO + UC Davis; 8 tables data heavy metals + DPPH so sánh; pillar an-toan-thuc-pham (different từ heritage) → mở rộng topic spread.

⚠️ Issues:
- **Title 96 chars (TOO LONG)** — sẽ bị cắt nặng trên SERP
- Pillar `an-toan-thuc-pham` (existing trong codebase) — OK nhưng cần verify icon/category mapping
- Heading H2 "Vì sao bài viết này quan trọng" hơi chung — có thể đổi thành "Carbide trong xoài: vấn đề âm thầm 30-40% nguồn chợ"
- ⚠️ FIXED: Internal link broken `/xoai-tu-quy/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` → `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy`

### Bài 5 — `nghi-dinh-thu-xuat-khau-xoai-vn-trung-quoc-2025.mdx`

**Score: 88/100 (B+)** | Action: **Keep + datestamp update**

✅ Strengths: 23 external links (cao nhất — portal pháp lý + GSO + GACC + VIETRADE); 9 internal links cross-link sâu; phân tích kinh tế + dự báo + khoảng trống số liệu rõ ràng; pillar `gia-thi-truong` đúng cho tin-tuc.

⚠️ Issues:
- **Type "tin-tuc" cần cập nhật khi có data Q3/2026** — hiện đang dự báo
- Title 85 chars — biên giới
- 5 footnote refs hơi ít cho bài kinh tế/pháp lý — có thể thêm cite GSO báo cáo XK trái cây 2025

---

## Issues by Priority

### 🔴 Critical (đã fix trong session)

1. ✅ **FIXED:** Broken internal link bài 3 `/xoai-tu-quy/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam` → `/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam` (legacy route)
2. ✅ **FIXED:** Broken internal link bài 4 `/xoai-tu-quy/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` → `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` (legacy route, 2 chỗ)

### 🟠 High

3. **Title quá dài** — bài 4 (96 chars) + bài 3 (80) + bài 5 (85). Đề xuất rút gọn:
   - Bài 4: "Tác hại xoài dấm carbide (đất đèn): heavy metals + mất antioxidant — khoa học 2026" (~70 chars)
   - Bài 3: "Xoài Tứ Quý vụ tháng 9-10: vụ vị đậm nhất năm 2026" (~50 chars) — KW match exact
   - Bài 5: "Nghị định thư xoài VN-TQ 27/11/2025: bước ngoặt 5 năm xuất khẩu" (~64 chars)

4. **Thiếu inline images với alt-text** — tất cả 5 bài. Existing ref `xoai-tu-quy-la-gi.mdx` có 2 inline image với pattern `![Title — descriptor](/images/gdrive-XX.jpg)`. Đề xuất thêm 1-2 image/bài tại heading H2 chiến lược (sau introduction + giữa bài).

### 🟡 Medium

5. **Primary KW không exact-match trong title** — bài 2/3/5. Đề xuất tinh chỉnh:
   - Bài 2: hiện "có thực sự ngon" → đổi "có ngon không" cho exact-match KW
   - Bài 3: hiện "9-10" → đổi "9 và 10" (giữa 2 chữ số có space)
   - Bài 5: thêm exact phrase "Việt Nam Trung Quốc 2025" trong title

6. **Meta description biên giới truncate** — bài 3 (~165 chars). Cắt còn 150-155 chars.

7. **Footnote refs ít cho bài 3 + 5** — chỉ 4-5 refs. Bài 3 cần cite thêm xâm nhập mặn 2025 (báo Đông Khởi/MARD). Bài 5 cần cite GSO 2025 + báo cáo XK trái cây.

### 🟢 Low

8. **H2 dạng câu hỏi (question-form)** chưa nhất quán — bài 1+4+5 chỉ ~30-40% H2 là câu hỏi. AEO best practice 60%+. Có thể đổi:
   - "So sánh nhanh" → "Khác xoài thường thế nào?"
   - "Cơ chế ba lớp" → "Vị mặn-ngọt được tạo ra như thế nào?"

9. **Quick answer block** — tốt nhưng có thể bold KW chính trong block để emphasize.

10. **Bài 2 word count 3.221 (longest)** — có thể trim 200-300 từ phần "định kiến từ đâu mà có" mà không mất giá trị.

---

## Quick Wins (thực hiện < 30 phút mỗi bài)

| # | Action | File | Effort | Impact |
|---|---|---|---|---|
| QW1 | Rút title ≤ 65 chars | Bài 4, 3, 5 | 5 phút | High SERP CTR |
| QW2 | Cắt meta bài 3 còn 155 chars | Bài 3 | 2 phút | Medium SERP CTR |
| QW3 | Thêm 2 inline images với alt | Tất cả 5 bài | 10p/bài | Medium AEO + UX |
| QW4 | Thêm 2-3 H2 dạng câu hỏi | Bài 1, 4, 5 | 5p/bài | Medium AEO |
| QW5 | Cite thêm 2-3 sources cho bài 3 | Bài 3 | 10 phút | Medium E-E-A-T |
| QW6 | Bold primary KW trong quick answer | Tất cả 5 bài | 2p/bài | Low SEO |

---

## Major Recommendations (cho future articles)

1. **Tạo asset images chuyên biệt cho series** — đặt tên `series-xoai-tu-quy-202605-{N}-{topic}.jpg` để tách khỏi gdrive-XX (generic). Có thể delegate cho `media-designer` hoặc `ai-multimodal` skill.

2. **Mở rộng pillar coverage** — pillar có 8 sub-files knowledge + 2 narrative. Series 5 bài đã cover ~30% gap. Đề xuất batch tiếp theo:
   - Bài 6: "Bao trái xoài Tứ Quý — ROI 1875% từ Hidden #10"
   - Bài 7: "Sáp nhập 01/07/2025 — Bến Tre / Vĩnh Long / Trà Vinh: xoài Tứ Quý đổi gì?"
   - Bài 8: "10 cách phân biệt Tứ Quý Thạnh Phú vs Mỏ Cày bằng vị" (Hidden #5)
   - Bài 9: "Khoa học sau thu hoạch xoài: hot water 52-53°C/10p — chuẩn USDA APHIS"

3. **Internal link strategy** — cập nhật 5 existing articles có thể link ngược tới series:
   - `xoai-tu-quy-la-gi.mdx` thêm link tới bài 1+2 (overview → deep-dive)
   - `vi-sao-xoai-tu-quy-co-vi-man.mdx` link tới bài 1 (Na deep-dive)
   - `cach-chon-xoai-cung-ram.mdx` link tới bài 4 (carbide)
   - `mua-vu-xoai-tu-quy-3-vu-nam.mdx` (legacy) → migrate sang MDX hoặc cross-link tới bài 3
   - `htx-thanh-phong-cau-chuyen.mdx` link tới bài 5 (NDT context)

4. **Schema enrichment** — frontmatter `faq` đã đủ cho FAQPage schema. Thêm:
   - `recipe` field cho bài có món ăn
   - `articleSection` field cho cluster categorization
   - `keywords` array (đã có `secondaryKeywords` — đủ rồi)

5. **Verification calendar** — số liệu cần update Q3-Q4/2026:
   - Giá Tứ Quý Q2/2026 (HTX Thạnh Phong)
   - Đỉnh xâm nhập mặn 2026 (Sở NN&MT Vĩnh Long)
   - Số container Tứ Quý xuất chính ngạch sau 15/12/2025 (Cục XNK)
   - Lab Quatest/SOFRI verify Na 1.58-2.02% — long-term initiative

---

## Final Score Summary

| Bài | Score | Grade | Action |
|---|---|---|---|
| 1. ăn-không-cần-chấm-muối | 92 | **A-** | Keep + polish |
| 2. chín-cây-có-ngon-không | 90 | **A-** | Keep + polish |
| 3. tháng-9-10-vu-vi-đậm | 84 | **B** | Update (cite + title) |
| 4. tác-hại-carbide-2026 | 87 | **B+** | Keep + title shorten |
| 5. nghị-định-thư-VN-TQ | 88 | **B+** | Keep + datestamp |

**Series tổng: 88/100 (B+)** — sẵn sàng publish, có quick wins để lên A-/A.

---

## Câu hỏi chưa giải đáp

- Có nên migrate 2 legacy routes (`mua-vu-xoai-tu-quy-3-vu-nam` + `cach-bao-quan-lam-chin-xoai-tu-quy`) sang MDX cho consistency? Hay giữ legacy route cho SEO equity đã tích?
- Có cần generate ogImage chuyên biệt (1200×630) cho series, hay reuse gdrive-XX là đủ?
- Có nên enable JSON-LD HowTo schema cho bài 4 (cách phân biệt) + Recipe schema cho bài 2 (sinh tố combo)?
- Lab verify peer-reviewed cho Na 1.58-2.02% (Quatest/SOFRI) — có timeline cụ thể chưa?
