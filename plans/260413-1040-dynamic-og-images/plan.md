---
title: "Dynamic OG Image Generation"
status: pending
priority: P1
effort: 1d
branch: main
tags: [og, seo, social, satori]
created: 2026-04-13
---

# Dynamic OG Image Generation

## Architecture

```
src/
├── lib/og/
│   ├── og-fonts.ts              # Font loader per locale
│   ├── og-base-layout.tsx       # Shared base layout (gradient, brand, size)
│   └── og-utils.ts              # Text truncation, color constants
├── app/[locale]/
│   ├── opengraph-image.tsx      # Homepage OG
│   ├── [product]/
│   │   └── opengraph-image.tsx  # Product landing OG
│   ├── kien-thuc/
│   │   └── [...slug]/
│   │       └── opengraph-image.tsx  # Article OG (knowledge)
│   ├── tin-tuc/
│   │   └── [...slug]/
│   │       └── opengraph-image.tsx  # Article OG (news)
│   └── giao-hang/
│       └── [city]/
│           └── opengraph-image.tsx  # Shipping OG
public/
└── fonts/og/
    ├── plus-jakarta-sans-700.ttf    # VI/EN heading
    ├── noto-sans-jp-700.otf         # JA
    └── noto-sans-kr-700.otf         # KO
```

## Design Spec

- **Size**: 1200×630px PNG
- **Background**: linear-gradient(135deg, #FDDE24 0%, #FFFEE7 100%) — brand → brand-cream
- **Title**: 48-60px bold, color #1F2937 (text)
- **Subtitle/meta**: 24px, color #6B7280 (text-secondary)
- **Brand mark**: "🥭 Trái Cây Bến Tre" bottom-right, 20px
- **Safe zone**: 60px padding all sides
- **Accent bar**: 8px left border in #F97316 (mango)

## Phases

| # | Phase | Status | Effort |
|---|-------|--------|--------|
| 1 | [Font setup + base layout](./phase-01-fonts-and-base.md) | Pending | 2h |
| 2 | [4 OG templates](./phase-02-og-templates.md) | Pending | 3h |
| 3 | [Build verify + test](./phase-03-test-verify.md) | Pending | 1h |

## Dependency Graph

```
Phase 1 (fonts + base) ← blocks 2
Phase 2 (templates) ← blocks 3
Phase 3 (test) ← final
```

## Risk

| Risk | Mitigation |
|------|-----------|
| CJK font >500KB bundle | Use single weight (700) only, not variable font |
| Satori flexbox-only | Design already uses flex layout |
| Font fetch fails at build | Use local fs.readFileSync, not HTTP fetch |

## Success Criteria

- [ ] `bun run build` passes
- [ ] `/[locale]/opengraph-image` returns 1200×630 PNG
- [ ] Vietnamese diacritics render correctly
- [ ] KO/JA characters render (not boxes)
- [ ] Each template shows locale-appropriate text
- [ ] Image <300KB per render
