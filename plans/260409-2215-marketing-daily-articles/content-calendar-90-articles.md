# Content Calendar — 90 Bài / 30 Ngày (3 Slot × AI Draft)

**Cadence:** 3 bài/ngày, auto-publish qua Vercel Cron.
**Slots:**
- **A 07:00** — news / giá thị trường (morning commute)
- **B 12:15** — how-to / mẹo ngắn (nghỉ trưa)
- **C 20:00** — longform / so sánh / heritage (relax tối)

**URL convention:**
- `/tin-tuc/{slug}` — transactional/news/GEO informational
- `/kien-thuc/{slug}` — pillar informational evergreen

**Chi tiết từng bài** (outline, AEO, schema, internal link) vẫn dùng `content-calendar-30-days.md` (legacy 30 bài gốc = seed core) làm reference chi tiết; bảng dưới bổ sung 60 bài mới vào hệ 90-bài.

---

## Phân bổ nhanh theo Slot

| Slot | Bài/30d | % | Pillar dominant |
|---|---|---|---|
| A (07:00) | 30 | P1 (12) + P6 (10) + P3 GEO news (4) + mixed (4) |
| B (12:15) | 30 | P4 HowTo (15) + P1 ticker update (5) + P6 reminder (5) + P2 mini compare (5) |
| C (20:00) | 30 | P2 comparison (9) + P5 heritage (8) + P3 GEO longform (6) + P6 longread (7) |

---

## 90-Bài Table

> Cột `Int.Link` = internal link đích chính (funnel target).
> Cột `GEO-target` = thành phố hub (cho bài GEO).
> Cột `Reuse` = evergreen flag (Y/N).
>
> **UX-reviewed tracking (MANDATORY gate):** mỗi bài phải pass 12-item UX Writing Checklist (xem `aeo-geo-seo-playbook.md` section 3d) trước khi flip `status='ready'`. Tracking trong Supabase qua cột `ux_reviewed_at TIMESTAMPTZ` (NULL = chưa pass, NOT NULL = pass). Editor có thể note ☐/☑ bên cạnh slug trong calendar này cho manual audit nếu cần. Không publish bài nào mà `ux_reviewed_at IS NULL`.

### Week 1 (Day 01–07)

| D | Slot | Slug | Pillar | Keyword | Int.Link | Reuse |
|---|---|---|---|---|---|---|
| 01 | A | `gia-xoai-tu-quy-tuan-14-2026` | P1 | giá xoài tứ quý tuần này | /gia-xoai-hom-nay | N |
| 01 | B | `cach-chon-xoai-tu-quy-ngon` | P4 | cách chọn xoài tứ quý | /kien-thuc | Y |
| 01 | C | `xoai-tu-quy-la-gi` | P5 (pillar) | xoài tứ quý là gì | /nguon-goc | Y |
| 02 | A | `xoai-tu-quy-gia-bao-nhieu-2026` | P1 | xoài tứ quý giá bao nhiêu | /gia-xoai-hom-nay | Y |
| 02 | B | `meo-giam-chua-xoai-tu-quy` | P4 | mẹo giảm chua xoài | /kien-thuc | Y |
| 02 | C | `xoai-tu-quy-vs-xoai-cat-hoa-loc` | P2 | xoài tứ quý vs cát hoà lộc | /xoai-tu-quy | Y |
| 03 | A | `bao-gia-xoai-tu-quy-thang-04-2026` | P1 | báo giá xoài tháng 4 | /gia-xoai-hom-nay | N |
| 03 | B | `cach-bao-quan-xoai-tu-quy` | P4 | bảo quản xoài | /kien-thuc | Y |
| 03 | C | `tin-tuc/xoai-tu-quy-giao-ha-noi` | P3 info | xoài tứ quý giao Hà Nội | /giao-hang/ha-noi | Y |
| 04 | A | `gia-xoai-cho-dau-moi-thu-duc-hom-nay` | P1 | giá xoài chợ Thủ Đức | /gia-xoai-hom-nay | N |
| 04 | B | `xoai-tu-quy-an-chin-hay-xanh` | P4 | ăn chín hay xanh | /kien-thuc | Y |
| 04 | C | `cdd-l-00124-xoai-ben-tre-la-gi` | P5 | CDĐL xoài Bến Tre | /nguon-goc | Y |
| 05 | A | `xoai-tu-quy-mua-he-2026-vao-vu` | P6 | vụ xoài hè | /xoai-tu-quy | N |
| 05 | B | `cach-che-bien-xoai-tu-quy` | P4 | chế biến xoài | /kien-thuc | Y |
| 05 | C | `tin-tuc/xoai-tu-quy-giao-tp-hcm` | P3 info | giao xoài TP HCM | /giao-hang/ho-chi-minh | Y |
| 06 | A | `gia-thung-xoai-20kg-thang-04` | P1 | giá thùng 20kg | /gia-xoai-hom-nay | N |
| 06 | B | `dat-xoai-tu-quy-online-huong-dan` | P4 | đặt xoài online | /giao-hang | Y |
| 06 | C | `xoai-tu-quy-vs-xoai-cat-chu` | P2 | xoài tứ quý vs cát chu | /xoai-tu-quy | Y |
| 07 | A | `gia-xoai-tu-quy-tuan-15-2026` | P1 | giá tuần 15 | /gia-xoai-hom-nay | N |
| 07 | B | `meo-ngam-xoai-tu-quy-chua-cay` | P4 | xoài chua cay | /kien-thuc | Y |
| 07 | C | `tho-nhuong-thanh-phu-xoai` | P5 | thổ nhưỡng Thạnh Phú | /nguon-goc | Y |

### Week 2 (Day 08–14)

| D | Slot | Slug | Pillar | Keyword | Int.Link | Reuse |
|---|---|---|---|---|---|---|
| 08 | A | `xoai-tu-quy-chuan-bi-tet-doan-ngo-2026` | P6 holiday | xoài cúng tết đoan ngọ | /qua-tang-le | Y |
| 08 | B | `vi-sao-xoai-tu-quy-co-vi-man` | P5 | vì sao mặn | /nguon-goc | Y |
| 08 | C | `tin-tuc/xoai-tu-quy-giao-da-nang` | P3 info | giao Đà Nẵng | /giao-hang/da-nang | Y |
| 09 | A | `thi-truong-xoai-xuat-khau-2026` | P1 | xuất khẩu xoài | /gia-xoai-hom-nay | N |
| 09 | B | `cach-chon-xoai-cung-ram` | P4/P6 | chọn xoài cúng rằm | /qua-tang-le | Y |
| 09 | C | `xoai-tu-quy-vs-xoai-dai-loan` | P2 | vs xoài Đài Loan | /xoai-tu-quy | Y |
| 10 | A | `gia-xoai-tu-quy-16-2026` | P1 | tuần 16 | /gia-xoai-hom-nay | N |
| 10 | B | `xoai-tu-quy-may-vu-mot-nam` | P6 | mấy vụ/năm | /xoai-tu-quy | Y |
| 10 | C | `htx-thanh-phong-cau-chuyen` | P5 | HTX Thạnh Phong | /nguon-goc | Y |
| 11 | A | `trai-cay-cung-tet-doan-ngo-giet-sau-bo` | P6 | tết đoan ngọ giết sâu bọ | /qua-tang-le | Y |
| 11 | B | `cach-giam-mu-xoai-an-khong-ngua` | P4 | mủ xoài ngứa | /kien-thuc | Y |
| 11 | C | `tin-tuc/xoai-tu-quy-giao-can-tho` | P3 info | giao Cần Thơ | /giao-hang/can-tho | Y |
| 12 | A | `gia-xoai-cho-dau-moi-hoc-mon-hom-nay` | P1 | giá chợ Hóc Môn | /gia-xoai-hom-nay | N |
| 12 | B | `xoai-tu-quy-co-bao-nhieu-calo` | P4 | bao nhiêu calo | /kien-thuc | Y |
| 12 | C | `vietgap-xoai-tu-quy-la-gi` | P5 | VietGAP xoài | /nguon-goc | Y |
| 13 | A | `bao-gia-si-xoai-tu-quy-thang-4` | P1 | báo giá sỉ | /gia-xoai-hom-nay | N |
| 13 | B | `goi-qua-xoai-tu-quy-tang-ai` | P4 | gói quà xoài | /qua-tang-le | Y |
| 13 | C | `xoai-tu-quy-vs-xoai-uc-nhap` | P2 | vs xoài Úc | /xoai-tu-quy | Y |
| 14 | A | `gia-xoai-tu-quy-tuan-17-2026` | P1 | tuần 17 | /gia-xoai-hom-nay | N |
| 14 | B | `cach-lam-xoai-lac-ngam` | P4 | xoài lắc ngâm | /kien-thuc | Y |
| 14 | C | `tin-tuc/xoai-tu-quy-giao-hai-phong` | P3 info | giao Hải Phòng | /giao-hang/hai-phong | Y |

### Week 3 (Day 15–21)

| D | Slot | Slug | Pillar | Keyword | Int.Link | Reuse |
|---|---|---|---|---|---|---|
| 15 | A | `du-bao-gia-xoai-thang-05` | P1 | dự báo giá | /gia-xoai-hom-nay | N |
| 15 | B | `xoai-tu-quy-an-giam-can` | P4 | xoài giảm cân | /kien-thuc | Y |
| 15 | C | `cdd-l-00124-khac-cdd-l-khac-nhu-the-nao` | P5 | CDĐL khác biệt | /nguon-goc | Y |
| 16 | A | `gia-xoai-tu-quy-18-2026` | P1 | tuần 18 | /gia-xoai-hom-nay | N |
| 16 | B | `cach-lam-sinh-to-xoai-tu-quy` | P4 | sinh tố xoài | /kien-thuc | Y |
| 16 | C | `xoai-tu-quy-vs-xoai-keo` | P2 | vs xoài keo | /xoai-tu-quy | Y |
| 17 | A | `thi-truong-xoai-noi-dia-q2-2026` | P1 | thị trường Q2 | /gia-xoai-hom-nay | N |
| 17 | B | `cach-lam-xoai-dam` | P4 | xoài đâm | /kien-thuc | Y |
| 17 | C | `tin-tuc/xoai-tu-quy-giao-nha-trang` | P3 info | giao Nha Trang | /giao-hang/nha-trang | Y |
| 18 | A | `gia-xoai-tu-quy-19-2026` | P1 | tuần 19 | /gia-xoai-hom-nay | N |
| 18 | B | `xoai-tu-quy-cho-be-an-dam` | P4 | xoài cho bé ăn dặm | /kien-thuc | Y |
| 18 | C | `hinh-dang-trai-xoai-tu-quy-chuan` | P5 | hình dáng chuẩn | /nguon-goc | Y |
| 19 | A | `xoai-tu-quy-chuan-bi-vu-lan-2026` | P6 holiday | xoài cúng Vu Lan | /qua-tang-le | Y |
| 19 | B | `cach-uop-xoai-cham-muoi-ot` | P4 | xoài chấm muối ớt | /kien-thuc | Y |
| 19 | C | `so-sanh-xoai-tu-quy-voi-xoai-tuong` | P2 | vs xoài tượng | /xoai-tu-quy | Y |
| 20 | A | `gia-xoai-tu-quy-20-2026` | P1 | tuần 20 | /gia-xoai-hom-nay | N |
| 20 | B | `xoai-xanh-cham-mam-ruoc-ngon` | P4 | xoài xanh mắm ruốc | /kien-thuc | Y |
| 20 | C | `lich-su-cay-xoai-tu-quy-ben-tre` | P5 | lịch sử giống xoài | /nguon-goc | Y |
| 21 | A | `trai-cay-cung-ram-thang-4-am-lich` | P6 holiday | rằm tháng 4 | /qua-tang-le | Y |
| 21 | B | `cach-tia-vo-xoai-nhanh` | P4 | tỉa vỏ xoài | /kien-thuc | Y |
| 21 | C | `tin-tuc/xoai-tu-quy-giao-vung-tau` | P3 info | giao Vũng Tàu | /giao-hang/vung-tau | Y |

### Week 4 (Day 22–28)

| D | Slot | Slug | Pillar | Keyword | Int.Link | Reuse |
|---|---|---|---|---|---|---|
| 22 | A | `gia-xoai-tu-quy-21-2026` | P1 | tuần 21 | /gia-xoai-hom-nay | N |
| 22 | B | `xoai-tu-quy-sau-dam-nhan-biet` | P4 | xoài sâu đâm | /kien-thuc | Y |
| 22 | C | `so-sanh-xoai-ben-tre-vs-xoai-cam-ranh` | P2 | Bến Tre vs Cam Ranh | /xoai-tu-quy | Y |
| 23 | A | `bao-gia-xoai-xuat-sang-trung-quoc` | P1 | giá xuất TQ | /gia-xoai-hom-nay | N |
| 23 | B | `cach-lam-goi-xoai-tom-kho` | P4 | gỏi xoài tôm khô | /kien-thuc | Y |
| 23 | C | `tin-tuc/xoai-tu-quy-giao-hue` | P3 info | giao Huế | /giao-hang/hue | Y |
| 24 | A | `gia-xoai-tu-quy-22-2026` | P1 | tuần 22 | /gia-xoai-hom-nay | N |
| 24 | B | `meo-chon-xoai-dep-chup-hinh` | P4 | xoài đẹp chụp hình | /kien-thuc | Y |
| 24 | C | `cau-chuyen-nguoi-trong-xoai-thanh-phu` | P5 | người trồng xoài | /nguon-goc | Y |
| 25 | A | `xoai-tu-quy-chuan-bi-trung-thu-2026` | P6 holiday | xoài trung thu | /qua-tang-le | Y |
| 25 | B | `cach-lam-xoai-sua-chua` | P4 | xoài sữa chua | /kien-thuc | Y |
| 25 | C | `xoai-tu-quy-vs-xoai-hoa-loc-dai` | P2 | vs Hòa Lộc dài | /xoai-tu-quy | Y |
| 26 | A | `gia-xoai-tu-quy-23-2026` | P1 | tuần 23 | /gia-xoai-hom-nay | N |
| 26 | B | `xoai-bi-den-nhua-co-an-duoc` | P4 | xoài đen nhựa | /kien-thuc | Y |
| 26 | C | `tin-tuc/xoai-tu-quy-giao-quang-ninh` | P3 info | giao Quảng Ninh | /giao-hang/quang-ninh | Y |
| 27 | A | `gia-xoai-tu-quy-thung-lanh-xuat-khau` | P1 | thùng lạnh xuất khẩu | /gia-xoai-hom-nay | N |
| 27 | B | `xoai-tu-quy-bieu-tang-khach-nuoc-ngoai` | P4 | biếu khách nước ngoài | /qua-tang-le | Y |
| 27 | C | `ocop-xoai-tu-quy-la-gi` | P5 | OCOP xoài | /nguon-goc | Y |
| 28 | A | `gia-xoai-tu-quy-24-2026` | P1 | tuần 24 | /gia-xoai-hom-nay | N |
| 28 | B | `cach-lam-mut-xoai-tet` | P4 | mứt xoài Tết | /kien-thuc | Y |
| 28 | C | `so-sanh-xoai-tu-quy-cac-vung-trong` | P2 | vùng trồng | /nguon-goc | Y |

### Week 5 (Day 29–30) + Buffer

| D | Slot | Slug | Pillar | Keyword | Int.Link | Reuse |
|---|---|---|---|---|---|---|
| 29 | A | `gia-xoai-tu-quy-tuan-25-2026` | P1 | tuần 25 | /gia-xoai-hom-nay | N |
| 29 | B | `cach-tu-tay-dong-goi-xoai-lam-qua` | P4 | đóng gói làm quà | /qua-tang-le | Y |
| 29 | C | `xoai-tu-quy-mua-o-dau-uy-tin` | P5 brand | mua ở đâu uy tín | / | Y |
| 30 | A | `tong-ket-gia-xoai-thang-04-2026` | P1 | tổng kết tháng 4 | /gia-xoai-hom-nay | N |
| 30 | B | `30-cong-thuc-che-bien-xoai-tu-quy` | P4 | công thức chế biến | /kien-thuc | Y |
| 30 | C | `30-ngay-content-xoai-tu-quy-roundup` | P5 | roundup (brand retrospective) | / | N |

---

## Slot-Pillar Mapping Rules

1. **Slot A (morning)**: luôn prefer P1 (giá) hoặc P6 (lễ/mùa vụ news). Editor check `price_history` freshness trước khi queue bài P1.
2. **Slot B (noon)**: prefer P4 HowTo ngắn (800–1200 từ), đọc nhanh. Mixed P6 reminder nếu gần lễ.
3. **Slot C (evening)**: longform 1400–2000 từ. P2/P5/P3 longform. Bài authority/heritage ưu tiên tối.

## GEO Article Rule (quan trọng)

Mọi bài GEO info (Slot C) bắt buộc:
- URL format: `/tin-tuc/xoai-tu-quy-giao-{city-slug}`
- Internal link primary: tới commercial landing `/giao-hang/{city-slug}` với anchor "đặt xoài giao {city}"
- KHÔNG duplicate content với commercial landing — focus câu hỏi info: "bao lâu tới?", "bảo quản thế nào khi ship xa?", "đặt trước mấy ngày?"
- Schema: Article + FAQPage + `mentions: Service(areaServed={city})`
- Xem `topic-clusters.md` → section "Hub-and-spoke resolution"

---

## Holiday-aware Insertions

Bài P6 trong bảng trên đã đánh dấu (Day 08, 11, 19, 21, 25). Danh sách đầy đủ holiday runway 2026–2027 (Tết Đoan Ngọ → Vu Lan → Trung Thu → Tết 2027) xem `vietnamese-holiday-content-calendar.md`. Holiday bài publish-ahead 21–28 ngày.

---

## Schedule Queue vào Supabase

Sau khi 90 bài draft xong:
```sql
-- pseudo bulk insert
insert into articles (slug, title, pillar, slot, primary_keyword, scheduled_for, status)
values
 ('gia-xoai-tu-quy-tuan-14-2026', '...', 'P1', 'A', 'giá xoài tuần này', '2026-04-10 00:00:00+07', 'ready'),
 -- ... 89 more
;
```

Cron handler sẽ pick bài có `status='ready' AND slot=$1` sớm nhất mỗi slot. Không cần khớp `scheduled_for` chính xác — đóng vai trò prioritization.
