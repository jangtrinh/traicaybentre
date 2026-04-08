## Phase 4: Dual CTA Header Images

### Current State
- Each CTA card has icon + text content
- No images

### Target State
- Each card has a small header image (h-40, rounded top)
- Sỉ card: fruit market photo
- Lẻ card: gift box photo
- Images inside card top, content below

### Implementation

File: `src/components/dual-cta-section.tsx`

```
- Add `headerImage` field to CTA_OPTIONS data
- Insert Image component at top of card (before icon)
- h-40, w-full, object-cover, rounded-t-3xl
- Adjust card padding: remove top padding, keep sides/bottom
- overflow-hidden on card container (already has rounded-3xl)
```

### Acceptance Criteria
- [ ] Each CTA card has header image
- [ ] Images match card rounded corners
- [ ] Content alignment preserved
- [ ] Lazy loaded
