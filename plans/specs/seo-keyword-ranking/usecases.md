# SEO Keyword Ranking — Use Cases & Acceptance Criteria

## 1. Use Cases

### UC-01: Tra giá xoài hôm nay
**Actor:** Người tiêu dùng search "giá xoài tứ quý hôm nay"
**Precondition:** User tìm kiếm trên Google/Bing
**Happy Path:**
1. Google hiển thị traicaybentre.com/bang-gia trong top 10
2. User click → thấy bảng giá 3 tier (VIP/Loại 1/Loại 2) với giá cụ thể
3. Thấy "Cập nhật: [ngày]" rõ ràng
4. CTA gọi vựa hoặc Zalo để đặt hàng
**Edge Cases:**
- Giá chưa cập nhật hôm nay → hiển thị ngày cập nhật gần nhất + note "gọi vựa để có giá chính xác"
- User trên mobile → bảng giá responsive, CTA dính bottom

### UC-02: Đặt hàng xoài online
**Actor:** Người muốn mua xoài search "mua xoài tứ quý online"
**Precondition:** User có intent mua hàng
**Happy Path:**
1. Google hiển thị traicaybentre.com/dat-hang trong top 10
2. User click → thấy sản phẩm + giá + CTA đặt qua Zalo/gọi điện
3. Click CTA → mở Zalo hoặc dialer với message pre-filled
**Edge Cases:**
- Hết mùa (tháng 1-3) → hiển thị "Đang vào vụ mới, đặt trước"
- Dừa Xiêm quanh năm → luôn available

### UC-03: Google index đúng version
**Actor:** Googlebot
**Precondition:** Crawl product pages
**Happy Path:**
1. Crawl `/xoai-tu-quy` → canonical = `https://www.traicaybentre.com/xoai-tu-quy`
2. hreflang: vi (default), en, ko, ja — tất cả có x-default → vi
3. SERP hiển thị tiếng Việt cho user VN
**Edge Cases:**
- Product pages thiếu locale prefix trong canonical → phải ensure `/xoai-tu-quy` (không phải `/en/xoai-tu-quy`) là canonical

## 2. Acceptance Criteria (Gherkin)

```gherkin
# UC-01: Trang bảng giá
Given user truy cập /bang-gia
When page load xong
Then hiển thị bảng giá 3 tier với priceRange từ PRICE_DATA
And hiển thị "Cập nhật: {lastUpdated}" từ PRICE_DATA
And có JSON-LD Product schema với Offer array + dateModified
And meta title chứa "giá xoài tứ quý"
And có CTA Zalo + gọi điện

# UC-02: Trang đặt hàng
Given user truy cập /dat-hang
When page load xong
Then hiển thị 3 sản phẩm (Xoài Tứ Quý, Hoàng Kim, Dừa Xiêm)
And mỗi sản phẩm có giá + CTA Zalo
And meta title chứa "mua xoài" hoặc "đặt hàng"
And có JSON-LD với Product schema

# UC-03: Canonical fix
Given Googlebot crawl /xoai-tu-quy
When parse HTML head
Then canonical URL = "https://www.traicaybentre.com/xoai-tu-quy"
And hreflang vi = "https://www.traicaybentre.com/xoai-tu-quy"
And hreflang en = "https://www.traicaybentre.com/en/xoai-tu-quy"
And x-default = "https://www.traicaybentre.com/xoai-tu-quy"
```

## 3. Edge Cases & Error States

| Scenario | Behavior |
|----------|----------|
| PRICE_DATA.lastUpdated > 7 ngày | Hiển thị warning "Giá có thể thay đổi, gọi vựa để xác nhận" |
| Product status = "coming-soon" | Không hiển thị trên /dat-hang |
| Locale không phải vi | Redirect canonical về vi version, hreflang link đến locale version |

## 4. UX Decisions

| Decision | UX Principle | Rationale |
|----------|-------------|-----------|
| Bảng giá 3 tier dạng card | Gestalt Similarity | Dễ so sánh nhanh 3 phân hạng |
| CTA Zalo sticky bottom trên mobile | Fitts' Law | Ngón cái dễ chạm, không cuộn lên |
| Hiển thị "Cập nhật" timestamp | Trust Signal | User tin giá real-time hơn |
| Phone number clickable | Fitts' Law | 1-tap gọi trên mobile |

## 5. Design System Check

**Existing components reuse:**
- Price table cards từ `xoai-tu-quy-landing.tsx` (3 tier layout)
- CTA buttons (Zalo, phone) từ existing landing components
- Hero section pattern từ product landing
- Badge component (VIP, Bán chạy, Giá tốt)

**New components needed:** Không — reuse 100% existing patterns

## 6. Appetite Check

| UC | Effort | Value | Ship this cycle? |
|----|--------|-------|------------------|
| UC-01 Trang bảng giá | Low | **High** (top keyword) | Yes |
| UC-02 Trang đặt hàng | Low | High | Yes |
| UC-03 Canonical fix | Low | **Critical** (blocking indexing) | Yes |
