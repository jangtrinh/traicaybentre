# Phase 2: Translation Extraction & Wiring

## Context Links
- Phase 1 foundation: `src/i18n/routing.ts`, `src/i18n/navigation.ts`
- Components: `src/components/*.tsx` (~3800 lines total, ~30 files)
- Content data: `src/lib/landing-data.ts`, `src/content/products.ts`

## Overview
- **Priority**: P1
- **Status**: Pending
- **Blocked by**: Phase 1
- **Effort**: 3h
- **Description**: Extract hardcoded Vietnamese strings from components into translation JSON files. Wire components to use `useTranslations()` / `getTranslations()`. Create en/ko/ja translations.

## Key Insights
- ~30 component files with hardcoded Vietnamese text
- Priority: UI chrome first (nav, footer, CTAs, section headings) — these appear on every page
- Product descriptions in `src/content/products.ts` are data-driven — handle separately from component strings
- Article content (kien-thuc, tin-tuc pages) NOT translated in this phase — Vietnamese-audience content
- FAQ answers in `structured-data.ts` are JSON-LD — translated in Phase 3

## Content Scope Decision

### Translate NOW (Phase 2)
| Category | Files | Approx strings |
|----------|-------|----------------|
| Navigation | header.tsx, mobile-menu-overlay.tsx, footer.tsx | ~20 |
| Homepage sections | hero-section, product-section, process-section, calendar-section, certification-section, dual-cta-section, testimonial-section, faq-section, contact-section, social-video-section, tin-tuc-section | ~80 |
| Shared UI | share-buttons, article-toc, price-ticker-footer, fomo-toast | ~15 |
| Product landings | xoai-tu-quy-landing, xoai-hoang-kim-landing, dua-xiem-ben-tre-landing, product-catalog | ~60 |

### Translate LATER (not this plan)
| Category | Reason |
|----------|--------|
| Article pages (kien-thuc/*, tin-tuc/*) | Long-form Vietnamese content, audience is domestic |
| MDX articles | Same — domestic audience |
| Delivery pages (giao-hang/*) | Domestic logistics, city-specific |

### NEVER translate
| Content | Reason |
|---------|--------|
| Product names (Xoài Tứ Quý, Dừa Xiêm) | Brand names — keep Vietnamese |
| CDĐL certification numbers | Legal identifiers |
| Phone numbers, addresses | Factual data |

## Message File Structure

```
messages/
├── vi/
│   ├── common.json      # Buttons, labels, misc shared strings
│   ├── nav.json          # Header/footer navigation
│   ├── home.json         # Homepage section content
│   ├── products.json     # Product descriptions, CTAs
│   └── contact.json      # Contact form, CTA sections
├── en/
│   ├── common.json
│   ├── nav.json
│   ├── home.json
│   ├── products.json
│   └── contact.json
├── ko/ (same)
└── ja/ (same)
```

### Namespace Example — `nav.json`
```json
{
  "Nav": {
    "hoangKim": "Hoàng Kim",
    "xoaiTuQuy": "Xoài Tứ Quý",
    "duaXiem": "Dừa Xiêm",
    "origin": "Nguồn gốc",
    "knowledge": "Kiến thức",
    "news": "Tin tức",
    "contact": "Liên hệ",
    "more": "Thêm",
    "brandName": "Trái Cây Bến Tre",
    "followUs": "Theo dõi vựa",
    "products": "Sản phẩm",
    "officialSite": "Trang chính thức của vựa Xoài Tứ Quý Thạnh Phú"
  }
}
```

## Related Code Files

### Files to CREATE
| File | Purpose |
|------|---------|
| `messages/vi/common.json` | Vietnamese shared UI strings |
| `messages/vi/nav.json` | Vietnamese nav |
| `messages/vi/home.json` | Vietnamese homepage |
| `messages/vi/products.json` | Vietnamese product content |
| `messages/vi/contact.json` | Vietnamese contact/CTA |
| `messages/en/*.json` | English translations |
| `messages/ko/*.json` | Korean translations |
| `messages/ja/*.json` | Japanese translations |

### Files to MODIFY
| File | Change |
|------|--------|
| `src/components/header.tsx` | `NAV_LINKS` labels → `t('Nav.xxx')` |
| `src/components/footer.tsx` | Hardcoded strings → `t()` |
| `src/components/mobile-menu-overlay.tsx` | Labels → `t()` |
| `src/components/hero-section.tsx` | Heading/subheading → `t()` |
| `src/components/product-section.tsx` | Section title/description → `t()` |
| `src/components/process-section.tsx` | Steps text → `t()` |
| `src/components/calendar-section.tsx` | Season text → `t()` |
| `src/components/certification-section.tsx` | Cert text → `t()` |
| `src/components/dual-cta-section.tsx` | CTA text → `t()` |
| `src/components/testimonial-section.tsx` | Testimonial text → `t()` |
| `src/components/faq-section.tsx` | Q&A text → `t()` |
| `src/components/contact-section.tsx` | Form labels → `t()` |
| `src/components/social-video-section.tsx` | Section title → `t()` |
| `src/components/tin-tuc-section.tsx` | Section title → `t()` |
| `src/components/share-buttons.tsx` | Aria labels → `t()` |
| `src/components/fomo-toast-notification.tsx` | Toast text → `t()` |
| `src/components/price-ticker-footer.tsx` | Labels → `t()` |
| `src/i18n/request.ts` | Add new namespaces to message loading |

## Implementation Steps

### 1. Extract strings from each component
For each component file:
1. Read file, identify all Vietnamese text strings
2. Create translation key (camelCase, component-scoped)
3. Add to appropriate `messages/vi/*.json` namespace
4. Replace hardcoded string with `t('Key')` call

### 2. Wire Server Components
```typescript
// Before
export function ProcessSection() {
  return <h2>Quy trình từ vườn đến tay bạn</h2>;
}

// After
import { getTranslations } from "next-intl/server";

export async function ProcessSection() {
  const t = await getTranslations("Home");
  return <h2>{t("processTitle")}</h2>;
}
```

### 3. Wire Client Components
```typescript
// Before (header.tsx — "use client")
const NAV_LINKS = [{ label: "Kiến thức", href: "/kien-thuc" }];

// After
import { useTranslations } from "next-intl";

export function Header() {
  const t = useTranslations("Nav");
  const NAV_LINKS = [{ label: t("knowledge"), href: "/kien-thuc" }];
  // ...
}
```

### 4. Handle `Link` components
Replace `next/link` with locale-aware `Link` from `@/i18n/navigation`:
```typescript
import { Link } from "@/i18n/navigation";
// Automatically prefixes locale to href
```

### 5. Create en/ko/ja translations
- Start with English (human-quality translations needed for e-commerce trust)
- Korean and Japanese: provide initial translations (can be AI-assisted, then reviewed)
- Product names stay Vietnamese across all locales

### 6. Update `src/i18n/request.ts`
Load all new namespaces: common, nav, home, products, contact.

## Todo List
- [ ] Create `messages/vi/common.json` — extract shared strings
- [ ] Create `messages/vi/nav.json` — extract header/footer nav
- [ ] Create `messages/vi/home.json` — extract homepage sections
- [ ] Create `messages/vi/products.json` — extract product content
- [ ] Create `messages/vi/contact.json` — extract contact/CTA
- [ ] Wire header.tsx to useTranslations
- [ ] Wire footer.tsx to useTranslations
- [ ] Wire mobile-menu-overlay.tsx
- [ ] Wire homepage section components (hero, product, process, calendar, cert, cta, testimonial, faq, contact, social, tin-tuc)
- [ ] Wire shared components (share-buttons, fomo-toast, price-ticker)
- [ ] Replace `next/link` → `@/i18n/navigation` Link in modified components
- [ ] Create `messages/en/*.json` (English translations)
- [ ] Create `messages/ko/*.json` (Korean translations)
- [ ] Create `messages/ja/*.json` (Japanese translations)
- [ ] Update `src/i18n/request.ts` to load all namespaces
- [ ] Run `bun run build` — verify no missing keys

## Success Criteria
- All component Vietnamese strings come from message files, not hardcoded
- Switching locale shows translated UI (header, footer, homepage sections, product pages)
- Vietnamese content renders identically to pre-i18n state
- No missing translation key warnings in build output
- Product names remain Vietnamese in all locales

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| Missing translation key crashes page | next-intl shows key path as fallback; add `onError` handler to log warnings |
| Client/server component boundary mismatch | Use `useTranslations` for "use client" components, `getTranslations` for server — lint for mismatch |
| Large message files slow loading | Split by namespace; next-intl tree-shakes per page |
| Translation quality for ko/ja | Phase 2 ships with reviewed en; ko/ja marked as beta, can refine post-launch |
