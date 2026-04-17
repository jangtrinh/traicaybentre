# Phase 6 — A11y Polish (WCAG AA)

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (C5, C6, H8, H9)
- Verified files:
  - `src/components/image-carousel.tsx` (the reusable carousel — confirmed via Grep)
  - `src/components/header.tsx:180` — `className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black"` (hamburger)
  - `src/app/[locale]/layout.tsx` (skip-link target)
  - `src/app/[locale]/dat-hang/page.tsx` (form focus)

## Overview

- **Priority:** P0/P1 (2 critical + 2 high)
- **Status:** pending
- **Effort:** 60 min
- **Description:** Four WCAG-AA compliance fixes. Keyboard nav on image-carousel (←/→/Home/End), hamburger touch target 36→44px, form focus ring upgrade, site-wide skip-to-content link.

## Key Insights

- `image-carousel.tsx` is the PRIMARY reusable carousel — used across sections. Fix here delivers C5 site-wide in one edit. No separate hero-section carousel found at the Keen/Embla API level.
- Hamburger is at header.tsx:180 (confirmed via Grep). Class is `h-9 w-9` — change to `h-11 w-11`. Existing ref `hamburgerRef` for focus return (from prior plan 260409-1859) untouched.
- `focus-visible:*` variant shows ring only on keyboard focus (not click) — cleaner UX than `focus:*` (always on).
- Skip-link must target `id="main"` on `<main>` element. `[locale]/layout.tsx` doesn't render `<main>` — that's in child route layouts or pages. Need to pick placement: homepage layout, every page layout. Simplest: wrap `children` in `<main id="main">` inside `LocaleLayout` body.

## Requirements

**Functional:**
- **C5 Carousel kb nav:**
  - Arrow Left / Right → cycle prev/next
  - Home → first slide; End → last slide
  - Container `tabIndex={0}` so it can be focused
  - Visible focus ring via `focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2`
  - `role="region"` + `aria-roledescription="carousel"` + `aria-label="Ảnh sản phẩm"` (or accept prop)
- **C6 Hamburger touch target:**
  - Change `h-9 w-9` → `h-11 w-11` (44×44px — WCAG 2.5.5 Target Size)
  - Verify icon scaling inside still centered
- **H8 Form focus ring:**
  - Replace weak focus with `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none` on all form inputs (dat-hang page + any global Input component)
  - Grep for `focus:border-text` + `focus:outline` patterns
- **H9 Skip-to-content link:**
  - Add at top of `<body>` inside `LocaleLayout`
  - Classes: `sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-3 py-2 rounded`
  - `href="#main"`
  - Text: `Bỏ qua đến nội dung chính`
  - Wrap `children` in `<main id="main">` inside `LocaleLayout`

**Non-functional:**
- Carousel auto-rotate must PAUSE on focus (accessibility + prevents jank) — pause via `document.activeElement === carouselEl` check or `onFocus/onBlur` toggling a `isPaused` state
- Respect `prefers-reduced-motion` (existing behavior; don't regress)
- Semantic: `<main>` is singleton per page — skip-link expects this

## Architecture

```
src/components/image-carousel.tsx
    ├─ Add containerRef (for focus management)
    ├─ onKeyDown handler: ArrowLeft/Right/Home/End
    ├─ onFocus/onBlur: pause/resume auto-rotate
    └─ Add tabIndex, role, aria-label, aria-live="polite" (announce slide change)

src/components/header.tsx
    └─ Line 180: h-9 w-9 → h-11 w-11 (single-char change)

src/app/[locale]/dat-hang/page.tsx (+ any other form pages)
    └─ Replace focus classes on inputs

src/app/[locale]/layout.tsx
    ├─ <body>: prepend skip-link <a>
    └─ Wrap children in <main id="main" className="min-h-screen">
       (note: existing <body className="min-h-screen"> — move min-h to <main>)
```

## Related Code Files

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/components/image-carousel.tsx` (~65 lines currently; adds ~30 lines)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/components/header.tsx` (line 180)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/dat-hang/page.tsx` (form input classes)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/layout.tsx` (skip-link + main wrap)

**Read to verify touch targets + form patterns (no edit unless needed):**
- `src/components/seo/order-page-content.tsx` (order form — may contain the real form)
- `src/components/contact-section.tsx` (contact form)

## Implementation Steps

1. **image-carousel.tsx:** Add kb nav + focus-pause:
   ```tsx
   "use client";
   import { useState, useEffect, useRef, useCallback, type KeyboardEvent } from "react";
   import Image from "next/image";

   export function ImageCarousel({
     images,
     interval = 4000,
     height = "h-[250px] sm:h-[350px]",
     className = "",
     label = "Thư viện ảnh",
   }: {
     images: { src: string; alt: string }[];
     interval?: number;
     height?: string;
     className?: string;
     label?: string;
   }) {
     const [current, setCurrent] = useState(0);
     const [paused, setPaused] = useState(false);

     const goTo = useCallback((i: number) => {
       const n = images.length;
       setCurrent(((i % n) + n) % n);
     }, [images.length]);

     useEffect(() => {
       if (images.length <= 1 || paused) return;
       const t = setInterval(() => goTo(current + 1), interval);
       return () => clearInterval(t);
     }, [current, interval, images.length, paused, goTo]);

     const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
       if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
       else if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
       else if (e.key === "Home") { e.preventDefault(); goTo(0); }
       else if (e.key === "End") { e.preventDefault(); goTo(images.length - 1); }
     };

     return (
       <div
         role="region"
         aria-roledescription="carousel"
         aria-label={label}
         tabIndex={0}
         onKeyDown={onKeyDown}
         onFocus={() => setPaused(true)}
         onBlur={() => setPaused(false)}
         onMouseEnter={() => setPaused(true)}
         onMouseLeave={() => setPaused(false)}
         className={`relative overflow-hidden rounded-3xl ${height} ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2`}
       >
         {images.map((img, i) => (
           <Image
             key={img.src}
             src={img.src}
             alt={img.alt}
             fill
             sizes="(max-width: 768px) 100vw, 1200px"
             aria-hidden={i !== current}
             className={`object-cover transition-opacity duration-1000 ease-in-out ${
               i === current ? "opacity-100" : "opacity-0"
             }`}
           />
         ))}
         {images.length > 1 && (
           <div
             role="tablist"
             aria-label={`${label} — điều khiển`}
             className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
           >
             {images.map((_, i) => (
               <button
                 key={i}
                 onClick={() => goTo(i)}
                 role="tab"
                 aria-selected={i === current}
                 aria-label={`Ảnh ${i + 1}`}
                 className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango ${
                   i === current ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                 }`}
               />
             ))}
           </div>
         )}
       </div>
     );
   }
   ```
   File stays < 100 lines. Still modular.

2. **header.tsx line 180:** `h-9 w-9` → `h-11 w-11`. Verify icon scaling inside (Phosphor icon `size="20"` or similar) still centers — likely unchanged since flex centers.

3. **dat-hang/page.tsx:** Find input classes, replace. Pattern:
   ```
   Old: focus:border-text focus:outline-none
   New: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2 focus-visible:border-mango
   ```
   Apply to `<input>`, `<textarea>`, `<select>`. Run Grep first to enumerate call-sites.

4. **layout.tsx (LocaleLayout):**
   ```tsx
   <body>
     <a
       href="#main"
       className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-mango focus:text-text focus:px-3 focus:py-2 focus:rounded focus:shadow-lg"
     >
       Bỏ qua đến nội dung chính
     </a>
     <GoogleTagManagerNoscript />
     <NextIntlClientProvider>
       <main id="main" className="min-h-screen">
         {children}
       </main>
       <FomoToastNotification />
     </NextIntlClientProvider>
     <Analytics />
   </body>
   ```
   Remove `min-h-screen` from `<body>` since `<main>` now carries it. Verify no existing `<main>` in child route layouts (would cause duplicate). Grep `<main ` across `src/app/`.

5. Validate:
   - `npx tsc --noEmit` clean
   - `bun run build` clean
   - Manual kb test: Tab from URL bar → first focus = skip-link (visible); Enter → jumps to main
   - Carousel: Tab into region → arrows cycle, Home/End jump ends, focus ring visible
   - Hamburger: measure 44×44px in DevTools
   - Form: Tab through dat-hang form → each field has visible ring

## Todo List

- [ ] Upgrade image-carousel.tsx with kb nav + ARIA + focus-pause
- [ ] Change hamburger h-9 w-9 → h-11 w-11 (header.tsx:180)
- [ ] Grep form focus classes; replace with focus-visible:ring pattern
- [ ] Add skip-link + `<main id="main">` wrap in LocaleLayout
- [ ] Grep `<main ` in src/app to avoid duplicate <main> elements
- [ ] Typecheck + build clean
- [ ] Manual kb-only smoke test (Tab + arrows on home + 1 form + 1 article)
- [ ] Lighthouse A11y score check — target ≥95

## Success Criteria

- `document.querySelector('#main')` present on every page, exactly one
- Tab from URL bar focuses skip-link first (visible)
- Enter on skip-link scrolls/jumps focus to main
- Carousel: `tabIndex=0`, `role=region`, arrows/Home/End change slide; focus ring visible
- Hamburger button: `getBoundingClientRect()` returns width × height ≥ 44 × 44
- All form inputs in dat-hang show ring on kb focus (not click)
- Lighthouse A11y score ≥ 95 on 3 sample pages
- No new TypeScript or lint errors

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Duplicate `<main>` if child layout already has one | Medium | Medium | Grep `<main ` in src/app/ before adding. If found, move `id="main"` to the deepest one; keep skip-link target consistent |
| Carousel kb nav conflicts with dot-button focus (Tab into region then Tab again into tab) | Low | Low | Standard a11y pattern; both focusable. User expectation: Tab to region, arrows to navigate, Tab again to dots |
| `prefers-reduced-motion` users lose auto-rotate entirely | Low | Low | Current component doesn't check media query; audit says "reduced-motion respected in article styles" but NOT in carousel. Optional enhancement: `useReducedMotion` hook → if reduced, disable auto interval. YAGNI scope here; add as M11 backlog |
| Touch target change breaks pill layout at scrolled state | Low | Medium | Verify visually — pill is wider than 36px already, 44px should fit. Test mobile + desktop scrolled view |
| Focus-visible not supported in older browsers | Very low | Low | Supported in all evergreen; Safari 15.4+. Fallback to `focus:*` if needed — but audit says Safari mobile already tested |
| Skip-link CSS `focus:absolute` collides with body stacking | Low | Low | `z-50` ensures top; tested pattern |

## Security Considerations

- No user input changes.
- ARIA attributes static strings (or passed from callers — already i18n/content-controlled).
- Skip-link anchor is internal `#main` — no external URL, no XSS.
- No PII.

## Next Steps

→ Sprint complete. Post-merge validation:
- Google Rich Results Test on 3 URLs per schema type (Article, Recipe, FAQ, Person)
- Lighthouse on homepage + 1 article + 1 shipping page
- Keyboard-only smoke test (record in PR description)
- Update roadmap + changelog per `.claude/rules/documentation-management.md`
- Consider backlog items: M3 (carousel lazy imgs), M4 (GTM preconnect), M11 (reduced-motion carousel pause), H3 (pillar tagging — content ops), H4 (product hub routes — new sprint)
