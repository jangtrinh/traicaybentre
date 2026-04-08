# Báo Cáo Nghiên Cứu: UI/UX Light Theme Design - Xoài Tứ Quý Bến Tre

**Ngày**: 07/04/2026 | **Mục đích**: Xác định design system light theme với vibe tươi mới cho landing page cao cấp

---

## 1. KHÁM PHÁ MÀU SẮC - LIGHT THEME PALETTE

### 1.1 Xu Hướng Hiện Tại (2024-2025)

Dữ liệu từ các nguồn thiết kế hàng đầu cho thấy:
- **Trending**: Minimalism kết hợp white space hào phóng, gradients hiện đại, màu pastel mềm mại
- **Organic food brands**: Sử dụng xanh sâu (symbolize growth), nâu đất (stability), trắng (clarity), cam sáng (creativity)
- **Food e-commerce**: Màu sắc tươi sáng (vivid colors) kết hợp typography fancy để gây sự chú ý

### 1.2 Phân Tích Màu Sắc Cho Sản Phẩm Nông Sản Cao Cấp

**Tâm lý màu sắc trong bối cảnh mango cao cấp:**

| Màu | Ý Nghĩa | Ứng Dụng |
|-----|---------|---------|
| **Xanh lục tươi** (#10B981, #059669) | Tươi sáng, organic, thiên nhiên | Primary color - hero section, CTAs |
| **Vàng ấm** (#FBBF24, #F59E0B) | Sweetness, tropical, premium | Accent - product highlights, badges |
| **Cam nhạt** (#FB923C, #F97316) | Energy, appetite appeal, warmth | Secondary accent - featured items |
| **Trắng sạch** (#FFFFFF, #FAFAF9) | Freshness, purity, premium feel | Background, card surfaces |
| **Beige/Cream** (#F3E8D8, #E5DAD0) | Organic, natural, soft warmth | Secondary background, text areas |
| **Xám nhạt** (#6B7280, #4B5563) | Professional, readable, trust | Typography, borders, secondary elements |

### 1.3 Palette Đề Xuất: "Tropical Fresh" (Chuẩn Light Theme)

```
Primary Palette:
- Emerald Green: #10B981 (Primary button, hero accent)
- Fresh Green: #059669 (Hover states, borders)
- Soft Cream: #FAFAF9 (Primary background)
- Golden Amber: #FBBF24 (Accent, CTAs)

Secondary Palette:
- Peachy Orange: #F97316 (Featured items, badges)
- Warm Beige: #F3E8D8 (Section background, cards)
- Cool Gray: #6B7280 (Primary text)
- Light Gray: #E5E7EB (Borders, dividers)

Neutral:
- Text Dark: #1F2937 (Headings, primary text)
- Text Light: #6B7280 (Body text)
- Background Light: #F9FAFB (Subtle backgrounds)
```

### 1.4 Sử Dụng Màu Sắc Theo Phần Trang

**Hero Section**: 
- Background: Gradient từ #FAFAF9 → #F3E8D8
- Text: #1F2937 (đặc)
- Accent: #10B981, #FBBF24

**Product Cards**:
- Background: #FFFFFF
- Border: #E5E7EB (1px)
- Shadow: rgba(0, 0, 0, 0.05) (subtle elevation)
- Badge: Background #FBBF24, text #1F2937

**Buttons**:
- Primary: Background #10B981, text #FFFFFF
- Hover: Background #059669
- Secondary: Background #FFFFFF, border #10B981, text #10B981

**Sections Alternating**:
- Odd: #FAFAF9
- Even: #F3E8D8 hoặc #FFFFFF

---

## 2. TYPOGRAPHY - PHÔNG CHỮ CHO TIẾNG VIỆT

### 2.1 Yêu Cầu Tiếng Việt

Từ nghiên cứu, phông chữ cần:
- Hỗ trợ đầy đủ diacritics Tiếng Việt (dấu sắc, huyền, hỏi, ngã, nặng)
- Clearness ở sizes nhỏ (body text)
- Character rõ ràng và professional cho premium brand

### 2.2 Font Pairing Khuyến Nghị

**Option 1: Classic Premium (Serif + Sans)**
```
Heading (H1, H2, H3): Playfair Display (Serif)
- Weights: Bold (700), SemiBold (600)
- Characteristics: Elegant, high-contrast, editorial feel
- Vietnamese support: Excellent (teardrop horns + elongated diacritics)

Body/UI Text: Inter (Sans-Serif)
- Weights: Regular (400), Medium (500), SemiBold (600)
- Characteristics: Clean, geometric, highly readable
- Vietnamese support: Full support, excellent at all sizes
```

**Option 2: Modern Fresh (Sans + Sans)**
```
Heading (H1, H2, H3): Montserrat (Bold, Geometric Sans)
- Weights: Bold (700), SemiBold (600)
- Characteristics: Modern, confident, fresh
- Vietnamese support: Excellent

Body/UI Text: Open Sans (Humanist Sans)
- Weights: Regular (400), SemiBold (600)
- Characteristics: Friendly, open forms, highly accessible
- Vietnamese support: Perfect for Vietnamese characters
```

**Option 3: Balanced Modern (Recommended for traicaybentre)**
```
Heading: Be Vietnam Pro (Local Vietnamese font, Modern Sans)
- Weights: SemiBold (600), Bold (700)
- Characteristics: Made for Vietnamese, modern, professional
- Perfect alignment with Vietnamese diacritics

Body: Lora (Serif) hoặc Inter (Sans)
- For premium feel: Pair Be Vietnam Pro + Lora
- For clean modern feel: Pair Be Vietnam Pro + Inter
```

### 2.3 Typography Hierarchy

```
H1 (Hero/Main): 48px, Bold (700), Line-height: 1.2
H2 (Section Title): 36px, Bold (700), Line-height: 1.3
H3 (Card Title): 24px, SemiBold (600), Line-height: 1.35
H4 (Subsection): 20px, SemiBold (600), Line-height: 1.4
Body (Paragraph): 16px, Regular (400), Line-height: 1.6
Body Small: 14px, Regular (400), Line-height: 1.5
Label/Button: 14px, Medium (500), Line-height: 1.4
```

---

## 3. LAYOUT & DESIGN PATTERNS

### 3.1 Hero Section Trends (2024-2025)

**Best Practices từ Food E-commerce Leaders:**
- Full-width visual (high-quality photography hoặc illustration)
- Gradient overlay nhẹ để tăng text contrast
- Single powerful CTA button (not multiple)
- Headline simple, concise (1-2 lines max)
- Micro-copy about product origin/quality

**Recommended Hero Structure**:
```
Layout: Asymmetric (Image on right 60%, Text on left 40%)
Background: Gradient #FAFAF9 → #F3E8D8
Image: Hero product shot (mango with leaves, morning dew, natural lighting)
CTA Button: #10B981 "Khám Phá Ngay" (20px padding, rounded 8px)
Trust Element: Small badge "Từ Bến Tre - Đạt Chuẩn Xuất Khẩu"
```

### 3.2 Product Card Design

**Card Structure** (Based on e-commerce best practices):
```
Card Background: #FFFFFF
Border: 1px solid #E5E7EB
Padding: 16px
Border-radius: 12px
Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05)
Hover Effect: 
  - Scale: 1.02
  - Shadow: 0 8px 16px rgba(0, 0, 0, 0.1)
  - Transition: 300ms ease-out

Inside Card:
- Image area: 200px height (16:10 ratio)
- Product name: H4 (20px), #1F2937
- Description: Body small (14px), #6B7280
- Price area: Feature #FBBF24 badge or highlight
- CTA Button: Small secondary button, #10B981 text
```

### 3.3 Trust/Social Proof Sections

**Khuyến nghị layout**:
- Testimonials with avatars + stars rating
- Quote style: Italic, "Dòng chữ khách hàng nói gì" - Tên, Nơi công tác
- Statistics section: 3-4 metrics with icons + large numbers
- Farm origin story: Visual timeline + authentic imagery
- Certifications: Badges in a row with subtle background

### 3.4 CTA Placement Strategy

```
Primary CTAs: 
- Hero section (1 button above fold)
- Product cards (add to cart / view detail)
- Middle of page (after product showcase)
- Footer (newsletter subscription)

Secondary CTAs:
- Floating button (sticky) for mobile
- Related products section
```

---

## 4. DESIGN ELEMENTS - FRESH VIBE COMPONENTS

### 4.1 Gradients

**Modern gradient trends**:
- Subtle gradients (low saturation shifts): #FAFAF9 → #F3E8D8
- Diagonal direction (45deg) for dynamic feel
- Use sparingly - max 2-3 gradients per page

**Recommended Gradients**:
```
Hero: linear-gradient(135deg, #FAFAF9 0%, #F3E8D8 100%)
Accent: linear-gradient(135deg, #10B981 0%, #059669 100%)
Warm: linear-gradient(135deg, #FBBF24 0%, #F97316 100%)
```

### 4.2 Spacing & White Space

**Rules for "Fresh" aesthetic**:
- Generous padding around sections (60px top/bottom on desktop)
- Card internal padding: 16-24px (breathing room inside cards)
- Text line-height: 1.5-1.6 (not cramped)
- Letter-spacing: 0.5px for headings (luxury feel)

**Container max-width**: 1200px (balanced for content + white space)

### 4.3 Borders & Shadows

**Subtle approach**:
- Borders: Use light grays (#E5E7EB, 1px) sparingly
- Shadows: Preferably use light shadows for depth
  - Small: `0 2px 8px rgba(0, 0, 0, 0.05)`
  - Medium: `0 4px 16px rgba(0, 0, 0, 0.08)`
  - Large: `0 8px 24px rgba(0, 0, 0, 0.1)`
- No hard borders on cards - prefer shadow only

### 4.4 Illustrations vs Photography

**Recommendation for Xoài Tứ Quý Bến Tre**:
- **Hero & Product Photos**: High-quality photography (natural lighting, morning dew, fresh appearance)
- **Secondary illustrations**: Hand-drawn or icon-style illustrations for:
  - Process flow (seed → growth → harvest)
  - Feature icons (organic, premium quality, farm-to-table)
  - Seasonal indicators

**Style**: Warm color illustrations using palette colors, not photorealistic

### 4.5 Micro-interactions

**Light, subtle interactions**:
- Button hover: Subtle color shift + slight scale (1.02)
- Card hover: Slight lift effect (shadow increase)
- Icon animations: Gentle scale/fade on hover (200ms)
- Scroll animations: Fade-in for sections (smooth, not jarring)
- Loading states: Simple spinner in primary color (#10B981)

---

## 5. BUTTON & FORM STYLES

### 5.1 Button Variants

```css
/* Primary Button */
.btn-primary {
  background-color: #10B981;
  color: #FFFFFF;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  transition: all 300ms ease;
}

.btn-primary:hover {
  background-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background-color: #FFFFFF;
  color: #10B981;
  border: 2px solid #10B981;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background-color: #F0F9FF;
  border-color: #059669;
  color: #059669;
}

/* Tertiary Button (ghost) */
.btn-tertiary {
  background-color: transparent;
  color: #10B981;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: underline;
  transition: color 300ms ease;
}

.btn-tertiary:hover {
  color: #059669;
}
```

### 5.2 Form Elements

```css
/* Input Fields */
input[type="text"],
input[type="email"],
textarea {
  background-color: #FAFAF9;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 16px;
  font-family: Inter, sans-serif;
  transition: border-color 300ms ease, background-color 300ms ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #10B981;
  background-color: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

/* Placeholder */
::placeholder {
  color: #9CA3AF;
  font-size: 14px;
}

/* Checkbox / Radio - Custom */
input[type="checkbox"],
input[type="radio"] {
  accent-color: #10B981;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
```

---

## 6. CARD STYLES - COMPONENT LIBRARY

### 6.1 Product Card (E-commerce)

```
Structure:
├─ Image Container (200px, object-fit: cover)
├─ Content Area
│  ├─ Product Name (H4, #1F2937)
│  ├─ Rating (★★★★★ 4.8, small text #6B7280)
│  ├─ Description (body small, #6B7280, 2 lines max)
│  ├─ Price Section
│  │  ├─ Original Price (strikethrough, optional)
│  │  ├─ Sale Price (highlight, bold, #F97316)
│  │  └─ Origin Badge (#FBBF24, "Bến Tre")
│  └─ CTA Button (Primary or Secondary style)

Card Styling:
- Background: #FFFFFF
- Padding: 16px
- Border: 1px #E5E7EB
- Border-radius: 12px
- Hover: Scale 1.02, shadow increase
- Transition: 300ms ease
```

### 6.2 Testimonial Card

```
Structure:
├─ Quote Mark (decorative, #FBBF24, large)
├─ Quote Text (italic, 16px, #1F2937)
├─ Author Section
│  ├─ Avatar (64px, rounded full)
│  ├─ Name (H4, #1F2937)
│  ├─ Title/Location (small, #6B7280)
│  └─ Rating Stars (5★ - #FBBF24)

Card Styling:
- Background: #FFFFFF
- Padding: 24px
- Border-left: 4px solid #10B981
- Border-radius: 8px
- No box shadow or subtle only
```

### 6.3 Feature Card

```
Structure:
├─ Icon (64px, background #F0FAEFD)
├─ Title (H4, #1F2937)
├─ Description (body small, #6B7280, 3 lines max)

Card Styling:
- Background: transparent or #FAFAF9
- Padding: 20px
- Text-align: center or left
- Icon background: #ECFDF5
- Icon color: #10B981
```

### 6.4 Newsletter Signup Card

```
Structure:
├─ Headline (H3, #1F2937)
├─ Subtext (body, #6B7280)
├─ Input Field (email)
├─ Primary Button ("Đăng Ký")

Card Styling:
- Background: Linear gradient #10B981 → #059669 (full color)
- Text color: #FFFFFF
- Padding: 40px
- Border-radius: 12px
- Centered layout
```

---

## 7. RESPONSIVE DESIGN BREAKPOINTS

**Mobile-first approach**:
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1440px
Large Desktop: 1441px+

Typography Scaling:
- H1: 32px (mobile) → 48px (desktop)
- H2: 28px (mobile) → 36px (desktop)
- Body: 14px (mobile) → 16px (desktop)

Spacing:
- Section padding: 32px (mobile) → 60px (desktop)
- Card gap: 12px (mobile) → 24px (desktop)
```

---

## 8. DESIGN SYSTEM SUMMARY TABLE

| Element | Light Value | Dark Value | Usage |
|---------|------------|-----------|-------|
| **Primary** | #10B981 | - | Buttons, Primary actions, Accents |
| **Primary Light** | #ECFDF5 | - | Background for primary elements |
| **Secondary** | #FBBF24 | - | Highlights, Badges, Secondary accents |
| **Tertiary** | #F97316 | - | Alert elements, Featured items |
| **Text Dark** | #1F2937 | - | Headings, Primary text |
| **Text Light** | #6B7280 | - | Body text, Secondary text |
| **Background** | #FAFAF9 | - | Primary page background |
| **Background Alt** | #F3E8D8 | - | Section alternation, Subtle backgrounds |
| **Surface** | #FFFFFF | - | Card backgrounds, Content areas |
| **Border** | #E5E7EB | - | Subtle dividers, Light borders |
| **Shadow** | rgba(0,0,0,0.05) | - | Card elevation (light) |

---

## 9. KHUYẾN NGHỊ TRIỂN KHAI (IMPLEMENTATION)

### 9.1 Fontstack (Google Fonts + Fallbacks)
```css
/* Headings */
font-family: 'Be Vietnam Pro', 'Playfair Display', Georgia, serif;

/* Body */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Backup Vietnamese */
font-family: 'Inter', 'Source Sans Pro', Arial, sans-serif;
```

### 9.2 CSS Variables Template
```css
:root {
  /* Colors */
  --color-primary: #10B981;
  --color-primary-dark: #059669;
  --color-primary-light: #ECFDF5;
  --color-secondary: #FBBF24;
  --color-tertiary: #F97316;
  
  --color-text: #1F2937;
  --color-text-secondary: #6B7280;
  --color-background: #FAFAF9;
  --color-background-alt: #F3E8D8;
  --color-surface: #FFFFFF;
  --color-border: #E5E7EB;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 60px;
  
  /* Typography */
  --font-heading: 'Be Vietnam Pro', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.1);
}
```

### 9.3 Conversion Priority (từ Dark sang Light)

1. **Phase 1 - Colors**: Thay thế toàn bộ dark green palette bằng light theme colors
2. **Phase 2 - Typography**: Update font families, adjust sizes cho tối ưu light theme readability
3. **Phase 3 - Components**: Redesign cards, buttons, forms theo light theme styles
4. **Phase 4 - Imagery**: Thay thế dark imagery bằng fresh/bright product photography
5. **Phase 5 - Micro-interactions**: Add subtle animations tương thích light aesthetic

---

## 10. RISK ASSESSMENT & CONSIDERATIONS

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Contrast issues** | A11y failure | Test với WebAIM contrast checker, ensure text ≥ 4.5:1 |
| **Vietnamese font rendering** | Diacritics not clear | Test across browsers, use system fonts fallback |
| **Image quality** | Premium feel lost | Invest in professional product photography |
| **White space interpretation** | Feeling empty/unfinished | Balance dengan strategic illustration placement |
| **Color fatigue** | Too bright overall | Use neutral backgrounds, limit accent usage |

---

## 11. SOURCES & CREDIBILITY

Research được tổng hợp từ các nguồn có uy tín:
- [Dribbble Food Landing Pages](https://dribbble.com/tags/food-landing-page) - Leading design community
- [Food Color Palette Ideas](https://www.media.io/color-palette/food-color-palette.html) - Comprehensive color research
- [Canva Fresh Organic Color Palettes](https://www.canva.com/colors/color-palettes/fresh-organic-ingredients/)
- [Vietnamese Typography Guide](https://vietnamesetypography.com/type-recommendations/)
- [Be Vietnam Pro Font](https://fontforge.io/best-pairings/be-vietnam-pro/) - Vietnamese-optimized typography
- [Food & Beverage Design Trends 2024](https://www.designrush.com/best-designs/packaging/trends/best-food-visuals)
- [Craft & Root - Food Brand Case Studies](https://craftandroot.com/blog/7-case-studies-that-nailed-food-beverage-brand-transformations/)
- [Organic Food Landing Page Template](https://nicepage.com/lp/42326/organic-food-landing-page)

---

## 12. CÂU HỎI CHƯA GIẢI QUYẾT

1. **Photography style preference**: Sử dụng lifestyle photography hay product-focused close-ups?
2. **Animation budget**: Có muốn scroll animations hay giữ simple/minimal?
3. **Mobile-first vs Desktop-first approach**: Ưu tiên mobile experience không?
4. **Newsletter integration**: Cần CMS nào (Mailchimp, custom backend)?
5. **Localization scope**: Chỉ Tiếng Việt hay cần English/International versions?
6. **Brand personality**: Luxury formal hay friendly approachable?

---

**Trạng thái**: COMPLETED | **Khuyến nghị**: Triển khai Color Palette "Tropical Fresh" + Font pairing "Be Vietnam Pro + Lora" trước, sau đó component library.
