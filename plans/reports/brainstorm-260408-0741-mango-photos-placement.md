# Brainstorm: Tích hợp ảnh xoài thật vào Landing Page

**Ngày:** 2026-04-08
**Trạng thái:** Hoàn thành brainstorm — chờ quyết định

---

## Bối cảnh & Vấn đề

Landing page "Xoài Tứ Quý Bến Tre" hiện tại thiếu ảnh thật. Hero section chỉ có text trên gradient, Process section chỉ dùng icon, Testimonials/Dual CTA/Contact đều thuần text. Trang web cần ảnh thật để tạo **appetite appeal** (kích thích thị giác), xây dựng **trust** (nhìn thấy sản phẩm thật), và tăng **conversion** (khách hàng cảm nhận được chất lượng).

### Product images hiện có
- `public/images/loai-1.png`, `loai-2.png`, `vip.png` — ảnh sản phẩm riêng, **KHÔNG thay thế**

---

## Giả định cần challenge

### 1. "Dùng ảnh Unsplash generic là đủ tốt"
**Phản biện:** Ảnh xoài trên Unsplash chủ yếu là xoài Alphonso (Ấn Độ), Tommy Atkins (Mỹ Latinh) — màu đỏ/cam. Xoài Tứ Quý Bến Tre có **vỏ xanh ngả vàng**, hình dáng khác biệt. Nếu dùng ảnh xoài sai giống → **mất trust**, khách nghĩ hàng fake.

**Khuyến nghị:**
- Ảnh Unsplash chỉ dùng cho **bối cảnh** (orchard, tropical farm, hands harvesting, fruit market) — KHÔNG dùng cho close-up sản phẩm
- Close-up xoài cắt lát, xoài chín có thể dùng nếu chọn đúng giống (tìm "green mango", "asian mango")
- **Lý tưởng nhất:** Tự chụp 5-10 ảnh tại vườn Thạnh Phú → unique, authentic, đúng giống

### 2. "Dùng URL Unsplash trực tiếp cho tiện"
**Phản biện:** 
- Unsplash CDN không tối ưu cho Việt Nam (latency cao)
- Next.js Image component cần `remotePatterns` config
- Không kiểm soát được uptime, ảnh có thể bị xóa
- Mỗi page load = external request → chậm hơn self-host

**Khuyến nghị:** Download ảnh → optimize → self-host trong `public/images/`

### 3. "Càng nhiều ảnh càng tốt"
**Phản biện:** Mỗi ảnh thêm ~50-200KB (dù optimized). Landing page e-commerce cần load < 3s trên 4G Việt Nam. Nên chọn **5-7 ảnh chiến lược** thay vì rải ảnh khắp nơi.

---

## 3 Phương án tiếp cận

### Phương án A: "Surgical Placement" (Khuyến nghị)
**Mô tả:** Chỉ thêm ảnh ở 3-4 vị trí có impact cao nhất

| Tiêu chí | Đánh giá |
|-----------|----------|
| Complexity | Thấp — sửa 3-4 component |
| Performance | Tốt — thêm 3-5 ảnh, ~300KB total |
| Visual impact | Cao — tập trung vào hero + process |
| Thời gian | 2-3h |

### Phương án B: "Full Visual Overhaul"
**Mô tả:** Thêm ảnh vào mọi section, mỗi section có background hoặc inline photo

| Tiêu chí | Đánh giá |
|-----------|----------|
| Complexity | Trung bình — sửa 7-8 component |
| Performance | Rủi ro — thêm 10-15 ảnh, ~1MB+ |
| Visual impact | Rất cao nhưng có thể overwhelming |
| Thời gian | 5-8h |

### Phương án C: "Photo + Custom Illustration Hybrid"
**Mô tả:** Ảnh thật cho hero/process, illustration cho các section khác

| Tiêu chí | Đánh giá |
|-----------|----------|
| Complexity | Cao — cần thiết kế illustration |
| Performance | Tốt — ít ảnh nặng |
| Visual impact | Cao + unique brand identity |
| Thời gian | 8-12h + designer |

**Đề xuất: Phương án A** — ít phức tạp nhất, impact cao nhất per effort, đúng KISS/YAGNI.

---

## Xếp hạng vị trí đặt ảnh (theo ROI giảm dần)

### #1. HERO SECTION — Split Layout (Priority: CRITICAL)
**Hiện tại:** Text trên gradient, không có ảnh → yếu nhất toàn trang
**Đề xuất:** Chuyển sang layout 2 cột (text trái | ảnh phải)

```
┌─────────────────────────────────────────────┐
│  [Badge: Mùa thu hoạch]                    │
│                                             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ Xoài Tứ Quý  │  │                      │ │
│  │ Bến Tre       │  │   ẢNH XOÀI CHÍN     │ │
│  │               │  │   trên nền lá xanh   │ │
│  │ Giá sỉ từ     │  │   hoặc trong thùng   │ │
│  │ 22.000đ/kg    │  │   gỗ rustic          │ │
│  │               │  │                      │ │
│  │ [CTA buttons] │  │   rounded-3xl        │ │
│  └──────────────┘  │   shadow-2xl         │ │
│                     └──────────────────────┘ │
│  [Trust stats bar]                          │
└─────────────────────────────────────────────┘
```

**Unsplash search terms:**
- `"green mango"` — xoài xanh/vàng giống Tứ Quý nhất
- `"mango basket"` — xoài trong rổ tre/gỗ (feel Việt Nam)
- `"tropical fruit wooden"` — trái cây trên nền gỗ mộc mạc

**Kỹ thuật:**
- `next/image` với `priority={true}` (hero = above fold)
- `placeholder="blur"` + `blurDataURL` base64 10px
- `sizes="(max-width: 768px) 100vw, 50vw"` cho responsive
- Mobile: ảnh hiển thị trên text (stack layout), chiều cao giới hạn 280px

**UX Impact:** +++ Tạo ấn tượng đầu tiên mạnh, kích thích appetite appeal ngay lập tức

---

### #2. PROCESS SECTION — Background Photo Strip (Priority: HIGH)
**Hiện tại:** 4 card icon trên nền `primary-light` đơn điệu
**Đề xuất:** Thêm 1 ảnh panoramic vườn xoài làm background cho cả section, overlay semi-transparent

```
┌─────────────────────────────────────────────┐
│  ▓▓▓ ẢNH VƯỜN XOÀI PANORAMIC ▓▓▓          │
│  ▓▓▓ (overlay: bg-primary-light/85) ▓▓▓    │
│                                             │
│   "Đất cát ven biển → Vị mặn cuối lưỡi"   │
│                                             │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │Card1│ │Card2│ │Card3│ │Card4│          │
│  └─────┘ └─────┘ └─────┘ └─────┘          │
└─────────────────────────────────────────────┘
```

**Unsplash search terms:**
- `"mango tree plantation"` — hàng cây xoài thẳng tắp
- `"mango orchard"` — vườn xoài nhìn xa
- `"tropical farm"` — nông trại nhiệt đới tổng quát

**Kỹ thuật:**
- CSS background-image hoặc `next/image` fill mode với `object-fit: cover`
- Overlay: `bg-primary-light/85` hoặc `bg-gradient-to-b from-primary-light/90 to-primary-light/80`
- `loading="lazy"` (below fold)

**UX Impact:** ++ Tạo cảm giác "authentic farm" → tăng trust về nguồn gốc

---

### #3. DUAL CTA SECTION — Card Background Photos (Priority: MEDIUM)
**Hiện tại:** 2 card thuần text (sỉ vs lẻ)
**Đề xuất:** Thêm ảnh nhỏ ở header mỗi card

```
┌──────────────────┐  ┌──────────────────┐
│ ▓▓ẢNH THÙNG XOÀI│  │ ▓ẢNH HỘP QUÀ    │
│ ▓▓ (chợ sỉ)  ▓▓│  │ ▓ (sang trọng) ▓│
│──────────────────│  │──────────────────│
│ Lấy Mối Sỉ      │  │ Mua Lẻ / Quà     │
│ ✓ Giá sỉ theo   │  │ ✓ Combo 5kg      │
│   tấn...         │  │   275.000đ...     │
│ [CTA button]     │  │ [CTA button]     │
└──────────────────┘  └──────────────────┘
```

**Unsplash search terms:**
- Card sỉ: `"fruit market"`, `"fruit wholesale"`, `"fruit crate"` — cảnh chợ đầu mối
- Card lẻ: `"fruit gift box"`, `"fruit packaging"`, `"mango dessert"` — ảnh đóng gói sang

**Kỹ thuật:**
- Ảnh header 120px height, `object-fit: cover`, `rounded-t-3xl`
- Dark card: overlay gradient `from-primary-dark/60` trên ảnh
- Light card: ảnh nguyên, border-bottom separator

**UX Impact:** + Phân biệt rõ 2 phân khúc khách hàng bằng visual cues

---

### #4. HERO SECTION — Floating Decorative Mangoes (Priority: MEDIUM, thay thế cho #1)
**Phương án B cho hero** nếu không muốn split layout:

```
┌─────────────────────────────────────────────┐
│        🥭(float, rotate -15deg)             │
│  Xoài Tứ Quý Bến Tre                       │
│  Ngọt đậm...             🥭(float, +10deg) │
│                                             │
│  [CTA buttons]      🥭(float, scale 0.6)   │
│  [Trust stats]                              │
└─────────────────────────────────────────────┘
```

**Unsplash search terms:**
- `"mango png"` hoặc `"mango white background"` — xoài trên nền trắng/trong suốt
- Tự cắt nền (remove.bg) nếu cần

**Kỹ thuật:**
- 2-3 ảnh xoài PNG nền trong suốt
- `absolute` positioning + CSS animation `float` nhẹ
- `opacity-60` cho ảnh xa, `opacity-90` cho ảnh gần → depth
- Mobile: ẩn bớt hoặc thu nhỏ

**Lưu ý:** Cần ảnh xoài **đúng giống** (xanh/vàng, không đỏ). Khó tìm trên Unsplash.

---

### #5. CONTACT SECTION — Background Photo (Priority: LOW)
**Hiện tại:** Green gradient đơn sắc
**Đề xuất:** Ảnh vườn xoài mờ phía sau, green overlay giữ nguyên

**Unsplash search terms:** `"mango tree sunset"`, `"tropical plantation aerial"`

**Kỹ thuật:** `next/image` fill + overlay `from-primary-dark/90`

**UX Impact:** Nhỏ — section này đã đủ mạnh với form + contact info

---

### #6. TESTIMONIAL SECTION — Avatar/Context Photos (Priority: LOW)
**Hiện tại:** Thuần text quotes
**Đề xuất:** Thêm avatar placeholder cho mỗi testimonial

**Lưu ý:** Nên dùng ảnh THẬT của đối tác (xin phép), không dùng Unsplash stock faces → trust giả tạo

---

## Kế hoạch kỹ thuật

### 1. Next.js Config — Remote Patterns (nếu dùng Unsplash URL)
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};
```

### 2. Self-host (Khuyến nghị mạnh)
```
public/images/
├── hero-mango-basket.webp      (~80KB, 1200x800, optimized)
├── orchard-panoramic.webp      (~100KB, 1920x600, panoramic crop)
├── cta-wholesale-market.webp   (~50KB, 600x300)
├── cta-gift-box.webp           (~50KB, 600x300)
└── loai-1.png, loai-2.png, vip.png  (giữ nguyên)
```

**Tại sao self-host:**
- Latency thấp hơn (cùng CDN với site)
- Next.js auto-optimize khi build (WebP/AVIF, srcset)
- Không phụ thuộc Unsplash uptime
- `placeholder="blur"` tự động cho local images (không cần blurDataURL thủ công)
- Kiểm soát 100% chất lượng ảnh

### 3. Image Optimization Pipeline
1. Download từ Unsplash (chọn size "Regular" ~1080px)
2. Crop/resize phù hợp vị trí đặt
3. Convert sang WebP (quality 80)
4. Tạo blur placeholder tự động bởi Next.js (local images)

### 4. Performance Budget
| Vị trí | File size target | Loading |
|--------|-----------------|---------|
| Hero | < 100KB | `priority` (eager) |
| Process bg | < 120KB | `lazy` |
| Dual CTA (x2) | < 60KB each | `lazy` |
| **Total** | **< 340KB** | — |

So với trang hiện tại (chỉ có 3 product images ~150KB) → tăng thêm ~340KB → vẫn dưới 500KB total images → chấp nhận được cho 4G VN.

---

## Second-order Effects

1. **Hero split layout** → cần responsive breakpoint mới (md: 2 col, sm: stack) → test kỹ mobile
2. **Process background photo** → text contrast trên ảnh → cần test accessibility (WCAG contrast ratio)
3. **Self-host ảnh** → tăng repo size ~500KB → không đáng kể
4. **Ảnh Unsplash sai giống xoài** → khách quen xoài Tứ Quý nhận ra ngay → mất trust → **chọn ảnh cẩn thận hoặc tự chụp**
5. **Nhiều ảnh hơn** → CLS risk nếu không set width/height → luôn dùng `next/image` với dimensions cố định

---

## Kết luận & Đề xuất cuối

### Giải pháp đơn giản nhất đáp ứng yêu cầu (Simplest Viable Option):
**Phương án A — Surgical Placement** với 3 vị trí:

1. **Hero split layout** + 1 ảnh xoài trong rổ tre (search: `"green mango basket"`)
2. **Process section** + 1 ảnh vườn xoài panoramic background (search: `"mango orchard"`, `"mango plantation"`)
3. **Dual CTA cards** + 2 ảnh header nhỏ (search: `"fruit market"` + `"fruit gift box"`)

**Tổng: 4 ảnh, ~340KB, sửa 3 component, thời gian ~2-3h**

### Lưu ý quan trọng:
- **Ưu tiên tự chụp** ảnh tại vườn Thạnh Phú nếu có thể — authentic hơn bất kỳ stock photo nào
- **Self-host** tất cả ảnh trong `public/images/` — không dùng Unsplash URL trực tiếp
- **Kiểm tra giống xoài** trong ảnh — xoài Tứ Quý vỏ xanh/vàng, KHÔNG dùng ảnh xoài đỏ/cam (Alphonso, Tommy Atkins)

---

## Câu hỏi chưa giải quyết

1. Có khả năng tự chụp ảnh tại vườn không? (tốt hơn stock photo rất nhiều)
2. Hero section muốn split layout (text + ảnh) hay giữ full-width text + floating mangoes?
3. Budget performance — target load time bao nhiêu giây trên 4G?
4. Có cần ảnh cho mobile hero riêng (khác tỉ lệ) hay responsive crop từ desktop?
5. Process section — muốn background photo hay giữ solid color + chỉ thêm ảnh ở hero?

---

*Sources:*
- [Unsplash Mango Photos](https://unsplash.com/s/photos/mango)
- [Unsplash Mango Tree](https://unsplash.com/s/photos/mango-tree)
- [Unsplash Mango Slice](https://unsplash.com/s/photos/mango-slice)
- [Unsplash Green Mango](https://unsplash.com/s/photos/green-mango)
- [Next.js Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Image Optimization](https://nextjs.org/docs/app/getting-started/images)
