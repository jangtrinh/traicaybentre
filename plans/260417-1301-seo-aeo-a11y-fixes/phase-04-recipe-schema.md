# Phase 4 — Recipe Schema (Schema.org Recipe)

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (H7 — originally HowTo, UPGRADED to Recipe)
- Schema spec: https://schema.org/Recipe (Google rich result supported)
- Candidate articles (verified via find):
  - `src/content/articles/xoai-tu-quy/kien-thuc/30-cong-thuc-che-bien-xoai-tu-quy.mdx`
  - `src/content/articles/dua-xiem-ben-tre/kien-thuc/5-mon-uong-tu-dua-xiem-ben-tre.mdx`
  - `src/content/articles/dua-xiem-ben-tre/kien-thuc/rau-cau-dua-qua-bieu-moi-la-dep-sang.mdx`
  - `src/content/articles/dua-xiem-ben-tre/kien-thuc/rau-cau-dua-ben-tre-cong-thuc-cach-lam.mdx`
  - `src/content/articles/xoai-hoang-kim/kien-thuc/cach-an-xoai-hoang-kim-ngon-nhat.mdx`

## Overview

- **Priority:** P1 (High)
- **Status:** pending
- **Effort:** 90 min
- **Description:** Add `hasRecipe` flag + `recipe` object to ArticleFrontmatter. Emit Schema.org `Recipe` JSON-LD on flagged articles. Target 3–5 food articles. Recipe (vs HowTo) unlocks Google recipe rich result with image carousel, ratings slot, cook time snippet.

## Key Insights

- **Why Recipe not HowTo:** Google Recipe rich result is a full-fledged SERP enhancement (image carousel, reviews, video slot). HowTo rich result was deprecated/deprioritized by Google in 2023. Recipe is the future-proof choice for food content.
- Minimum required fields for rich result: `name`, `image`, `recipeIngredient[]`, `recipeInstructions[]`. Optional but recommended: `cookTime`, `prepTime`, `recipeYield`, `recipeCuisine`, `recipeCategory`, `nutrition`.
- Time fields use ISO 8601 duration format (`PT15M` = 15 min, `PT1H30M` = 1h30m).
- Frontmatter-driven — NO MDX body parsing. Author provides structured recipe in frontmatter; body remains free-form story/context.

## Requirements

**Functional:**
- Extend `ArticleFrontmatter` with:
  ```ts
  hasRecipe?: boolean;
  recipe?: {
    name?: string;              // defaults to article.title
    description?: string;        // defaults to article.metaDescription
    image?: string;              // defaults to article.ogImage
    cookTime?: string;           // ISO 8601 e.g. "PT20M"
    prepTime?: string;
    totalTime?: string;
    recipeYield?: string;        // e.g. "4 phần", "1 ly 500ml"
    recipeCuisine?: string;      // e.g. "Việt Nam"
    recipeCategory?: string;     // e.g. "Tráng miệng"
    recipeIngredient: string[];  // required
    recipeInstructions: { name?: string; text: string; image?: string }[]; // required
  };
  ```
- New helper in `structured-data.ts`: `getRecipeJsonLd(opts)` returning Recipe schema
- On article page render: if `fm.hasRecipe && fm.recipe`, append Recipe schema to jsonLd array
- Tag 3 pilot articles (user can add 2 more later):
  - `rau-cau-dua-qua-bieu-moi-la-dep-sang` (rau câu dừa — clear recipe)
  - `rau-cau-dua-ben-tre-cong-thuc-cach-lam` (rau câu dừa công thức — explicit recipe)
  - `5-mon-uong-tu-dua-xiem-ben-tre` (5 món — pick 1 as primary recipe, list rest in body)

**Non-functional:**
- `getRecipeJsonLd` pure function, < 40 lines
- Recipe frontmatter validation: if `hasRecipe === true` then `recipe.recipeIngredient.length ≥ 2` and `recipe.recipeInstructions.length ≥ 2` — throw during parse (articles.ts)
- Rich Results Test passes for all 3 tagged articles

## Architecture

```
src/lib/articles.ts
    ├─ ArticleFrontmatter — add hasRecipe, recipe fields
    └─ parseArticleFile() — validate recipe shape if hasRecipe === true

src/lib/structured-data.ts
    └─ getRecipeJsonLd(fm, canonical) — pure fn, builds Schema.org Recipe

src/app/[locale]/[product]/[type]/[slug]/page.tsx
    └─ if (fm.hasRecipe && fm.recipe) jsonLd.push(getRecipeJsonLd(fm, canonical))

src/content/articles/{product}/{type}/{slug}.mdx
    └─ frontmatter adds hasRecipe + recipe block (3 pilot articles)
```

**Data flow:** MDX frontmatter → articles.ts validates → page.tsx reads `fm.recipe` → `getRecipeJsonLd` returns object → pushed to JSON-LD array → serialized in `ArticleLayout` script tag.

## Related Code Files

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/articles.ts` (ArticleFrontmatter interface + parseArticleFile validation)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/lib/structured-data.ts` (new exported fn)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/app/[locale]/[product]/[type]/[slug]/page.tsx` (append to jsonLd array)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/content/articles/dua-xiem-ben-tre/kien-thuc/rau-cau-dua-qua-bieu-moi-la-dep-sang.mdx` (frontmatter)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/content/articles/dua-xiem-ben-tre/kien-thuc/rau-cau-dua-ben-tre-cong-thuc-cach-lam.mdx` (frontmatter)
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/src/content/articles/dua-xiem-ben-tre/kien-thuc/5-mon-uong-tu-dua-xiem-ben-tre.mdx` (frontmatter)

## Implementation Steps

1. **articles.ts ArticleFrontmatter:** Add:
   ```ts
   hasRecipe?: boolean;
   recipe?: {
     name?: string;
     description?: string;
     image?: string;
     cookTime?: string;
     prepTime?: string;
     totalTime?: string;
     recipeYield?: string;
     recipeCuisine?: string;
     recipeCategory?: string;
     recipeIngredient: string[];
     recipeInstructions: { name?: string; text: string; image?: string }[];
   };
   ```

2. **articles.ts parseArticleFile:** After required field check, add:
   ```ts
   if (fm.hasRecipe === true) {
     if (!fm.recipe) throw new Error(`[articles] ${absPath} hasRecipe=true but missing recipe block`);
     if (!Array.isArray(fm.recipe.recipeIngredient) || fm.recipe.recipeIngredient.length < 2) {
       throw new Error(`[articles] ${absPath} recipe.recipeIngredient requires ≥2 items`);
     }
     if (!Array.isArray(fm.recipe.recipeInstructions) || fm.recipe.recipeInstructions.length < 2) {
       throw new Error(`[articles] ${absPath} recipe.recipeInstructions requires ≥2 steps`);
     }
   }
   ```

3. **structured-data.ts:** Add exported fn:
   ```ts
   export function getRecipeJsonLd(opts: {
     name: string;
     description: string;
     image: string;
     url: string;
     author: { name: string; url?: string };
     datePublished: string;
     dateModified: string;
     recipe: NonNullable<ArticleFrontmatter["recipe"]>;
   }) {
     const r = opts.recipe;
     return {
       "@context": "https://schema.org",
       "@type": "Recipe",
       name: r.name ?? opts.name,
       description: r.description ?? opts.description,
       image: r.image ?? opts.image,
       url: opts.url,
       author: { "@type": "Person", name: opts.author.name, url: opts.author.url },
       datePublished: opts.datePublished,
       dateModified: opts.dateModified,
       ...(r.prepTime && { prepTime: r.prepTime }),
       ...(r.cookTime && { cookTime: r.cookTime }),
       ...(r.totalTime && { totalTime: r.totalTime }),
       ...(r.recipeYield && { recipeYield: r.recipeYield }),
       ...(r.recipeCuisine && { recipeCuisine: r.recipeCuisine }),
       ...(r.recipeCategory && { recipeCategory: r.recipeCategory }),
       recipeIngredient: r.recipeIngredient,
       recipeInstructions: r.recipeInstructions.map((step, i) => ({
         "@type": "HowToStep",
         ...(step.name && { name: step.name }),
         text: step.text,
         position: i + 1,
         ...(step.image && { image: step.image }),
       })),
     };
   }
   ```
   Import type `ArticleFrontmatter` from `@/lib/articles` at top (already a circular-safe import, since articles.ts doesn't import structured-data).

4. **page.tsx:** After speakable/faq assembly, before `.filter`:
   ```ts
   const recipeJsonLd =
     fm.hasRecipe && fm.recipe
       ? getRecipeJsonLd({
           name: fm.title,
           description: fm.metaDescription,
           image: fm.ogImage ? `${SITE_URL}${fm.ogImage}` : `${SITE_URL}/images/xoai-real-2.jpg`,
           url: canonical,
           author: { name: "A Phúc", url: SITE_URL }, // or resolve via Phase 3 authors.ts
           datePublished: fm.publishedAt,
           dateModified: fm.updatedAt ?? fm.publishedAt,
           recipe: fm.recipe,
         })
       : null;

   const jsonLd = [articleJsonLd, breadcrumbJsonLd, speakableJsonLd, faqJsonLd, recipeJsonLd]
     .filter((s): s is NonNullable<typeof s> => s !== null);
   ```

5. **Tag 3 pilot articles** — add to frontmatter (example for rau-cau-dua):
   ```yaml
   hasRecipe: true
   recipe:
     name: "Rau câu dừa Bến Tre truyền thống"
     description: "Công thức rau câu dừa xiêm đổ khuôn quả dừa — món quà biếu sang trọng."
     cookTime: "PT30M"
     prepTime: "PT20M"
     totalTime: "PT50M"
     recipeYield: "2 quả dừa (4 phần)"
     recipeCuisine: "Việt Nam"
     recipeCategory: "Tráng miệng"
     recipeIngredient:
       - "2 quả dừa xiêm Bến Tre (chọn quả già vỏ nâu)"
       - "10g bột rau câu dẻo"
       - "100g đường"
       - "200ml nước cốt dừa"
       - "50ml sữa tươi"
     recipeInstructions:
       - name: "Sơ chế dừa"
         text: "Cắt nắp dừa, chắt nước dừa ra riêng, giữ lại cơm dừa."
       - name: "Nấu rau câu"
         text: "Hòa bột rau câu với nước dừa, đun sôi với đường 5 phút."
       - name: "Đổ khuôn"
         text: "Đổ hỗn hợp vào quả dừa, để nguội rồi cho tủ lạnh 3 tiếng."
       - name: "Hoàn thiện"
         text: "Lấy ra, cắt miếng, thưởng thức lạnh."
   ```
   Adapt values per article. **User must validate real recipe content** — do not fabricate.

6. Validate:
   - `npx tsc --noEmit`
   - `bun run build` (parser will throw if recipe invalid)
   - View source on recipe article → Recipe JSON-LD block present
   - Rich Results Test on `/dua-xiem-ben-tre/kien-thuc/rau-cau-dua-qua-bieu-moi-la-dep-sang` → Recipe eligible

## Todo List

- [ ] Extend ArticleFrontmatter with hasRecipe + recipe fields (articles.ts)
- [ ] Add recipe validation in parseArticleFile (articles.ts)
- [ ] Add getRecipeJsonLd helper (structured-data.ts)
- [ ] Append recipeJsonLd to jsonLd array (page.tsx)
- [ ] Tag 3 pilot food articles with recipe frontmatter (user to supply real content)
- [ ] Typecheck + build clean
- [ ] Rich Results Test: Recipe eligible on 3 articles

## Success Criteria

- Parse throws clear error if `hasRecipe: true` but recipe block malformed
- `bun run build` green with 3 pilot articles
- View source on tagged article shows `"@type": "Recipe"` with `recipeIngredient` array + `recipeInstructions` with `HowToStep` nesting
- Rich Results Test passes Recipe for all 3 pilot URLs
- Untagged articles unaffected (zero regression)

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Author writes hallucinated recipe ingredients/steps (not tested in kitchen) | Medium | High (Google punishes low-quality recipes) | **MUST** user-supplied real recipes. Do NOT auto-generate. Tag fewer articles until content validated |
| ISO 8601 duration typos (e.g. `30M` instead of `PT30M`) | Medium | Low | Rich Results Test surfaces; can add regex validation later |
| Existing articles with plain `author: "A Phúc"` string coming into getRecipeJsonLd | Low | Low | Pass author from authors.ts (Phase 3) OR default. Covered |
| Import cycle articles.ts ↔ structured-data.ts | Low | Medium | articles.ts stays free of structured-data imports; getRecipeJsonLd imports ArticleFrontmatter type (type-only, no runtime cycle) |
| Recipe schema missing required fields → no rich result | Medium | Low | Validation throws at parse; build fails loud |

## Security Considerations

- Recipe content is author-authored MDX frontmatter, same trust boundary as article body.
- JSON-LD serialization via standard pattern (JSON.stringify escapes). No XSS.
- No user input; no PII.

## Next Steps

→ [Phase 5: Shipping FAQPage](phase-05-shipping-faq.md) — independent helper for /giao-hang/* routes
