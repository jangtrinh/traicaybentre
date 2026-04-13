# Phase 3: Build Verify + Test

## Overview
- **Priority**: P0
- **Effort**: 1h
- **Blocked by**: Phase 2

## Steps

### 1. Build verification
- `bun run build` — 0 errors
- `npx tsc --noEmit` — clean

### 2. Local smoke test
- Start dev server: `bun dev`
- Curl each OG image endpoint and verify PNG response:
  - `GET /vi/opengraph-image` → homepage VI
  - `GET /en/opengraph-image` → homepage EN
  - `GET /ko/xoai-tu-quy/opengraph-image` → product KO
  - `GET /ja/kien-thuc/xoai-tu-quy-la-gi/opengraph-image` → article JA
  - `GET /en/giao-hang/tp-hcm/opengraph-image` → shipping EN

### 3. Verify image properties
- Response content-type: `image/png`
- Image dimensions: 1200×630
- File size: <300KB

### 4. Meta tag verification
- Check `<meta property="og:image">` appears in page HTML
- URL is absolute (includes https://www.traicaybentre.com)

## Success Criteria
- [ ] Build passes
- [ ] All 5 smoke test URLs return PNG
- [ ] og:image meta tags present in HTML
- [ ] Images <300KB
