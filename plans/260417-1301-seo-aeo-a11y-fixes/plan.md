---
title: "SEO + AEO + A11y Polish Sprint"
description: "15 fixes from full-site audit — hreflang, llms.txt, Article schema E-E-A-T, Recipe schema, FAQPage on shipping, a11y touch targets + keyboard nav"
status: pending
priority: P1
effort: 6h
branch: claude/hopeful-elgamal-e3a274
tags: [seo, aeo, a11y, schema, hreflang, wcag]
created: 2026-04-17
---

# SEO + AEO + A11y Polish Sprint

**Source audit:** `plans/reports/audit-consolidated-260417-1301-full-site.md`
**Current scores:** SEO 78 / AEO 73 / Perf 78 / Content 64 / Mobile 82 / WCAG 78
**Target delta:** +8–12 points aggregate (SEO 85+ / AEO 82+ / WCAG 86+)

## Goal

Close all C (P0) + H (P1) items from audit. Infrastructure + Article schema + Recipe rich results + shipping FAQPage + WCAG AA compliance. Content-ops items (H3 pillar tagging, H4 product hubs) deferred — not in this sprint.

## Phases

| Phase | Focus | Status | Effort | Fixes |
|-------|-------|--------|--------|-------|
| [Phase 1](phase-01-infrastructure.md) | llms.txt + robots.txt AI crawlers | pending | 20m | C2, C4 |
| [Phase 2](phase-02-article-schema.md) | Article JSON-LD polish + hreflang + speakable | pending | 90m | C1, C3, H1, H5 + 4 best-SEO |
| [Phase 3](phase-03-author-eeat.md) | Author Person schema + authors.ts | pending | 60m | H2 + 1 best-SEO |
| [Phase 4](phase-04-recipe-schema.md) | Recipe schema on 3–5 food articles | pending | 90m | H7 |
| [Phase 5](phase-05-shipping-faq.md) | FAQPage on /giao-hang/* | pending | 60m | H6 |
| [Phase 6](phase-06-a11y.md) | Carousel keyboard, touch target, focus, skip-link | pending | 60m | C5, C6, H8, H9 |

## Dependencies

```
Phase 1  ──► (independent, can start first)
Phase 2  ──► requires Phase 3 author type before Person schema emit
Phase 3  ──► blocks Phase 2 author subset; independent otherwise
Phase 4  ──► can run parallel with Phase 2/3 (new helper + frontmatter field, separate concern)
Phase 5  ──► independent (new helper scoped to shipping pages)
Phase 6  ──► independent (component-level edits, separate files)
```

**Practical ordering:** 1 + 5 + 6 parallel → 3 → 2 → 4 (Phase 2 consumes Phase 3 type; Phase 4 consumes Phase 2 getArticleJsonLd refactor pattern).

## Expected Outcomes

- `curl /llms.txt` returns 200 + well-formed index
- `curl /robots.txt` shows explicit AI crawler Allows
- Google Rich Results Test passes `TechArticle` + `NewsArticle` + `Recipe` + `FAQPage`
- Rich Results Test shows `Person` author with credentials on 91+ articles
- Lighthouse A11y ≥ 95 (currently ~82)
- Keyboard-only user can navigate carousel, skip to main, focus all form fields

## Rollback Strategy

Each phase is independently revertable:
- **Phase 1:** delete `public/llms.txt`, revert `public/robots.txt` → single commit revert
- **Phase 2–4:** schema emitters are pure functions; remove from JSON-LD array → no data loss. Frontmatter fields additive (optional) — safe on legacy articles
- **Phase 5:** remove `getShippingFaqJsonLd()` invocation per-page
- **Phase 6:** UI class changes, component additions — zero backend impact

All risks contained to static assets + client/server render. No DB, no migrations.

## Overlap with Prior Plans

- `260409-0754-seo-aeo-xoai-tu-quy` (shipped): established baseline Article + FAQ schemas — this sprint extends
- `260409-1859-audit-fixes` (shipped): already extracted `MobileMenuOverlay`, added focus trap — C5 (arrow keys) + C6 (touch target) are new gaps
- `260415-1057-seo-keyword-ranking` (shipped): established hreflang on static/product pages — Article hreflang (C1) closes the gap

No file conflicts expected with in-flight plans.

## Success Criteria (measurable)

- [ ] All 15 audit P0/P1 items closed
- [ ] Rich Results Test green for Article/Recipe/FAQ/Person
- [ ] `npx tsc --noEmit` clean
- [ ] `bun run lint` clean
- [ ] `bun run build` clean (no new warnings)
- [ ] Lighthouse A11y ≥ 95 on homepage + 1 article + 1 shipping page
- [ ] Manual kb-only nav passes: tab → skip-link → main → carousel ←/→ → hamburger (enter/esc)

## Unresolved Questions

1. **Author identities (H2):** Real person names + bio for HTX chairman + kỹ sư vườn? User to provide OR placeholder "A Phúc - Chủ vựa" single person.
2. **Recipe articles scope:** Tag exactly 3 or 5 for Phase 4? Recommend 3 highest-traffic first.
3. **hreflang for vi-only Articles:** `languages: { vi, x-default }` only — confirmed no duplicate-flag risk per audit note.
