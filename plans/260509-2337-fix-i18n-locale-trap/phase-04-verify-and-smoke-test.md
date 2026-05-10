# Phase 04 — Verify + smoke test

**Priority**: P0 (gate before merge)
**Status**: Pending
**Owner**: tester (automated) + main agent (curl smoke)

## Verification matrix

### Build gates

- [ ] `bun run lint` passes (or only pre-existing warnings)
- [ ] `npx tsc --noEmit` passes
- [ ] `bun run build` succeeds — no compile errors, no broken Link/import errors

### Static checks

- [ ] `grep -rln 'from "next/link"' src/app src/components` returns 0 results (or only files with external-only Links)
- [ ] `grep -n "x-vercel-ip-country" src/proxy.ts` returns 0 results
- [ ] `grep -n "Accept-Language" src/proxy.ts` returns 0 results

### Curl smoke tests (against `bun dev` localhost:3000)

| # | Scenario | Cookie | Headers | Expected |
|---|---|---|---|---|
| A | VI link, no cookie | none | UA: browser | 200 OK on `/xoai-tu-quy`, no redirect |
| B | VI link, cookie=vi | NEXT_LOCALE=vi | UA: browser | 200 OK |
| C | VI link, cookie=en | NEXT_LOCALE=en | UA: browser | 307 → `/en/xoai-tu-quy` (correct — user explicitly chose EN) |
| D | EN link, cookie=vi | NEXT_LOCALE=vi | `/en/xoai-tu-quy` | 200 OK on `/en/xoai-tu-quy` (URL prefix wins) |
| E | No cookie + GEO US | none | x-vercel-ip-country=US | **200 OK on `/xoai-tu-quy`** (no auto-redirect) ← KEY FIX |
| F | No cookie + Accept-Language=en | none | Accept-Language: en | **200 OK on `/xoai-tu-quy`** (localeDetection=false) ← KEY FIX |
| G | Bot UA on `/xoai-tu-quy` | none | UA: Googlebot | 200 OK on `/xoai-tu-quy` |
| H | Bot UA on `/en/xoai-tu-quy` | none | UA: Googlebot | 200 OK on `/en/xoai-tu-quy` |

**KEY assertions**:
- E + F do **NOT** 307 redirect anymore (was the bug)
- C still redirects (user explicitly chose EN — this is correct)
- G + H respect URL prefix (bot crawl preserved)

### LanguageSwitcher manual test

- [ ] Open `localhost:3000` (VI)
- [ ] Click switcher → English → URL becomes `/en/`, cookie=en
- [ ] Click switcher → Tiếng Việt → URL becomes `/`, cookie=vi
- [ ] Refresh page → still VI
- [ ] Switch 3 times rapidly → final cookie reflects last click

### HTML render check

```bash
curl -sb "NEXT_LOCALE=vi" http://localhost:3000 | grep -oE 'href="/[a-z-]+' | sort -u | head
```
Expected: VI hrefs without `/en/` prefix.

```bash
curl -sb "NEXT_LOCALE=en" http://localhost:3000/en | grep -oE 'href="/en/[a-z-]+' | sort -u | head
```
Expected: EN hrefs all `/en/` prefixed.

## Implementation steps

1. Run `bun run lint`, `npx tsc --noEmit`, `bun run build` — fail-fast gate.
2. Static grep checks above.
3. Start `bun dev` (background).
4. Run curl matrix.
5. Stop dev server.
6. Generate report `reports/tester-260509-2337-i18n-fix-verification.md`.

## Todo

- [ ] Build gates pass
- [ ] Static checks pass
- [ ] Curl matrix all green (E and F especially)
- [ ] Report generated

## Success criteria

ALL of:
- Build passes
- 0 next/link imports for internal navigation
- 0 GEO logic in proxy.ts
- All 8 curl scenarios match expected
- Manual switcher test passes

## Next

→ Merge to main → deploy via Vercel auto-deploy
