# Fix i18n locale trap (VI users redirected to EN)

**Domain**: Complex (wide scope, established pattern, clear criteria)
**Severity**: P0 — site-wide UX bug, users stuck in EN
**Branch**: `claude/elegant-fermat-c2d612` (worktree)
**Created**: 2026-05-09 23:37 (Asia/Saigon)

## Problem

User reports: ngôn ngữ set Vietnamese, click bất kỳ link nào → URL chuyển sang `/en/...`.

## Root cause (confirmed via 3 parallel audits)

1. **Primary — `src/proxy.ts` GEO redirect**: First-time visitor với `x-vercel-ip-country` thuộc `COUNTRY_TO_LOCALE` → middleware inject `Accept-Language: en` → next-intl trả về **307 redirect** (không phải rewrite) → `/en/<path>` → response set `NEXT_LOCALE=en` cookie → **trapped vĩnh viễn**. Sau đó EN pages render `/en/*` links → Next.js prefetch → re-stamp cookie → cookie không tự reset.
2. **Secondary — 11 files dùng `next/link`**: Khi cookie corrupted = en, mọi unprefixed `href="/foo"` từ `next/link` bị middleware 307 → `/en/foo`. Sites dùng `@/i18n/navigation Link` thì OK vì auto prefix theo current locale.
3. **Tertiary — LanguageSwitcher race**: `router.replace()` async cookie write — switch locale lần 2 có thể đọc cookie cũ.

## Fix strategy

**Pragmatic — site VI-first, foreign minority dùng LanguageSwitcher**:

| # | Action | File(s) | Risk |
|---|---|---|---|
| 1 | **Bỏ GEO auto-redirect** trong `proxy.ts` — chỉ giữ bot exemption | `src/proxy.ts` | Low — feature đang gây hại |
| 2 | **Migrate 11 files `next/link` → `@/i18n/navigation Link`** | 11 files (xem phase-02) | Low — drop-in replacement |
| 3 | **Harden LanguageSwitcher** — clear cookie-mismatch protection | `src/components/language-switcher.tsx` | Low |
| 4 | **Cookie reset cho user trapped** — middleware detect & clear bad cookie nếu URL prefix mismatch + Accept-Language=vi | `src/proxy.ts` | Med — verify edge cases |
| 5 | **Verify build + smoke test** — lint, typecheck, dev server curl-test 5 scenarios | — | — |

## Phases

| Phase | File | Status |
|---|---|---|
| 01 | [phase-01-fix-middleware-geo-trap.md](phase-01-fix-middleware-geo-trap.md) | Pending |
| 02 | [phase-02-migrate-next-link-to-i18n.md](phase-02-migrate-next-link-to-i18n.md) | Pending |
| 03 | [phase-03-harden-language-switcher.md](phase-03-harden-language-switcher.md) | Pending |
| 04 | [phase-04-verify-and-smoke-test.md](phase-04-verify-and-smoke-test.md) | Pending |

## Success criteria

- [ ] User behind US/UK GEO + no cookie: lands on VI (no auto-redirect)
- [ ] Bot users: still get correct locale per URL prefix (PR #33 behavior preserved)
- [ ] User cookie=vi, click any internal link: stays VI (no `/en/*` redirect)
- [ ] User cookie=en, click VI link: respects URL (stays VI when no prefix), no infinite loop
- [ ] LanguageSwitcher: 2 consecutive switches → cookie always reflects last selection
- [ ] `bun run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] All curl scenarios from debugger report pass

## Dependencies

- next-intl v4.9.1 (already installed)
- No new packages needed

## Risk + rollback

- Removing GEO redirect: foreign visitors land VI by default. Acceptable — site primary VI audience, LanguageSwitcher visible in header.
- Rollback: revert PR via `git revert`.

## Behavior note (post-localeDetection=false)

With `localeDetection: false`, **URL prefix is the single source of truth** for locale resolution. Cookie is informational only — next-intl no longer reads it for redirect decisions. Practical consequence:

| Old behavior (localeDetection=true) | New behavior |
|---|---|
| User cookie=en → visit `/foo` → 307 → `/en/foo` | User cookie=en → visit `/foo` → 200 OK on VI |
| Browser Accept-Language=en → `/foo` → 307 → `/en/foo` | Same as above — 200 OK on VI |
| GEO=US no cookie → 307 → `/en/foo` | 200 OK on VI |

This is intentional: VI-first site, foreign visitors opt in via LanguageSwitcher. Cookie poisoning trap permanently fixed.

Auto-recovery: trapped EN users (cookie=en) see VI again the moment they type/click an unprefixed URL — no support intervention needed.

## Reports

- [researcher-260509-2337-i18n-link-audit.md](reports/researcher-260509-2337-i18n-link-audit.md) — 11 files using next/link
- [researcher-260509-2340-middleware-cookie-flow.md](reports/researcher-260509-2340-middleware-cookie-flow.md) — race condition
- [debugger-260509-2340-i18n-bug-repro.md](reports/debugger-260509-2340-i18n-bug-repro.md) — curl reproduction matrix
