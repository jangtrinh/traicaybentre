# Phase 1: Font Setup + Base Layout

## Overview
- **Priority**: P0 — blocks all templates
- **Effort**: 2h

## Implementation Steps

### 1. Download fonts to `public/fonts/og/`
- Plus Jakarta Sans 700 (Bold) TTF — from Google Fonts (~80KB)
- Noto Sans JP 700 OTF — from Google Fonts (~4MB, single weight)
- Noto Sans KR 700 OTF — from Google Fonts (~4MB, single weight)

### 2. Create `src/lib/og/og-fonts.ts`
```ts
import { readFileSync } from "fs";
import { join } from "path";

const FONTS_DIR = join(process.cwd(), "public", "fonts", "og");

const fontCache = new Map<string, Buffer>();

function loadFont(filename: string): Buffer {
  if (!fontCache.has(filename)) {
    fontCache.set(filename, readFileSync(join(FONTS_DIR, filename)));
  }
  return fontCache.get(filename)!;
}

export function getOgFonts(locale: string) {
  const isJa = locale === "ja";
  const isKo = locale === "ko";

  const fonts = [
    { name: "Heading", data: loadFont("plus-jakarta-sans-700.ttf"), weight: 700 as const, style: "normal" as const },
  ];

  // CJK font for body text that includes native characters
  if (isJa) {
    fonts.push({ name: "Body", data: loadFont("noto-sans-jp-700.otf"), weight: 700, style: "normal" });
  } else if (isKo) {
    fonts.push({ name: "Body", data: loadFont("noto-sans-kr-700.otf"), weight: 700, style: "normal" });
  }

  return fonts;
}
```

### 3. Create `src/lib/og/og-utils.ts`
```ts
// Brand colors from design tokens
export const OG = {
  width: 1200,
  height: 630,
  pad: 60,
  colors: {
    brand: "#FDDE24",
    brandCream: "#FFFEE7",
    text: "#1F2937",
    textSecondary: "#6B7280",
    mango: "#F97316",
    mangoDark: "#EA580C",
    white: "#FFFFFF",
  },
  gradient: "linear-gradient(135deg, #FDDE24 0%, #FFFEE7 100%)",
} as const;

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}
```

### 4. Create `src/lib/og/og-base-layout.tsx`
Shared wrapper: gradient bg, padding, brand mark bottom-right, mango accent bar left.

## Files to Create
| File | Purpose |
|------|---------|
| `public/fonts/og/plus-jakarta-sans-700.ttf` | VI/EN heading font |
| `public/fonts/og/noto-sans-jp-700.otf` | JA font |
| `public/fonts/og/noto-sans-kr-700.otf` | KO font |
| `src/lib/og/og-fonts.ts` | Locale-aware font loader |
| `src/lib/og/og-utils.ts` | Colors, truncate, constants |
| `src/lib/og/og-base-layout.tsx` | Shared base layout component |

## Success Criteria
- [ ] Font files present in public/fonts/og/
- [ ] `getOgFonts("vi")` returns heading font
- [ ] `getOgFonts("ja")` returns heading + JP body font
- [ ] TypeScript compiles
