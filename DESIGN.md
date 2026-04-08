# Design System — Xoài Tứ Quý Bến Tre

## 1. Visual Theme & Atmosphere

A warm, photography-forward agricultural e-commerce landing page that feels like opening a gift box of premium tropical fruit. Inspired by **jinzhenlian.com** (premium durian brand) — bold typography, generous whitespace, alternating warm/cool sections, and product imagery as hero content.

The design operates on a foundation of soft cream (`#FAFAF9`) with warm beige alternating sections (`#F3E8D8`). The primary brand accent is Emerald Green (`#10B981`) — evoking freshness, nature, and trust. The secondary accent is Mango Orange (`#F97316`) — the fruit's signature color, used sparingly for prices, urgency, and highlights.

Typography uses **Be Vietnam Pro** — a Vietnamese-native font with perfect diacritics — for headings, paired with **Inter** for body text. The font operates in a confident weight range: 600 (semibold) for UI, 700 (bold) for section headings, 800 (extrabold) for hero text. This creates a warm, trustworthy voice appropriate for a farm-to-table agricultural brand.

What distinguishes this design is the **"Tropical Fresh" palette** — a light, airy canvas where real product photography, Phosphor icons, and the green CTA buttons are the primary sources of visual interest. Cards use generous 24px border-radius, buttons are fully rounded (pill-shaped), and shadows are subtle and warm. The overall vibe is: premium but approachable, modern but rooted in nature.

**Key Characteristics:**
- Soft cream canvas (`#FAFAF9`) with warm beige alternating sections (`#F3E8D8`)
- Emerald Green (`#10B981`) as primary brand accent — freshness, trust
- Mango Orange (`#F97316`) for prices, badges, urgency — appetite appeal
- Be Vietnam Pro — Vietnamese-optimized heading font with warm personality
- Photography-forward: hero split layout, orchard background, product cards
- Generous 24px card radius, pill-shaped buttons (fully rounded)
- Phosphor icons (duotone weight) — consistent iconography system
- SVGL brand icons for social platforms (TikTok, Facebook, Instagram, Zalo)
- Scroll-triggered fade-in animations with `prefers-reduced-motion` respect

## 2. Color Palette & Roles

### Primary Brand
- **Emerald Green** (`#10B981`): Primary CTA buttons, nav accent, active states, trust indicators
- **Fresh Green** (`#059669`): Hover states, pressed buttons, borders
- **Mint Tint** (`#ECFDF5`): Icon backgrounds, tag backgrounds, process section bg

### Accent — Appetite & Urgency
- **Mango Orange** (`#F97316`): Prices, featured badges, calendar highlights, appetite appeal
- **Mango Dark** (`#EA580C`): Hover/pressed states for orange elements
- **Golden Amber** (`#FBBF24`): Secondary accent, submit buttons, "Gửi Yêu Cầu" CTA
- **Amber Dark** (`#F59E0B`): Hover state for amber buttons
- **Cream Yellow** (`#FEF3C7`): Price background, discount badges, accent-light surfaces

### Text Scale
- **Charcoal** (`#1F2937`): Primary text — warm, not pure black
- **Cool Gray** (`#6B7280`): Secondary text, descriptions, body copy
- **Muted Gray** (`#9CA3AF`): Tertiary text, placeholders, timestamps

### Surface & Background
- **Soft Cream** (`#FAFAF9`): Primary page background — warm, not clinical white
- **Warm Beige** (`#F3E8D8`): Alternating section backgrounds, dual CTA section
- **Pure White** (`#FFFFFF`): Card surfaces, content areas, elevated elements
- **Light Gray** (`#E5E7EB`): Borders, dividers, inactive elements

### State Colors
- **Red 600** (`#DC2626`): Error, out-of-stock, urgency ("Giá áp dụng đến...")
- **Green 700** (`#16803C`): "Đang mùa" badge
- **Purple 600** (`#9333EA`): "Quà tặng" badge
- **Red 600** (`#DC2626`): "Bán chạy #1" badge

### Inverted (Dark sections: Contact, Footer)
- **White** (`#FFFFFF`): Primary text on dark backgrounds
- **White/70** (`rgba(255,255,255,0.7)`): Secondary text on dark
- **White/40** (`rgba(255,255,255,0.4)`): Muted text on dark
- **White/10** (`rgba(255,255,255,0.1)`): Borders on dark surfaces

## 3. Typography Rules

### Font Families
- **Heading**: `Be Vietnam Pro`, Georgia, serif — Vietnamese-native, warm personality
- **Body**: `Inter`, -apple-system, BlinkMacSystemFont, sans-serif — clean, universal

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero H1 | Be Vietnam Pro | 48–60px (clamp) | 800 | 1.1 | -0.5px | `text-4xl sm:text-5xl lg:text-6xl` |
| Hero Subtitle | Be Vietnam Pro | 18–24px (clamp) | 500 | 1.4 | normal | Italic, mango orange |
| Section H2 | Be Vietnam Pro | 30–36px (clamp) | 800 | 1.3 | normal | `text-3xl sm:text-4xl` |
| Card H3 | Be Vietnam Pro | 18px | 700 | 1.3 | normal | `text-lg font-bold` |
| Subsection H4 | Be Vietnam Pro | 16px | 700 | 1.4 | normal | `text-base font-bold` |
| Body | Inter | 16px | 400 | 1.6 | normal | `text-base leading-relaxed` |
| Body Small | Inter | 14px | 400 | 1.5 | normal | `text-sm` |
| Label/Button | Inter | 14–15px | 600–700 | 1.4 | normal | `text-sm font-semibold` |
| Caption | Inter | 12px | 400–600 | 1.5 | normal | `text-xs` — minimum font size |
| Badge Uppercase | Inter | 12px | 700 | 1.5 | 2px | `uppercase tracking-widest` |
| Price Large | Be Vietnam Pro | 22–24px | 700 | 1.2 | normal | Mango orange color |

### Principles
- **Minimum font size: 12px** — enforced globally via CSS override on `text-xs`
- **Vietnamese diacritics**: Be Vietnam Pro handles all Vietnamese marks perfectly
- **Weight range 600–800**: Headings always feel confident, never thin
- **No decorative fonts**: Clean, professional, trustworthy

## 4. Component Stylings

### Buttons

**Primary (Green)**
- Background: `#10B981` → hover `#059669`
- Text: `#FFFFFF`, 14px, font-weight 600–700
- Padding: 12px 28px (hero), 12px 24px (standard)
- Radius: `rounded-full` (9999px) — pill shape
- Shadow: `0 4px 18px rgba(16,185,129,0.3)`
- Hover: translateY(-2px) + darker bg
- Transition: all 300ms ease

**Secondary (Outline)**
- Background: `#FFFFFF` or transparent
- Border: 2px solid `rgba(16,185,129,0.2)` → hover `rgba(16,185,129,0.4)`
- Text: `#10B981`, 14px, font-weight 600
- Radius: `rounded-full`

**Accent (Amber — Contact form)**
- Background: `#FBBF24` → hover `#F59E0B`
- Text: `#1F2937` (dark text on amber)
- Shadow: `0 4px 18px rgba(251,191,36,0.3)`
- Radius: `rounded-full`

**Inverted (White on dark)**
- Background: `#FFFFFF`
- Text: `#059669`
- Hover: `#FEF3C7` (cream tint)
- Radius: `rounded-full`

### Cards

**Product Card**
- Background: `#FFFFFF`
- Border: 1px solid `#E5E7EB`
- Radius: `rounded-3xl` (24px)
- Shadow: `0 2px 8px rgba(0,0,0,0.05)` → hover `0 14px 36px rgba(0,0,0,0.1)`
- Hover: translateY(-4px) + shadow increase
- Transition: all 300ms ease
- Image area: gradient bg `from-accent-light to-bg-warm`

**Process Card**
- Background: `#FFFFFF`
- Border: 1px solid `rgba(16,185,129,0.1)`
- Radius: `rounded-3xl` (24px)
- Shadow: subtle sm
- Step number: absolute positioned, `text-3xl font-extrabold text-primary/8`

**CTA Card**
- Dark variant: gradient `from-primary-dark to-primary`, text white
- Light variant: `#FFFFFF`, border `#E5E7EB`
- Header image: `h-40`, `object-cover` with gradient fade overlay
- Radius: `rounded-3xl` (24px), overflow hidden

**Testimonial Card (inline)**
- No card wrapper — centered text with dot navigation
- Quote: italic, Be Vietnam Pro, 18–20px
- Name: bold, primary-dark color
- Auto-rotate: 6s interval with `aria-live="polite"`

### Tags & Badges
- Background: `#ECFDF5` (mint tint)
- Text: `#059669` (fresh green), 12px, font-weight 600
- Radius: `rounded-full` (pill)
- Padding: 4px 10px

### Inputs (Contact form on dark bg)
- Background: `rgba(255,255,255,0.06)`
- Border: 1px solid `rgba(255,255,255,0.12)` → focus `#FBBF24`
- Text: white, 14px
- Placeholder: `rgba(255,255,255,0.3)`
- Radius: `rounded-full` (text inputs), `rounded-xl` (textarea)

### Navigation
- Fixed header, transparent → white/95 + backdrop-blur on scroll
- Logo: product image (36px rounded-full) + brand name
- Nav links: 14px medium, `#6B7280` → hover `#10B981`
- CTA button: pill-shaped green with Zalo brand icon
- Scroll detection: `window.scrollY > 50`

## 5. Layout Principles

### Spacing System
- Section padding: `py-20` (80px vertical)
- Container max-width: `1200px`, centered with `mx-auto`
- Card gap: `gap-6` (24px)
- Component padding: 20–32px
- Hero padding: `pt-24 pb-16` (accounts for fixed header)

### Grid Patterns
- Products: `grid sm:grid-cols-2 lg:grid-cols-3` (3 columns desktop)
- Process: `grid sm:grid-cols-2 lg:grid-cols-4` (4 columns desktop)
- Dual CTA: `grid sm:grid-cols-2` (2 columns)
- Social videos: `grid sm:grid-cols-2 lg:grid-cols-3`
- Hero: `grid lg:grid-cols-[55%_45%]` (asymmetric split)

### Section Alternation Pattern
```
Hero:         cream gradient (bg → bg-warm)
Products:     soft cream (bg)
Process:      photo background + dark overlay
Calendar:     white (surface)
Dual CTA:     warm beige (bg-warm)
Testimonials: soft cream (bg)
Social:       soft cream (bg)
FAQ:          white (surface)
Contact:      green gradient (primary-dark → primary)
Footer:       charcoal (text color as bg)
```

### Whitespace Philosophy
- **Farm-to-table luxury**: Generous vertical padding creates a premium, unhurried browsing pace
- **Photography breathing room**: Images have ample space to breathe within cards
- **Section clarity**: Strong visual separation via alternating backgrounds
- **Content maximum width**: 680px for long-form text (FAQ), 740px for testimonials

## 6. Depth & Elevation

### Shadow System
| Level | Shadow | Use |
|-------|--------|-----|
| sm | `0 2px 8px rgba(0,0,0,0.05)` | Cards at rest, tags |
| md | `0 4px 16px rgba(0,0,0,0.08)` | Hovered cards, dropdowns |
| lg | `0 8px 24px rgba(0,0,0,0.1)` | Modals, elevated panels |
| xl | `0 14px 36px rgba(0,0,0,0.1)` | Product card hover state |
| colored | `0 4px 18px rgba(16,185,129,0.3)` | Green CTA buttons |
| amber | `0 4px 18px rgba(251,191,36,0.3)` | Amber submit button |
| hero-img | `0 25px 50px rgba(247,115,22,0.15)` | Hero mango photo |

### Surface Hierarchy
1. **Page background** (`#FAFAF9`): Lowest layer
2. **Section backgrounds** (`#F3E8D8`, `#ECFDF5`): Mid layer, alternating
3. **Cards** (`#FFFFFF`): Elevated surfaces with subtle shadow
4. **Floating elements**: Hero badge, stat cards — higher shadow

## 7. Do's and Don'ts

### Do
- Use real product photography — authenticity builds trust for agricultural products
- Keep buttons pill-shaped (`rounded-full`) consistently
- Use Phosphor icons with `duotone` weight for feature icons
- Use SVGL brand SVGs for social platform icons
- Maintain 12px minimum font size for Vietnamese readability
- Use `prefers-reduced-motion` for all animations
- Self-host images (no external CDN dependencies for Vietnamese latency)
- Use Vietnamese text in Be Vietnam Pro for proper diacritics

### Don't
- Don't use emojis — use Phosphor icons or SVGL brand icons instead
- Don't use stock photos of wrong mango varieties (Alphonso/Tommy Atkins are visually different from Tứ Quý)
- Don't use pure black (`#000000`) for text — use charcoal (`#1F2937`)
- Don't use sharp corners on cards — always `rounded-3xl` (24px)
- Don't use more than 2 font weights per section
- Don't use dark theme for main content — only Contact and Footer sections
- Don't scatter decorative floating elements — keep it professional
- Don't use font sizes below 12px

## 8. Responsive Behavior

### Breakpoints (Tailwind defaults)
| Name | Min-width | Key changes |
|------|-----------|-------------|
| sm | 640px | 2-column grids, larger text |
| md | 768px | Show nav links |
| lg | 1024px | Full grid layouts, hero split image |
| xl | 1280px | Max content width reached |

### Mobile Adaptations
- **Hero**: Single column, image hidden (`hidden lg:block`)
- **Products**: Stack to single column
- **Process**: 2 columns → 1 column on mobile
- **Calendar**: Horizontal scroll with `min-w-[540px]`, smaller text
- **Navigation**: Only CTA button visible, nav links hidden on mobile
- **Touch targets**: Minimum 44px height for buttons and interactive elements

### Typography Scaling
- H1: 32px (mobile) → 48px (sm) → 60px (lg)
- H2: 30px (mobile) → 36px (sm)
- Body: 16px consistent across breakpoints
- Caption: 12px consistent (minimum size)

## 9. Agent Prompt Guide

### Quick Color Reference
```
Primary:    #10B981 (emerald green — buttons, links, trust)
Accent:     #F97316 (mango orange — prices, urgency)
Amber:      #FBBF24 (golden — submit CTAs, highlights)
Background: #FAFAF9 (soft cream — main canvas)
Alt BG:     #F3E8D8 (warm beige — alternating sections)
Surface:    #FFFFFF (white — cards, elevated content)
Text:       #1F2937 (charcoal — primary text)
Text 2:     #6B7280 (cool gray — secondary text)
Border:     #E5E7EB (light gray — dividers)
```

### Ready-to-Use Prompts
- "Build a product card with 24px radius, cream gradient image area, green pill CTA button, mango orange price"
- "Create a section with orchard photo background, 60% dark overlay, white heading text, white cards floating above"
- "Design a hero with 55/45 split: text left with green pill buttons, mango photo right with 24px radius and warm shadow"
- "Make a contact form on green gradient background with amber submit button, white/10 borders, rounded-full inputs"

### Icon System
- **UI icons**: Phosphor Icons (`@phosphor-icons/react`), `duotone` weight, sizes 14–28px
- **Brand icons**: SVGL SVGs at `public/icons/` via `BrandIcon` component, sizes 18–24px
- **Available brands**: tiktok, facebook, instagram, zalo

### Image Treatment
- Product images: `object-contain` with `drop-shadow-md`
- Background images: `object-cover` + `fill` + dark overlay
- Hero image: `priority={true}`, `rounded-3xl`, colored shadow
- Card header images: `h-40`, gradient fade into card content
