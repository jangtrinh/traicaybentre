# Phase 3 — Author E-E-A-T (Person Schema)

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (H2 + 1 best-SEO add)
- Consumes into: Phase 2 (`getArticleJsonLd` author param)
- E-E-A-T docs: Google Search Quality Guidelines → Experience, Expertise, Authoritativeness, Trust

## Overview

- **Priority:** P1 (High)
- **Status:** pending
- **Effort:** 60 min
- **Description:** Replace Organization-as-author stub with `Person` schema backed by real author entries. Add Organization.founder + contactPoint enrichment. Lift E-E-A-T signal for Google + AI citation trust.

## Key Insights

- Current `getArticleJsonLd` hardcodes `author: { "@type": "Organization", name: "Trái Cây Bến Tre" }` — zero E-E-A-T differentiator across 91 articles.
- Google weights `Person` > `Organization` for article authorship E-E-A-T. Requires: name, jobTitle, credentials or sameAs (LinkedIn / Facebook / published works).
- 2–3 real people enough: chủ vựa (A Phúc — already in site copy, phone 0932 585 533) + kỹ sư nông học (if any) + content editor (self: jangtrinh on TikTok).
- `sameAs` on Person = social profile URLs = identity verification signal.
- Organization.founder + contactPoint extend existing schema (already has contactPoint; add founder).

## Requirements

**Functional:**
- Create `src/content/authors.ts` exporting 2–3 Person records
- Type: `{ slug, name, jobTitle, bio, url, sameAs[], image? }`
- Extend `ArticleFrontmatter.author` from `string` to `string` (author slug) — backward-compat if currently a name string, validate/fallback
- Helper: `getAuthorBySlug(slug): Person | null` + `getDefaultAuthor(): Person`
- Emit author as Schema.org `Person` in `getArticleJsonLd`
- Extend `organizationSchema` in structured-data.ts: add `founder: { "@type": "Person", ... }` + retain existing `contactPoint`

**Non-functional:**
- `authors.ts` < 100 lines; kebab-case slug keys
- Backward compat: articles with `author: "A Phúc"` (string, not slug) fall back to default author by matching name OR use default
- No PII leaked that isn't already public (phone is on homepage, Facebook profile is public)

## Architecture

```
src/content/authors.ts  (NEW, ~80 lines)
    ├─ interface Author { slug, name, jobTitle, bio, url, sameAs[], image? }
    ├─ AUTHORS: Record<string, Author>
    ├─ getAuthorBySlug(slug): Author | null
    └─ getDefaultAuthor(): Author        ← fallback for articles without author field

src/lib/articles.ts
    └─ ArticleFrontmatter.author?: string   ← now interpreted as slug (legacy string names tolerated)

src/lib/structured-data.ts
    ├─ import getAuthorBySlug, getDefaultAuthor
    ├─ authorToPersonSchema(author): object
    ├─ getArticleJsonLd() — accept authorSlug, resolve to Person
    └─ organizationSchema — add founder field

src/app/[locale]/[product]/[type]/[slug]/page.tsx
    └─ pass fm.author (slug) to getArticleJsonLd
```

**Data flow:** MDX frontmatter (`author: "a-phuc"`) → `getArticleByUrlPath` → page.tsx passes slug → `getArticleJsonLd` resolves to Author → emits Person schema.

## Related Code Files

**Create:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/content/authors.ts`

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/structured-data.ts` (organizationSchema + getArticleJsonLd)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/articles.ts` (ArticleFrontmatter.author docstring — type stays `string` = slug)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/[product]/[type]/[slug]/page.tsx` (pass author slug)

## Implementation Steps

1. **Create `src/content/authors.ts`:**
   ```ts
   export interface Author {
     slug: string;
     name: string;
     jobTitle: string;
     bio: string;
     url: string;              // author page URL (future-proofed; can point to /tac-gia/{slug} or homepage for now)
     sameAs: string[];         // social profile URLs
     image?: string;
   }

   export const AUTHORS: Record<string, Author> = {
     "a-phuc": {
       slug: "a-phuc",
       name: "A Phúc",
       jobTitle: "Chủ vựa Trái Cây Bến Tre — HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong",
       bio: "Người trực tiếp thu mua, phân loại, đóng thùng xoài Tứ Quý và dừa xiêm từ vườn nhà Thạnh Phú, Bến Tre. Gắn bó với nghề xoài 15+ năm.",
       url: "https://www.traicaybentre.com",
       sameAs: [
         "https://www.facebook.com/profile.php?id=61573415880985",
       ],
     },
     "jangtrinh": {
       slug: "jangtrinh",
       name: "Jang Trinh",
       jobTitle: "Biên tập nội dung — Trái Cây Bến Tre",
       bio: "Biên tập viên nội dung, chia sẻ kiến thức về giống xoài Bến Tre, kỹ thuật bảo quản, mẹo thưởng thức.",
       url: "https://www.traicaybentre.com",
       sameAs: [
         "https://www.tiktok.com/@jangtrinh",
       ],
     },
   };

   export function getAuthorBySlug(slug: string | undefined | null): Author | null {
     if (!slug) return null;
     return AUTHORS[slug] ?? null;
   }

   export function getDefaultAuthor(): Author {
     return AUTHORS["a-phuc"];
   }
   ```

2. **structured-data.ts:** Add `authorToPersonSchema`:
   ```ts
   import type { Author } from "@/content/authors";
   import { getAuthorBySlug, getDefaultAuthor } from "@/content/authors";

   function authorToPersonSchema(author: Author) {
     return {
       "@type": "Person",
       name: author.name,
       jobTitle: author.jobTitle,
       description: author.bio,
       url: author.url,
       ...(author.sameAs.length && { sameAs: author.sameAs }),
       ...(author.image && { image: author.image }),
     };
   }
   ```

3. **structured-data.ts:** Extend `getArticleJsonLd` opts with `authorSlug?: string`:
   ```ts
   const author = opts.authorSlug
     ? (getAuthorBySlug(opts.authorSlug) ?? getDefaultAuthor())
     : getDefaultAuthor();
   // ... in returned object:
   author: authorToPersonSchema(author),
   ```
   Remove the old hardcoded Organization author branch.

4. **structured-data.ts:** Extend `organizationSchema`:
   ```ts
   const organizationSchema = {
     "@type": "Organization",
     "@id": `${SITE_URL}/#organization`,
     name: BUSINESS_NAME,
     url: SITE_URL,
     logo: { ... },
     founder: {
       "@type": "Person",
       name: "A Phúc",
       jobTitle: "Chủ vựa",
       sameAs: ["https://www.facebook.com/profile.php?id=61573415880985"],
     },
     sameAs: [ ... existing ],
     contactPoint: {
       "@type": "ContactPoint",
       telephone: PHONE,
       email: "info@traicaybentre.com",   // best-SEO: add email
       contactType: "customer service",
       areaServed: "VN",
       availableLanguage: ["Vietnamese", "English"],
     },
   };
   ```
   (Use actual email if user confirms; else omit email line.)

5. **page.tsx:** Pass author to `getArticleJsonLd`:
   ```ts
   const articleJsonLd = getArticleJsonLd({
     ...
     authorSlug: fm.author,   // slug or legacy name string
   });
   ```

6. **articles.ts:** Update JSDoc on `author?: string`: `/** Slug from src/content/authors.ts — falls back to default author if unknown */`

7. Validate:
   - `npx tsc --noEmit`
   - `bun run build`
   - View source on article → JSON-LD `author` is `{ "@type": "Person", name, jobTitle, sameAs }` not Organization
   - Rich Results Test: author appears, Person schema valid

## Todo List

- [ ] Create `src/content/authors.ts` with 2 real Person entries
- [ ] Add `authorToPersonSchema()` helper (structured-data.ts)
- [ ] Extend `getArticleJsonLd` with `authorSlug` opt (structured-data.ts)
- [ ] Add `founder` to `organizationSchema` (structured-data.ts)
- [ ] Optionally add email to `contactPoint` (user confirms)
- [ ] Update `ArticleFrontmatter.author` JSDoc (articles.ts)
- [ ] Pass `authorSlug: fm.author` in page.tsx
- [ ] Typecheck + build clean
- [ ] Rich Results Test: Person author resolves on 1 article

## Success Criteria

- `src/content/authors.ts` exists, exports 2 authors with real social URLs
- View source on any article shows `"author": { "@type": "Person", "name": "A Phúc" }` (or slug-matched)
- Homepage JSON-LD `Organization` block includes `founder` Person field
- Rich Results Test: zero Article validation errors; Person recognized
- Articles without `author` frontmatter still render (fallback to default)

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Legacy articles have `author: "A Phúc"` (name not slug) → no match | Medium | Low | `getAuthorBySlug` returns null, fallback to `getDefaultAuthor()`. Zero breakage |
| `sameAs` URLs broken (Facebook profile deleted) | Low | Low | URLs sourced from current structured-data.ts — already stable |
| Person schema without `image` flagged by Google | Low | Low | Google accepts Person without image; many sites do this |
| Privacy: Real name exposure | Low | Low | A Phúc is already public on site (hero, phone, Facebook). Zero incremental leak |
| Email in contactPoint exposes inbox to spam | Medium | Low | Skip if user not ready; mitigate via mailchannel alias |

## Security Considerations

- `authors.ts` is static server-rendered — no user input.
- Bio text: author-controlled, hardcoded in file. No XSS.
- No PII leak beyond what's already on homepage + Facebook (public).

## Next Steps

→ [Phase 4: Recipe schema](phase-04-recipe-schema.md) — uses same getArticleJsonLd extension pattern
