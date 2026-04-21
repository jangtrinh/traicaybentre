---
title: "Fix hreflang duplicate content — vi-only indexing"
description: "Remove non-vi URLs from sitemap + add noindex to en/ko/ja pages to stop Google ranking wrong-locale URLs"
status: pending
priority: P1
effort: 1h
branch: claude/dreamy-thompson-f9478b
tags: [seo, i18n, hreflang, duplicate-content]
created: 2026-04-21
---

## Overview

**Chosen: Option 4 (Combo 1+2).** Remove non-vi URLs from sitemap (prevent future index) + add `robots: noindex` to non-vi pages (de-index existing). Keep routes accessible (no 404/redirect) — preserves user choice, no external-link breakage. Canonical already points vi. Fastest safe path to clean SERP.

## Files to modify

1. **`src/app/sitemap.ts`** (line 24-34)
   - `localizedUrl(path)` → emit only vi URL, drop `alternates.languages` block
   - Keep function signature (called 40+ times); return `{ url: ${BASE}${path} }` only

2. **`src/app/[locale]/layout.tsx`** (line 68-77)
   - `generateMetadata`: conditional `robots` based on locale
   - vi → `{ index: true, follow: true, googleBot: {...} }` (unchanged)
   - non-vi → `{ index: false, follow: true }`
   - Keep `alternates.languages` map (valid hreflang signal for vi canonical)
   - Change `alternates.canonical` → always `https://www.traicaybentre.com` (vi root), not locale-specific

3. **`src/app/[locale]/[product]/[type]/[slug]/page.tsx`** (line 86-108)
   - `generateMetadata`: add `robots: { index: locale === "vi", follow: true }` when locale !== vi
   - `alternates.canonical` already vi — unchanged

## Implementation steps

1. Edit `src/app/sitemap.ts`:
   ```ts
   function localizedUrl(path: string) {
     return { url: `${BASE}${path}` };
   }
   ```
   Remove `LOCALES` constant (line 22) — no longer used.

2. Edit `src/app/[locale]/layout.tsx` `generateMetadata`:
   - Add: `const isVi = locale === "vi";`
   - Change `robots`: `{ index: isVi, follow: true, googleBot: isVi ? {...existing} : undefined }`
   - Simplify `alternates`: `{ canonical: "https://www.traicaybentre.com", languages: { "x-default": "https://www.traicaybentre.com" } }` — drop per-locale language map (no translated content = lie to Google)

3. Edit `src/app/[locale]/[product]/[type]/[slug]/page.tsx` `generateMetadata`:
   - Extract `locale` from params (already destructured via `await params`)
   - Add to returned metadata object:
     ```ts
     robots: locale === "vi"
       ? undefined
       : { index: false, follow: true }
     ```

4. Audit other pages with `generateMetadata` in `[locale]/**/page.tsx`:
   ```bash
   grep -rn "generateMetadata" src/app/\[locale\]/
   ```
   Apply same `robots` pattern to each. Candidates likely: product pages, hub pages (`kien-thuc`, `tin-tuc`).

5. Run lint + typecheck + build (see Verification).

6. Commit: `fix(seo): de-index non-vi locales to stop hreflang duplicate content`

## Verification steps

```bash
bun run lint                  # expect: clean
npx tsc --noEmit              # expect: no errors
bun run build                 # expect: build success
```

**Runtime checks after `bun dev`:**
- `curl -s localhost:3000/sitemap.xml | grep -c "xhtml:link"` → expect `0` (no alternates)
- `curl -s localhost:3000/sitemap.xml | grep -c "/ja/\|/en/\|/ko/"` → expect `0`
- `curl -sI localhost:3000/en/xoai-tu-quy | grep -i x-robots\|robots` → page HTML contains `<meta name="robots" content="noindex">`
- `curl -s localhost:3000/xoai-tu-quy | grep -o '<meta name="robots"[^>]*>'` → expect `index` (vi = indexable)

**Post-deploy (Google Search Console):**
- Submit fresh sitemap
- URL Inspection tool on `/ja/xoai-tu-quy/...` → confirm "Noindex detected"
- Monitor Coverage report: non-vi pages move to "Excluded by 'noindex' tag"

## Rollback plan

Revert single commit: `git revert <sha>`. Changes isolated to 3 files + no DB/schema impact. Redeploy immediate. Google re-discovers non-vi URLs within crawl cycle (~1-3 days). No data loss, no broken links (routes always stayed live).

## Risks + mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Vi pages accidentally get noindex | Low | Critical | Default locale `vi` → `isVi = true` branch always; add unit test asserting `vi` path returns `index: true` |
| Build breaks from sitemap signature change | Low | High | `localizedUrl` return type stays compatible (subset of MetadataRoute.Sitemap entry) |
| Google slow to de-index → SERP shows noindex URLs meanwhile | Medium | Medium | Expected 1-4 weeks. Manual GSC URL Removal requests accelerate (see manual follow-ups) |
| Missing a page with `generateMetadata` | Medium | Medium | Step 4 grep audit; spot-check `/en/san-pham`, `/en/kien-thuc`, `/ja/dua-xiem-ben-tre` after deploy |
| Internal links still point `/en/...` somewhere | Low | Low | noindex still serves page; no 404. Follow-up: grep `href="/en` in `src/` |

## Manual follow-ups (Jang)

1. **Google Search Console → Removals → Temporarily remove URL** for known bad-ranking URLs:
   - `/ja/xoai-tu-quy/kien-thuc/xoai-tu-quy-vs-xoai-tuong`
   - `/ja/kien-thuc/cach-bao-quan-xoai-tu-quy` (verify actual path)
   - `/en/xoai-tu-quy/kien-thuc/xoai-tu-quy-cdđl-ben-tre` (verify)
   - Removes from SERP in ~24h (6-month temp block); permanent cleanup via noindex crawl

2. **Resubmit sitemap** in GSC after deploy

3. **Expected timeline:** Google de-indexes noindex pages 1-4 weeks after next crawl. URL Removal accelerates SERP hiding to 24h.

## Architectural notes

- **Why keep `alternates.languages` with `x-default` only in root layout?** Signals to Google this is the canonical vi site serving all locales. No lie about translations.
- **Why not add explicit `alternates.canonical` in root metadata?** Already done — line 79. Keep vi root as truth.
- **Why not Option 3 (301 redirect)?** Breaks any external backlink to `/en/...`. Aggressive but irreversible if a blog/FB post linked en version. Option 4 = safer.
- **Why not delete locales from `routing.ts`?** Future translation work planned; removing locales = tech-debt regression. noindex is reversible.

## Unresolved questions

- Does any internal code (components, links) hard-code `/en/`, `/ja/`, `/ko/` paths that would now render noindex pages? Needs grep audit at step 4.
- Should `robots.txt` also disallow non-vi paths? (Stronger signal but blocks crawl → noindex never read → URLs stay indexed.) Recommendation: **no** — let Google crawl + see noindex for clean de-index, then revisit.
- Is there a dedicated hreflang sitemap or is it all in `sitemap.ts`? Confirmed: single file, no `/sitemap-*.xml` variants.
