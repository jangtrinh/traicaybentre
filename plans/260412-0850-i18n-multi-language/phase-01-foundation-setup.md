# Phase 1: Foundation Setup

## Context Links
- [next-intl App Router docs](https://next-intl.dev/docs/getting-started/app-router)
- [next-intl routing config](https://next-intl.dev/docs/routing/configuration)
- Current layout: `src/app/layout.tsx`
- Current config: `next.config.ts`

## Overview
- **Priority**: P1 — blocks all other phases
- **Status**: Pending
- **Effort**: 3h
- **Description**: Install next-intl, restructure app directory with `[locale]` segment, configure middleware for locale detection, set up translation loading pipeline.

## Key Insights
- `localePrefix: "as-needed"` = Vietnamese (default) has NO prefix, en/ko/ja get prefix. Zero impact on existing Vietnamese URLs.
- next-intl v4+ uses `proxy.ts` (renamed from `middleware.ts` in Next.js 16). Check actual Next.js 16 compatibility — may still be `middleware.ts`.
- Must expand `RESERVED_PATHS` in `src/content/products.ts` to include locale codes `["en", "ko", "ja"]` so `[product]` dynamic route doesn't catch them.
- `setRequestLocale(locale)` required in every layout/page for static rendering.

## Architecture

```
src/
├── i18n/
│   ├── routing.ts          # defineRouting() — locales, defaultLocale, localePrefix
│   ├── request.ts          # getRequestConfig — loads messages per locale
│   └── navigation.ts       # createNavigation() — locale-aware Link, redirect, etc.
├── middleware.ts            # createMiddleware(routing) — locale detection + hreflang headers
├── app/
│   └── [locale]/           # NEW — all page routes move inside here
│       ├── layout.tsx       # html lang={locale}, NextIntlClientProvider
│       ├── page.tsx         # homepage
│       ├── [product]/...
│       ├── san-pham/...
│       ├── kien-thuc/...
│       ├── tin-tuc/...
│       ├── nguon-goc/...
│       └── giao-hang/...
│   ├── api/...              # API routes stay OUTSIDE [locale]
│   ├── feed.xml/...         # stays outside
│   ├── sitemap.ts           # stays outside (handles all locales)
│   └── layout.tsx           # minimal root layout (no html/body — delegated to [locale])
messages/
├── vi/
│   ├── common.json          # shared UI: buttons, labels
│   ├── nav.json             # header/footer nav labels
│   └── home.json            # homepage sections
├── en/
│   ├── common.json
│   ├── nav.json
│   └── home.json
├── ko/  (same structure)
└── ja/  (same structure)
```

## Related Code Files

### Files to CREATE
| File | Purpose |
|------|---------|
| `src/i18n/routing.ts` | Locale list, default locale, prefix config |
| `src/i18n/request.ts` | Request config — load messages per locale |
| `src/i18n/navigation.ts` | Locale-aware Link, redirect, useRouter, usePathname |
| `src/middleware.ts` | Locale detection middleware |
| `messages/vi/common.json` | Vietnamese UI strings (extracted) |
| `messages/vi/nav.json` | Vietnamese nav strings |
| `messages/vi/home.json` | Vietnamese homepage strings |
| `messages/en/*.json` | English translations |
| `messages/ko/*.json` | Korean translations |
| `messages/ja/*.json` | Japanese translations |
| `src/app/[locale]/layout.tsx` | Locale-aware root layout |

### Files to MODIFY
| File | Change |
|------|--------|
| `next.config.ts` | Wrap with `createNextIntlPlugin()` |
| `src/app/layout.tsx` | Slim down to minimal root layout (no `<html>`, no `<body>` — those move to `[locale]/layout.tsx`) |
| `src/content/products.ts` | Add `"en", "ko", "ja"` to `RESERVED_PATHS` |

### Files to MOVE (into `[locale]/`)
| From | To |
|------|-----|
| `src/app/page.tsx` | `src/app/[locale]/page.tsx` |
| `src/app/[product]/` | `src/app/[locale]/[product]/` |
| `src/app/san-pham/` | `src/app/[locale]/san-pham/` |
| `src/app/kien-thuc/` | `src/app/[locale]/kien-thuc/` |
| `src/app/tin-tuc/` | `src/app/[locale]/tin-tuc/` |
| `src/app/nguon-goc/` | `src/app/[locale]/nguon-goc/` |
| `src/app/giao-hang/` | `src/app/[locale]/giao-hang/` |

### Files that stay OUTSIDE `[locale]/`
- `src/app/api/*` — API routes have no locale
- `src/app/feed.xml/route.ts` — RSS feed
- `src/app/sitemap.ts` — generates all-locale sitemap
- `src/app/globals.css` — imported by `[locale]/layout.tsx`

## Implementation Steps

### 1. Install next-intl
```bash
bun add next-intl
```

### 2. Create `src/i18n/routing.ts`
```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "ko", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi = no prefix, others = /en/, /ko/, /ja/
});

export type Locale = (typeof routing.locales)[number];
```

### 3. Create `src/i18n/request.ts`
```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load all namespace files for this locale
  const common = (await import(`../../messages/${locale}/common.json`)).default;
  const nav = (await import(`../../messages/${locale}/nav.json`)).default;
  const home = (await import(`../../messages/${locale}/home.json`)).default;

  return {
    locale,
    messages: { ...common, ...nav, ...home },
  };
});
```

### 4. Create `src/i18n/navigation.ts`
```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### 5. Create `src/middleware.ts`
```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all paths except api, _next, static files
  matcher: [
    "/((?!api|_next|images|fonts|favicon.ico|sitemap.xml|robots.txt|feed.xml|.*\\..*).*)",
  ],
};
```

### 6. Wrap `next.config.ts`
```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // ... existing config preserved ...
};

export default withNextIntl(nextConfig);
```

### 7. Restructure app directory
- Create `src/app/[locale]/` directory
- Move all page routes into `[locale]/`
- Keep `api/`, `feed.xml/`, `sitemap.ts` outside

### 8. Create `src/app/[locale]/layout.tsx`
Move current `layout.tsx` content here, adding:
- `locale` param from `[locale]` segment
- `setRequestLocale(locale)` for static rendering
- `<html lang={locale}>` dynamic
- `<NextIntlClientProvider>` wrapper

### 9. Slim down `src/app/layout.tsx` to root shell
```typescript
// Minimal root layout — [locale]/layout.tsx handles html/body
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

### 10. Add `generateStaticParams` to `[locale]/layout.tsx`
```typescript
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
```

### 11. Update RESERVED_PATHS
Add `"en", "ko", "ja"` to prevent `[product]` route from catching locale prefixes.

### 12. Create initial message files
Start with Vietnamese — extract existing hardcoded strings. Other locales get placeholder English initially, then real translations in Phase 2.

## Todo List
- [ ] Install next-intl
- [ ] Create `src/i18n/routing.ts`
- [ ] Create `src/i18n/request.ts`
- [ ] Create `src/i18n/navigation.ts`
- [ ] Create `src/middleware.ts`
- [ ] Wrap `next.config.ts` with createNextIntlPlugin
- [ ] Create `src/app/[locale]/layout.tsx` (from current layout)
- [ ] Slim `src/app/layout.tsx` to passthrough
- [ ] Move page routes into `[locale]/`
- [ ] Add locale codes to RESERVED_PATHS
- [ ] Create Vietnamese message files (extract from components)
- [ ] Create placeholder en/ko/ja message files
- [ ] Add `generateStaticParams` for locales
- [ ] Add `setRequestLocale()` to all pages/layouts
- [ ] Run `bun run build` — zero errors

## Success Criteria
- `bun run build` passes
- `/` serves Vietnamese with `<html lang="vi">`
- `/en` serves English with `<html lang="en">`
- All existing Vietnamese URLs unchanged
- API routes unaffected
- Middleware runs on edge, detects locale correctly

## Risk Assessment
| Risk | Mitigation |
|------|------------|
| `[locale]` conflicts with `[product]` | Middleware matcher + RESERVED_PATHS prevent overlap; middleware resolves locale before routing |
| Moving files breaks imports | All imports use `@/` aliases — paths inside `[locale]/` don't change component imports |
| Static generation breaks | `generateStaticParams` + `setRequestLocale()` in every layout/page |
| Next.js 16 middleware naming | Verify if `middleware.ts` or `proxy.ts` — check build output |

## Security Considerations
- Middleware validates locale against whitelist — no arbitrary locale injection
- Message files are static JSON, no user input interpolated unsafely
- Cookie (`NEXT_LOCALE`) is session-only, httpOnly not needed (preference, not auth)
