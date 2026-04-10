# Phase 02 — Optimize 6 Existing Pages

**Status:** pending | **Effort:** 3d | **Blocks:** P05 | **Blocked by:** P01

## Goal

On-page SEO optimize existing partial-match pages để target exact long-tail keywords. Minimal edits, preserve SEO equity. Schema + internal links added INLINE per page (F7 interleaved).

## 🔴 Red Team Applied

- **F5 (High):** Duplicate #2 resolution = set `uxReviewed: false` on MDX frontmatter, NEVER delete file. Gate drops page from render without 404.
- **F7 (High):** Schema + internal linking additions moved INLINE here (not separate P05). P05 becomes validation checklist only.
- **F10 (Medium):** Before adding Speakable schema, audit target page for actual CSS selectors (e.g. `article`, `h1`, `.faq-answer`) — don't reference selectors that don't exist.
- **#3 variant:** DO NOT rename slug (breaks inbound links + needs redirect violating SEO-first). Instead: add exact keyword in H2 + first paragraph intro, keep existing URL.

## Target pages + keywords

| KW# | Target keyword | Page file | Edit type |
|---|---|---|---|
| 2 | cách bảo quản xoài tứ quý bến tre | Legacy `src/app/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy/page.tsx` (canonical winner) | Title/H1/meta refine. Delete MDX duplicate if P01 decided so. |
| 3 | xoài tứ quý bến tre ăn sống hay chín | MDX `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-an-chin-hay-xanh.mdx` | Rename slug → `an-song-hay-chin` + frontmatter title update |
| 4 | mua xoài bến tre chính gốc ở đâu hà nội | `src/app/giao-hang/ha-noi/page.tsx` | Add H2 section "Mua xoài bến tre chính gốc ở đâu Hà Nội?" + FAQ |
| 6 | đặt dừa xiêm bến tre online ship toàn quốc | `src/components/product/dua-xiem-ben-tre-landing.tsx` | Hero tagline + H2 new section "Đặt online ship toàn quốc" + metadata |
| 9 | vựa xoài tứ quý bến tre giá sỉ | (no existing landing, only MDX temporal) | SKIP in P02 → handled by P04 new landing |
| 10 | xoài bến tre có gì đặc biệt | MDX `tho-nhuong-thanh-phu-xoai.mdx` OR `cau-chuyen-nguoi-trong-xoai-thanh-phu.mdx` | Frontmatter title + intro chứa exact phrase. Pick 1, leave other. |

**Count revised:** 5 pages to edit (P02), 1 deferred to P04 (#9).

## Edit pattern (apply to each)

1. **Title** (≤ 60 char): include exact keyword phrase as first 5 words where possible
2. **H1**: exact keyword phrase (can be slightly reworded for readability)
3. **Meta description** (≤ 155 char): exact keyword phrase in first sentence
4. **First paragraph**: exact keyword phrase in first 100 words
5. **Canonical URL**: do NOT change (preserve SEO equity)
6. **Internal links**: add 2-3 links FROM pillar pages (`/xoai-tu-quy`, `/nguon-goc`) pointing TO this page với anchor text = keyword phrase

### Example edit — #2

```diff
-title: "Cách Bảo Quản Xoài Tứ Quý — Hướng Dẫn Đầy Đủ"
+title: "Cách Bảo Quản Xoài Tứ Quý Bến Tre — Hướng Dẫn Chi Tiết 7-14 Ngày"

-<h1>Bảo quản xoài Tứ Quý</h1>
+<h1>Cách bảo quản xoài Tứ Quý Bến Tre tại nhà</h1>

-<meta description="Hướng dẫn bảo quản..." />
+<meta description="Cách bảo quản xoài Tứ Quý Bến Tre 7-14 ngày không hỏng. Mẹo từ vựa Thạnh Phú." />
```

## Files to Modify

- `src/app/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy/page.tsx` (#2)
- `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-an-chin-hay-xanh.mdx` (#3) — OR rename
- `src/app/giao-hang/ha-noi/page.tsx` (#4)
- `src/components/product/dua-xiem-ben-tre-landing.tsx` (#6)
- `src/content/articles/xoai-tu-quy/kien-thuc/tho-nhuong-thanh-phu-xoai.mdx` (#10)

## Files to Delete (conditional P01 decision)

- `src/content/articles/xoai-tu-quy/kien-thuc/cach-bao-quan-xoai-tu-quy.mdx` (if duplicate #2 resolved → delete)

## Todo

- [ ] Review P01 gap map recommendations
- [ ] Edit #2 title/H1/meta (+ delete MDX duplicate if needed)
- [ ] Edit #3 slug/title (rename if approved)
- [ ] Edit #4 add H2 FAQ section HN-specific
- [ ] Edit #6 metadata + H2 ship section
- [ ] Edit #10 title/intro with exact phrase
- [ ] Add internal links from `/xoai-tu-quy`, `/dua-xiem-ben-tre` to these pages
- [ ] Typecheck + build verify
- [ ] Visual diff on each modified page

## Success Criteria

- Each page: exact keyword in title/H1/meta/first 100 words
- Each page: ≥2 internal links from pillar pages
- Build exit 0
- No legacy URL changed (zero redirect, SEO-first)
- Lighthouse SEO score ≥95 on modified pages

## Risks

| Risk | Mitigation |
|---|---|
| Title/H1 keyword stuffing looks spammy | Natural Vietnamese phrasing, 1 instance exact + paraphrase elsewhere |
| #3 slug rename breaks existing inbound links | Scout internal links before rename; update all references |
| #2 duplicate delete causes 404 | Check if MDX URL đã indexed bởi Google — nếu có, keep both but noindex the loser |

## Next

→ P03: Write 4 new blog articles (missing keywords)
