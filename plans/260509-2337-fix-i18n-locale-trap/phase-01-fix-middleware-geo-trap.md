# Phase 01 — Fix middleware GEO trap

**Priority**: P0 (blocking)
**Status**: Pending
**Owner**: fullstack-developer (single agent — middleware critical path)

## Context

`src/proxy.ts` inject `Accept-Language` header để trigger GEO redirect. next-intl interpret là 307 redirect → bake cookie `NEXT_LOCALE=en` → user trapped.

Bot exemption (PR #33 commit `fa7e3d4`) đã đúng — phải giữ.

## Decision

**REMOVE GEO auto-redirect entirely**. Site VI-first; foreign visitors có LanguageSwitcher trong header. Đơn giản, không có cookie poisoning, không phụ thuộc Vercel GEO header.

## Files

- **Modify**: `src/proxy.ts`

## New `src/proxy.ts` (target shape)

```typescript
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Vanilla next-intl — URL prefix hoặc cookie quyết định locale.
  // Foreign visitors dùng LanguageSwitcher (header) để đổi locale.
  // Removed GEO Accept-Language injection — caused 307 → /en/* + cookie poisoning.
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|images|fonts|favicon.ico|sitemap.xml|robots.txt|feed.xml|.*\\..*).*)",
  ],
};
```

## Why this fix is safe

- Bot UA pattern was added in PR #33 to **prevent bots from being GEO-redirected**. Removing GEO entirely makes that exemption unnecessary — bots get same vanilla treatment as humans.
- next-intl handles cookie/Accept-Language detection natively + safely (`localeDetection: true` default). For unprefixed URL with cookie=vi → no redirect. For unprefixed URL with cookie=en → 307 → `/en/<path>` (this is correct behavior for a user who explicitly selected EN).
- Default locale (vi) needs no prefix — first-time visitors without cookie + non-EN/KO/JA Accept-Language land directly on VI.

## Edge case — first-time visitor with browser Accept-Language=en

Without GEO injection, browser's native `Accept-Language: en-US` could still trigger next-intl to 307 → `/en/<path>` for first visit. This is **next-intl default behavior** when `localeDetection: true`.

**Mitigation**: add `localeDetection: false` to routing config — locks default locale to VI for unprefixed URLs unless user explicitly chooses via switcher. This is the simplest, most predictable behavior.

→ Phase 01 also updates `src/i18n/routing.ts`:

```typescript
export const routing = defineRouting({
  locales: ["vi", "en", "ko", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed",
  localeDetection: false,  // ← NEW: never auto-detect from Accept-Language
});
```

## Implementation steps

1. Read current `src/proxy.ts` and `src/i18n/routing.ts`.
2. Replace `src/proxy.ts` content per "target shape" above.
3. Add `localeDetection: false` to `src/i18n/routing.ts`.
4. Run `npx tsc --noEmit` — verify no type errors.
5. Run `bun run lint` — verify no lint errors.

## Todo

- [ ] Edit `src/proxy.ts` — strip GEO logic
- [ ] Edit `src/i18n/routing.ts` — add `localeDetection: false`
- [ ] Verify typecheck + lint pass

## Success criteria

- `proxy.ts` < 20 lines (down from ~50)
- No `Accept-Language` injection
- No `x-vercel-ip-country` reads
- routing.ts has `localeDetection: false`
- typecheck + lint clean

## Risk

- **Low**: simplifies middleware significantly
- **Mitigation**: smoke-tested in Phase 04 with curl scenarios

## Next

→ Phase 02 (migrate next/link)
