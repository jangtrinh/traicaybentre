# Red Team Review — IA Multi-Product Plan

**Date:** 2026-04-09 23:15
**Plan:** `plans/260409-2243-information-architecture-multi-product-scale/`
**Reviewer:** Inline review (4 lenses, main context) — subagent spawn rejected by policy filter, escalated to direct review
**Method:** Direct codebase scout + plan re-read

## Reality check against codebase

| Plan assumption | Codebase reality | Status |
|---|---|---|
| `src/lib/products.ts` new file | Does not exist — safe to create | ✅ OK |
| `src/content/products.ts` new file | Does not exist — safe | ✅ OK |
| `Product` type name | **`src/lib/landing-data.ts` ALREADY exports `Product`** (different shape: id, farm, harvestDate, priceSi...) | ❌ CONFLICT |
| `src/content/legacy-articles.ts` new manifest | **`src/lib/knowledge-data.ts` ALREADY has `KNOWLEDGE_ARTICLES` + `blog-data.ts` has `BlogPost` registry** — legacy manifest already exists | ❌ DUPLICATE |
| `getArticleJsonLd` in `@/lib/structured-data` | Exists ✅ (line 313) but signature `(opts: {...})` not `(article: Article)` | ⚠️ SIGNATURE MISMATCH |
| `getProductJsonLd` in `@/lib/structured-data` | Does NOT exist | ❌ MISSING |
| `getBreadcrumbJsonLd` + `SITE_URL` | Both exist ✅ | ✅ OK |
| `/lien-he` page exists (plan says "shared, giữ") | **Does NOT exist** in `src/app/` | ❌ REFERENCE BROKEN |
| `/images/xoai-tu-quy-hero.jpg` (registry heroImage) | **Does NOT exist**. Real: `xoai-real-2.jpg`, `xoai-chin.jpg`, `xoai-vuon.jpg`, etc. | ❌ BROKEN PATH |
| `/images/dua-xiem-hero.jpg` | Does NOT exist (expected) | ⚠️ placeholder OK but will 404 if coming-soon activated |
| `src/components/article-layout.tsx` | Exists ✅ (from earlier scout) | ✅ OK |
| `header.tsx` < 200 LOC | 163 LOC currently. Phase 06 adds dropdown → will likely exceed 200 | ⚠️ LIKELY VIOLATION |
| `src/app/xoai-tu-quy/page.tsx` | 367 LOC (plan said 366 — close enough) | ✅ OK |
| Phase 03 (articles system) | **Already DONE via MDX pivot** (196 LOC articles.ts, sample MDX) | ℹ️ Status updated |
| Phase 03 depends on P01 registry | **Phase 03 ran FIRST with hardcoded KNOWN_PRODUCTS whitelist** — dependency inverted, has TODO swap | ⚠️ TECH DEBT |

---

## Findings (deduplicated, 12 total)

### 🔴 CRITICAL

#### Finding 1: Type name collision `Product`
- **Lens:** Assumption Destroyer
- **Severity:** Critical
- **Location:** Phase 01 — Schema `src/content/products.ts`
- **Issue:** Plan exports `type Product = {...}` but `src/lib/landing-data.ts` already exports `interface Product { id; farm; harvestDate; priceSi; ... }`. Different shape entirely.
- **Failure scenario:** Two different `Product` types imported via `@/lib/products` + `@/lib/landing-data` → TS errors wherever both in scope, or silent shadow bugs when one overrides the other via auto-import.
- **Evidence:** `src/lib/landing-data.ts` lines 3-22 (scouted); Phase 01 "Schema" section
- **Recommendation:** Rename new registry type to `ProductEntry`, `ProductMeta`, or `FruitProduct`. Alternatively: rename the legacy `landing-data.ts` `Product` → `ProductCard` (it's used for landing cards anyway). Prefer renaming new type to avoid touching legacy code.

#### Finding 2: Legacy articles manifest duplicate
- **Lens:** Scope Critic + Assumption Destroyer
- **Severity:** Critical
- **Location:** Phase 05 — Legacy manifest `src/content/legacy-articles.ts`
- **Issue:** Plan says "create new manifest for 9 legacy articles" but `src/lib/knowledge-data.ts` `KNOWLEDGE_ARTICLES` + `src/lib/blog-data.ts` `BlogPost` already exist as legacy registries.
- **Failure scenario:** Two sources of truth → drift. Dev adds article to `knowledge-data.ts` but forgets `legacy-articles.ts`, hub page misses it. Maintenance burden doubled.
- **Evidence:** `src/lib/knowledge-data.ts` lines 1-14 + `src/lib/blog-data.ts` lines 1-14 (scouted); Phase 05 "Legacy manifest" section
- **Recommendation:** **Delete** Phase 05's `src/content/legacy-articles.ts` spec. Reuse existing `KNOWLEDGE_ARTICLES` + `BlogPost` directly. Extend them with `product` + `urlPath` fields (add-only, backward compatible). `getUnifiedArticles` merges legacy from these + new from MDX.

#### Finding 3: Broken hero image paths in registry
- **Lens:** Assumption Destroyer
- **Severity:** Critical
- **Location:** Phase 01 — `heroImage: "/images/xoai-tu-quy-hero.jpg"`
- **Issue:** File does not exist. Real assets: `xoai-real-2.jpg`, `xoai-chin.jpg`, `xoai-vuon.jpg`, `xoai-vuon.jpg`.
- **Failure scenario:** Phase 07 homepage uses `product.heroImage` → 404, broken image on production. Phase 02 `generateMetadata` uses `heroImage` for OG → OG image 404, social previews broken.
- **Evidence:** `ls public/images/` shows no `xoai-tu-quy-hero.jpg`; `structured-data.ts` line 26 uses `xoai-real-2.jpg` as reference
- **Recommendation:** Phase 01 step 1: read `landing-data.ts` and `structured-data.ts` to find actual hero image path in use (likely `xoai-real-2.jpg` or similar). Use that exact path. Don't invent filenames.

### 🟠 HIGH

#### Finding 4: `getArticleJsonLd` signature mismatch
- **Lens:** Assumption Destroyer
- **Severity:** High
- **Location:** Phase 04 — `<script ... {JSON.stringify(getArticleJsonLd(article))}`
- **Issue:** Existing `getArticleJsonLd(opts: {...})` takes an options object, not an `Article`. Plan calls it with raw article.
- **Failure scenario:** TypeScript error at build. Dev patches by hand, possibly introduces schema regression.
- **Evidence:** `structured-data.ts:313` `export function getArticleJsonLd(opts: {...})`
- **Recommendation:** Phase 04 step 1: read actual signature, write adapter `articleToJsonLdOpts(article)` or update helper to accept `Article` directly. Flag as "adapt don't rewrite".

#### Finding 5: `getProductJsonLd` doesn't exist
- **Lens:** Assumption Destroyer
- **Severity:** High
- **Location:** Phase 02 — JSON-LD inline
- **Issue:** Plan references `getProductJsonLd(product)` but helper doesn't exist in `structured-data.ts`. Phase 02 only mentions "add nếu chưa có" in passing.
- **Failure scenario:** Phase 02 implementation stalls waiting for helper, or devs inline schema inconsistently across products.
- **Evidence:** `grep "export function" structured-data.ts` returns `getHomepageJsonLd`, `getBreadcrumbJsonLd`, `getArticleJsonLd` only
- **Recommendation:** Phase 02 step 0 (new): ADD `getProductJsonLd(product: ProductEntry)` to `structured-data.ts` as explicit deliverable. Schema: Schema.org `Product` + nested `Offer` from price data.

#### Finding 6: `/lien-he` referenced but doesn't exist
- **Lens:** Assumption Destroyer
- **Severity:** High
- **Location:** plan.md URL map ("giữ `/lien-he`"), Phase 06 footer link update
- **Issue:** Plan refers to `/lien-he` as shared legacy to preserve. Page doesn't exist in `src/app/`.
- **Failure scenario:** Phase 06 updates footer to add `/lien-he` link → 404. Sitemap Phase 05 includes `/lien-he` → Google crawl errors.
- **Evidence:** `ls src/app/` shows no `lien-he` directory
- **Recommendation:** Remove `/lien-he` from URL map, sitemap, and nav. Contact flow = existing Zalo CTA + contact section on homepage. Defer `/lien-he` page as separate plan if ever needed.

#### Finding 7: Header LOC will exceed 200 cap post-dropdown
- **Lens:** Scope Critic + Failure Mode
- **Severity:** High
- **Location:** Phase 06 — header dropdown addition
- **Issue:** `header.tsx` currently 163 LOC. Dropdown + mobile accordion likely adds 50-80 LOC → 213-243 LOC, violating project rule "files < 200 LOC".
- **Failure scenario:** Plan acknowledged risk but doesn't commit to extraction upfront. Dev ships >200 LOC header, triggers project-rule violation, requires post-hoc refactor.
- **Evidence:** `wc -l header.tsx` = 163; Phase 06 "Files to Create" includes `nav-dropdown.tsx` as "(new nếu header cần split)"
- **Recommendation:** Phase 06 step 1: **mandatorily** extract `<DesktopNav />` + `<NavDropdown />` + `<MobileMenuTrigger />` from `header.tsx` BEFORE adding products dropdown. Budget header.tsx to < 120 LOC post-extraction.

#### Finding 8: Registry-phase ordering inverted — P03 already done with hardcoded whitelist
- **Lens:** Failure Mode
- **Severity:** High
- **Location:** Phase 03 status + Phase 01
- **Issue:** Phase 03 (MDX articles) was executed FIRST with hardcoded `KNOWN_PRODUCTS` whitelist. Phase 01 registry still pending. The TODO "swap to registry after IA Phase 01" is a tech debt time bomb.
- **Failure scenario:** Phase 01 ships, dev forgets swap → registry has dua-xiem but articles.ts filters against old whitelist that lacks it. Articles for dua-xiem silently dropped.
- **Evidence:** Phase 03 pivot note line 5 "P01 (registry — currently hardcoded whitelist, swap when P01 done)"
- **Recommendation:** Phase 01 acceptance criteria: **add explicit step** "swap `KNOWN_PRODUCTS` hardcoded whitelist in `src/lib/articles.ts` with `getProductSlugs()` from new registry". Make it a blocking checkbox, not a TODO.

### 🟡 MEDIUM

#### Finding 9: Dynamic `[product]/page.tsx` vs static `/xoai-tu-quy/page.tsx` collision risk during Phase 02 migration
- **Lens:** Failure Mode
- **Severity:** Medium
- **Location:** Phase 02 — Implementation steps 5-9
- **Issue:** Plan says "Temporary set dua-xiem active to test dynamic, revert, delete static xoai, verify dynamic serves xoai". This dance has multiple states where `/xoai-tu-quy` could be served by wrong route or 404.
- **Failure scenario:** Mid-deploy, static xoai deleted but dynamic route cache stale → prod 404 on landing page for minutes → SEO + conversion hit.
- **Evidence:** Phase 02 steps 5-9 sequence
- **Recommendation:** Do migration in a SINGLE commit: delete static + add dynamic together. Use `bun run build` locally to verify route tree before push. Vercel deploys are atomic → no mid-state.

#### Finding 10: Sitemap reading MDX files at request time
- **Lens:** Failure Mode
- **Severity:** Medium
- **Location:** Phase 05 — dynamic sitemap
- **Issue:** `sitemap.ts` calls `getUnifiedArticles()` which walks filesystem via `gray-matter`. Next.js may build sitemap at request time or cache it — not clear from plan.
- **Failure scenario:** On Vercel serverless, cold-start sitemap request scans filesystem → slow response → Googlebot timeout → sitemap not indexed. Or: ISR cache stale, sitemap missing new articles for hours.
- **Evidence:** Phase 05 sitemap.ts spec; articles.ts is `server-only` MDX reader
- **Recommendation:** Add `export const dynamic = "force-static"` + `export const revalidate = 3600` to sitemap.ts. Or explicitly pre-build via `generateStaticSitemap` at build time.

#### Finding 11: `/nguon-goc` rewrite risk vs H1/intro keyword preservation
- **Lens:** Failure Mode
- **Severity:** Medium
- **Location:** Phase 07 — `/nguon-goc` rewrite
- **Issue:** Plan says "keep H1 + intro 200 words, add sections". But brainstorm decision was "rewrite content về vựa". If H1 is `Nguồn gốc Xoài Tứ Quý` and rest is mango-specific, user may want broader scope that invalidates H1.
- **Failure scenario:** Dev takes "rewrite" literally → changes H1 to "Về vựa TraiCayBenTre" → loses "xoài tứ quý" ranking. Or dev takes "keep H1" literally → page still looks xoài-only despite multi-product goal → user rejects.
- **Evidence:** Phase 07 "Keep H1" vs brainstorm "rewrite content về vựa"
- **Recommendation:** Phase 07 decision gate: confirm with user whether `/nguon-goc` stays xoai-titled (additive sections below) OR creates new `/ve-chung-toi` page (new URL, no SEO risk). Safer default: **keep H1 + additive only**, flag to user if conflicts.

#### Finding 12: `generateStaticParams` for `[product]` includes coming-soon
- **Lens:** Failure Mode + Scope
- **Severity:** Medium
- **Location:** Phase 02 — `generateStaticParams` returns `getProductSlugs()` (ALL products)
- **Issue:** Plan says "Static params include xoai-tu-quy + dua-xiem-ben-tre (even if coming-soon — for Phase 06 catalog test)". But `[product]/page.tsx` calls `notFound()` for coming-soon → Next.js pre-renders 404 page for `/dua-xiem-ben-tre`. Wastes build time, creates indexable 404.
- **Failure scenario:** Google crawls `/dua-xiem-ben-tre` (linked from `/san-pham` catalog) → soft 404 → hurts domain quality signals. Or: sitemap Phase 05 uses `getActiveProducts()` (not `getAllProducts()`), creating inconsistency where coming-soon is linked-from but not sitemapped.
- **Evidence:** Phase 02 generateStaticParams; Phase 05 sitemap uses `getActiveProducts()`
- **Recommendation:** `generateStaticParams` returns `getActiveProducts().map(p => p.slug)` ONLY. Phase 06 catalog card for coming-soon → render placeholder (no link, or link to anchor `#dua-xiem`), NOT to product route. Consistency: active = routed + linked + sitemapped. Coming-soon = shown in catalog only.

---

## Adjudication Summary

| # | Finding | Severity | Disposition | Target Phase |
|---|---------|----------|-------------|--------------|
| 1 | Type name collision `Product` | Critical | **Accept** — rename to `ProductEntry` | P01 |
| 2 | Legacy manifest duplicate | Critical | **Accept** — reuse `knowledge-data.ts` + `blog-data.ts`, delete manifest plan | P05 |
| 3 | Broken hero image paths | Critical | **Accept** — scout real paths in P01 step 0 | P01 |
| 4 | `getArticleJsonLd` signature mismatch | High | **Accept** — Phase 04 adapter or helper update | P04 |
| 5 | `getProductJsonLd` missing | High | **Accept** — explicit P02 deliverable | P02 |
| 6 | `/lien-he` doesn't exist | High | **Accept** — remove from URL map/sitemap/nav | plan.md, P05, P06 |
| 7 | Header LOC overflow | High | **Accept** — mandatory extraction before dropdown | P06 |
| 8 | Registry ordering inverted | High | **Accept** — Phase 01 blocking checkbox for whitelist swap | P01 |
| 9 | Migration mid-state collision | Medium | **Accept** — single commit atomic migration note | P02 |
| 10 | Sitemap MDX read at request time | Medium | **Accept** — force-static + revalidate | P05 |
| 11 | `/nguon-goc` rewrite scope ambiguous | Medium | **Accept** — confirm with user at P07 start | P07 |
| 12 | Coming-soon in generateStaticParams | Medium | **Accept** — active only in routes + sitemap | P02, P06 |

**Totals:** 12 findings | 3 Critical | 5 High | 4 Medium | All accepted (evidence-based)

## Next Steps

1. User review findings (can reject any)
2. Apply accepted findings → edit target phase files inline with `<!-- red-team P01/F1 -->` markers
3. Update plan.md with Red Team Review section
4. Proceed to `/ck:cook` or run `/ck:plan validate` if want another pass

## Unresolved Questions

1. `/nguon-goc` scope: keep xoài-titled page (additive only) OR create new `/ve-chung-toi`? → User decision before P07
2. Should coming-soon products have a placeholder landing page OR catalog-only listing? → Default: catalog-only (F12 recommendation)
3. Should `src/lib/products.ts` new type be `ProductEntry` or rename `landing-data.ts` `Product` → `ProductCard`? → Default: rename new to avoid touching legacy (F1 recommendation)
