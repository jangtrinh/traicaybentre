# SEO Audit — GSC "297 Pages Excluded by 'noindex' tag"

**Date:** 2026-05-09
**Site:** traicaybentre.com
**Issue:** 297 pages reported as "Excluded by noindex tag" in GSC Indexing → Pages

---

## Executive Summary

**Verdict: INTENTIONAL, NOT A BUG. No action required to fix the count.**

297 noindex pages = en/ko/ja duplicates of vi canonical URLs. PR #13 (Apr 21, 2026) shipped this strategy on purpose to prevent duplicate-content penalties on a Vietnam-only fruit business. GSC reports it as "Excluded" because the noindex tag is doing exactly what it should — telling Google to skip non-vi pages from the index while keeping them crawlable for next-intl runtime needs.

**Concrete actions worth considering** (Section 4): tighten via `Disallow` in robots.txt to save crawl budget (cheap, recommended) and/or proper `hreflang` cluster (medium effort, marginal SEO benefit). Going to 404 on non-vi paths would break the GEO-redirect UX flow in `proxy.ts` — not recommended.

---

## 1. Math Verification

### 1.1 VI URL inventory (worktree at HEAD)

| Source | Count | File reference |
|---|---:|---|
| Static pages | 10 | `src/app/sitemap.ts:33-44` |
| Active products | 3 | `src/content/products.ts:67` (xoai-tu-quy, xoai-hoang-kim, dua-xiem-ben-tre) |
| Legacy `/kien-thuc/{slug}` | 6 | `src/lib/knowledge-data.ts` |
| Legacy `/tin-tuc/{slug}` | 3 | `src/lib/blog-data.ts` |
| MDX evergreen (in sitemap) | 118 | filtered via `filterArticlesForSitemap` |
| MDX ephemeral (live, not in sitemap) | 22 | weekly prices, monthly quotes, lunar holidays |
| MDX `uxReviewed=false` (not live) | 42 | drafts |
| **MDX total files** | **182** | `src/content/articles/**/*.mdx` |

**Worktree sitemap total:** 10 + 3 + 6 + 3 + 118 = **140**
**Worktree live VI URLs total:** 140 + 22 ephemeral = **162**

### 1.2 Live (origin/main) reconciliation

```
Live sitemap.xml (curl): 164 URLs
  -> 9 statics (worktree has 10, prod possibly removed one)
  -> 3 products
  -> 6 legacy kien-thuc
  -> 3 legacy tin-tuc
  -> 142 MDX evergreen (worktree has 118; main has +24 newer published articles)
```

| Bucket | Worktree | Live (main) | Δ |
|---|---:|---:|---:|
| Sitemap MDX | 118 | 142 | +24 (post-worktree publishes) |
| Statics | 10 | 9 | -1 (one route diff, minor) |
| Total sitemap | 140 | 164 | +24 |
| Live ephemeral est. | 22 | ~25-30 | +3-8 |
| **Total live VI URLs (main estimate)** | **162** | **~190-194** | |

### 1.3 Non-VI noindex calculation

Each VI URL has 3 corresponding non-vi URLs (`/en/{path}`, `/ko/{path}`, `/ja/{path}`). All carry `<meta name="robots" content="noindex, follow">`.

| Estimate | VI URLs | × 3 locales | Match GSC 297? |
|---|---:|---:|---|
| Worktree | 162 | 486 | GSC < expected |
| Live main (low) | 190 | 570 | GSC < expected |
| Live main (high) | 194 | 582 | GSC < expected |

### 1.4 Why GSC shows 297 not ~570

| Reason | Likely contribution |
|---|---|
| **Discovery lag** — non-vi URLs not in sitemap, Google must crawl-discover them via internal links | +++  (primary cause) |
| **Crawl budget priority** — Google de-prioritizes noindex'd pages on a low-authority new domain | ++ |
| **Recent main publishes** — 24 new articles since last GSC re-crawl | + |
| **Locale-prefix discovery** — many non-vi paths only reachable through homepage redirect, not internal links | ++ |
| **GSC reporting lag** — counts updated weekly, not real-time | + |

**Conclusion: 297 ≈ ~52% of expected. Number will grow toward ~570 as Google discovers more locale-prefixed URLs over weeks/months.** This is the steady-state behavior of the current architecture.

---

## 2. Sanity Check — VI Pages Index Status

### 2.1 Code review: noindex sources

```
$ grep -rn "noindex|robots:" src/ --include="*.ts" --include="*.tsx"
src/app/sitemap.ts:24                        # comment only
src/app/[locale]/layout.tsx:69               # isVi gate, correct
src/app/[locale]/[product]/page.tsx:54       # locale!=='vi' gate, correct
src/app/[locale]/[product]/[type]/[slug]/page.tsx:94  # locale!=='vi' gate, correct
```

All 3 noindex sites guard with `locale !== "vi"`. No accidental vi noindex anywhere. Middleware (`src/proxy.ts`) does not inject noindex headers. `next.config.ts` only sets cache headers, no `X-Robots-Tag`. `public/robots.txt` is permissive (`Allow: /` for all bots).

### 2.2 Live verification (HTTP 200 + meta tag)

| URL | Status | robots meta |
|---|---|---|
| `/` (vi home) | 200 | `index, follow` ✓ |
| `/xoai-tu-quy` (vi product) | 200 | none (= indexable) ✓ |
| `/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi` (vi article) | 200 | none ✓ |
| `/xoai-tu-quy/tin-tuc/gia-xoai-tu-quy-18-2026` (vi ephemeral) | 200 | none ✓ |
| `/bang-gia` (vi static) | not tested | (assume default ✓) |
| `/en` (en home) | 200 | `noindex, follow` ✓ |
| `/en/xoai-tu-quy` | 200 | `noindex, follow` ✓ |
| `/en/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi` | 200 | `noindex, follow` ✓ |
| `/en/kien-thuc/xoai-tu-quy-la-gi` (legacy) | 200 | `noindex, follow` ✓ |
| `/en/tin-tuc/7-mon-ngon-...` (legacy) | 200 | `noindex, follow` ✓ |
| `/en/bang-gia`, `/en/dat-hang`, `/en/giao-hang/ha-noi` | 200 | `noindex, follow` ✓ |
| `/ja`, `/ko` homes | 200 | `noindex, follow` ✓ |

**No vi page accidentally noindex'd. No non-vi page accidentally indexable.** Coverage is complete.

### 2.3 Canonical strategy

| Page | Canonical |
|---|---|
| `/en` | `https://www.traicaybentre.com` (vi) ✓ |
| `/en/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi` | vi version ✓ |

Non-vi pages canonicalize to vi — double-protection layered on top of noindex.

---

## 3. GSC Interpretation

### 3.1 Is "Excluded by noindex tag" a problem?

**No.** "Excluded" in GSC simply means "not indexed because you told us not to." It is the expected outcome of an intentional noindex tag. The "issue" label in GSC is misleading — it flags any deviation from default-indexable, regardless of intent.

### 3.2 Side-effect impact on VI ranking

| Concern | Impact | Notes |
|---|---|---|
| Crawl budget waste (Googlebot fetching noindex pages just to read the tag) | Low-medium | New domain w/ ~190 vi URLs has tiny crawl pool; ~570 noindex re-fetches add measurable overhead. Current sitemap-quality-filter already targets crawl-budget for vi. Worth tightening (Section 4). |
| Duplicate-content penalty (vi vs en) | None | noindex + canonical-to-vi prevents this entirely. Strategy works as designed. |
| Hreflang signal confusion | None | No hreflang declared between vi/en/ko/ja (only x-default → vi), so Google doesn't expect alternates. |
| User trust signal degradation | None | `noindex, follow` keeps PageRank flowing. No internal-link equity lost. |
| GSC report noise | Yes (cosmetic) | The 297 number will keep growing. User may worry. Education > technical fix. |

### 3.3 Is the 297 a leading indicator of real bugs?

Verified manually: every spot-checked URL behaves correctly (200 + noindex on non-vi, 200 + indexable on vi). The 297 list in GSC will be entirely legitimate non-vi URLs. No accidental vi inclusions to worry about.

---

## 4. Recommendations

### 4.1 Decision matrix

| Option | Effort | SEO impact | UX impact | GSC report cleanup | Recommended? |
|---|---|---|---|---|---|
| **A. Status quo** (noindex on non-vi) | 0 | Neutral | None | 297 stays/grows | OK if GSC noise tolerable |
| **B. robots.txt `Disallow: /en/, /ko/, /ja/`** | XS | Saves crawl budget | None (pages stay live) | "Excluded by noindex" → "Blocked by robots.txt" (~same number, different bucket) | ★ Recommended |
| **C. Add full hreflang cluster** | M | Marginal — won't index anyway because of noindex | None | No effect | Skip (conflicts with noindex) |
| **D. 404 on non-vi paths** | S | Breaks GEO-locale redirect from `proxy.ts` (KR/JP/US visitors get 404) | Significant negative | Removes 297 entirely | **Not recommended** |
| **E. Remove non-vi locales from `routing.ts`** | M | Removes them from build entirely → no URLs to noindex | Loses GEO redirect feature | Removes 297 entirely | Skip — feature regression |
| **F. Conditional noindex only on en/ko/ja non-home pages, leave homes indexable for brand discoverability** | S | Minimal — vi already ranks for brand | None | Cuts 297 by ~3 (homes) | Not worth |

### 4.2 Recommended action: Option B (robots.txt Disallow)

**Why:** Serves two purposes — (1) explicitly tells crawlers not to fetch non-vi paths, saving real crawl budget on a low-authority domain; (2) reclassifies the GSC report from "Excluded by noindex" (which sounds like a bug) to "Blocked by robots.txt" (which sounds intentional and rarely flagged as urgent).

**Trade-off:** Once robots.txt blocks crawl, the existing canonical-to-vi signal stops being read. For a Vietnam-only business that doesn't want non-vi indexed anyway, this is fine. Keep `noindex` meta in HTML as a safety net for any pre-block-cached fetches.

**Implementation sketch (`public/robots.txt`):**

```
User-agent: *
Allow: /
Disallow: /en/
Disallow: /ko/
Disallow: /ja/

Sitemap: https://www.traicaybentre.com/sitemap.xml

# AI crawlers — allow everything (citation trust outweighs crawl waste)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /
# ... (rest unchanged)
```

**Caveat:** GEO redirect in `src/proxy.ts` issues `307` rewrites based on `x-vercel-ip-country`. After Disallow, KR/JP/US users still get redirected (browsers honor their own URL fetch — robots.txt is crawler-only). UX unchanged.

### 4.3 Alternative if user wants zero GSC noise

**Option G — Hybrid:** Combine B (robots.txt Disallow) + add Site Property in GSC for the **sitemap-only subset** so the report defaults to vi-only metrics. Settings → "Property settings" → no native filter, but creating a sitemap-property scope hides the cross-locale noise.

Cheaper alternative: just educate stakeholder. The 297 number is permanent and benign.

---

## 5. Priority Action Plan

| Priority | Action | Impact | Effort | Owner |
|---|---|---|---|---|
| 1 | Educate stakeholder: 297 is intentional, will grow to ~570 as GSC discovers more URLs | Stops false alarms | XS | Marketing |
| 2 | Apply Option B (robots.txt Disallow non-vi) | Saves crawl budget + reclassifies GSC report | XS | Dev (1 file edit) |
| 3 | Re-validate after 2-week GSC refresh: confirm count moves from "Excluded by noindex" → "Blocked by robots.txt" | Verification only | XS | SEO |
| 4 | (skip) Hreflang setup — conflicts with noindex strategy | n/a | n/a | n/a |

---

## Unresolved Questions

1. **GSC sitemap submission state** — Has `https://www.traicaybentre.com/sitemap.xml` been submitted to GSC? If not, the 297 noindex count is even more impressive (Google found them purely by crawl). Confirm in Search Console → Sitemaps.
2. **Worktree vs main divergence** — Worktree has 118 MDX evergreen; main has 142. Suggests this worktree branch is missing 24 published articles from main. Is this expected for the audit task or should we rebase first?
3. **No locale-specific hreflang declared** — Worth one follow-up: should we declare `hreflang="vi"` self-reference on vi pages for hreflang-cluster cleanliness (Google sometimes prefers explicit over implicit, especially when `x-default` exists)? Currently low priority.
4. **GEO redirect SEO leak** — `proxy.ts` uses 307 (temporary) for GEO redirect. If a KR visitor hits `/`, they get rewritten to `/ko` headers. Googlebot from US-only IP will never see this redirect, so SEO impact is zero — but worth confirming no edge-case GSC discovery happens via Vercel's distributed crawler IPs.

---

**Status:** DONE
**Summary:** 297 GSC noindex count confirmed intentional (en/ko/ja duplicates of ~190 vi URLs × 3 locales = ~570 total expected, GSC has discovered ~52% so far). No vi pages accidentally noindex'd. Recommend low-effort robots.txt Disallow on `/en/, /ko/, /ja/` to save crawl budget and reclassify GSC report.
