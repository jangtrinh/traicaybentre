## Phase 2: Hero Split Layout

### Current State
- Full-width text layout, no image
- Text takes 100% width within `max-w-[1200px]`

### Target State
- 2-column layout: text left (55%), image right (45%)
- Mobile: image hidden or stacked below text
- Image: `hero-mango.jpg` with rounded-3xl, subtle shadow
- `priority={true}` for LCP optimization

### Implementation

File: `src/components/hero-section.tsx`

```
Layout change:
- Wrap content in `grid lg:grid-cols-2 gap-8 items-center`
- Left column: all existing text content (unchanged)
- Right column: Next.js Image, rounded-3xl, object-cover
- Mobile: `hidden lg:block` on image column OR stack below
```

### Acceptance Criteria
- [ ] Desktop: 2-column layout, image visible right side
- [ ] Mobile: graceful fallback (image hidden or stacked)
- [ ] Image loads with priority (above fold)
- [ ] Rounded-3xl corners on image
