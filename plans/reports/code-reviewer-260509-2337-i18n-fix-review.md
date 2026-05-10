# Code review — i18n locale-trap fix

**Plan**: `plans/260509-2337-fix-i18n-locale-trap/`
**Branch**: `claude/elegant-fermat-c2d612` (worktree)
**Diff base**: `main` (commit `fa7e3d4`, PR #33 — bot exemption)
**Files**: 14 production (1 proxy, 1 routing, 1 switcher, 11 link migrations)

## Scope verified

- `git diff` confirms exactly 14 production files modified, no stray edits
- Zero remaining `next/link` imports in `src/` (verified by grep)
- Zero leftover `x-vercel-ip-country` / `Accept-Language` / `COUNTRY_TO_LOCALE` references in source
- No `<Link href="http..." />` external usages (migrated files only had internal hrefs)
- No `locale={false}` opt-outs anywhere — full migration is safe
- No `prefetch` / `scroll` / `replace` / `shallow` Link prop overrides — no API mismatch concerns
- No imperative `window.location` navigation that would bypass cookie/middleware

## Adversarial findings

### CRITICAL
*(none — all blocking concerns ruled out)*

### HIGH

**H1. Phase-3 rationale is now invalid; `persistLocaleCookie` is decorative under `localeDetection: false`**

`src/components/language-switcher.tsx:18-21,42`

The added module-level `persistLocaleCookie()` was justified as "defense against next-intl async race where rapid consecutive switches could read stale cookie." But Phase 1 set `localeDetection: false` in `routing.ts`, which per next-intl docs disables cookie-based detection AND Accept-Language detection (https://next-intl.dev/docs/routing/configuration#locale-detection). Locale is determined exclusively by URL prefix.

Consequence: the synchronous cookie write does **nothing for the middleware decision path**. The original race (cookie not awaited before next request) cannot occur because the middleware never reads the cookie. The cookie is now purely a soft signal for any future feature — no current code reads it.

This is not a bug — code is harmless and forward-compatible — but the comment misleads future maintainers. Update the comment:

```ts
/* Persist user's last locale choice for analytics / future features. The
   middleware decides locale strictly from URL prefix (localeDetection: false),
   so this cookie no longer affects routing — it is informational only. */
```

Severity: HIGH because the misleading "defense against race" comment will trick a future maintainer into thinking removing it is risky.

**H2. Plan vs tester report contradict on scenario C — confirm the actual contract**

- `plan.md` success criterion: "User cookie=en, click VI link: respects URL (stays VI when no prefix), no infinite loop"
- `phase-04` smoke matrix scenario C expected: **307 → `/en/xoai-tu-quy`** ("user explicitly chose EN")
- `tester-260509-2337` smoke matrix scenario C actual: **200 OK on `/xoai-tu-quy`** ("URL wins under localeDetection=false")

The tester's actual result is **correct** for `localeDetection: false`. The phase-04 expectation was written before locking down `localeDetection: false`. This is a documentation drift, not a code bug. But it means: **a user who explicitly picked EN via switcher and later types `/xoai-tu-quy` (no prefix) in the URL bar will silently see VI** despite cookie=en. Plan said this is acceptable for VI-first market; tester confirmed. Just flag the divergence so future code changes don't re-introduce auto-switching.

Update `phase-04-verify-and-smoke-test.md` row C to match actual: 200 OK, not 307.

### MEDIUM

**M1. PR #33 SEO bot-exemption rationale survives — but logic removed**

PR #33 (`fa7e3d4`, merged 23:24 on this same date) added bot UA exemption specifically because Googlebot from US edges was being 307-redirected to `/en/*` (noindex), starving VI canonical pages. That fix is now obsolete: removing the GEO redirect entirely makes the bot exemption unnecessary, and the comment in `proxy.ts` notes this. Verified that `robots.txt` still disallows `/en/`, `/ko/`, `/ja/` and product/article metadata still emits `robots: { index: false }` for non-VI locales — so SEO contract is preserved.

No action needed, but SEO team should monitor GSC for the next 7 days to confirm Googlebot crawl coverage on canonical VI URLs holds steady.

**M2. Vercel Edge cache key narrows — uniformly cacheable**

Old middleware varied response by `x-vercel-ip-country` header. New middleware does not read it. Vercel will no longer fragment the edge cache by country. **Net positive** — better cache hit rate, simpler purging. But if any existing cache entries were keyed by country and you deploy this change, the first request from each country will rebuild the entry. Trivial cold-start cost.

**M3. No GDPR/cookie-consent banner**

`document.cookie = "NEXT_LOCALE=...; max-age=31536000"` writes a 1-year cookie without consent flow. For a Vietnamese-market site this is normally OK (Vietnam has no equivalent strict consent law). If site is ever expanded to actively serve EU users, locale cookie would need to be added to a consent banner. Pre-existing condition (next-intl wrote a session cookie before this change too) — flagging as known.

**M4. Hreflang alternates are minimal (`x-default` only)**

`src/app/[locale]/layout.tsx:81-86` and product/article pages emit `languages: { "x-default": url }` — no separate `vi`, `en`, `ko`, `ja` entries. Search engines see only one alternate. Pre-existing — not introduced by this PR. With `localeDetection: false` and non-VI noindex, this is acceptable, but a future SEO improvement could enrich hreflang.

**M5. `LanguageSwitcher` no longer uses `useEffect` cookie sync — correct**

The module-level `persistLocaleCookie` runs synchronously in event handler. SSR-safe via `typeof document === "undefined"` guard. Sufficient under Next 16 + React 19 streaming because event handlers only fire client-side. No concern.

### LOW / informational

- `proxy.ts` matcher unchanged — same exclusions for `api`, `_next`, `images`, `fonts`, `favicon.ico`, `sitemap.xml`, `robots.txt`, `feed.xml`, and dotted assets
- Filename `proxy.ts` (not `middleware.ts`) is the Next 16 convention — confirmed correct
- `samesite=lax` on cookie is correct for same-origin nav (only domain is `traicaybentre.com`)
- Sitemap (`src/app/sitemap.ts`) emits VI URLs only — unaffected by middleware change
- Robots.txt (`public/robots.txt`) still disallows `/en/`, `/ko/`, `/ja/` — SEO unchanged
- All MDX `/en/` matches in `src/content/articles/` are external `ipvietnam.gov.vn/en/...` URLs, not internal links — safe
- Header (`src/components/header.tsx`), footer (`src/components/footer.tsx`), mobile menu (`src/components/mobile-menu-overlay.tsx`) already use `@/i18n/navigation` Link — no migration needed
- Plan `plan.md` row 4 mentions "Cookie reset cho user trapped" but no implementation phase exists. Acceptable: existing trapped users escape by either clicking VI in switcher OR by the EN page now respecting URL prefix only (no longer cookie). Cookie eventually overwritten on next switcher use.

## Edge cases scouted (not bugs, just confirmation)

| Scenario | Behavior | OK? |
|---|---|---|
| EN user bookmarks `/en/xoai-tu-quy`, returns later | URL wins → renders EN | yes |
| EN user types `/xoai-tu-quy` in URL bar | URL wins → renders VI (cookie ignored) | yes (project trade-off) |
| Trapped user (cookie=en, lands on `/`) | URL wins → renders VI, cookie now stale | yes (auto-recovery) |
| Foreign visitor (Accept-Language=ko, no cookie) | Renders VI homepage | yes (project policy) |
| Bot crawl on `/en/xoai-tu-quy` | URL wins → renders EN with noindex | yes (correct) |
| Bot crawl on `/xoai-tu-quy` | URL wins → renders VI, indexable | yes (correct) |
| LanguageSwitcher 3x rapid switches | URL changes synchronously each time | yes (cookie no longer load-bearing) |
| User on `/en/foo` clicks Link `href="/"` | i18n Link auto-prefixes → `/en/` | yes |

## Verification gates (already green per tester report)

- `npx tsc --noEmit` — clean
- `bun run lint` — clean (818 pre-existing errors unchanged)
- `bun run build` — exit 0, 2.2s
- 8/8 curl smoke scenarios pass

## Recommended actions (non-blocking)

1. (HIGH) Update comment on `persistLocaleCookie` in `src/components/language-switcher.tsx:15-17` to reflect that cookie is informational, not race-defense, under `localeDetection: false`
2. (HIGH) Update `phase-04-verify-and-smoke-test.md` scenario C expected to match actual (200 OK on `/xoai-tu-quy`, not 307)
3. (MEDIUM) Monitor GSC for 7 days post-deploy to confirm bot crawl on canonical VI URLs holds steady
4. (LOW) Consider whether to delete `persistLocaleCookie` entirely — it is dead code given current design. Keeping it is harmless and forward-compatible (future `localeDetection: true` re-enable, analytics)

## Approval

Code is correct and safe. The misleading comment and plan-vs-actual drift are documentation issues, not blocking bugs. All 8 smoke scenarios green, both KEY-FIX scenarios (E + F) pass.

## Status

**Status:** DONE_WITH_CONCERNS
**Summary:** All production code correct. Two HIGH issues are documentation drift (misleading comment + plan/test mismatch on scenario C). Approve merge once documentation fixes applied.
**Approval:** APPROVED (HIGH-priority documentation fixes recommended, not blocking)

## Unresolved questions

1. Was the Phase-3 rationale ever re-evaluated after Phase-1 added `localeDetection: false`? The race-condition comment suggests no.
2. Plan summary mentions a never-implemented "cookie reset for trapped users" phase. Is that intentionally dropped because URL-prefix wins now provides auto-recovery? Worth a one-line note in `plan.md` to record the decision.
3. Should `LOCALE_TO_OG` mapping in `src/app/[locale]/layout.tsx:32` ever shed the non-VI entries given non-VI is noindex? Cosmetic — flagged for future cleanup.
