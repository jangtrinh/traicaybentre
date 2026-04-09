# Topic Clusters — Pillar → Cluster Mapping

**Chiến lược:** Mỗi pillar là page authority đã tồn tại hoặc page hub chính. Các cluster articles (viết trong 30 ngày, 90 bài total) liên kết bi-directional: cluster → pillar (contextual anchor) và pillar → cluster (list block cuối trang).

> **Updated 2026-04-09:** Scale từ 30 bài → 90 bài (3/ngày × 30 ngày). Bảng ma trận chi tiết 90 bài xem `content-calendar-90-articles.md`. Bảng 30-bài cũ dưới cùng giữ làm reference history.

---

## Hub-and-Spoke Resolution — GEO Informational vs Commercial

**Conflict:** Có 2 URL cùng target 1 thành phố:
- `/giao-hang/{city}` — **commercial landing** (buy now, pricing table, CTA phone)
- `/tin-tuc/xoai-tu-quy-giao-{city}` — **informational article** (content blog)

**Decision:** KEEP BOTH — khác intent, khác funnel stage.

```
Google SERP "xoài tứ quý giao Hà Nội"
         │
         ├──> User intent = info  ──> /tin-tuc/xoai-tu-quy-giao-ha-noi
         │                               │ (trả lời: bao lâu tới? bảo quản? đặt trước mấy ngày?)
         │                               │
         │                               ▼ internal link "đặt xoài giao Hà Nội"
         │                          /giao-hang/ha-noi (commercial landing)
         │                               │
         │                               ▼ CTA
         │                          checkout/phone
         │
         └──> User intent = buy   ──> /giao-hang/ha-noi (direct)
```

**Rules:**
1. `/tin-tuc/...` article KHÔNG trùng content với `/giao-hang/...` commercial page
2. Article focus câu hỏi: timing, cold chain, đặt trước bao lâu, bảo quản khi nhận
3. Commercial page focus: pricing table, size options, phone CTA, trust badges
4. Bi-directional internal link với anchor khác nhau (avoid exact-match duplication)
5. Canonical: mỗi URL self-referencing, KHÔNG canonical về nhau
6. Schema: article = `Article + FAQPage`; commercial = `Service + LocalBusiness + Offer`
7. Funnel metric: article CTR tới commercial landing ≥ 15% = healthy

---

---

## Pillar 1 — Giá & Thị Trường Xoài Tứ Quý

**Pillar page:** `/gia-xoai-hom-nay` (hoặc `/xoai-tu-quy` nếu chưa có)
**Primary KW cluster:** xoài tứ quý giá, báo giá xoài, thị trường xoài

**Cluster articles:**
1. Day 02 — `xoai-tu-quy-gia-bao-nhieu-2026`
2. Day 06 — `bao-gia-xoai-tu-quy-thang-04-2026`
3. Day 13 — `thung-xoai-tu-quy-20kg-gia`
4. Day 24 — `xoai-tu-quy-co-bao-nhieu-calo` (phụ — giá trị dinh dưỡng)
5. Day 28 — `mua-he-xoai-tu-quy-si`

**Internal link rule:** Mọi cluster trong Pillar 1 phải link về `/gia-xoai-hom-nay` bằng anchor "bảng giá xoài tứ quý hôm nay".

---

## Pillar 2 — So Sánh Giống Xoài

**Pillar page:** `/kien-thuc/xoai-tu-quy-la-gi` (Day 01 — pillar mới)
**Primary KW cluster:** xoài tứ quý vs, so sánh xoài

**Cluster articles:**
1. Day 03 — `xoai-tu-quy-vs-xoai-cat-hoa-loc`
2. Day 09 — `xoai-tu-quy-vs-xoai-cat-chu`
3. Day 14 — `xoai-tu-quy-vs-xoai-dai-loan`
4. Day 20 — `xoai-tu-quy-vs-xoai-uc`
5. Day 26 — `xoai-tu-quy-vs-xoai-keo`

**Internal link rule:** Mỗi comparison link tới pillar "xoài tứ quý là gì" + link chéo tới 1-2 comparison khác (hub-and-spoke).

---

## Pillar 3 — Giao Hàng Theo Vùng (GEO)

**Pillar page:** `/giao-hang`
**Primary KW cluster:** xoài tứ quý giao {tỉnh}

**Cluster articles:**
1. Day 04 — `giao-xoai-tu-quy-ha-noi`
2. Day 07 — `giao-xoai-tu-quy-tp-hcm`
3. Day 11 — `giao-xoai-tu-quy-da-nang`
4. Day 16 — `giao-xoai-tu-quy-can-tho`
5. Day 19 — `giao-xoai-tu-quy-hai-phong`
6. Day 23 — `giao-xoai-tu-quy-nha-trang`

**Internal link rule:** Tất cả GEO pages link về `/giao-hang` (hub) và link chéo sang 1 thành phố lân cận (HN ↔ HP, HCM ↔ CT, ĐN ↔ NT).
**Schema phụ:** `Service.areaServed` với lat/long thành phố.

---

## Pillar 4 — Kỹ Thuật Chọn / Bảo Quản / Thưởng Thức

**Pillar page:** `/kien-thuc` (hub page)
**Primary KW cluster:** cách chọn xoài, bảo quản xoài, chế biến xoài

**Cluster articles:**
1. Day 05 — `cach-chon-xoai-tu-quy-ngon`
2. Day 10 — `cach-bao-quan-xoai-tu-quy`
3. Day 17 — `xoai-tu-quy-an-chin-hay-xanh`
4. Day 18 — `cach-che-bien-xoai-tu-quy`
5. Day 25 — `dat-xoai-tu-quy-online-huong-dan` (phụ — HowTo)

**Internal link rule:** Link chéo 3-way giữa Day 05 ↔ Day 10 ↔ Day 17 (flow tự nhiên: chọn → bảo quản → ăn). Day 18 link đến Day 17 (ăn kiểu nào → làm món gì).

---

## Pillar 5 — Kiến Thức & Di Sản Bến Tre (E-E-A-T)

**Pillar page:** `/nguon-goc`
**Primary KW cluster:** CDĐL, thổ nhưỡng, VietGAP, HTX Thạnh Phong

**Cluster articles:**
1. Day 08 — `vi-sao-xoai-tu-quy-co-vi-man`
2. Day 15 — `cdd-l-00124-xoai-ben-tre-la-gi`
3. Day 22 — `tho-nhuong-thanh-phu-xoai`
4. Day 27 — `vietgap-xoai-tu-quy-la-gi`
5. Day 29 — `htx-thanh-phong-cau-chuyen`
6. Day 30 — `xoai-tu-quy-mua-o-dau-uy-tin` (bridge E-E-A-T → brand)

**Internal link rule:** Mọi cluster link về `/nguon-goc`. Day 29 (HTX story) link về tất cả 4 cluster còn lại để củng cố authority (người kể chuyện + chứng nhận + khoa học + quy trình).

---

## Pillar 6 — Mùa Vụ & Sự Kiện

**Pillar page:** `/xoai-tu-quy` (phần harvest calendar) hoặc Day 12 làm pillar
**Primary KW cluster:** vụ xoài, mùa xoài, xoài Tết

**Cluster articles:**
1. Day 12 — `xoai-tu-quy-may-vu-mot-nam`
2. Day 21 — `xoai-tu-quy-tet-2027-qua-tang`
3. Day 28 — `mua-he-xoai-tu-quy-si` (cross-pillar với P1)

**Internal link rule:** Day 21 + 28 đều link về Day 12 (định nghĩa vụ). Link đến pillar P1 để chuyển giao intent commercial.

---

## Ma Trận Internal Link (summary)

| Cluster Day | Pillar chính | Cross-link |
|---|---|---|
| 01 | P2 (pillar) | P5 (day 08, 15) |
| 02 | P1 | P1 (day 06, 13) |
| 03 | P2 | P2 (day 09, 14), P4 (day 05) |
| 04 | P3 | P3 (day 07, 19), P1 (day 02) |
| 05 | P4 | P4 (day 10, 17) |
| 06 | P1 | P1 (day 02), P6 (day 12) |
| 07 | P3 | P3 (day 04, 16) |
| 08 | P5 | P5 (day 15, 22) |
| 09 | P2 | P2 (day 03) |
| 10 | P4 | P4 (day 05, 17) |
| 11 | P3 | P3 (day 07, 23) |
| 12 | P6 | P1 (day 06), P6 (day 21, 28) |
| 13 | P1 | P1 (day 02, 06) |
| 14 | P2 | P2 (day 03, 20) |
| 15 | P5 | P5 (day 08, 27) |
| 16 | P3 | P3 (day 04), P1 (day 02) |
| 17 | P4 | P4 (day 05, 18) |
| 18 | P4 | P4 (day 17) |
| 19 | P3 | P3 (day 04) |
| 20 | P2 | P2 (day 14) |
| 21 | P6 | P1 (day 02), P6 (day 12) |
| 22 | P5 | P5 (day 08, 15) |
| 23 | P3 | P3 (day 11) |
| 24 | P4 | P4 (day 17) |
| 25 | P3 | P3 (hub /giao-hang) |
| 26 | P2 | P2 (day 09) |
| 27 | P5 | P5 (day 15, 29) |
| 28 | P1/P6 | P6 (day 12), P3 |
| 29 | P5 | P5 (day 08, 15, 22, 27) |
| 30 | P5 | P5 (day 15), `/` |

**Anchor text rule:** tránh exact-match spam. Dùng variations: "xoài tứ quý bến tre", "giống xoài đặc sản", "CDĐL #00124", "xoài sỉ thạnh phú"...
