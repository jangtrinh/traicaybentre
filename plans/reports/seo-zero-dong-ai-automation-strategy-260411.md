---
type: strategy
date: 2026-04-11
slug: seo-zero-dong-ai-automation
status: approved
---

# Chiến Lược SEO 0 Đồng — AI Tự Động 100%

**Goal:** Tăng 200-400 indexed pages + instant indexing + auto content refresh. Zero budget. AI thực hiện toàn bộ.

## 7 Chiến Thuật (xếp theo impact)

---

### 1. 🔥 Programmatic SEO — 126+ City Landing Pages

**Concept:** Auto-generate `/giao-hang/{tinh}` cho 63 tỉnh × 2 sản phẩm (xoài + dừa) = 126 pages.

**Implementation:**
```
src/app/giao-hang/[city]/page.tsx  (dynamic route)
src/content/cities.ts              (63 tỉnh data: name, slug, shipping time, method)
```

Mỗi page tự generate:
- H1: "Giao {product} Bến Tre đến {city} — {time} từ vựa"
- Shipping details (xe lạnh/bay, thời gian, phí ước tính)
- FAQ 3-5 câu (auto-template + city-specific)
- CTA Zalo pre-filled "{city}"
- Schema LocalBusiness + Service
- Canonical URL unique per city

**Unique content per page:** shipping time khác, phí khác, FAQ khác, testimonial filter by region → KHÔNG thin content.

**Effort:** 4-6 giờ code
**Pages:** +126 (hiện có 3: HN, HCM, ĐN)
**Impact:** HIGH — local search "giao dừa xiêm {city}" hầu như 0 competition

---

### 2. ⚡ IndexNow API — Instant Indexing

**Concept:** Khi push content mới → auto-notify Bing/Yandex/Seznam crawl ngay lập tức. Google chưa official support nhưng benefits từ Bing index.

**Implementation:**
```
src/app/api/indexnow/route.ts       (API route)
public/{api-key}.txt                (verification file)
.github/workflows/indexnow.yml      (trigger on MDX push)
```

```ts
// src/app/api/indexnow/route.ts
export async function POST(req) {
  const { urls } = await req.json();
  await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: "www.traicaybentre.com",
      key: process.env.INDEXNOW_KEY,
      urlList: urls,
    }),
  });
}
```

**Effort:** 1 giờ
**Impact:** HIGH — pages indexed trong minutes thay vì days/weeks

---

### 3. 📊 Google Indexing API — 200 URL/ngày Submit

**Concept:** Programmatic submit URLs to Google cho faster crawling. 200 URLs/day quota.

**Implementation:**
```
scripts/submit-google-indexing.js
.github/workflows/google-indexing-daily.yml  (cron daily)
```

GitHub Actions cron chạy daily:
1. Read sitemap
2. Filter URLs chưa submit (track in `.indexed-urls.json`)
3. Submit batch 200 URLs via Indexing API
4. Log results

**Quota:** 200 URLs/day → 126 city pages indexed trong 1 ngày!

**Effort:** 3 giờ (GCP service account + script)
**Impact:** HIGH — combine với IndexNow = double coverage

---

### 4. 🔄 Auto Content Refresh — Cron Update Stale Content

**Concept:** GitHub Actions cron weekly:
- Update "cập nhật {date}" references trong price articles
- Re-generate price tables từ PRICE_DATA
- Touch `updatedAt` field → signal freshness to Google
- Auto-commit + push → trigger ISR

**Implementation:**
```
scripts/refresh-content.js
.github/workflows/content-refresh-weekly.yml
```

**Effort:** 2 giờ
**Impact:** MEDIUM-HIGH — Google rewards fresh content, especially price/date pages

---

### 5. 📋 Auto FAQ/PAA Expansion

**Concept:** For each existing article, AI auto-generate 5-10 thêm FAQ (People Also Ask style). Append to existing MDX frontmatter `faq` array.

**Implementation:**
- Script reads existing articles
- For each article without `faq` or with < 5 FAQ → generate thêm
- Each FAQ targets a long-tail variation
- FAQPage schema auto-generated → free rich snippets

**Effort:** 3 giờ
**Pages affected:** All 100+ articles gain FAQ sections
**Impact:** MEDIUM — each FAQ = 1 chance for PAA featured snippet

---

### 6. 📡 RSS Feed + Sitemap Ping

**Concept:**
- Auto-generate RSS feed (`/feed.xml`) từ articles
- Ping Google + Bing khi sitemap updates:
  - `https://www.google.com/ping?sitemap=https://www.traicaybentre.com/sitemap.xml`
  - `https://www.bing.com/ping?sitemap=https://www.traicaybentre.com/sitemap.xml`
- RSS syndication to aggregators (Feedly, etc.) = free discovery

**Implementation:**
```
src/app/feed.xml/route.ts  (RSS route)
scripts/ping-search-engines.sh
```

**Effort:** 1 giờ
**Impact:** MEDIUM — faster discovery + RSS readers as referral traffic

---

### 7. 🏢 Google Business Profile Auto-Post

**Concept:** Auto-post weekly updates to Google Business Profile via API:
- "Xoài Tứ Quý VIP giá 23k/kg — đặt ngay!"
- "Dừa xiêm sọ mới gọt — ship lạnh HCM 24h"
- Each post = backlink + local ranking signal

**Implementation:**
```
scripts/gbp-auto-post.js
.github/workflows/gbp-weekly-post.yml
```

**Effort:** 2 giờ (đã có GBP API setup)
**Impact:** MEDIUM — local pack ranking + brand visibility

---

## Execution Roadmap

### Phase 1: Foundation (Week 1) — 10 giờ total

| Day | Task | Pages/Impact |
|---|---|---|
| 1 | IndexNow API setup + verification | Instant indexing ON |
| 1 | RSS feed route | Discovery channel ON |
| 2 | Sitemap ping script + GitHub Actions | Auto-notify engines |
| 2-3 | Google Indexing API setup (GCP service account) | 200 URL/day submit |
| 3-5 | **Programmatic SEO: 63 tỉnh data + dynamic route** | +126 pages |
| 5 | Submit 126 city pages via Indexing API | All indexed day 1 |

### Phase 2: Content Enhancement (Week 2) — 5 giờ

| Day | Task | Impact |
|---|---|---|
| 6 | Auto FAQ expansion script | 100+ articles gain FAQPage schema |
| 7 | Content refresh cron setup | Weekly auto-freshness signal |
| 8 | GBP auto-post setup | Weekly local ranking boost |

### Phase 3: Monitor + Iterate (Week 3-4) — 2 giờ

| Day | Task |
|---|---|
| 14 | GSC check: 126 city pages indexed? |
| 21 | GSC check: ranking movement on city keywords? |
| 28 | Decision: expand to more templates (event pages, comparison pages)? |

## Expected Results (30 days)

| Metric | Before | After |
|---|---|---|
| Indexed pages | ~110 | **~240** (+126 city) |
| Avg time to index new page | 3-7 days | **Minutes** (IndexNow) |
| FAQPage rich snippets | ~20 pages | **100+ pages** |
| Local keyword coverage | 3 cities | **63 tỉnh** |
| Weekly content freshness | Manual | **Auto cron** |
| Backlinks (syndication) | ~105 | Auto-growing |

## Risk Assessment

| Risk | Mitigation |
|---|---|
| 126 city pages = thin content penalty | Each page has unique shipping data + FAQ + testimonial. NOT boilerplate. |
| Google Indexing API quota exceeded | 200/day is generous. 126 pages = 1 day. Use for NEW pages only. |
| IndexNow not supported by Google (yet) | Still benefits from Bing + Yandex. Google may adopt in future. |
| Content refresh over-optimization | Only update factual data (prices, dates). Don't rewrite core content. |
| FAQ expansion looks spammy | Each FAQ manually relevant to article topic. Quality > quantity. |

## Code Files to Create

| File | Purpose |
|---|---|
| `src/content/cities.ts` | 63 tỉnh data (name, slug, region, shipping time/method/cost) |
| `src/app/giao-hang/[city]/page.tsx` | Dynamic city landing template |
| `src/app/api/indexnow/route.ts` | IndexNow API endpoint |
| `src/app/feed.xml/route.ts` | RSS feed |
| `scripts/submit-google-indexing.js` | Google Indexing API batch submit |
| `scripts/refresh-content.js` | Auto-update stale content |
| `scripts/ping-search-engines.sh` | Sitemap ping |
| `scripts/expand-faq.js` | Auto-generate FAQ for articles |
| `.github/workflows/indexnow.yml` | Trigger IndexNow on push |
| `.github/workflows/google-indexing-daily.yml` | Daily indexing submit |
| `.github/workflows/content-refresh-weekly.yml` | Weekly content refresh |
