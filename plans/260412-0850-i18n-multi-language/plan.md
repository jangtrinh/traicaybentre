---
title: "i18n Multi-Language Support (vi/en/ko/ja)"
description: "Add 4-language internationalization to TraiCayBenTre using next-intl with SEO-safe locale routing"
status: pending
priority: P1
effort: 12h
branch: feat/i18n-multi-language
tags: [i18n, seo, next-intl, internationalization]
created: 2026-04-12
---

# i18n Multi-Language Support

## Architecture Decision Record

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Library | `next-intl` v4+ | ~2KB bundle, native App Router support, built-in hreflang, TS-first |
| URL strategy | `localePrefix: "as-needed"` | VI stays at `/` (preserves SEO), others at `/en/`, `/ko/`, `/ja/` |
| Translation files | Per-namespace JSON in `/messages/{locale}/` | Tree-shakeable, per-page loading, no bundle bloat |
| Content scope | Phase 1: UI strings only. Phase 2: product/SEO content. Phase 3: articles (later) | KISS — articles are 90% Vietnamese audience |
| Slug strategy | Keep Vietnamese slugs for all locales | `/en/xoai-tu-quy` not `/en/tu-quy-mango` — simpler, no redirect maze |

## Data Flow

```
Request → middleware.ts (locale detection: URL prefix > cookie > Accept-Language > vi)
  → /src/app/[locale]/layout.tsx (NextIntlClientProvider + lang attr)
    → Server Components: getTranslations('Namespace')
    → Client Components: useTranslations('Namespace')
    → messages/{locale}/common.json, nav.json, products.json, etc.
```

## Phases Overview

| # | Phase | Status | Effort | Files |
|---|-------|--------|--------|-------|
| 1 | [Foundation setup](./phase-01-foundation-setup.md) | Pending | 3h | next.config, middleware, routing, i18n/request, layout |
| 2 | [Translation extraction](./phase-02-translation-extraction.md) | Pending | 3h | messages/*.json, components (strings → t()) |
| 3 | [SEO & metadata i18n](./phase-03-seo-metadata-i18n.md) | Pending | 3h | generateMetadata, sitemap, structured-data, hreflang |
| 4 | [Language switcher & UX](./phase-04-language-switcher-ux.md) | Pending | 2h | header, footer, language-switcher component |
| 5 | [Testing & validation](./phase-05-testing-validation.md) | Pending | 1h | build test, hreflang audit, visual QA |

## Dependency Graph

```
Phase 1 (foundation) ← blocks everything
Phase 2 (translations) ← blocked by 1
Phase 3 (SEO) ← blocked by 1, can parallel with 2
Phase 4 (switcher) ← blocked by 1 and 2
Phase 5 (testing) ← blocked by all
```

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Vietnamese SEO ranking drop | Medium | High | `as-needed` prefix keeps `/` unchanged; 301 redirects for any moved URLs; verify canonical tags |
| Bundle size increase | Low | Medium | next-intl tree-shakes per-page; split messages by namespace |
| Middleware cold start on Vercel | Low | Low | Middleware is edge runtime, minimal overhead |
| Stale translations | Medium | Low | Type-safe message keys via `next-intl` TS integration; CI build catches missing keys |
| Dynamic route conflicts (`[locale]` vs `[product]`) | High | High | Explicit locale list in middleware matcher; RESERVED_PATHS expanded |

## Rollback Plan

- Phase 1: Revert `next.config.ts` wrapper + delete `[locale]` folder + remove middleware → site returns to current state
- All translations are additive JSON files — deleting `/messages/` has zero impact on Vietnamese
- `localePrefix: "as-needed"` means all existing Vietnamese URLs remain unchanged throughout

## Success Criteria

- [ ] `bun run build` succeeds with zero errors
- [ ] Vietnamese pages serve at identical URLs (no prefix) with unchanged content
- [ ] `/en/`, `/ko/`, `/ja/` serve translated UI strings
- [ ] `<html lang="...">` reflects correct locale per page
- [ ] hreflang tags present on all pages (4 alternates + x-default)
- [ ] Sitemap includes locale-prefixed URLs
- [ ] Language switcher visible in header, persists choice via cookie
- [ ] Lighthouse SEO score unchanged for Vietnamese pages
