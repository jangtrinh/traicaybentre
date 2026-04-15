# SEO Backlink Playbook — Tuần 1 (Escape "Discovered not indexed")

**Mục tiêu:** Trong 7 ngày đầu, tạo đủ tín hiệu authority để Google nâng crawl budget cho traicaybentre.com và bắt đầu crawl 102 URL đang treo "Discovered - currently not indexed".

**Nguyên tắc:** Không mua backlink. Tập trung vào các tín hiệu chính chủ, local business, và social presence thật. Mỗi task < 30 phút.

---

## Ngày 1 — Google Business Profile (IMPACT CAO NHẤT)

**Tại sao đầu tiên:** GBP là backlink mạnh nhất cho local business, đến thẳng từ Google. Nâng local pack + brand search ngay lập tức.

### Checklist
- [ ] Truy cập https://business.google.com → Tạo mới / nhận lại business
- [ ] Tên: `Trái Cây Bến Tre — Vựa Đặc Sản Thạnh Phú`
- [ ] Category chính: `Fruit and vegetable wholesaler` (bán buôn)
- [ ] Category phụ: `Produce market`, `Fruit store`, `Agricultural service`
- [ ] Địa chỉ: vựa Thạnh Phú (đầy đủ, có số nhà)
- [ ] SĐT: số hotline chính
- [ ] Website: **https://www.traicaybentre.com** ← đây là backlink
- [ ] Giờ mở cửa: điền đầy đủ 7 ngày
- [ ] Upload 10+ ảnh: sản phẩm (Loại 1, Loại 2, VIP, VIP Plus), vựa, xe giao hàng, nhà vườn, chứng nhận CDĐL #00124
- [ ] Thêm sản phẩm (Products tab): 4 SKU xoài + dừa xiêm
- [ ] Verify: đợi bưu thiếp hoặc video call

**Output mong đợi:** 1 backlink DA 100 (google.com) + local pack visibility + sitelinks search box signal.

---

## Ngày 2 — Social profiles thống nhất

**Tại sao:** Google dùng `sameAs` trong Organization schema để verify brand. Profile consistency = trust signal.

### Checklist
- [ ] **Facebook Page** (nếu chưa có):
  - Tên: `Trái Cây Bến Tre`
  - Category: Grocery Store / Fruit Store
  - Link website trong About
  - Pin bài giới thiệu kèm link `https://www.traicaybentre.com/nguon-goc`
- [ ] **TikTok profile**:
  - Username: `@traicaybentre`
  - Bio: 1 dòng tagline + link `https://www.traicaybentre.com`
  - Upload 1 video giới thiệu vựa (dùng reel đã có)
- [ ] **YouTube channel**:
  - Tên: `Trái Cây Bến Tre`
  - Description: có link website
  - Upload 1 video (có thể dùng reel Facebook đã quay)
- [ ] **Zalo OA** (CRITICAL cho VN — 25M+ users):
  - Đăng ký tại https://oa.zalo.me
  - Loại: Doanh nghiệp
  - Link website + mô tả
- [ ] **Cập nhật `sameAs`** trong `src/lib/structured-data.ts` với URL thật của các profile trên (hiện đang hardcode placeholder)

**Output:** 4-5 profile backlinks + Organization schema verified.

---

## Ngày 3 — Vietnamese business directories

**Tại sao:** Free, nofollow nhưng vẫn là crawl signals. Googlebot theo các directory này đến site bạn.

### Checklist
- [ ] **Foody.vn**: đăng ký business, category "Trái cây"
- [ ] **VatGia.com**: đăng sản phẩm xoài tứ quý với link website
- [ ] **Chotot.com**: post 3 tin bán xoài (Loại 1, Loại 2, VIP) có link
- [ ] **Yellow Pages VN (trangvangvietnam.com)**: đăng ký business
- [ ] **2Shop.vn**: listing sản phẩm
- [ ] **Lazada / Shopee / Tiki seller center**: tạo shop official (không cần bán, chỉ cần profile có link web)

**Output:** 6-8 directory citations, local SEO boost.

---

## Ngày 4 — Forum thật (Webtretho, Voz, Tinhte)

**Tại sao:** Nofollow nhưng brand-mention + referral traffic. Google dùng brand mentions như soft backlink.

### Checklist — Không spam, comment thật
- [ ] **Webtretho.com** → mục "Mẹ & Bé" hoặc "Ăn uống":
  - Tìm 2-3 thread hỏi về "xoài cho bé ăn dặm" hoặc "xoài loại nào ngon"
  - Comment chia sẻ kinh nghiệm thật + mention nguồn `traicaybentre.com/kien-thuc/xoai-tu-quy-cho-be-an-dam`
- [ ] **Voz.vn** → box "Chợ trời":
  - Post 1 thread giới thiệu vựa + link sản phẩm
- [ ] **Tinhte.vn** → category "Ẩm thực":
  - Share bài review nhỏ về xoài tứ quý + link `/nguon-goc`
- [ ] **Facebook groups** (5 group lớn về nấu ăn, mẹ bỉm, Bến Tre quê tôi):
  - Join + đăng 1-2 bài giá trị (recipe, story) có link

**Output:** 5-10 forum mentions, referral traffic, crawl signals.

---

## Ngày 5 — Submit GSC "Request Indexing" cho top 10 URL

**Tại sao:** Không automate được, phải thủ công. Nhưng hiệu quả khi có authority đã tăng từ ngày 1-4.

### Thứ tự ưu tiên (làm 10 URL, mỗi URL ~2 phút):
1. https://www.traicaybentre.com/
2. https://www.traicaybentre.com/xoai-tu-quy
3. https://www.traicaybentre.com/dua-xiem-ben-tre
4. https://www.traicaybentre.com/san-pham
5. https://www.traicaybentre.com/nguon-goc
6. https://www.traicaybentre.com/kien-thuc
7. https://www.traicaybentre.com/kien-thuc/xoai-tu-quy-la-gi
8. https://www.traicaybentre.com/kien-thuc/chi-dan-dia-ly-cd-dl-00124
9. https://www.traicaybentre.com/giao-hang/tp-hcm
10. https://www.traicaybentre.com/bang-gia

**Cách:** GSC → URL Inspection → paste URL → "Test Live URL" → nếu pass → "Request Indexing".

**Giới hạn:** ~10-15 URL/ngày/property. Làm đều đặn 7 ngày sẽ cover top 70 URL.

---

## Ngày 6 — Outreach báo chí nhẹ nhàng

**Tại sao:** 1-2 backlink DA 60+ mạnh hơn 50 nofollow directory.

### Checklist
- [ ] Viết pitch 150 từ: "Câu chuyện nhà vườn xoài Thạnh Phú giữ vững CDĐL #00124"
- [ ] Gửi pitch đến các trang:
  - `danviet.vn` (Nông thôn Ngày Nay)
  - `vnexpress.net` → mục Kinh doanh/Nông nghiệp
  - `thanhnien.vn` → Kinh tế
  - `nongnghiep.vn`
  - `baobentre.com.vn` (báo địa phương — dễ đăng nhất, nên làm đầu)
- [ ] Nếu có photographer tốt: gửi kèm 3-4 ảnh vựa + sản phẩm chất lượng cao

**Output:** Kỳ vọng 1-2 bài đăng trong 2-4 tuần. Mỗi bài = backlink DA 50-70 cực mạnh.

---

## Ngày 7 — Verify + IndexNow ping thủ công

### Checklist
- [ ] **GSC**: kiểm tra số "Discovered not indexed" đã giảm chưa (thường cần 3-7 ngày để update)
- [ ] **Manual IndexNow ping**: trigger endpoint `/api/cron/ping-indexnow` để push top 20 URL tới Bing/Yandex
  ```bash
  curl -H "Authorization: Bearer $CRON_SECRET" \
    https://www.traicaybentre.com/api/cron/ping-indexnow
  ```
- [ ] **Bing Webmaster Tools**: tạo property + verify → Bing hiện index nhanh hơn Google, đến từ Bing → traffic sớm
- [ ] **Yandex Webmaster**: tạo property (optional, nhưng miễn phí)
- [ ] Kiểm tra **Google Analytics** / Vercel Analytics xem có organic traffic đầu tiên chưa

---

## KPIs sau 7 ngày

| Metric | Baseline | Target tuần 1 | Target tuần 4 |
|---|---|---|---|
| Indexed pages | ~10 | 25-35 | 70-90 |
| Discovered not indexed | 102 | 70-80 | 20-40 |
| GBP impressions | 0 | 50-200 | 500-1500 |
| Bing indexed pages | 0 | 15-30 | 60-100 |
| Referring domains | 1 | 6-10 | 15-25 |
| Organic clicks | 0 | 5-20 | 80-150 |

---

## Sau tuần 1

### Tuần 2-4
- Tạo Google My Business posts hàng tuần (mỗi post = signal)
- Upload 2-3 video ngắn lên TikTok + YouTube Shorts
- Join/post group Facebook VN có link web (mỗi tuần 2-3 lần)
- Write 1 bài guest post trên blog bạn bè / đối tác

### Tháng 2-3
- Partnerships với food blogger / mommy blogger VN → 2-3 backlinks chất lượng
- Press release cho mùa thu hoạch chính (có news hook)
- Wikipedia Vietnamese article (nếu đủ notable — citation CDĐL #00124 là điểm mạnh)

---

## Anti-pattern — KHÔNG làm những thứ này

- ❌ Mua backlink trên forum SEO Việt (Google detect và penalty)
- ❌ Submit 50 directory kém chất lượng trong 1 ngày (spam signal)
- ❌ Copy-paste cùng 1 comment trên nhiều forum (footprint spam)
- ❌ Dùng PBN (Private Blog Network) — risk penalty cao
- ❌ Tạo nhiều Facebook profile fake để like/share
- ❌ Request Indexing hơn 20 URL/ngày (trigger rate limit)

---

## Câu hỏi còn treo

1. Tên chính xác của vựa + địa chỉ đầy đủ để đăng GBP?
2. SĐT hotline chính thức?
3. Đã có Facebook Page chưa? Nếu có, URL hiện tại là gì?
4. Có photographer / ảnh chất lượng cao chưa?
5. Ngân sách cho báo chí (nếu chạy PR trả phí thay vì organic outreach)?
