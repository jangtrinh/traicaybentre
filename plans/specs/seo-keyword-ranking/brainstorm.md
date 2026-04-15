# SEO Keyword Ranking Improvement — Brainstorm

## 1. Press Release

**Trái Cây Bến Tre ra mắt trang Bảng Giá Xoài cập nhật hàng ngày và trang Đặt Hàng Online**

Người tiêu dùng muốn mua xoài Tứ Quý Bến Tre giờ đây có thể tra giá chính xác hàng ngày và đặt hàng trực tiếp từ vựa qua traicaybentre.com — không cần gọi điện hỏi giá, không qua trung gian. Trang bảng giá cập nhật mỗi sáng với 3 phân hạng (VIP/Loại 1/Loại 2), kèm thông tin mùa vụ và shipping. Trang đặt hàng tập trung CTA rõ ràng: Zalo, gọi điện, COD — phục vụ khách hàng từ Hà Nội đến TP.HCM.

**Vấn đề giải quyết:** Site hiện có metadata SEO tốt nhưng Google không ranking cho bất kỳ transactional keyword nào (giá, mua, đặt). Đối thủ (Bách Hoá Xanh, Shopee, Farmers Market) chiếm hết top 10 vì họ có dedicated pages cho từng intent.

## 2. User Stories

1. **As a** người tiêu dùng tìm giá xoài, **I want to** thấy bảng giá xoài Tứ Quý cập nhật hôm nay, **so that** tôi biết giá trước khi gọi đặt.
2. **As a** người muốn mua xoài online, **I want to** landing trên trang có CTA đặt hàng rõ ràng, **so that** tôi đặt hàng nhanh chóng qua Zalo/điện thoại.
3. **As a** tiểu thương mua sỉ, **I want to** xem bảng giá sỉ + MOQ + chính sách giao hàng, **so that** tôi quyết định đặt hàng lớn.
4. **As a** Google crawler, **I want to** thấy canonical URL tiếng Việt là default, **so that** SERP hiển thị đúng version cho user Việt Nam.
5. **As a** AI search engine (Perplexity, ChatGPT), **I want to** thấy structured data với giá cập nhật + dateModified, **so that** tôi cite traicaybentre.com khi trả lời câu hỏi về giá xoài.

## 3. MoSCoW Prioritization

| Priority | Item | Rationale |
|----------|------|-----------|
| **Must (P0)** | Trang bảng giá `/bang-gia` với SEO metadata targeting "giá xoài tứ quý" | Keyword có volume cao nhất, chưa có dedicated page |
| **Must (P0)** | Fix canonical/hreflang — Vietnamese là x-default trên product pages | Google đang index EN thay vì VI |
| **Must (P0)** | Freshness signals — dateModified trong JSON-LD, "cập nhật" timestamp hiển thị | Google ưu tiên fresh content cho price queries |
| **Should (P1)** | Trang đặt hàng `/dat-hang` targeting "mua xoài tứ quý online" | Transactional intent, nhưng Zalo CTA đã có trên landing |
| **Should (P1)** | Thêm trang bảng giá vào sitemap với priority 0.9, changeFrequency "daily" | Báo hiệu Google crawl thường xuyên |
| **Could (P2)** | Rich snippet cho FAQ trên trang bảng giá | Tăng CTR trên SERP |
| **Won't** | E-commerce cart/checkout flow | Quá phức tạp cho appetite hiện tại, Zalo ordering đủ |
| **Won't** | Blog content cho 38 keyword gap | Separate initiative, không cùng scope |

## 4. Appetite & No-Gos

**Time budget:** 1 ngày — 2 trang mới + metadata fixes + sitemap update

**No-Gos:**
- KHÔNG xây dựng shopping cart hay payment integration — Zalo/phone ordering là flow chính
- KHÔNG tạo content mới cho tất cả 38 keyword gap — chỉ focus transactional keywords có volume cao nhất
- KHÔNG thay đổi design system hay landing page hiện có — extend, không refactor

## 5. Research Protocol

| Step | Action | Output |
|------|--------|--------|
| **Benchmark** | Bách Hoá Xanh, Farmers Market — có dedicated price page với structured data, daily update badge | Best-in-class: dedicated price page + schema Product/Offer + lastUpdated visible |
| **First Principles** | Google không rank site vì thiếu dedicated pages matching search intent — metadata trên product landing quá general, không match "giá xoài tứ quý hôm nay" intent cụ thể | ROOT: Thiếu intent-matched pages |
| **Proven Frameworks** | SEO content silo: Pillar page (product landing) → Cluster pages (giá, cách mua, giao hàng) → Internal linking | Content silo model |
| **Cross-Domain** | Real estate sites (batdongsan.com) — mỗi loại search intent có dedicated landing page (giá, cho thuê, mua bán) | Intent segregation → dedicated pages per intent |
| **Trade-offs** | Thêm pages = thêm maintenance burden (cập nhật giá). Mitigation: dùng shared PRICE_DATA source | Accept maintenance for SEO gain |
| **Executability** | PRICE_DATA đã centralized. Landing component pattern có 3 templates sẵn. Sitemap dynamic. Chỉ cần thêm routes + components | Feasible trong 1 ngày |

---

**Root Problem (1 sentence):** Site có structured data tốt nhưng thiếu dedicated pages matching từng search intent (giá, mua, đặt), khiến Google không có page nào relevant để rank cho transactional keywords.
