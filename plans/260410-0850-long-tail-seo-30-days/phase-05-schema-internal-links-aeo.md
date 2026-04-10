# Phase 05 — Schema + Internal Links Validation Checklist

**Status:** pending | **Effort:** 1d validation only | **Blocked by:** P02, P03, P04

## 🔴 Red Team Applied (F7)

**Scope reduced:** Schema + internal linking additions moved INLINE to P02-P04 (interleaved, not serialized). P05 is now a VALIDATION CHECKLIST phase — audit outputs from previous phases, catch misses, run Rich Results Test.

Effort: 3d → 1d.

## Goal

Verify technical SEO implementation across all 10 target pages. Catch schema misses, validate Rich Results, audit internal link graph.

## Schema checklist per target page

| KW# | Page | Schemas required |
|---|---|---|
| 1 | `/xoai-tu-quy/kien-thuc/xoai-tu-quy-1-kg-bao-nhieu-trai` | Article + FAQPage (8+ Q&A) + Speakable |
| 2 | `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` | Article + HowTo + Speakable |
| 3 | `/xoai-tu-quy/kien-thuc/an-song-hay-chin` | Article + FAQPage |
| 4 | `/giao-hang/ha-noi` | LocalBusiness + Service + FAQPage |
| 5 | `/dua-xiem-ben-tre/kien-thuc/dua-xiem-ben-tre-vs-dua-xiem-mien-tay` | Article + FAQPage |
| 6 | `/dua-xiem-ben-tre` | Product + Offer placeholder + FAQPage |
| 7 | `/xoai-tu-quy/kien-thuc/xoai-tu-quy-thanh-phu-loai-1-gia-bao-nhieu` | Article + Product + Offer |
| 8 | `/qua-bieu-trai-cay-ben-tre` | Product (combo) + FAQPage + LocalBusiness |
| 9 | `/vua-xoai-ben-tre-gia-si` | LocalBusiness + Product (tiers) + Offer + FAQPage |
| 10 | `/xoai-tu-quy/kien-thuc/xoai-ben-tre-co-gi-dac-biet` | Article + DefinedTerm (Bến Tre terroir) |

## Internal linking map (hub-spoke)

### Pillar pages → target pages
- `/xoai-tu-quy` landing INTERNAL_LINKS section: add 5 links với anchor = exact keyword
- `/dua-xiem-ben-tre` landing INTERNAL_LINKS: add 2 links (KW #5, #6)
- `/san-pham` catalog: add link to new landings (#8, #9)
- `/nguon-goc`: add 3 internal links to KW #1, #10, #7

### Cross-linking blog articles
- Blog #1 → link to #2, #7 (same pillar: pricing/quality)
- Blog #2 → link to #3, #10 (quality/storytelling)
- Blog #3 → link to #1, #2
- Blog #5 → link to #6 (dừa cluster)
- Blog #7 → link to #1, #9 (pricing cluster)
- Blog #10 → link to #2, #3 (quality)

### Footer optional
- Add KW #8 + #9 landing links to footer "Sản phẩm" column (if bandwidth)

## AEO (Answer Engine Optimization)

### Speakable schema
- Add `<SpeakableSpecification>` cho blog FAQ answers (KW #1, #2, #3, #5)
- CSS selector: `["#aeo-answer", ".faq-answer", "blockquote"]`

### ChatGPT/Perplexity signals
- First paragraph = TL;DR answer (50-80 words) with exact phrase
- Use `<strong>` for key facts Google can extract
- Avoid JS-rendered content for answers (SSR only)

## Files to Modify

- 10 target pages (schema additions inline)
- `src/components/product/xoai-tu-quy-landing.tsx` — expand INTERNAL_LINKS
- `src/components/product/dua-xiem-ben-tre-landing.tsx` — expand INTERNAL_LINKS
- `src/app/san-pham/page.tsx` — add landings
- `src/app/nguon-goc/page.tsx` — add inline links
- `src/components/footer.tsx` — (optional) add landings
- `src/lib/structured-data.ts` — add helpers if needed: `getHowToJsonLd`, `getServiceJsonLd`, `getSpeakableJsonLd`

## Todo

- [ ] Audit existing schema per page (list missing)
- [ ] Add HowTo schema to KW #2
- [ ] Add Service schema to KW #4
- [ ] Expand FAQPage to KW #1, #3, #5, #6, #8, #9
- [ ] Speakable schema on blog FAQ articles
- [ ] Add internal links from pillar pages
- [ ] Cross-link blog articles per topic cluster
- [ ] Rich Results Test each page
- [ ] Typecheck + build verify

## Success Criteria

- 10/10 pages: Rich Results Test pass
- 10/10 pages: ≥3 internal links from pillar/cluster
- 6/10 blog: Speakable schema present
- Build + typecheck clean
- No duplicate schema (same @type twice on same page)

## Risks

| Risk | Mitigation |
|---|---|
| Schema conflict (multiple Products on 1 page) | Use `@id` to disambiguate entities |
| Over-linking dilutes equity | Cap 5 internal links per section |
| HowTo schema validation errors | Test with Google Rich Results Test before merge |

## Next

→ P06: Google Ads campaign launch
