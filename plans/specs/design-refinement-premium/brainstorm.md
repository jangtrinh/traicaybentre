# Brainstorm: Design Refinement — Premium Feel

## Press Release

**Xoài Tứ Quý Bến Tre ra mắt landing page mới — cảm giác như mở hộp quà trái cây cao cấp.**

Landing page được nâng cấp lấy cảm hứng từ jinzhenlian.com — thương hiệu sầu riêng premium. Typography đậm hơn, nhịp thở giữa sections rõ ràng hơn, ảnh lớn hơn, tổng thể premium nhưng vẫn giữ vibe tươi mới. Mục tiêu: khách hàng cảm nhận được chất lượng sản phẩm chỉ qua cách thiết kế trang web.

---

## Phân Tích Gap: jinzhenlian.com vs Hiện tại

| Yếu tố | jinzhenlian.com | Trang hiện tại | Gap |
|---------|----------------|----------------|-----|
| **Hero typography** | MASSIVE — "PURE DURIAN JOY" chiếm 40% viewport, uppercase, letter-spacing rộng | Lớn nhưng standard font-size, không uppercase, không letter-spacing | Cần bolder, bigger display text |
| **Hero image** | Full-bleed product photo, cutout style trên nền vàng | Split layout 55/45, ảnh trong rounded card | OK nhưng có thể bolder |
| **Section backgrounds** | Mạnh — solid vàng `#FDDE24` xen kẽ cream `#FFFEE7` | Subtle — cream `#FAFAF9` xen kẽ beige `#F3E8D8` | Cần 1-2 section có bg màu mạnh hơn (amber/mango) |
| **Negative space** | CỰC KỲ generous — hero min-h 113vh, sections 760px+ | Decent — py-20 (80px) | Tăng padding lên py-24 hoặc py-28 |
| **Product presentation** | Product cutout trên nền màu, packaging mockup bên cạnh | Product trong card grid | OK — giữ card grid (phù hợp e-commerce hơn) |
| **Certifications** | Hàng badges lớn (SGS, GMP, HACCP) trên nền cream | CDĐL nhỏ trong trust stats | Cần section chứng nhận riêng |
| **FAQ** | Tabbed categories (Product/Partnerships/Support) trên nền đen | Simple accordion trên nền trắng | Có thể thêm dark bg + tabs |
| **Scroll indicator** | "scroll to bite into joy" + chevron icon | Không có | Thêm scroll hint cho hero |
| **Typography spacing** | Wide letter-spacing trên headings, uppercase labels | Tracking-tight trên headings | Thử wide tracking trên labels |

---

## User Stories

1. **As a tiểu thương miền Bắc**, visiting the landing page, I want to feel this is a premium, trustworthy supplier so that I'm confident to try their product.
2. **As a gia đình Hà Nội**, browsing on mobile, I want the page to feel luxurious yet easy to navigate so that I feel good about buying a gift box.
3. **As a đối tác sỉ**, I want to see certifications and credibility indicators prominently so that I trust the quality claims.

---

## MoSCoW

| Priority | Item | Rationale |
|----------|------|-----------|
| **Must (P0)** | Bolder hero typography — larger display text, optional uppercase, more breathing room | Biggest visual impact, first impression |
| **Must (P0)** | Add 1 accent-colored section bg — mango/amber toned section (testimonials or process) | jinzhenlian's #1 visual trick |
| **Must (P0)** | Increase section padding globally — py-20→py-24 minimum, hero more generous | Premium = space |
| **Should (P1)** | Add scroll hint to hero — "cuộn xuống khám phá" + animated chevron | jinzhenlian does this, adds polish |
| **Should (P1)** | Add certification/trust badges section — CDĐL, OCOP, QR truy xuất as visual badges | jinzhenlian's certification row |
| **Should (P1)** | Wider letter-spacing on section labels — uppercase labels feel more editorial | Small touch, big premium feel |
| **Could (P2)** | FAQ dark background variant — dark bg like jinzhenlian's FAQ | Adds contrast rhythm |
| **Could (P2)** | Testimonial with accent bg — amber/mango tinted bg instead of neutral | Visual weight balance |
| **Won't** | Video background hero — jinzhenlian has video bg but overkill for agricultural product, hurts performance on Vietnamese 4G |
| **Won't** | Parallax effects — complexity without clear conversion benefit |
| **Won't** | Product cutout style — requires custom photography, not achievable with Unsplash |

---

## Appetite & No-Gos

**Time budget:** 2-4 hours implementation. Design refinement, not redesign.

**No-Gos:**
1. DO NOT redesign the component structure — only refine styles within existing components
2. DO NOT add new npm packages — work with existing Tailwind + Phosphor + Next.js Image
3. DO NOT change the color palette fundamentally — refine usage, not the palette itself
4. DO NOT touch product data or business logic

---

## Research Protocol

### Benchmark — jinzhenlian.com (Peak Reference)
- **Bold display typography**: Uppercase, wide letter-spacing, massive sizes
- **Color-block sections**: Alternating solid yellow (`#FDDE24`) and cream
- **Generous whitespace**: Hero takes 113vh, sections 760px+
- **Photography-forward**: Products as cutouts, farm as full-bleed bg
- **Certification row**: Trust badges displayed prominently

### First Principles
**Root problem:** The page feels "clean and functional" but not "premium and desirable." The gap between "good" and "great" landing page is: typography confidence, spatial generosity, and visual rhythm variety.

### Cross-Domain Insight
**Apple product pages**: Section backgrounds alternate between white and near-black, creating strong visual rhythm. Each section has ONE dominant visual element. Text is large, sparse, and confident. Apply: make each section have a clear visual "hero" element.

### Trade-offs

| Give up | Get | Worth it? |
|---------|-----|-----------|
| Compact information density | Premium spacious feel | Yes — B2B mango buyers care about trust, not density |
| Neutral section backgrounds | Visual rhythm via color blocks | Yes — biggest single improvement |
| Standard heading sizes | Bold display typography | Yes — first impression is everything |
| Content below fold | More impactful hero | Yes — scroll hint compensates |

---

## Proposed Changes (Concrete)

### 1. Hero — Bolder Display Text
- H1 tracking from `tracking-tight` → `tracking-wide` or `tracking-widest` on brand name
- Optionally uppercase the brand name
- Increase subtitle spacing
- Add scroll hint at bottom: animated ChevronDown + "Cuộn xuống khám phá"

### 2. Section Rhythm — Accent Background
- **Testimonials section**: Change from `bg-bg` to warm amber gradient `bg-gradient-to-b from-accent-light to-bg-warm`
- **Process section**: Already has photo bg — good contrast
- Net effect: cream → cream → DARK (photo) → white → WARM (beige) → AMBER (testimonials) → cream → white → GREEN (contact) → charcoal

### 3. Section Spacing — More Generous
- Global: `py-20` → `py-24` (96px)
- Hero: add `min-h-[90vh]` or `lg:min-h-[95vh]`
- Section headings: increase `mb-12` → `mb-16`

### 4. Typography Polish
- Section labels (uppercase badges): add `tracking-[0.2em]` for editorial feel
- Section H2: increase to `text-4xl sm:text-5xl` (from 3xl/4xl)
- Testimonial quote: increase to `text-xl sm:text-2xl`

### 5. Trust/Certification Section (New)
- Between Calendar and Dual CTA
- Row of 3-4 certification badges: CDĐL #00124, OCOP, GlobalGAP, QR Truy Xuất
- Cream background, centered, minimal
- ~40 lines of code, 1 new component

### 6. Scroll Hint (Hero bottom)
- Animated ChevronDown icon bouncing
- Text: "Cuộn xuống khám phá"
- Fade in after 2s delay
