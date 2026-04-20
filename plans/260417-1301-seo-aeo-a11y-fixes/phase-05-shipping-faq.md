# Phase 5 — Shipping Pages FAQPage Schema

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (H6)
- Pages verified exist:
  - `src/app/[locale]/giao-hang/ha-noi/page.tsx` (static, ~200+ lines — has existing `faqItems` from i18n)
  - `src/app/[locale]/giao-hang/tp-hcm/page.tsx`
  - `src/app/[locale]/giao-hang/da-nang/page.tsx`
  - `src/app/[locale]/giao-hang/[city]/page.tsx` (dynamic, 60+ cities)

## Overview

- **Priority:** P1 (High)
- **Status:** pending
- **Effort:** 60 min
- **Description:** Add `FAQPage` JSON-LD to 3 static + 1 dynamic shipping pages. Extract helper `getShippingFaqJsonLd(faqs)` for DRY. City-specific 8+ Q&A pairs sourced from existing i18n `faq.items` arrays.

## Key Insights

- Static shipping pages already render visible FAQ via `faqItems = t.raw("giaoHangHaNoi.faq.items")` (confirmed from `ha-noi/page.tsx:50`) but emit only `BreadcrumbList` JSON-LD. FAQ content exists = zero writing work; just emit schema.
- Dynamic `[city]/page.tsx` needs city-aware FAQ — leverage `city.shippingHours`, `methodLabel`, `city.name` + 8 templatized Q&A.
- FAQPage schema requires each Question with `acceptedAnswer.text`. No nested structure beyond that for basic rich result.
- Audit notes "8+ city-specific FAQs." Static pages already likely have 6–8. Dynamic needs template.

## Requirements

**Functional:**
- New helper: `getShippingFaqJsonLd(faqs: { q: string; a: string }[])` in `structured-data.ts`
- Emit FAQPage JSON-LD on:
  - `giao-hang/ha-noi/page.tsx`
  - `giao-hang/tp-hcm/page.tsx`
  - `giao-hang/da-nang/page.tsx`
  - `giao-hang/[city]/page.tsx` (dynamic — city-aware FAQ)
- For dynamic `[city]`, build FAQ array in page from `city` record + i18n keys. Minimum 8 Q&A per city.
- Reuse via shared i18n `giaoHang.faq` namespace where possible.

**Non-functional:**
- Helper < 20 lines, pure function
- Zero hardcoded FAQ in JS — content stays in i18n JSON
- FAQ content must be visible on page AND in schema (Google requirement — no "hidden FAQ" schema)

## Architecture

```
src/lib/structured-data.ts
    └─ export getShippingFaqJsonLd(faqs)   (generic; can reuse for other FAQ pages too)

src/app/[locale]/giao-hang/ha-noi/page.tsx
    ├─ faqItems = t.raw("giaoHangHaNoi.faq.items")   (existing)
    ├─ faqJsonLd = getShippingFaqJsonLd(faqItems)    (NEW)
    └─ emit script tag beside breadcrumb (NEW)

src/app/[locale]/giao-hang/tp-hcm/page.tsx  — same pattern
src/app/[locale]/giao-hang/da-nang/page.tsx — same pattern

src/app/[locale]/giao-hang/[city]/page.tsx
    ├─ build faqItems[] in page body from t.raw("giaoHang.faq.items") or inline template:
    │    [
    │      { q: `Ship xoài tới ${city.name} mất bao lâu?`, a: `${city.shippingHours}h bằng ${methodLabel}.` },
    │      ...8 more templatized Q&A
    │    ]
    └─ emit FAQPage JSON-LD
```

## Related Code Files

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/structured-data.ts` (new export)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/giao-hang/ha-noi/page.tsx`
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/giao-hang/tp-hcm/page.tsx`
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/giao-hang/da-nang/page.tsx`
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/giao-hang/[city]/page.tsx`
- `messages/vi.json` (and other locales) — add `giaoHang.faq.items[]` for dynamic city FAQ template, OR inline template in page.tsx (decide based on existing i18n schema)

## Implementation Steps

1. **structured-data.ts:** Add export:
   ```ts
   export function getShippingFaqJsonLd(faqs: { q: string; a: string }[]) {
     if (!faqs || faqs.length === 0) return null;
     return {
       "@context": "https://schema.org",
       "@type": "FAQPage",
       mainEntity: faqs.map((qa) => ({
         "@type": "Question",
         name: qa.q,
         acceptedAnswer: { "@type": "Answer", text: qa.a },
       })),
     };
   }
   ```
   (Note: same shape as article FAQPage in page.tsx:143-154 — future DRY opportunity to consolidate, but out of scope here per YAGNI.)

2. **ha-noi/page.tsx:** Import helper, build schema:
   ```ts
   import { getBreadcrumbJsonLd, getShippingFaqJsonLd, SITE_URL } from "@/lib/structured-data";
   ...
   const faqItems = t.raw("faq.items") as { q: string; a: string }[];
   const faqJsonLd = getShippingFaqJsonLd(faqItems);
   ```
   Emit beside breadcrumb:
   ```tsx
   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
   {faqJsonLd && (
     <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
   )}
   ```
   Verify `faq.items` has ≥8 entries in `messages/vi.json`. If fewer, extend i18n (separate content-ops task; audit requires ≥8).

3. **tp-hcm/page.tsx + da-nang/page.tsx:** Mirror pattern. Same helper, same shape.

4. **[city]/page.tsx:** Build templatized FAQ:
   ```ts
   const methodLabel = citiesT(`methodLabels.${city.method}`);
   const faqItems: { q: string; a: string }[] = [
     { q: `Ship xoài Bến Tre tới ${city.name} mất bao lâu?`, a: `Khoảng ${city.shippingHours} tiếng, giao bằng ${methodLabel}.` },
     { q: `Phí ship tới ${city.name} bao nhiêu?`, a: `Tuỳ khối lượng và phương thức. Gọi 0932 585 533 báo giá chính xác.` },
     { q: `Xoài có bị dập khi ship tới ${city.name} không?`, a: `Không — mỗi trái bọc lưới xốp, đóng thùng carton lót đệm. Tỷ lệ lỗi < 2%.` },
     { q: `Thanh toán tại ${city.name}?`, a: `COD khi nhận hoặc chuyển khoản trước.` },
     { q: `Tối thiểu bao nhiêu mới ship tới ${city.name}?`, a: `1 thùng 20kg.` },
     { q: `Mua sỉ tại ${city.name}?`, a: `Gọi 0932 585 533 để báo giá sỉ theo khối lượng.` },
     { q: `Xuất hóa đơn VAT tại ${city.name}?`, a: `Có — xuất hóa đơn VAT cho nhà hàng, doanh nghiệp.` },
     { q: `Làm sao biết xoài Bến Tre thật khi nhận tại ${city.name}?`, a: `Mỗi thùng có QR truy xuất nguồn gốc. Sản phẩm thuộc CDĐL #00124.` },
   ];
   const faqJsonLd = getShippingFaqJsonLd(faqItems);
   ```
   (Consider moving these 8 templates to `messages/{locale}.json` under `giaoHang.cityFaqTemplate` for i18n polish — tradeoff: 4x locales = 32 entries. YAGNI: inline vi-only for now, if audit requires full i18n add later.)

   Emit script tag alongside breadcrumb.

5. Validate:
   - `npx tsc --noEmit`
   - `bun run build`
   - Visit `/giao-hang/ha-noi` + `/giao-hang/can-tho` (dynamic sample) → view source, FAQPage JSON-LD present
   - Rich Results Test: FAQ rich result eligible on all 4 page types

## Todo List

- [ ] Add `getShippingFaqJsonLd` helper (structured-data.ts)
- [ ] Verify `messages/vi.json` has ≥8 FAQs under `giaoHangHaNoi.faq.items` — extend if fewer
- [ ] Emit FAQPage JSON-LD on ha-noi/page.tsx
- [ ] Emit FAQPage JSON-LD on tp-hcm/page.tsx
- [ ] Emit FAQPage JSON-LD on da-nang/page.tsx
- [ ] Build templatized 8 FAQ + emit on [city]/page.tsx
- [ ] Rich Results Test: FAQ eligible on 4 URLs (3 static + 1 dynamic sample)

## Success Criteria

- View source on all 3 static shipping pages shows `"@type":"FAQPage"` with ≥8 mainEntity items
- Dynamic `/giao-hang/can-tho` (sample) shows FAQPage with 8 city-aware Q&A (city name interpolated into questions)
- Rich Results Test returns "FAQ" eligible for all tested URLs
- Existing BreadcrumbList schema unchanged

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Static shipping pages have <8 FAQs in i18n | Medium | Medium | Audit says static pages already have FAQ sections — verify count in `messages/vi.json` first. If <8, extend i18n (separate mini-task within phase) |
| Inline FAQ template only vi-locale breaks en/ko/ja dynamic city pages | Low | Low | Audit constraint is vi-only SEO priority; acceptable compromise. Flag for follow-up if en/ko/ja traffic justifies |
| FAQ schema content doesn't match visible page content (Google violation) | High if not careful | High | Rule: schema source = same `faqItems` used in JSX render. Never diverge. `[city]` template: render FAQ section in JSX using same array |
| Duplicate FAQ schema across pages dilutes ranking | Low | Low | Each page has city-scoped questions — unique content signal |

## Security Considerations

- i18n content trusted; JSON.stringify escapes for `<script>` tag.
- City name interpolation: `city.name` from curated `src/content/cities.ts` (not user input).
- No XSS vector.

## Next Steps

→ [Phase 6: A11y fixes](phase-06-a11y.md) — carousel kb nav, touch target, focus ring, skip link
