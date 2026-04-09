# Phase 1: Technical SEO + AEO Schema Enhancement

**Priority:** CRITICAL — foundation for all other phases
**Status:** ⬜ Pending
**Effort:** 2-3 days

---

## Context

- [SEO Keyword Report](../reports/researcher-260409-0755-seo-keyword-strategy.md)
- [AEO Strategy Report](../reports/researcher-260409-0755-aeo-strategy.md)
- Layout file: `src/app/layout.tsx`

## Overview

Upgrade structured data (JSON-LD) to maximize both Google ranking signals and AI engine citability. Currently have LocalBusiness + FAQPage + WebSite. Need Product, Speakable, DefinedTerm, BreadcrumbList, and author/date attribution.

## Key Insights

- Speakable schema enables AI voice citation (Google AI Overview, ChatGPT)
- Product schema with CDĐL #00124 creates authority signal AI can verify
- DefinedTerm makes site THE canonical definition for "Xoài Tứ Quý"
- Author attribution (HTX director) boosts E-E-A-T for AI systems
- Date signals (datePublished/dateModified) critical for freshness ranking

## Requirements

### Functional
- Add Product JSON-LD with offers, certification, manufacturer
- Add Speakable to FAQ answers
- Add DefinedTerm for "Xoài Tứ Quý"
- Add BreadcrumbList for all pages
- Add author + datePublished to FAQ schema
- Add robots.txt
- Add/improve sitemap

### Non-functional
- All JSON-LD must pass Google Rich Results Test
- Schema.org validator: zero errors
- No impact on page load performance (inline JSON-LD only)

## Related Code Files

### Modify
- `src/app/layout.tsx` — expand JSON-LD graph
- `src/app/nguon-goc/page.tsx` — add page-specific schema
- `src/components/faq-section.tsx` — add CSS selectors for Speakable

### Create
- `src/lib/structured-data.ts` — centralized JSON-LD builder
- `public/robots.txt`

## Implementation Steps

1. Create `src/lib/structured-data.ts` — modular schema builders
2. Add Product schema with:
   - CDĐL #00124 certification
   - 3 offer tiers (VIP, Loại 1, Loại 2) with price ranges
   - Manufacturer: HTX Thạnh Phong
   - validFrom/validThrough for temporal pricing
3. Add Speakable schema to FAQPage:
   - cssSelector targeting each FAQ answer div
4. Add DefinedTerm for "Xoài Tứ Quý":
   - termCode: "00124"
   - Link to CDĐL registry
5. Add BreadcrumbList schema (home → page)
6. Add author attribution to FAQ answers:
   - Person: HTX director name + jobTitle
   - datePublished + dateModified
7. Create `public/robots.txt` (allow all, point to sitemap)
8. Verify existing sitemap covers all routes
9. Run Google Rich Results Test validation

## Todo List

- [ ] Create structured-data.ts module
- [ ] Add Product schema with CDĐL certification
- [ ] Add Speakable to FAQPage schema
- [ ] Add DefinedTerm for Xoài Tứ Quý
- [ ] Add BreadcrumbList schema
- [ ] Add author + date attribution to FAQ
- [ ] Create robots.txt
- [ ] Verify sitemap
- [ ] Validate all schema (Rich Results Test)
- [ ] Build passes with no errors

## Success Criteria

- All JSON-LD passes Google Rich Results Test
- Product schema shows in Google Structured Data Testing Tool
- Speakable markup recognized
- robots.txt accessible at /robots.txt
- `bun run build` succeeds

## Risk Assessment

- **Schema validation errors** — mitigate by testing each schema type independently
- **Speakable not widely supported yet** — low risk, additive only, no downside
- **Price validity dates need updates** — plan for monthly update cadence

## Security Considerations

- No user input in JSON-LD (all static/hardcoded)
- No PII exposure in author attribution (public business info only)
