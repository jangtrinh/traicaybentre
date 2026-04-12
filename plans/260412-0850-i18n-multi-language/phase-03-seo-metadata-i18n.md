# Phase 3: SEO & Metadata i18n

## Context Links
- [hreflang best practices](https://better-i18n.com/en/blog/i18n-seo-hreflang-locale-urls-guide/)
- Current sitemap: `src/app/sitemap.ts`
- Structured data: `src/lib/structured-data.ts`
- Product metadata: `src/app/[locale]/[product]/page.tsx`
- Root metadata: `src/app/[locale]/layout.tsx`

## Overview
- **Priority**: P1
- **Status**: Pending
- **Blocked by**: Phase 1 (can run parallel with Phase 2)
- **Effort**: 3h
- **Description**: Add hreflang alternate tags, locale-specific metadata (title/description/OG), update sitemap for all locales, adapt structured data per locale.

## Key Insights
- next-intl middleware auto-generates `Link` response headers with hreflang for each locale — this handles the header-level hreflang
- Still need `<link rel="alternate" hreflang="...">` in HTML `<head>` for belt-and-suspenders SEO
- Sitemap must include all locale variants with hreflang annotations
- Structured data `inLanguage` field must match current locale
- `alternates.canonical` must point to current locale URL
- OG `locale` must match: `vi_VN`, `en_US`, `ko_KR`, `ja_JP`

## Architecture

### hreflang Strategy
```
Every page outputs 5 hreflang tags:
  <link rel="alternate" hreflang="vi" href="https://www.traicaybentre.com/san-pham" />
  <link rel="alternate" hreflang="en" href="https://www.traicaybentre.com/en/san-pham" />
  <link rel="alternate" hreflang="ko" href="https://www.traicaybentre.com/ko/san-pham" />
  <link rel="alternate" hreflang="ja" href="https://www.traicaybentre.com/ja/san-pham" />
  <link rel="alternate" hreflang="x-default" href="https://www.traicaybentre.com/san-pham" />
```

### Metadata per locale
```typescript
// generateMetadata receives locale from params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: getCanonicalUrl(locale, "/"),
      languages: {
        vi: "https://www.traicaybentre.com/",
        en: "https://www.traicaybentre.com/en",
        ko: "https://www.traicaybentre.com/ko",
        ja: "https://www.traicaybentre.com/ja",
        "x-default": "https://www.traicaybentre.com/",
      },
    },
    openGraph: {
      locale: OG_LOCALES[locale],     // vi_VN, en_US, ko_KR, ja_JP
      alternateLocale: [...other OG locales],
    },
  };
}
```

## Related Code Files

### Files to CREATE
| File | Purpose |
|------|---------|
| `messages/vi/meta.json` | Vietnamese SEO titles/descriptions |
| `messages/en/meta.json` | English SEO metadata |
| `messages/ko/meta.json` | Korean SEO metadata |
| `messages/ja/meta.json` | Japanese SEO metadata |
| `src/lib/i18n-seo-helpers.ts` | Shared helpers: `getCanonicalUrl()`, `getAlternateLanguages()`, `OG_LOCALES` |

### Files to MODIFY
| File | Change |
|------|--------|
| `src/app/[locale]/layout.tsx` | `generateMetadata` with locale-aware titles, hreflang alternates |
| `src/app/[locale]/[product]/page.tsx` | `generateMetadata` with translated product titles + hreflang |
| `src/app/[locale]/san-pham/page.tsx` | Add locale metadata |
| `src/app/[locale]/kien-thuc/page.tsx` | Add hreflang (content stays Vietnamese, but alternate links present) |
| `src/app/[locale]/tin-tuc/page.tsx` | Same — hreflang with alternate links |
| `src/app/sitemap.ts` | Generate entries for all 4 locales |
| `src/lib/structured-data.ts` | Accept `locale` param, set `inLanguage` dynamically |
| `src/i18n/request.ts` | Add `meta` namespace |

## Implementation Steps

### 1. Create `src/lib/i18n-seo-helpers.ts`
```typescript
import { routing, type Locale } from "@/i18n/routing";

const SITE_URL = "https://www.traicaybentre.com";

export const OG_LOCALES: Record<Locale, string> = {
  vi: "vi_VN",
  en: "en_US",
  ko: "ko_KR",
  ja: "ja_JP",
};

/** Canonical URL for a given locale + path */
export function getCanonicalUrl(locale: Locale, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/** alternates.languages object for Next.js metadata */
export function getAlternateLanguages(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    langs[locale] = `${SITE_URL}${prefix}${path}`;
  }
  langs["x-default"] = `${SITE_URL}${path}`;
  return langs;
}
```

### 2. Create `messages/*/meta.json`
```json
// messages/vi/meta.json
{
  "Meta": {
    "homeTitle": "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    "homeDescription": "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre...",
    "productsTitle": "Sản phẩm — Trái Cây Bến Tre",
    "productsDescription": "Đặc sản trái cây Bến Tre..."
  }
}
```
```json
// messages/en/meta.json
{
  "Meta": {
    "homeTitle": "Ben Tre Tropical Fruits — Premium Mango & Coconut from Vietnam",
    "homeDescription": "Tu Quy Mango from Thanh Phu, Ben Tre. Geographic Indication certified...",
    "productsTitle": "Products — Ben Tre Tropical Fruits",
    "productsDescription": "Premium tropical fruits from Ben Tre..."
  }
}
```

### 3. Update `generateMetadata` in layout.tsx
Use `getTranslations` for locale-specific titles + `getAlternateLanguages()` for hreflang.

### 4. Update product page metadata
Add hreflang alternates. Product SEO titles translated via `products.json` messages.

### 5. Update sitemap.ts
```typescript
// For each static route, generate entries for all locales
const allLocaleStatics = routing.locales.flatMap((locale) =>
  statics.map((s) => ({
    url: getCanonicalUrl(locale, s.path),
    lastModified: s.lastModified,
    changeFrequency: s.changeFrequency,
    priority: locale === "vi" ? s.priority : s.priority * 0.8,
    alternates: {
      languages: getAlternateLanguages(s.path),
    },
  }))
);
```

### 6. Update structured-data.ts
- `getHomepageJsonLd(locale)` — set `inLanguage` to locale
- `getArticleJsonLd` — accept locale, set `inLanguage`
- `websiteSchema` — set `inLanguage` array for multi-language

### 7. Verify hreflang chain completeness
Every page in every locale must link to all other locale variants. Missing links = Google ignores hreflang.

## Todo List
- [ ] Create `src/lib/i18n-seo-helpers.ts`
- [ ] Create `messages/*/meta.json` for all 4 locales
- [ ] Update layout.tsx `generateMetadata` with hreflang + locale titles
- [ ] Update [product]/page.tsx `generateMetadata` with hreflang
- [ ] Update san-pham, kien-thuc, tin-tuc, nguon-goc page metadata
- [ ] Update sitemap.ts to emit all locale URLs with alternates
- [ ] Update structured-data.ts to accept locale param
- [ ] Update `src/i18n/request.ts` to load meta namespace
- [ ] Verify every page returns 200 for all hreflang URLs (no redirects)
- [ ] Run `bun run build` — verify sitemap output

## Success Criteria
- Every page has 5 hreflang tags (vi, en, ko, ja, x-default)
- All hreflang URLs return HTTP 200 (not 301/302)
- Sitemap contains entries for all locales with `alternates.languages`
- OG locale set correctly per language
- Canonical URL matches current locale version
- JSON-LD `inLanguage` reflects current locale
- Google Search Console hreflang validator shows no errors (post-deploy check)

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| hreflang on redirecting URL = Google ignores it | `as-needed` means vi has no redirect; en/ko/ja are direct URLs |
| Sitemap size explosion (4x entries) | Still under 50K URLs — well within limits |
| Missing hreflang on article pages | Articles stay vi-only but still need x-default + vi hreflang self-reference |
| Stale meta translations | Type-checked message keys; CI build catches missing keys |
