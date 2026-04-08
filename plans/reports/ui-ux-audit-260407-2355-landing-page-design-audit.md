# UI/UX Design Audit — Landing Page "Xoai Tu Quy Ben Tre"

**Theme:** Tropical Fresh (Light)
**Ngay audit:** 2026-04-07
**Auditor:** UI/UX Designer

---

## Tong diem: 82/100

| # | Tieu chi | Diem | Ghi chu |
|---|----------|------|---------|
| 1 | Visual Hierarchy | 8/10 | Heading ro rang, flow tot, nhung hero thieu hero image |
| 2 | Color Usage | 9/10 | Light theme nhat quan, accent colors dung muc dich |
| 3 | Typography | 8/10 | Be Vietnam Pro + Inter tot cho tieng Viet, line-height hop ly |
| 4 | Spacing & White Space | 8/10 | Padding section deu (py-20), card padding tot |
| 5 | Component Consistency | 8/10 | Cards, buttons, badges dong bo |
| 6 | CTA Effectiveness | 9/10 | CTA noi bat, co urgency + social proof |
| 7 | Mobile Responsiveness | 7/10 | Co responsive classes nhung mot so section can cai thien |
| 8 | Accessibility | 7/10 | Thieu aria-label, focus states can bo sung |
| 9 | Content Flow | 9/10 | Storytelling logic: Hero > Products > Process > Calendar > CTA > Testimonials > FAQ > Contact |
| 10 | Overall Polish | 9/10 | Professional, micro-interactions (FadeIn, hover lift), nhat quan |

---

## Phan tich chi tiet

### 1. Visual Hierarchy — 8/10

**Diem manh:**
- H1 "Xoai Tu Quy Ben Tre" noi bat voi text-4xl/5xl/6xl responsive
- Subtitle italic mau mango tao diem nhan tot
- Trust stats bar (95%, 200+, CDDL, <2%) dat duoi hero tao credibility
- Section headers dung pattern nhat quan: label nho uppercase > H2 bold > subtitle

**Diem yeu:**
- Hero section thieu hero image/illustration — chi co text, trang thai visual bang phang
- Stats bar dung flex-wrap gap-8 nhung khong co responsive breakpoint rieng — tren mobile co the bi lech

### 2. Color Usage — 9/10

**Diem manh:**
- Primary emerald (#10B981) dung cho CTA, navigation, trust elements
- Mango orange (#F97316) dung dung cho gia ca, urgency — tao contrast manh
- Accent golden (#FBBF24) dung cho savings badge, tips
- Background gradient from-bg to-bg-warm tao cam giac am ap
- Section backgrounds xen ke: bg > bg > primary-light > surface > bg-warm > bg > surface > primary-dark > text

**Diem yeu:**
- `bg-accent/8` (line 8 hero-section.tsx) — opacity 8% qua nhat, hau nhu khong thay

### 3. Typography — 8/10

**Diem manh:**
- Be Vietnam Pro cho headings — co day du Vietnamese diacritics
- Inter cho body — clean, readable, ho tro Vietnamese
- Font sizes responsive: text-4xl sm:text-5xl lg:text-6xl
- Line-height: leading-relaxed (1.625) cho body text, leading-tight cho headings
- Font weights phan biet ro: extrabold (headings), bold (subheadings), medium/semibold (labels), regular (body)

**Diem yeu:**
- Product card description min-h-[40px] (line 53, product-section.tsx) — magic number, co the gay lech tren mot so noi dung
- FAQ answer text dung text-sm nhung co the kho doc tren mobile

### 4. Spacing & White Space — 8/10

**Diem manh:**
- Section padding nhat quan py-20 (80px)
- Card padding p-5 (20px) hop ly
- Section headers mb-12/mb-14 tao breathing room
- Grid gap-6 (24px) giua cards

**Diem yeu:**
- Hero section min-h-screen co the qua cao tren desktop — nhieu khoang trang thua
- Shipping info (truck icons) mt-2 qua sat voi price text

### 5. Component Consistency — 8/10

**Diem manh:**
- Tat ca cards dung rounded-2xl border border-border bg-surface
- Buttons nhat quan: rounded-xl bg-primary py-3 text-sm font-semibold text-white
- Badges dung rounded-full + bold + small text
- Tags dung rounded-full bg-primary-light px-2.5 py-1

**Diem yeu:**
- Process cards dung p-6 trong khi product cards dung p-5 — nen dong bo
- Contact section button dung bg-accent thay vi bg-primary nhu cac button khac — co the la intentional nhung gay confusion

### 6. CTA Effectiveness — 9/10

**Diem manh:**
- Primary CTA "Xem Gia Si Hom Nay" — ro rang, action-oriented
- Secondary CTA "Dat Thu 1 Thung 20kg" — low commitment, giam barrier
- Trust signals ngay duoi CTA: "Free ship lan dau, Doi 100% neu dap, Can du 2% bu hao"
- Urgency: "Gia ap dung den 05/04" trong product cards
- Dual CTA section phan biet ro si vs le — smart segmentation
- Contact form CTA "Gui Yeu Cau — Phan hoi trong 5 phut" — co time commitment

**Diem yeu:**
- Product card buttons khong co href/link — chi la `<button>` khong co onClick handler

### 7. Mobile Responsiveness — 7/10

**Diem manh:**
- Grid responsive: sm:grid-cols-2 lg:grid-cols-3 (products), lg:grid-cols-4 (process)
- Nav links hidden tren mobile (hidden sm:block)
- Font sizes responsive (text-4xl sm:text-5xl lg:text-6xl)

**Diem yeu:**
- Calendar table min-w-[700px] voi overflow-x-auto — tren mobile phai scroll ngang, UX kem
- Hero trust stats flex-wrap gap-8 — tren mobile nho gap qua rong
- Dual CTA cards min-h-[380px] — tren mobile co the qua cao
- Footer flex-wrap justify-between — tren mobile 3 columns se stack nhung khong co gap control
- Header h-16 khong thay doi tren mobile — co the chiem qua nhieu khong gian

### 8. Accessibility — 7/10

**Diem manh:**
- Semantic HTML: section, header, footer, nav, h1-h4, button, label
- Form labels duoc dinh nghia cho moi input
- Color contrast text-text (#1F2937) tren bg (#FAFAF9) — ratio ~14:1, vuot WCAG AAA
- Focus states co san qua Tailwind defaults

**Diem yeu:**
- **CRITICAL:** Testimonial carousel khong co aria-live="polite" — screen readers khong biet noi dung thay doi
- **CRITICAL:** FAQ accordion khong co aria-expanded, aria-controls, role="button"
- Emoji icons (truck, pin, etc.) khong co aria-hidden="true" — screen readers doc emoji
- Nav links thieu aria-current cho active state
- Form inputs thieu aria-required cho required fields
- Dot navigation cua testimonial thieu aria-label cho moi dot

### 9. Content Flow — 9/10

**Diem manh:**
- Flow logic xuat sac:
  1. Hero: Grab attention + key value prop + pricing
  2. Products: "Chi 3 san pham — Chon ngay" — giam choice overload
  3. Process: Giai thich tai sao dac biet — build trust
  4. Calendar: Chung minh nguon cung on dinh
  5. Dual CTA: Segment khach hang (si vs le)
  6. Testimonials: Social proof tu khach thuc
  7. FAQ: Xu ly objections
  8. Contact: Final conversion
- Moi section co micro-copy tot, dung ngon ngu cua khach hang muc tieu

**Diem yeu:**
- Thieu "So sanh voi doi thu" section — co the them bang so sanh gia

### 10. Overall Polish — 9/10

**Diem manh:**
- FadeIn animation voi IntersectionObserver — smooth, performant
- Card hover effect: -translate-y-1 shadow-lg — subtle, delightful
- Dot navigation animation: width change + bg color transition
- Gradient backgrounds tao depth
- Consistent border-radius (rounded-2xl cho cards, rounded-xl cho buttons, rounded-lg cho inputs)
- Shadow system: shadow-sm (default), shadow-md (elevated), shadow-lg (hover/CTA)

**Diem yeu:**
- FadeIn khong co prefers-reduced-motion check
- Khong co loading states cho images
- Khong co skeleton loading

---

## TOP 5 VAN DE CRITICAL CAN FIX

### 1. FadeIn thieu prefers-reduced-motion support
**File:** `src/components/fade-in.tsx:36-37`
**Van de:** Animation khong ton trong user preference, vi pham WCAG 2.1 SC 2.3.3
**Fix:**
```tsx
// Line 36-37, thay:
transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,

// Bang:
transition: `opacity .65s ease ${delay}s, transform .65s ease ${delay}s`,
...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? { opacity: 1, transform: 'translateY(0)', transition: 'none' }
  : {}),
```

### 2. FAQ Accordion thieu ARIA attributes
**File:** `src/components/faq-section.tsx:22-35`
**Van de:** Screen readers khong biet trang thai expand/collapse
**Fix:**
```tsx
// Line 23, them:
<button
  onClick={() => setOpenIndex(openIndex === i ? null : i)}
  className="flex w-full items-center justify-between py-5 text-left"
  aria-expanded={openIndex === i}
  aria-controls={`faq-answer-${i}`}
>

// Line 38, them id:
<div
  id={`faq-answer-${i}`}
  role="region"
  className={`overflow-hidden transition-all duration-400 ${...}`}
>
```

### 3. Testimonial carousel thieu accessibility
**File:** `src/components/testimonial-section.tsx:27-58`
**Van de:** Auto-rotating content khong co aria-live, dot nav thieu labels
**Fix:**
```tsx
// Line 27, them aria-live:
<div className="relative mt-10 min-h-[200px]" aria-live="polite" aria-atomic="true">

// Line 49-56, them aria-label cho moi dot:
<button
  key={i}
  onClick={() => setActive(i)}
  aria-label={`Xem danh gia cua ${TESTIMONIALS[i].name}`}
  className={`h-2 rounded-full transition-all duration-300 ${...}`}
/>
```

### 4. Calendar section UX kem tren mobile
**File:** `src/components/calendar-section.tsx:22`
**Van de:** min-w-[700px] bat buoc scroll ngang, UX kem tren mobile
**Fix:** Tren mobile, chuyen thanh vertical layout hoac chi hien thi 3 thang gan nhat (T3, T4, T5) voi swipe gesture. Them responsive breakpoint:
```tsx
// Them class cho mobile:
<div className="min-w-[700px] lg:min-w-0">
// Hoac tao mobile-specific layout voi only current quarter visible
```

### 5. Product card buttons khong co action
**File:** `src/components/product-section.tsx:96`
**Van de:** `<button>` khong co onClick — user click khong xay ra gi
**Fix:**
```tsx
// Line 96, chuyen thanh link hoac them handler:
<a
  href="#contact"
  className="mt-4 block w-full rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white shadow-md shadow-primary/20 hover:bg-primary-dark transition-colors"
>
  {isCombo ? "Dat hop qua ->" : "Dat thu — Free ship lan dau ->"}
</a>
```

---

## TOP 5 CAI THIEN NICE-TO-HAVE

### 1. Them hero image/illustration
- Hero section hien tai chi co text, trang thai visual phang
- Them hinh anh xoai Tu Quy chat luong cao hoac illustration ben phai (layout 2 columns tren desktop)
- File: `src/components/hero-section.tsx`

### 2. Skeleton loading cho product images
- Khi images dang load, hien skeleton placeholder
- Dung Tailwind animate-pulse voi bg-gray-200 placeholder
- File: `src/components/product-section.tsx:25-32`

### 3. Sticky "Dat hang" bar tren mobile
- Khi user scroll qua product section, hien sticky bottom bar voi CTA "Dat hang qua Zalo"
- Tang conversion rate cho mobile users
- Tao component moi: `src/components/sticky-mobile-cta.tsx`

### 4. Them hover micro-interaction cho process cards
- Process cards hien tai chi co shadow-sm tinh
- Them hover: border-primary/20 + scale(1.02) tuong tu product cards
- File: `src/components/process-section.tsx:29`

### 5. Dark mode toggle (tuong lai)
- Theme system da co san trong globals.css voi CSS variables
- Co the them dark mode variant de ho tro user preference
- Chi can them dark theme variables va toggle component

---

## TONG KET

Landing page "Xoai Tu Quy Ben Tre" dat **82/100** — muc **Tot**.

**Diem manh noi bat:**
- Content strategy xuat sac — storytelling flow logic, micro-copy dung ngon ngu khach hang
- CTA strategy manh — nhieu lop CTA voi urgency + trust signals
- Design system nhat quan — colors, spacing, typography, components dong bo
- Light theme "Tropical Fresh" tao cam giac tuoi mat, phu hop nganh nong san
- FadeIn animations smooth va performant

**Diem can cai thien gap:**
- Accessibility la diem yeu nhat — ARIA attributes thieu nhieu cho interactive components
- Mobile responsiveness can polish them, dac biet calendar section
- Hero section thieu visual element (image/illustration) de tang impact
- Product buttons chua co action handlers

**Verdict:** Page da san sang de launch ve mat visual va content. Can fix 5 van de critical (dac biet accessibility) truoc khi go-live. Nice-to-have improvements co the lam o iteration tiep theo.
