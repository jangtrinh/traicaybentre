# Phase 04 — MVP Anchor Sections (not dedicated landings)

**Status:** pending | **Effort:** 2d MVP | **Blocked by:** P01

## 🔴 Red Team Applied (F9)

**Scope cut:** Instead of building 2 dedicated landing pages upfront, add **MVP anchor sections** to existing hub pages. Validate demand via Week 2 GSC impressions before promoting to dedicated routes.

### MVP approach

| KW# | MVP location | Anchor URL |
|---|---|---|
| 8 (quà biếu) | New section trên `/san-pham` | `/san-pham#qua-bieu-ben-tre` |
| 9 (vựa B2B sỉ) | New section trên `/xoai-tu-quy` | `/xoai-tu-quy#gia-si` |

Each anchor section: 200-400 words + H2 with exact keyword + FAQ 3-5 Q&A + CTA.

### Promotion criteria (Week 2 review)
- If GSC impressions ≥ 50 in 7 days → promote to dedicated landing page `/qua-bieu-trai-cay-ben-tre` or `/vua-xoai-ben-tre-gia-si`
- If GSC impressions < 50 → keep as anchor section, no dedicated page
- This saves ~8 days of work on speculative landings

## Goal

Ship 2 bespoke landing pages cho highest-conversion long-tail keywords. Target exact keyword + funnel → Zalo/phone CTA.

## Landings to build

### Landing A — Quà biếu trái cây đặc sản Bến Tre (#8)

**URL:** `/qua-bieu-trai-cay-ben-tre`
**Target KW:** `quà biếu trái cây đặc sản bến tre`
**Intent:** Gift shopping (Tết, lễ, sinh nhật sếp/khách hàng)

**Sections:**
1. Hero: "Quà biếu trái cây đặc sản Bến Tre — Xoài Tứ Quý CDĐL + Dừa Xiêm Premium"
2. Product showcase: 3 combo (xoai box 5kg / 10kg / dua + xoai combo)
3. "Tại sao chọn làm quà biếu" — 4 selling points (CDĐL authentic, đóng gói premium, thiệp kèm, giao đúng địa chỉ)
4. Gallery: 6 product shots (existing assets)
5. Order form / Zalo CTA
6. FAQ: giao Tết, thiệp, đóng gói, giá

**Schema:** Product (combo) + FAQPage + LocalBusiness

### Landing B — Vựa xoài Tứ Quý Bến Tre giá sỉ (#9)

**URL:** `/vua-xoai-ben-tre-gia-si`
**Target KW:** `vựa xoài tứ quý bến tre giá sỉ`
**Intent:** B2B wholesale (nhà hàng, chợ đầu mối, retailer)

**Sections:**
1. Hero: "Vựa xoài Tứ Quý Bến Tre — Giá sỉ trực tiếp từ Thạnh Phú"
2. Wholesale price table: VIP / Loại 1 / Loại 2 theo thùng 20kg (reuse PRICE_DATA)
3. "Tại sao lấy sỉ từ vựa" — 4 B2B selling points (cắt trung gian, lock price, COD/công nợ, xuất VAT)
4. Minimum order + shipping terms
5. Inquiry form / Zalo CTA
6. Testimonial (nếu có) hoặc case study
7. FAQ: MOQ, công nợ, VAT, giao nhanh

**Schema:** LocalBusiness + Product (tiers) + FAQPage + Offer

## Architecture

### File pattern

```
src/app/qua-bieu-trai-cay-ben-tre/page.tsx
src/components/landing/qua-bieu-landing.tsx

src/app/vua-xoai-ben-tre-gia-si/page.tsx
src/components/landing/vua-xoai-gia-si-landing.tsx
```

**Reserved paths update:** add `qua-bieu-trai-cay-ben-tre` + `vua-xoai-ben-tre-gia-si` to `RESERVED_PATHS` in `src/content/products.ts` để tránh `[product]` dynamic bắt nhầm.

### Shared components to reuse

- `<Header />`, `<Footer />`, `<SectionDivider />`, `<FadeIn />`
- Design system tokens (brand, brand-cream, mango, text)
- `PRICE_DATA` for B2B landing
- Zalo CTA helper pattern from `dua-xiem-ben-tre-landing.tsx`

## Files to Create

- `src/app/qua-bieu-trai-cay-ben-tre/page.tsx` (~30 LOC)
- `src/components/landing/qua-bieu-landing.tsx` (~200 LOC — split if > 200)
- `src/app/vua-xoai-ben-tre-gia-si/page.tsx` (~30 LOC)
- `src/components/landing/vua-xoai-gia-si-landing.tsx` (~200 LOC)

## Files to Modify

- `src/content/products.ts` — RESERVED_PATHS add 2 new reserved segments
- `src/app/sitemap.ts` — add 2 new static URLs
- `src/components/footer.tsx` — add footer links to 2 new landings (optional discoverability)
- `src/components/header.tsx` — NO header nav entry (would bloat nav; landings are search-entry only)

## Todo

- [ ] Design wireframe for landing A (quà biếu)
- [ ] Design wireframe for landing B (vựa sỉ)
- [ ] Copy writing: hero, sections, FAQ (per landing)
- [ ] Build `qua-bieu-landing.tsx` + page.tsx
- [ ] Build `vua-xoai-gia-si-landing.tsx` + page.tsx
- [ ] Update RESERVED_PATHS
- [ ] Update sitemap with 2 new URLs
- [ ] JSON-LD schema per landing
- [ ] Build + typecheck verify
- [ ] Curl test: both return 200
- [ ] Both included in sitemap

## Success Criteria

- 2 new landings live, prerendered static
- Each: exact keyword in title/H1/meta/first 100 words
- Each: schema valid (Rich Results Test)
- Header does NOT gain new entries (YAGNI, SEO-first preserved)
- Footer optionally gains discoverability links
- Build exit 0, typecheck clean
- Sitemap includes both URLs
- Zero legacy URL touched

## Risks

| Risk | Mitigation |
|---|---|
| Landing bloat design system | Reuse tokens strictly, no custom colors |
| Price table in B2B landing out of date | Use `PRICE_DATA` import (auto-synced with ticker cron) |
| Quà biếu combos chưa có SKU/price | Phase gate: confirm combos với user before build |
| 2 new long URLs hurt crawl budget | Trivial (2 URLs) — non-issue |

## Next

→ P05: Schema layers + internal linking + AEO
