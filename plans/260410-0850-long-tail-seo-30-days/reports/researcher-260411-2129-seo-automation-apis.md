# SEO Automation Strategy Report: Google APIs + IndexNow (2026)

## Executive Summary

For traicaybentre.com, **all recommended indexing strategies are free**. Google deprecated sitemap pings in 2023. Focus on three pillars: **(1) IndexNow** (instant indexing for Bing/Yandex), **(2) Google URL Inspection API** (monitor what Google has indexed), **(3) CrUX API** (monitor Core Web Vitals weekly). Skip Google Indexing API—it's **limited to job postings and livestreams only** and requires manual approval per URL.

---

## Findings & Recommendations

### 1. Google Indexing API — DON'T USE FOR GENERAL PAGES

**Status:** Limited scope, NOT suitable for traicaybentre.

**Constraints:**
- Only for `JobPosting` and `BroadcastEvent` structured data
- Requires approval from Google for each content type
- Default quota: 200 requests/day (can be increased with approval)
- Per-site limit: 600 requests/min, 2,000/day total

**Verdict:** Skip this. Unless your site publishes job listings or livestreams, this API won't help.

---

### 2. URL Inspection API — IMPLEMENT ✓

**Quota:** 2,000 URLs/day per property, 600/min

**Use case:** Weekly batch check 100 URLs → save index status to CSV

**Node.js Code:**

```javascript
// lib/gsc-inspector.js
const { google } = require('googleapis');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/webmasters'],
});

const webmasters = google.webmasters({ version: 'v3', auth });

async function checkIndexStatus(siteUrl, urls) {
  const results = [];
  for (const url of urls) {
    try {
      const response = await webmasters.sites.urlInspection.index({
        siteUrl,
        requestBody: { inspectionUrl: url },
      });
      results.push({
        url,
        indexed: response.data.inspectionResult?.indexStatusResult?.verdict === 'PASS',
        lastCrawled: response.data.inspectionResult?.lastCrawlTime,
        issues: response.data.inspectionResult?.richResultsResult?.detectedItems || [],
      });
    } catch (error) {
      results.push({ url, error: error.message });
    }
  }
  // Save to CSV
  const csv = ['URL,Indexed,LastCrawled,Issues']
    .concat(results.map(r => `"${r.url}",${r.indexed},${r.lastCrawled},${r.issues.length}`))
    .join('\n');
  fs.writeFileSync(`gsc-report-${Date.now()}.csv`, csv);
  return results;
}

module.exports = { checkIndexStatus };
```

**GitHub Actions (weekly):**

```yaml
name: Weekly GSC Index Check
on:
  schedule:
    - cron: '0 9 * * 1' # Every Monday 9 AM UTC
jobs:
  check-index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check index status
        run: node scripts/check-gsc.js
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: gsc-report
          path: gsc-report-*.csv
```

---

### 3. Sitemap Ping — DEPRECATED ✗

**Status:** Google shut down `ping.google.com` in Q4 2023. Returns 404.

**Alternative:** Submit sitemaps via Search Console UI or robots.txt declaration.

```
User-agent: *
Sitemap: https://traicaybentre.com/sitemap.xml
```

---

### 4. IndexNow Protocol — IMPLEMENT ✓

**What it does:** Instant indexing notification to Bing, Yandex, Naver (Google doesn't participate).

**Google's position:** No native support. But 5B+ URLs/day submitted via IndexNow in 2026—useful for secondary engines.

**Setup (15 min):**

1. Generate API key: https://www.indexnow.org/ → Generate → 32-char key
2. Host at `https://traicaybentre.com/{api-key}.txt` (public, no auth)
3. Add to Next.js public dir: `public/[api-key].txt`

**Node.js implementation:**

```javascript
// lib/indexnow-submitter.js
async function submitToIndexNow(urls, apiKey, domain) {
  const payload = {
    host: domain,
    key: apiKey,
    keyLocation: `https://${domain}/${apiKey}.txt`,
    urlList: urls, // Max 10,000 per request
  };

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response.status === 202; // Accepted
}

// Next.js App Router example
// app/api/indexnow/route.ts
import { submitToIndexNow } from '@/lib/indexnow-submitter';

export async function POST(request: Request) {
  const { urls } = await request.json();
  const success = await submitToIndexNow(
    urls,
    process.env.INDEXNOW_API_KEY,
    'traicaybentre.com'
  );
  return Response.json({ success });
}
```

**Trigger on publish:** Add to your article publish workflow (e.g., CMS hook → call `/api/indexnow`).

---

### 5. Google Search Console API — IMPLEMENT ✓

**Quota:** 2,000 queries/day, 600/min

**Use case:** Weekly pull 10 target keywords → track CTR/position → save CSV

**Setup:**

1. Create service account (GCP Console → IAM)
2. Add service account as Owner in Search Console
3. Download JSON key → `GOOGLE_SERVICE_ACCOUNT_KEY`

**Node.js Code:**

```javascript
// lib/gsc-performance.js
const { google } = require('googleapis');
const fs = require('fs');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.webmasters({ version: 'v1', auth });

async function getKeywordMetrics(siteUrl, keywords, days = 30) {
  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const endDate = now.toISOString().split('T')[0];

  const results = [];
  for (const query of keywords) {
    const response = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        dimensionFilterGroups: [
          {
            filters: [{ dimension: 'query', operator: 'equals', value: query }],
          },
        ],
      },
    });

    const row = response.data.rows?.[0] || {};
    results.push({
      keyword: query,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: (row.ctr * 100).toFixed(2) + '%',
      position: row.position?.toFixed(1) || 'N/A',
    });
  }

  // Write CSV
  const csv = ['Keyword,Clicks,Impressions,CTR,Avg Position']
    .concat(
      results.map(
        r =>
          `"${r.keyword}",${r.clicks},${r.impressions},${r.ctr},${r.position}`
      )
    )
    .join('\n');
  fs.writeFileSync(`gsc-keywords-${Date.now()}.csv`, csv);
  return results;
}

module.exports = { getKeywordMetrics };
```

**GitHub Actions (weekly):**

```yaml
name: Weekly GSC Keyword Report
on:
  schedule:
    - cron: '0 9 * * 1'
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node scripts/gsc-keywords.js
        env:
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
      - name: Commit report
        run: |
          git config user.name "SEO Bot"
          git config user.email "bot@traicaybentre.com"
          git add gsc-keywords-*.csv
          git commit -m "chore: weekly GSC report"
          git push
```

---

### 6. GSC Ranking Drop Alerts — IMPLEMENT ✓

**Trigger:** If any keyword drops >20% position in a week.

**Code snippet (extend above):**

```javascript
async function detectRankingDrops(prevReport, currentReport, threshold = 0.2) {
  const alerts = [];
  for (const current of currentReport) {
    const prev = prevReport.find(r => r.keyword === current.keyword);
    if (!prev) continue;

    const positionDrop = (prev.position - current.position) / prev.position;
    if (positionDrop > threshold) {
      alerts.push({
        keyword: current.keyword,
        prevPosition: prev.position,
        currentPosition: current.position,
        drop: (positionDrop * 100).toFixed(1) + '%',
      });
    }
  }
  return alerts;
}

// Slack notification
async function sendSlackAlert(alerts) {
  const blocks = [
    {
      type: 'header',
      text: { type: 'plain_text', text: '🚨 Ranking Drops Detected' },
    },
    ...alerts.map(a => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${a.keyword}*\nPos: ${a.prevPosition} → ${a.currentPosition} (${a.drop})`,
      },
    })),
  ];
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ blocks }),
  });
}
```

---

### 7. Robots.txt + Crawl Budget Optimization — FREE BOOST ✓

**Impact:** Modest (10-20% faster crawl on established sites).

**Best practices:**

```
# robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /.next/
Disallow: /private/

Crawl-delay: 1 # Respectful crawl rate
Request-rate: 30/60 # 30 requests per 60 seconds

Sitemap: https://traicaybentre.com/sitemap.xml

# Separate rule for slower bots
User-agent: AhrefsBot
Crawl-delay: 10
```

**Next.js route:** Add `public/robots.txt` (static) or use `next-sitemap` for dynamic generation.

---

### 8. CrUX API — IMPLEMENT ✓

**What:** Free Core Web Vitals data (LCP, INP, CLS) from real Chrome users.

**Note:** FID replaced by INP in Mar 2024.

**Quota:** Unlimited free tier (10 requests/sec)

**Node.js Code:**

```javascript
// lib/crux-monitor.js
async function getCoreWebVitals(url) {
  const response = await fetch(
    'https://chromeuxreport.googleapis.com/v1/records:queryRecord' +
    `?key=${process.env.GOOGLE_CRUx_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({ url }),
    }
  );
  const data = await response.json();
  const metrics = data.record?.metrics || {};

  return {
    url,
    lcp: metrics.largest_contentful_paint?.percentiles?.[75] || null,
    inp: metrics.interaction_to_next_paint?.percentiles?.[75] || null,
    cls: metrics.cumulative_layout_shift?.percentiles?.[75] || null,
    timestamp: new Date().toISOString(),
  };
}

// GitHub Actions: Weekly CrUX check
// scripts/monitor-crux.js
const urls = [
  'https://traicaybentre.com',
  'https://traicaybentre.com/tin-tuc',
];
for (const url of urls) {
  const vitals = await getCoreWebVitals(url);
  console.log(vitals);
  // Compare to thresholds: LCP < 2500ms, INP < 200ms, CLS < 0.1
  if (vitals.lcp > 2500 || vitals.inp > 200 || vitals.cls > 0.1) {
    // Alert
  }
}
```

**GitHub Actions:**

```yaml
name: Weekly CrUX Monitor
on:
  schedule:
    - cron: '0 10 * * 1'
jobs:
  crux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: node scripts/monitor-crux.js
        env:
          GOOGLE_CRUX_API_KEY: ${{ secrets.GOOGLE_CRUX_API_KEY }}
```

---

### 9. Rich Results Testing — BATCH API NOT AVAILABLE ✗

**Blocker:** Google deprecated the Structured Data Testing Tool API in 2019 and has **no batch API** for Rich Results Test.

**Workaround:**

- Use third-party tool (Apify Actor, Screaming Frog) for bulk schema validation
- OR run URL Inspection API (returns rich result status for indexed pages only)

**For simple pages:** Manually test at https://search.google.com/test/rich-results (5 min/page max).

---

### 10. Google Business Profile API — IMPLEMENT ✓

**What:** Auto-post updates, events, products back to your site.

**Setup:** https://developers.google.com/my-business

**Use case:** Link Google posts to blog articles.

**Node.js Code (basic):**

```javascript
// lib/gbp-publisher.js
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/business.manage'],
});

const mybusiness = google.mybusiness({ version: 'v4', auth });

async function publishGBPPost(accountId, locationId, post) {
  const response = await mybusiness.accounts.locations.posts.create({
    parent: `accounts/${accountId}/locations/${locationId}`,
    requestBody: {
      summary: post.title,
      description: post.body,
      callToAction: {
        actionType: 'LEARN_MORE',
        url: post.link,
      },
      media: [{ mediaFormat: 'IMAGE', sourceUrl: post.imageUrl }],
    },
  });
  return response.data;
}

module.exports = { publishGBPPost };
```

**Cost:** Free

---

## Implementation Priority & Timeline

| Phase | Task | Effort | Benefit |
|-------|------|--------|---------|
| **Week 1** | Setup IndexNow (api key + .txt file) | 15 min | Instant Bing/Yandex indexing |
| **Week 1** | Setup Google service account → GSC owner | 20 min | Foundation for all APIs |
| **Week 2** | Deploy URL Inspection batch checker | 2 hrs | Weekly index monitoring |
| **Week 2** | Deploy GSC keyword tracker (10 keywords) | 3 hrs | Weekly ranking trend data |
| **Week 3** | Add ranking-drop alerts → Slack | 1 hr | Early warning system |
| **Week 3** | Deploy CrUX monitor (homepage + 5 top pages) | 2 hrs | Weekly performance alerts |
| **Week 4** | Integrate IndexNow into publish workflow | 1 hr | Automatic Bing/Yandex updates |

---

## Unresolved Questions

1. **Which 10 keywords to track?** Need list of target long-tail keywords for your site.
2. **Slack workspace configured?** Need webhook URL for alerts (`SLACK_WEBHOOK_URL`).
3. **Existing monitoring in place?** Any dashboards/tools you use today that should integrate with this?
4. **Multi-language crawl budget?** If Vietnamese + English content, does robots.txt need language targeting?

---

## Cost Summary

| Tool | Cost | Quotas |
|------|------|--------|
| Indexing API | FREE | 200/day (job postings only; skip) |
| URL Inspection API | FREE | 2,000/day per property |
| GSC Performance API | FREE | 2,000 queries/day, 600/min |
| CrUX API | FREE | 10 req/sec unlimited |
| IndexNow | FREE | Unlimited submissions |
| GitHub Actions | FREE (public repo) | 2,000 min/month |
| **Total** | **$0** | — |

---

## Sources

- [Google Indexing API Quota](https://developers.google.com/search/apis/indexing-api/v3/quota-pricing)
- [URL Inspection API Overview](https://developers.google.com/search/blog/2022/01/url-inspection-api)
- [Sitemap Ping Deprecation (2023)](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)
- [IndexNow Documentation](https://www.indexnow.org/documentation)
- [GSC API - Getting Performance Data](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data)
- [CrUX API + Core Web Vitals](https://developers.google.com/codelabs/chrome-web-vitals-psi-crux)
- [Google Business Profile API](https://developers.google.com/my-business)
- [FreeCodeCamp: IndexNow + Next.js](https://www.freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/)
- [Incremys: GSC API 2026 Guide](https://www.incremys.com/en/resources/blog/google-search-console-api)
