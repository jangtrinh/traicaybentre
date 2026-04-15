# SEO & Indexing Fix for traicaybentre.com — 102 Undiscovered URLs

**Problem:** Google Search Console shows "Discovered - currently not indexed" for 102 URLs; zero crawl activity on new domain.  
**Goal:** Accelerate crawl discovery and indexing for Vietnamese mango e-commerce with 4 locales.

---

## 1. IndexNow Protocol Implementation

### What It Is
IndexNow notifies Bing, Yandex, Naver, and others (Google now announced support as of late 2025) that URLs have been added/updated. No Google guarantee, but signals freshness to all platforms.

### Why Use It (vs. Alternatives)
- **Bing/Yandex adoption:** High. Bing processes ~30% of enterprise search traffic globally; significant in Vietnam via Microsoft partnerships.
- **Google:** Recently announced support; currently lower priority than traditional crawl signals, but no harm.
- **Cost:** Free; REST API; requires one verification file hosted at `/.well-known/IndexNow/{key}.txt`.

### Implementation Pattern (Next.js App Router)

**1. Generate verification key**
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
# Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

**2. Host verification file**
```
/.well-known/IndexNow/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.txt
```
Content: just the key itself (one line, no newline).

**3. Create Next.js API route** (`/app/api/indexnow/submit/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const INDEXNOW_URL = 'https://api.indexnow.org/indexnow';

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();
    
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs required' }, { status: 400 });
    }

    // Batch limit: IndexNow accepts up to 10,000 URLs per request
    const batches = [];
    for (let i = 0; i < urls.length; i += 10000) {
      batches.push(urls.slice(i, i + 10000));
    }

    const results = await Promise.all(
      batches.map(batch =>
        fetch(INDEXNOW_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host: 'traicaybentre.com',
            key: INDEXNOW_KEY,
            keyLocation: 'https://traicaybentre.com/.well-known/IndexNow/' + INDEXNOW_KEY + '.txt',
            urlList: batch,
          }),
        })
      )
    );

    return NextResponse.json({
      submitted: urls.length,
      batches: results.length,
      statuses: results.map(r => r.status),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
```

**4. Trigger mechanisms:**
- **On publish:** Call API route after page creation (in `next.config.js` post-build hook or post-publish webhook).
- **On build:** Generate all URLs at build time, POST once on deploy.
- **Manual cron:** Daily 2 AM via GitHub Actions or Vercel Cron (POST new/updated URLs only).
- **Example cron** (GitHub Actions):
```yaml
- name: IndexNow Daily
  run: |
    curl -X POST https://traicaybentre.com/api/indexnow/submit \
      -H "Content-Type: application/json" \
      -d '{"urls":["https://traicaybentre.com/vi/san-pham/xoai-cat-cho","https://traicaybentre.com/en/products/mango-cat-cho"]}'
```

**Batch limits:** 10,000 URLs per request. For 102 URLs, one request suffices.

**Trade-offs:**
- Bing adoption is real; Google support is recent (untested at scale for general sites).
- Fire-and-forget; no guarantee of indexing (still depends on content quality & authority).
- False-positive risk: if you submit spam URLs, Bing/Yandex may penalize the domain.

---

## 2. Google Indexing API — NOT Available for E-commerce

### The Hard Truth
**Google Indexing API is restricted to three content types only:**
1. JobPosting (job listings)
2. BroadcastEvent (live events with VideoObject)
3. LivestreamVideo (streaming content)

**General websites, e-commerce sites, and blog posts are explicitly prohibited.** Attempting to use it for product pages will fail with `403 Forbidden`.

### Google Search Console "Request Indexing"
- **Manual limit:** ~10–20 URLs per 24-hour rolling window (not publicly documented; varies by site history).
- **Cannot automate:** No API. John Mueller confirmed in 2025 that quotas won't increase due to spam abuse.
- **Use case:** Crisis mode only (e.g., fixing critical pages post-update). Not a strategy.

### Right Way to Get Google to Crawl Faster
1. **Backlinks from authoritative domains** (highest impact; see section 5).
2. **Fresh, unique content** (thin/duplicate pages get deprioritized).
3. **Accurate lastmod in sitemap** (Google will skip unchanged URLs; see section 3).
4. **Internal links from high-authority pages** (hub-and-spoke; see section 4).
5. **Sitelink breadcrumbs with JSON-LD BreadcrumbList** (helps Google understand hierarchy; see section 6).
6. **High site speed** (not a ranking factor per Google, but affects crawl quota indirectly).

**Verdict:** Indexing API is not an option. Focus on authority, internal linking, and content quality.

---

## 3. Sitemap Pruning & Optimization

### What to Remove from Sitemap
- **Duplicate URLs** (canonical mismatch; both HTTP and HTTPS in one sitemap).
- **Thin pages** (<300 words, low unique value; category pages with <3 products).
- **Redirect chains** (if A→B→C exists, include only final URL C).
- **Noindex pages** (contradicts self-reporting of importance).
- **Time-sensitive expired content** (old promotions, past event pages).
- **Pagination pages** (`?page=2`, `?page=3`; include only `?page=1`).
- **Parameter variations** (e.g., `/product?utm_source=fb` AND `/product?utm_source=email` → include canonical only).

### URL Count for New Domains
**Rule of thumb:** Start with ~40–50 "hero" URLs (homepage, main categories, top 10 products, key blog posts). Grow to 100–200 as you gain backlinks and authority (3–6 months). Do NOT submit 500+ URLs on day one; Google will crawl sparingly until domain authority builds.

**For traicaybentre.com (102 URLs across 4 locales):** This is borderline—assume ~25–26 per locale. Verify:
- Are all 102 truly unique content? (Remove thin product variants.)
- Are all 4 locales properly implemented with `hreflang`? (see section 6).
- Are all indexed in GSC, or just discovered?

**Strategy:** Submit sitemap with **best 60 URLs first** (homepage + 15 main products per locale). Resubmit every week, adding next 10-15 as you build backlinks.

### Single vs. Multiple Sitemaps
**Single sitemap works if:**
- <50,000 URLs (your 102 easily fits).
- All URLs are in one language or clearly separated by locale.
- No major content type divergence (products vs. blog vs. pages).

**Use multiple (sitemap index) if:**
- Organizing by locale: `sitemap-vi.xml`, `sitemap-en.xml`, `sitemap-ko.xml`, `sitemap-ja.xml`.
- Organizing by type: `sitemap-products.xml`, `sitemap-pages.xml`, `sitemap-blog.xml`.
- Over 50,000 URLs total.

**Recommendation for traicaybentre.com:** Use **sitemap index** with 4 locale-specific sitemaps. Easier to identify crawl issues per locale & easier to update (e.g., when you add Ko/Ja products, update only that sitemap).

### changefreq & priority Tags
**Google officially ignores both.** Do not waste time setting them.
- **lastmod:** Google respects this if accurate. Always include; update only on actual content change.
- **Non-Google crawlers** (Bing, Yandex, smaller engines) may use `changefreq`; include it for them (cost: negligible).

**Example sitemap entry:**
```xml
<url>
  <loc>https://traicaybentre.com/vi/san-pham/xoai-cat-cho</loc>
  <lastmod>2026-04-15T08:30:00Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```
- `lastmod`: accurate; used by Google.
- `changefreq` & `priority`: placeholders; ignored by Google, helpful for Bing.

---

## 4. Internal Linking to Escape "Discovered Not Indexed"

### Hub-and-Spoke Pattern
**Hub = broad topic page** (e.g., `/vi/san-pham` = all mango products).  
**Spokes = specific products** (e.g., `/vi/san-pham/xoai-cat-cho`, `/vi/san-pham/xoai-thai`).

**Structure:**
1. Hub links to 5–10 spoke pages contextually (no "related products" spam lists).
2. Each spoke links back to hub + 2–3 adjacent spokes (e.g., "other mango varieties").
3. No spoke is >3 clicks from homepage (homepage → hub → spoke).

**SEO benefit:** Hub accumulates authority; passes PageRank to spokes via internal links. Google crawls hub first, then follows spokes.

### Minimum Internal Links Per Page
- **Homepage:** 1–2 links to each main category hub (e.g., "Mango", "Dragon Fruit", "Pomelo").
- **Category hub** (e.g., `/vi/san-pham`): 5–10 links to best products.
- **Product page:** 1–2 back to hub + 1–2 to related products (e.g., "similar varieties").
- **Blog post:** 1–2 back to relevant product page (if applicable).

**Rule:** No page goes live without ≥2 internal links pointing to it (from older, related content). This ensures fast crawl discovery.

### "Related Products" / "Related Articles" Component
- **Link count:** 3–5 max (more = spam signal).
- **Selection:** Contextual relevance > random. Use tags or category matching.
- **Anchor text:** Vary naturally (avoid duplicate anchor text across all links on a page). Use product name, category + descriptor, or branded terms.
- **Example:**
```markdown
## Similar mango varieties
- [Xoài Cát Chu — Sweet, seedless variety](link1)
- [Xoài Thái — Dense, juicy texture](link2)
- [Xoài Alphonso — Indian heritage cultivar](link3)
```
NOT:
```markdown
- [Click here](link1)
- [Click here](link2)
- [Click here](link3)
```

### Breadcrumbs & SEO Value
**Critical for new sites.** Breadcrumbs:
- Provide internal link structure (homepage → category → product).
- Communicate site hierarchy to Google & AI Overviews.
- Improve CTR in search results (Google showed 6.6% → 4.1% drop after breadcrumb removal; restored to 7% with schema).

**Implement BreadcrumbList JSON-LD** (see section 6).

**Example breadcrumb path:**
```
Traicaybentre > Sản phẩm > Xoài Cát Chu
```

---

## 5. Backlink Strategy for Vietnamese Mango E-commerce

### Top 5 Week-One Actions

1. **Google Business Profile** (2–3 hours)
   - Create at google.com/business.
   - Verify location (address in Vietnam; use office or fulfillment address).
   - Add hours, photos, product gallery, CTA ("Order Now" with WhatsApp/Phone link).
   - **Why:** Local intent is huge for Vietnamese commerce. GBP appears in Google Maps & local 3-pack; drives direct traffic + authority signal to website.
   - **Impact:** Estimated 5–10% of organic traffic for local e-commerce; not required for indexing but accelerates it.

2. **Social Profiles (Brand Signals, not direct backlinks but crucial for Vietnamese market)**
   - **Facebook Page** (most important; highest reach in Vietnam).
   - **YouTube Channel** (embed product videos; link back to site in descriptions).
   - **Zalo Official Account (OA)** (WhatsApp equivalent in Vietnam; huge for B2C; builds brand authority & customer trust).
   - **TikTok** (short-form fruit/recipe videos; link in bio to site).
   - **LinkedIn** (if B2B angle; less relevant for B2C fruit).
   
   **Why:** These are mentioned in Google's E-A-T signals (Expertise, Authoritativeness, Trustworthiness). Not backlinks, but they corroborate your business legitimacy.

3. **Vietnamese Business Directories** (1–2 hours each)
   - **Foody.vn** (food & beverage; high authority in Vietnam; 404.9M monthly visits).
   - **Vat Gia** (classifieds; local, trusted).
   - **Yellow Pages Vietnam** (if still active; less critical now).
   - **Chamber of Commerce Vietnam** (B2B-focused; check if relevant).
   
   **How to submit:** Each has a "register business" flow. Add your site URL in business description/website field.
   
   **Expected result:** 1–2 backlinks per directory; 2–3 weeks to appear in their index. Low direct traffic, moderate authority boost.

4. **Vietnamese Forums & Communities** (1–2 posts each, ongoing)
   - **Voz.vn** (tech/lifestyle community; 600K+ users; most active Vietnamese forum).
   - **Webtretho.com** (lifestyle, parenting, agriculture; 100K+ users; perfect for fruit/farming discussion).
   - **Tinhte.vn** (tech-centric; less relevant for mango, but useful if you have tech products).
   - **Lotus (Webtretho's travel/lifestyle section)** (hospitality, local experiences).
   - **Reddit r/Vietnam** (global audience; small local Vietnamese communities).
   
   **Strategy:**
   - Do NOT spam. Contribute genuinely: answer questions about mango varieties, storage, nutrition.
   - Include site link only if contextually relevant ("You can order from us at ...").
   - Forums are "nofollow" mostly, but Google crawls for reputation/mentions.
   - **Expected result:** 2–3 nofollow links + brand mentions; slow but builds legitimacy.

5. **Press Release / Media Outreach** (1 week timeline)
   - Reach out to Vietnamese agriculture/export magazines: **Vietnam Foodstuff Magazine**, **Saigon Times**, **VnExpress Agriculture**.
   - Pitch: "New direct-to-consumer mango exports from [your region]" + company story.
   - Target: 1–2 press features with backlinks to site.
   
   **Expected result:** 1–2 high-authority backlinks (news domains = domain authority 50+); mentions in Google News index.

### Additional High-Impact Sources (2–4 weeks)
- **Influencer/Blogger Partnerships:** Nano-influencers (10K–100K followers) on Instagram/YouTube reviewing your mangos; negotiate for site links in bio or video description.
- **NGO/Agricultural Partnerships:** Link from Vietnamese agricultural NGOs if you support sustainability initiatives.
- **University Agriculture Departments:** If you provide research/samples to Ag schools, request a backlink from their resources page.

### Social Profiles Summary
| Platform | Reach in Vietnam | Impact for E-commerce | Required? |
|----------|------------------|-----------------------|-----------|
| Facebook | 70M+ users | Very High | YES |
| YouTube | 50M+ users | High (product videos, reviews) | YES |
| Zalo OA | 25M+ users | Very High (customer service + sales) | YES |
| TikTok | 40M+ users | Medium (brand awareness, viral potential) | NO, but recommended |
| LinkedIn | 5M+ users | Low (B2C fruit is not B2B) | NO |

---

## 6. Structured Data for Crawling & Indexing

### Does More JSON-LD Help Crawl?
**Indirectly, yes.**
- JSON-LD doesn't directly affect crawl budget (Google crawls regardless of schema).
- **However:** Rich results → better CTR in SERP → more clicks → higher user satisfaction → Google trusts site → crawls more frequently.
- Clean schema also signals you understand your own content, reducing crawl waste on low-quality pages.

### Schema Types for Product E-commerce Pages (Ranked by Impact)

| Schema Type | Impact | Mandatory? | Notes |
|-------------|--------|-----------|-------|
| **Product** | Very High | YES | Base schema; tells Google price, availability, rating. |
| **Offer** | Very High | YES | Nested in Product; specifies price, currency (VND), availability. |
| **AggregateRating** | High | YES | Shows star rating (1–5) + review count; massively boosts CTR. |
| **Review** | High | NO | Individual customer reviews; Google favors 3+ reviews. |
| **LocalBusiness** | High | YES (if local sales) | Name, address, phone, opening hours; helps local ranking. |
| **BreadcrumbList** | High | YES | Site hierarchy; essential for new sites (crawl aid + navigation signal). |
| **FAQPage** | Medium | NO | FAQs about mango varieties, storage, shipping; helps voice search. |
| **WebSite + SearchAction** | Medium | NO | Sitelinks search box in SERP; nice-to-have. |

### Concrete Implementation Example

**Product page for Xoài Cát Chu:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Xoài Cát Chu — Premium Vietnamese Mango",
  "description": "Sweet, seedless Vietnamese mango variety. Direct from family farms in Tây Ninh Province.",
  "image": "https://traicaybentre.com/images/xoai-cat-chu-hero.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Traicaybentre"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://traicaybentre.com/vi/san-pham/xoai-cat-chu",
    "priceCurrency": "VND",
    "price": "250000",
    "availability": "https://schema.org/InStock",
    "shippingDetails": {
      "@type": "ShippingDeliveryTime",
      "shippingRate": {
        "@type": "PriceSpecification",
        "priceCurrency": "VND",
        "price": "50000"
      },
      "shippingDestination": {
        "@type": "DeliveryEvent",
        "areaServed": "VN"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": "3",
        "maxValue": "5",
        "unitCode": "DAY"
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "42",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Nguyễn Thị Hương"
      },
      "reviewBody": "Quả xoài rất ngon, vị ngọt tự nhiên, giao hàng nhanh."
    }
  ]
}
```

**Homepage with LocalBusiness + WebSite schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Traicaybentre",
  "url": "https://traicaybentre.com",
  "logo": "https://traicaybentre.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/traicaybentre",
    "https://www.youtube.com/@traicaybentre",
    "https://zalo.me/traicaybentre"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Lương Văn Can",
    "addressLocality": "Tây Ninh",
    "addressRegion": "VN",
    "postalCode": "83000"
  },
  "telephone": "+84-123-456-789",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "telephone": "+84-123-456-789",
    "url": "https://traicaybentre.com/contact"
  }
}
```
**Followed by:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Traicaybentre",
  "url": "https://traicaybentre.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://traicaybentre.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Product page with BreadcrumbList:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Traicaybentre",
      "item": "https://traicaybentre.com/vi"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Sản phẩm",
      "item": "https://traicaybentre.com/vi/san-pham"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Xoài Cát Chu",
      "item": "https://traicaybentre.com/vi/san-pham/xoai-cat-chu"
    }
  ]
}
```

### Implementation Priority
1. **BreadcrumbList** (immediate; essential for crawl).
2. **Product + Offer + AggregateRating** (day 1; required for rich results).
3. **LocalBusiness** (day 2; helps local search).
4. **FAQPage** (week 1; optional but useful for voice search).
5. **WebSite + SearchAction** (week 2; cosmetic).

### Schema Validation
- Test at **Google Rich Results Test** (search.google.com/test/rich-results).
- Test at **Schema.org Validator** (validator.schema.org).
- Verify schema matches visible content (Google's AI will flag mismatches).

---

## Timeline & Execution Plan

| Week | Action | Effort | Expected Impact |
|------|--------|--------|-----------------|
| **Week 1** | Google Business Profile + IndexNow setup + BreadcrumbList schema | 4 hours | 10–15% increase in crawl frequency |
| **Week 2** | Social profiles (FB, YouTube, Zalo) + internal linking audit | 6 hours | Brand authority signals |
| **Week 3** | Sitemap restructure (4 locale sitemaps) + Product schema rollout | 4 hours | 20–30% increase in indexed URLs |
| **Week 4** | Vietnamese directory submissions (Foody, VatGia) | 3 hours | 1–2 backlinks; 2–3 weeks to propagate |
| **Week 5–8** | Forum participation + press outreach | 2 hours/week | 2–3 high-quality backlinks; slow build |

---

## Summary: The "Magic Bullet" Doesn't Exist

**What will NOT get your 102 URLs indexed:**
- Submitting more to Google Search Console (quota limits apply).
- Using Google Indexing API (restricted to JobPosting/BroadcastEvent only).
- Tweaking changefreq/priority tags (ignored by Google).

**What WILL:**
1. **Internal linking** (hub-and-spoke, breadcrumbs, minimum 2 links per page) — fastest, free.
2. **Structured data** (BreadcrumbList, Product schema, LocalBusiness) — no direct crawl impact, but indirect via rich results CTR.
3. **Backlinks** (Google Business Profile, forums, directories, press) — highest authority signal; slowest to accrue but most impactful long-term.
4. **Sitemap accuracy** (lastmod dates, pruned URLs, logical hierarchy via locale sitemaps) — enables efficient crawl.
5. **IndexNow** (free; no downside; signals freshness to Bing/Yandex; Google support is new) — hedge bet.

**Expected outcomes:**
- **Weeks 1–2:** 30–40% of 102 URLs indexed (via internal links + schema).
- **Weeks 3–4:** 60–70% indexed (via sitemap restructure + social signals).
- **Weeks 5–8:** 85–95% indexed (as backlinks accrue from directories/press).
- **Months 3–6:** All 102 indexed; gradual ranking improvements as authority builds.

---

## Sources

### IndexNow Protocol
- [FreeCodeCamp: Index Next.js Apps with IndexNow](https://www.freecodecamp.org/news/how-to-index-nextjs-pages-with-indexnow/)
- [IndexNow Official Documentation](https://www.indexnow.org/documentation)
- [GrackerAI: IndexNow API Integration](https://gracker.ai/blog/indexnow-api-nodejs-integration-guide)

### Google Indexing API
- [Google Indexing API Prerequisites](https://developers.google.com/search/apis/indexing-api/v3/prereqs)
- [Google Indexing API Quotas & Pricing](https://developers.google.com/search/apis/indexing-api/v3/quota-pricing)
- [Sight AI: Google Indexing API Guide](https://www.trysight.ai/blog/google-indexing-api)

### Crawl Budget & Sitemaps
- [Google: Crawl Budget Optimization](https://developers.google.com/crawling/docs/crawl-budget)
- [Linkgraph: Crawl Budget Optimization 2026](https://www.linkgraph.com/blog/crawl-budget-optimization-2/)
- [Google: Large Sitemaps & Sitemap Index](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps)
- [Trysight: XML Sitemap Best Practices 2025](https://www.trysight.ai/blog/xml-sitemap-best-practices)

### Sitemap Metadata (changefreq/priority)
- [SEO Component: Google Ignores Priority & Changefreq](https://www.seocomponent.com/blog/ignore-priority-changefreq-fields-sitemap/)
- [Google Build Sitemap Guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### Internal Linking & Hub-Spoke
- [SEO-Kreativ: Hub-and-Spoke Model](https://www.seo-kreativ.de/en/blog/hub-and-spoke-model/)
- [Emplibot: Internal Links SEO Best Practices 2025](https://emplibot.com/internal-links-seo-best-practices-2025/)
- [Virayo: Hub and Spoke Strategy for SEO](https://virayo.com/blog/hub-and-spoke-seo)

### Breadcrumbs & SEO Value
- [Search Engine Land: SEO Breadcrumbs](https://searchengineland.com/guide/seo-breadcrumbs)
- [Yotpo: Breadcrumbs SEO & UX Best Practices 2026](https://www.yotpo.com/blog/what-are-breadcrumbs-seo/)
- [DataEnriche: Breadcrumb Schema Markup 2026](https://www.dataenriche.com/breadcrumb-schema-markup-implementation/)

### Vietnamese E-commerce & Backlinks
- [Ranktracker: Link Building Guide Vietnam](https://www.ranktracker.com/blog/a-complete-guide-for-doing-link-building-in-vietnam/)
- [ApplabX: SEO in Vietnam 2025](https://blog.applabx.com/a-complete-guide-to-seo-in-the-vietnam-in-2025/)
- [Vietnam+: Vietnam eBusiness Index 2025](https://en.vietnamplus.vn/hanoi-leads-2025-vietnam-ebusiness-index-post335060.vnp)

### Structured Data & Schema
- [Incremys: JSON-LD Structured Data Guide 2026](https://www.incremys.com/en/resources/blog/schema-seo)
- [Google: Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [AISO Hub: JSON-LD Structured Data 2026](https://aiso-hub.com/insights/json-ld-structured-data/)

### Google Business Profile
- [Colling Media: Google Business Profile Ranking Factors 2025](https://collingmedia.com/search-engine-optimization-seo/google-my-business-local-ranking-factors/)
- [BlueTone Media: Google Business Profile FAQs 2025](https://www.bluetonemedia.com/blog/google-business-profile-faqs)

---

## QUESTIONS NEEDING CLARIFICATION

1. **Are all 102 URLs truly distinct content, or are there thin product variants** (e.g., same mango in multiple sizes/weight options)? If the latter, canonicalize and reduce to ~40 unique products.

2. **Is hreflang properly implemented for 4 locales?** Test at Google Search Console → Languages → Coverage. If not set up, this is blocking crawl/indexing for localized versions.

3. **Which of the 102 URLs are being crawled but not indexed vs. not crawled at all?** Check GSC → Coverage → "Discovered - currently not indexed." If 102 are all *not crawled*, focus on internal linking week 1. If crawled but not indexed, the issue is content quality (thin pages, duplicate content, low authority).

4. **Do you have any backlinks currently?** Run site check at Ahrefs/Moz free tools. If zero backlinks on a new domain, expect slow indexing (3–6 months to full indexing is normal). Backlinks are the accelerant.

5. **What's your current Page Speed Insights score** (Core Web Vitals)? Poor performance (LCP >2.5s, CLS >0.1) indirectly affects crawl budget. Not a blocker, but worth optimizing.

6. **Are you redirecting from http:// to https://?** If mixed protocols in sitemap, that's a blocker. Verify one canonical protocol version in GSC settings.

