---
status: completed
domain: complicated
mode: fast
created: 2026-04-08
---

# Add Real Mango Photos to Landing Page

## Overview
Thêm ảnh xoài thật từ Unsplash vào 3 vị trí chiến lược trên landing page: hero split layout, process section background, dual CTA header images.

## Phases

| # | Phase | Status | Files |
|---|-------|--------|-------|
| 1 | Download & optimize photos | done | `public/images/` |
| 2 | Hero split layout | done | `hero-section.tsx` |
| 3 | Process section background | done | `process-section.tsx` |
| 4 | Dual CTA header images | done | `dual-cta-section.tsx` |

## Key Decisions
- Self-host all photos in `public/images/` (no external URLs)
- Use Next.js `Image` component with `priority` for hero, `loading="lazy"` for rest
- WebP format preferred, JPEG fallback
- Total added weight target: <400KB
