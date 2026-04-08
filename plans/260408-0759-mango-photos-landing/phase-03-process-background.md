## Phase 3: Process Section Background

### Current State
- Solid `bg-primary-light` background
- 4 white cards in grid

### Target State
- Orchard photo as section background with dark overlay
- Text colors inverted (white on dark)
- Cards keep white bg (contrast against dark background)

### Implementation

File: `src/components/process-section.tsx`

```
- Wrap section in relative container
- Add absolute Image behind content (fill, object-cover)
- Add dark overlay div (bg-black/60)
- Change heading/subheading text to white
- Cards stay bg-surface (white) — already contrasts
```

### Acceptance Criteria
- [ ] Orchard photo visible as background
- [ ] Dark overlay ensures text readability
- [ ] Cards remain white with good contrast
- [ ] Image lazy loaded (below fold)
