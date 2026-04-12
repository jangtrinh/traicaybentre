# Phase 4: Language Switcher & UX

## Context Links
- Header: `src/components/header.tsx` (219 lines, "use client")
- Footer: `src/components/footer.tsx`
- Mobile menu: `src/components/mobile-menu-overlay.tsx`
- Navigation: `src/i18n/navigation.ts`

## Overview
- **Priority**: P2
- **Status**: Pending
- **Blocked by**: Phase 1, Phase 2
- **Effort**: 2h
- **Description**: Add language switcher dropdown to header (desktop + mobile). Show current locale flag/code. Persist choice via cookie. Ensure smooth UX for language switching.

## Key Insights
- next-intl handles locale cookie automatically via middleware
- Language switcher = same path, different locale prefix → use `usePathname()` from `@/i18n/navigation` + `useRouter().replace()`
- Or simpler: `<Link href={pathname} locale="en">` — next-intl's Link supports `locale` prop
- Design: minimal — globe icon + 2-letter code, dropdown on click. Matches existing pill header aesthetic.
- Mobile: add to mobile menu overlay at bottom

## Design Spec

### Desktop (header pill)
```
[Logo] [Nav links...] [🌐 VI ▾] [Liên hệ]
                        ↓ dropdown
                      ┌─────────┐
                      │ 🇻🇳 Tiếng Việt  ✓ │
                      │ 🇺🇸 English      │
                      │ 🇰🇷 한국어         │
                      │ 🇯🇵 日本語         │
                      └─────────┘
```

### Mobile (menu overlay)
Language pills at bottom of menu:
```
[VI] [EN] [KO] [JA]
```

## Related Code Files

### Files to CREATE
| File | Purpose |
|------|---------|
| `src/components/language-switcher.tsx` | Dropdown component — locale selection |

### Files to MODIFY
| File | Change |
|------|--------|
| `src/components/header.tsx` | Add LanguageSwitcher before "Liên hệ" button |
| `src/components/mobile-menu-overlay.tsx` | Add locale pills at bottom |

## Implementation Steps

### 1. Create `src/components/language-switcher.tsx`
```typescript
"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const LOCALE_LABELS: Record<Locale, { flag: string; name: string }> = {
  vi: { flag: "🇻🇳", name: "Tiếng Việt" },
  en: { flag: "🇺🇸", name: "English" },
  ko: { flag: "🇰🇷", name: "한국어" },
  ja: { flag: "🇯🇵", name: "日本語" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider text-text/70 hover:bg-text/5"
        aria-label="Change language"
      >
        <GlobeIcon />
        <span>{locale.toUpperCase()}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl bg-white py-1 shadow-lg ring-1 ring-black/5">
          {routing.locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-text/5 ${
                l === locale ? "font-bold text-text" : "text-text/70"
              }`}
            >
              <span>{LOCALE_LABELS[l].flag}</span>
              <span>{LOCALE_LABELS[l].name}</span>
              {l === locale && <span className="ml-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. Add to header.tsx
Insert `<LanguageSwitcher />` before the "Liên hệ" button in desktop nav.

### 3. Add locale pills to mobile menu
Add horizontal row of locale buttons at bottom of `MobileMenuOverlay`.

### 4. Ensure cookie persistence
next-intl middleware sets `NEXT_LOCALE` cookie automatically on locale switch. Verify returning visitors land on their chosen locale.

## Todo List
- [ ] Create `src/components/language-switcher.tsx`
- [ ] Add LanguageSwitcher to header.tsx desktop nav
- [ ] Add locale pills to mobile-menu-overlay.tsx
- [ ] Test dropdown open/close behavior
- [ ] Test locale switching navigates correctly
- [ ] Verify cookie persistence across page loads
- [ ] Visual QA: pill header (scrolled), expanded header, mobile menu

## Success Criteria
- Language switcher visible on all pages (desktop + mobile)
- Clicking a locale navigates to same page in new language
- Current locale highlighted in dropdown
- Cookie persists choice — revisiting site loads preferred locale
- No layout shift when switcher renders
- Accessible: keyboard navigable, aria-labels present

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| Flags render inconsistently across OS | Use emoji flags — acceptable for MVP; can switch to SVG flag icons later |
| Dropdown overlaps content in compact pill | Position `right-0` + `z-50` — same pattern as existing "More" dropdown |
| Cookie not set on first visit | Middleware handles this; default = vi with no cookie |
