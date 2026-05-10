# Phase 03 — Harden LanguageSwitcher

**Priority**: P1 (defense-in-depth)
**Status**: Pending
**Owner**: fullstack-developer

## Context

Current `LanguageSwitcher` uses `router.replace(pathname, { locale: next })`. next-intl handles cookie write internally but research flagged race condition risk on rapid consecutive switches. With Phase 01 + 02 fixes, this is less critical but worth fixing.

## Decision

Keep `router.replace()` (no API change) but add explicit cookie write before navigation as defense-in-depth.

## File

- `src/components/language-switcher.tsx`

## Change

```tsx
const switchLocale = (next: string) => {
  // Explicit cookie write — defense against next-intl async race.
  // path=/ ensures cookie applies to all routes; max-age=1y for persistence.
  document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
  router.replace(pathname, { locale: next });
  setOpen(false);
};
```

## Why

- `document.cookie` write is **synchronous** — guaranteed to be set before `router.replace()` triggers navigation
- Cookie attributes match next-intl defaults (path=/, samesite=lax) but explicit max-age (1 year) prevents session-cookie loss on browser restart
- Browser commits cookie before initiating fetch → middleware sees correct cookie

## Implementation steps

1. Read `src/components/language-switcher.tsx`
2. Modify `switchLocale` function (single line addition)
3. Test: switch locale 3x rapidly in browser — verify cookie always reflects last choice

## Todo

- [ ] Edit `src/components/language-switcher.tsx`
- [ ] Manual test: rapid consecutive switches

## Success criteria

- `document.cookie` set synchronously before navigation
- Switching locale 3x in <500ms always lands on last-chosen locale
- typecheck clean

## Risk

- **Very low**: 1-line addition, no API change

## Next

→ Phase 04 (verify)
