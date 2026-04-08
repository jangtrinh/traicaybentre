# Use Cases: Design Refinement — Premium Feel

## UC-01: Bolder Hero Typography + Scroll Hint
**Actor:** First-time visitor
**Precondition:** User lands on homepage
**Happy Path:**
1. Hero H1 displays with wider letter-spacing, feels bold and confident
2. Scroll hint ("Cuộn xuống khám phá" + animated chevron) appears after 2s
3. User scrolls, hint fades out

**Files:** `hero-section.tsx`

## UC-02: Accent-Colored Testimonials Section
**Actor:** Scrolling visitor
**Precondition:** User reaches testimonials
**Happy Path:**
1. Section background uses warm amber gradient instead of neutral cream
2. Text colors adjust for contrast on warm bg
3. Visual rhythm: cream → dark photo → white → beige → **amber** → cream

**Files:** `testimonial-section.tsx`

## UC-03: Increased Section Spacing
**Actor:** All visitors
**Precondition:** Page loaded
**Happy Path:**
1. All sections use `py-24` (96px) instead of `py-20` (80px)
2. Hero uses `min-h-[95vh]` for more generous breathing room
3. Section heading margins increase from `mb-12` to `mb-16`

**Files:** `globals.css`, all section components

## UC-04: Typography Polish — Labels & Headings
**Actor:** All visitors
**Precondition:** Page loaded
**Happy Path:**
1. Uppercase section labels use `tracking-[0.2em]` for editorial feel
2. Section H2s increase to `text-4xl sm:text-5xl`
3. Testimonial quotes increase to `text-xl sm:text-2xl`

**Files:** All section components with headings

## UC-05: Trust/Certification Badges Section
**Actor:** Skeptical buyer evaluating credibility
**Precondition:** User scrolls past Calendar section
**Happy Path:**
1. Horizontal row of 4 certification badges visible
2. Badges: CDĐL #00124, OCOP Bến Tre, GlobalGAP, QR Truy Xuất
3. Clean minimal layout, centered on cream bg

**Files:** New `certification-section.tsx`, `page.tsx`

## UC-06: Scroll Hint Component
**Actor:** First-time visitor on hero
**Precondition:** Hero section visible
**Happy Path:**
1. After 2s, animated chevron + text fades in at bottom of hero
2. Bouncing animation on chevron
3. Disappears on scroll (IntersectionObserver)

**Files:** `hero-section.tsx`

---

## Acceptance Criteria (Gherkin)

```gherkin
# UC-01
Given the hero section is rendered
When I view the H1 heading
Then the brand name has wider letter-spacing (tracking-wide or tracking-widest)

# UC-02
Given I scroll to testimonials section
When the section is visible
Then the background shows warm amber gradient (from-accent-light to-bg-warm)

# UC-03
Given any section is rendered
When I inspect the vertical padding
Then it should be at least 96px (py-24)

# UC-05
Given I scroll past the calendar section
When the certification section is visible
Then I see 4 trust badges in a centered row
```

---

## Appetite Check

| UC | Effort | Value | Ship? |
|----|--------|-------|-------|
| UC-01 | Low | High | Yes — hero first impression |
| UC-02 | Low | High | Yes — instant visual rhythm fix |
| UC-03 | Low | Medium | Yes — global padding tweak |
| UC-04 | Low | Medium | Yes — typography confidence |
| UC-05 | Medium | High | Yes — trust/credibility |
| UC-06 | Low | Medium | Yes — polish detail |

All UCs ship this cycle. Total estimate: 2-3 hours.

---

## Design System Check

### Existing tokens used:
- `--color-accent-light` (#FEF3C7) for testimonial bg
- `--color-bg-warm` (#F3E8D8) for gradient target
- `--font-heading` Be Vietnam Pro for all headings
- `rounded-3xl` (24px) for certification badge cards

### New tokens needed:
- None — all refinements use existing palette

### New components:
- `certification-section.tsx` — trust badges row (1 new component)
