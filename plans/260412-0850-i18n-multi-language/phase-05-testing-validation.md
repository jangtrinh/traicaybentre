# Phase 5: Testing & Validation

## Context Links
- Build command: `bun run build`
- Typecheck: `npx tsc --noEmit`
- Lint: `bun run lint`

## Overview
- **Priority**: P1
- **Status**: Pending
- **Blocked by**: Phase 1, 2, 3, 4
- **Effort**: 1h
- **Description**: End-to-end validation that i18n works correctly. Build test, hreflang audit, visual QA across locales, SEO verification.

## Test Matrix

### Build & Type Safety
| Test | Command | Pass Criteria |
|------|---------|---------------|
| TypeScript compile | `npx tsc --noEmit` | 0 errors |
| Next.js build | `bun run build` | 0 errors, all pages generated |
| Lint | `bun run lint` | 0 errors |
| Static params | Build output | All 4 locales x all pages generated |

### Functional Tests (Manual)
| Test | Steps | Expected |
|------|-------|----------|
| Vietnamese homepage | Visit `/` | Vietnamese content, `<html lang="vi">` |
| English homepage | Visit `/en` | English content, `<html lang="en">` |
| Korean homepage | Visit `/ko` | Korean content, `<html lang="ko">` |
| Japanese homepage | Visit `/ja` | Japanese content, `<html lang="ja">` |
| Product page vi | Visit `/xoai-tu-quy` | Vietnamese, no locale prefix |
| Product page en | Visit `/en/xoai-tu-quy` | English UI, Vietnamese product name |
| Language switch | Click EN in switcher on `/san-pham` | Navigate to `/en/san-pham` |
| Cookie persistence | Switch to EN, close tab, reopen site | Redirects to `/en` |
| Direct URL access | Type `/ko/nguon-goc` | Korean page renders |
| 404 handling | Visit `/en/nonexistent` | 404 page in English |
| API routes | POST `/api/order` | Unaffected by i18n |
| Feed | GET `/feed.xml` | Unaffected by i18n |

### SEO Validation
| Test | Method | Expected |
|------|--------|----------|
| hreflang tags | View source on each page | 5 `<link rel="alternate">` tags per page |
| hreflang URLs return 200 | curl each alternate URL | All return HTTP 200 (not 301/302) |
| Canonical URL | View source | Matches current locale URL |
| OG locale | View source | `og:locale` matches page language |
| Sitemap locales | GET `/sitemap.xml` | Contains all locale variants |
| Sitemap alternates | Parse sitemap | Each entry has `xhtml:link` alternates |
| Structured data lang | Parse JSON-LD | `inLanguage` matches page locale |
| Vietnamese URLs unchanged | Compare sitemap before/after | All Vietnamese URLs identical |

### Performance Validation
| Test | Method | Expected |
|------|--------|----------|
| Bundle size delta | Compare build output before/after | < 5KB increase (next-intl is ~2KB) |
| Lighthouse vi | Run Lighthouse on `/` | SEO score unchanged (should be 100) |
| Lighthouse en | Run Lighthouse on `/en` | SEO score >= 95 |
| TTFB | Compare before/after | No measurable increase |

## Implementation Steps

### 1. Build verification
```bash
npx tsc --noEmit && bun run build
```
Check build output for:
- All locale pages generated
- No missing translation warnings
- No middleware errors

### 2. Local dev smoke test
```bash
bun dev
```
Visit each locale homepage, product page, knowledge page. Verify content renders.

### 3. hreflang audit script
```bash
# Quick verification — curl each alternate URL
for locale in "" "/en" "/ko" "/ja"; do
  curl -sI "http://localhost:3000${locale}" | grep "HTTP/"
done
```

### 4. Visual QA checklist
- [ ] Header renders correctly in all locales
- [ ] Footer renders correctly in all locales
- [ ] Homepage sections render correctly
- [ ] Product pages render correctly
- [ ] Language switcher works on desktop
- [ ] Language switcher works on mobile
- [ ] No layout breaks from longer/shorter translated text
- [ ] RTL not needed (none of vi/en/ko/ja are RTL)

### 5. Sitemap validation
```bash
curl http://localhost:3000/sitemap.xml | grep "hreflang"
```

### 6. Pre-deploy checklist
- [ ] All Vietnamese URLs unchanged
- [ ] No new 301/302 redirects for Vietnamese pages
- [ ] robots.txt allows crawling of locale paths
- [ ] Middleware matcher doesn't block static assets
- [ ] Vercel deployment config unchanged (no special i18n config needed — handled by middleware)

## Todo List
- [ ] Run typecheck
- [ ] Run build
- [ ] Run lint
- [ ] Manual smoke test all 4 locales
- [ ] Verify hreflang tags in HTML source
- [ ] Verify sitemap has locale entries
- [ ] Verify structured data inLanguage
- [ ] Visual QA desktop
- [ ] Visual QA mobile
- [ ] Verify Vietnamese SEO unchanged (URLs, canonical, OG)
- [ ] Performance check (bundle size, Lighthouse)

## Success Criteria
- Zero build errors
- All functional tests pass
- All SEO validation checks pass
- Vietnamese Lighthouse SEO score unchanged
- Bundle size increase < 5KB

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| Build fails on missing translation keys | Fix keys before merging; next-intl shows helpful error messages |
| Vercel middleware behavior differs from local | Test on Vercel preview deployment before merging to main |
| Cached pages serve wrong locale | Vercel handles per-URL caching; middleware sets Vary header |
