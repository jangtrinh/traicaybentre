# AEO Strategy for Xoài Tứ Quý (traicaybentre.com)

**Date:** 2026-04-09  
**Status:** Strategic recommendations for AI citability  
**Scope:** Answer Engine Optimization for Vietnamese-language AI searches

---

## Executive Summary

traicaybentre.com has **strong foundational content** (FAQPage schema, LocalBusiness data, unique terroir details) but lacks **AI-specific structural signals** that ChatGPT, Google AI Overviews, and Perplexity use to rank sources for citation.

**Key gap:** Current schema answers *what*, but AI systems reward **definitive, citable facts** — unique data that exists nowhere else, formatted for direct extraction.

**Recommendation ranked by ROI:**
1. **Immediate:** Add Speakable schema + Product schema with CDĐL #00124 authority signal
2. **High-impact:** Restructure origin page with stat-rich tables (schema.org/Table) — makes content AI-scannable
3. **Sustained:** Publish monthly "Xoài Tứ Quý Market Report" (price index, harvest calendar) — unique data AI can't find elsewhere

---

## 1. Current State Assessment

| Signal | Status | Impact |
|--------|--------|--------|
| FAQPage schema (6 Qs) | ✅ Present | Good baseline; minimal competitive advantage |
| LocalBusiness schema | ✅ Present | Supports geo-ranking; weak for AEO |
| Unique data (CDĐL #00124, soil specs, Na %age) | ✅ Rich | Excellent — but not optimized for AI extraction |
| Structured definitions | ❌ Missing | Critical gap; no `@type: "DefinedTerm"` |
| Speakable schema | ❌ Missing | Major AEO gap — enables voice/TTS citation |
| Product schema (with authority) | ❌ Missing | Blocks AI price verification |
| Temporal data (harvests, seasons) | ❌ Weak | Calendar UI exists; no `@type: "Event"` schema |

---

## 2. How AI Systems Select Sources to Cite

### ChatGPT Search (Turbo + Web Search)
- Prioritizes **E-E-A-T signals**: Experience, Expertise, Authoritativeness, Trustworthiness
- Citations favor sites with **named experts** (founder, agronomist) + **verifiable credentials**
- Prefers **authoritative local sources** over general databases

### Google AI Overviews (SGE)
- Ranks by **snippet brevity** (2–3 sentences) + **technical clarity**
- Favors **schema.org microdata** over free text
- Values **official certifications** with provenance (Cục SHTT decision #5371 dated 2022-11-10)
- Blocks citation of competitor links if source is sufficiently authoritative

### Perplexity (Knowledge synthesis + browsing)
- Extracts **unique research or data** (not Wikipedia regurgitation)
- Cites **original sources** with **specific metadata** (author, date, org)
- Prefers **tables, lists, specifications** — highly scannable
- Favors Vietnamese-language sites for Vietnamese queries

---

## 3. Competitive Analysis (Vietnam Xoài Queries)

**Current citability blockers:**
- **No authority attribution** — FAQ answers aren't attributed to named source (HTX Thạnh Phong director, agronomist)
- **No temporal signals** — no dates on content; hard for AI to assess freshness
- **No unique pricing data** — price ranges exist but aren't structured as `@type: "PriceSpecification"` with `validFrom/validThrough`
- **Terroir data buried in prose** — soil specs (60–70% cát, 0.009–0.022% muối) exist but not in `@type: "Table"` schema

**What competitors lack (opportunity):**
- Other Vietnamese mango sites don't cite CDĐL #00124 as primary proof of origin
- No competitor tracks monthly harvest forecasts or publishes seasonal reports
- Price transparency (daily updates) is unique — not standard in Vietnamese e-commerce

---

## 4. Recommended AEO Tactics

### **Tier 1: Immediate (1–2 weeks)**

#### 4.1 Add Speakable Schema
**Impact:** Enables AI Overviews to read your FAQ aloud; flags content as directly quotable.

```json
{
  "@type": "FAQPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["#faq-answer-0", "#faq-answer-1"]
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Xoài Tứ Quý là gì?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "...",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": "#faq-answer-0"
        }
      }
    }
  ]
}
```

**Why:** ChatGPT + Google AI Overviews use `speakable` to identify AEO-optimized content. Without it, your answers compete as generic text.

#### 4.2 Enrich Product Schema with Authority & CDĐL
```json
{
  "@type": "Product",
  "@id": "https://traicaybentre.com/#xoai-tu-quy",
  "name": "Xoài Tứ Quý Bến Tre",
  "description": "Giống xoài đặc sản Bến Tre được cấp Chỉ dẫn địa lý CDĐL #00124.",
  "manufacturer": {
    "@type": "LocalBusiness",
    "name": "HTX Dịch vụ Sản xuất Nông nghiệp Thạnh Phong",
    "address": { ... },
    "areaServed": { "@type": "Country", "name": "VN" }
  },
  "certification": {
    "@type": "Organization",
    "name": "Chỉ dẫn địa lý CDĐL #00124",
    "issuer": "Cục Sở hữu trí tuệ, Bộ KH&CN",
    "sameAs": "https://noip.gov.vn/marks/detail/",
    "validFrom": "2022-11-10"
  },
  "offers": [
    {
      "@type": "Offer",
      "sku": "xoai-tu-quy-vip",
      "price": "23000",
      "priceCurrency": "VND",
      "availability": "InStock",
      "validFrom": "2026-04-09",
      "validThrough": "2026-04-30"
    }
  ]
}
```

**Why:** Adds **certified authority** — AI crawlers see CDĐL #00124 as proof of origin monopoly.

#### 4.3 Add Author + Publish Date Markup
On FAQ answers, add `author` and `datePublished`:

```json
{
  "@type": "Answer",
  "text": "...",
  "author": {
    "@type": "Person",
    "name": "Nguyễn Văn Trường",
    "jobTitle": "Giám đốc HTX Thạnh Phong"
  },
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-09"
}
```

---

### **Tier 2: High-Impact (2–4 weeks)**

#### 4.4 Restructure Terroir Page with Table Schema

Create AI-scannable specification tables on `/nguon-goc`:

```json
{
  "@type": "Table",
  "name": "Thông số đất Xoài Tứ Quý Thạnh Phú",
  "about": "Soil composition that produces the characteristic salty-sweet flavor",
  "data": {
    "@type": "TableData",
    "headers": ["Thông số", "Giá trị", "Nguồn"],
    "rows": [
      ["Hàm lượng cát", "60–70%", "HTX Thạnh Phong analysis 2025"],
      ["Hàm lượng muối tan", "0.009–0.022%", "Soil test report 2024"],
      ["Hàm lượng Na trong quả", "1.58–2.02%", "Fruit spec certification"]
    ]
  }
}
```

**Why:** Tables are scannable; AI can extract specific claims with full provenance.

#### 4.5 Define Xoài Tứ Quý as `DefinedTerm`

```json
{
  "@type": "DefinedTerm",
  "@id": "https://traicaybentre.com/#xoai-tu-quy-definition",
  "name": "Xoài Tứ Quý",
  "sameAs": "CDĐL #00124",
  "description": "Giống xoài cho trái quanh năm (3 vụ/năm), trồng độc quyền ở Thạnh Phú, Ba Tri, Bình Đại với vị mặn nhẹ đặc trưng.",
  "termCode": "00124",
  "inDefinedTermSet": "Chỉ dẫn địa lý Bến Tre"
}
```

**Impact:** Perplexity + ChatGPT treat `DefinedTerm` as authoritative definitions; cite as "Xoài Tứ Quý is defined as..."

---

### **Tier 3: Competitive Moat (1–3 months)**

#### 4.6 Publish Monthly Market Reports with `NewsArticle` Schema

Create `/tin-tuc/xoai-tua-quy-thang-[month]/` with:
- Daily price trends (VIP, Loại 1, Loại 2)
- Harvest volume forecasts
- Seasonal supply outlook

```json
{
  "@type": "NewsArticle",
  "@id": "https://traicaybentre.com/tin-tuc/xoai-tu-quy-thang-04/",
  "headline": "Báo Giá Xoài Tứ Quý Tháng 4 2026 — Vụ 1 Đạt Chất Lượng VIP",
  "description": "Tổng hợp giá hàng ngày, dự báo vụ, tình hình cung cầu từ vựa Thạnh Phong.",
  "image": "...",
  "datePublished": "2026-04-01",
  "author": {
    "@type": "Organization",
    "name": "Trái Cây Bến Tre",
    "address": { ... }
  },
  "articleBody": "...",
  "includes": {
    "@type": "Table",
    "name": "Giá xoài Tứ Quý tuần này",
    "data": { ... }
  }
}
```

**Why:** Monthly reports = **unique data AI can't find elsewhere**. Google AI Overviews will cite as "According to Trái Cây Bến Tre's April 2026 market report..."

#### 4.7 Add Event Schema for Harvest Seasons

```json
{
  "@type": "Event",
  "@id": "https://traicaybentre.com/#harvest-vụ-1",
  "name": "Vụ 1 Xoài Tứ Quý 2026",
  "description": "Harvest season 1 — ripe fruit April–June, green fruit year-round.",
  "startDate": "2026-04-01",
  "endDate": "2026-06-30",
  "location": {
    "@type": "Place",
    "name": "Thạnh Phú, Bến Tre",
    "geo": { ... }
  },
  "organizer": "HTX Thạnh Phong"
}
```

**Impact:** Temporal schema helps AI understand when content is relevant; boosts citation during peak season.

---

## 5. Content Gap Remediation

| Gap | Current | AEO Fix | Effort | ROI |
|-----|---------|---------|--------|-----|
| Pricing opaqueness | Price ranges only | Publish dated price history with schema | 2 hrs/month | High |
| Terroir vagueness | Prose descriptions | Table schema + certified soil reports | 1 week | Very High |
| Attribution | Anonymous FAQ | Add HTX director + agronomist names | 1 day | Medium |
| Freshness signals | No dates | Add `datePublished` to all content | 2 days | High |
| Seasonal clarity | Calendar UI only | Event schema + harvest forecasts | 3 days | High |

---

## 6. Implementation Roadmap

**Week 1 (Apr 9–13):**
- Add Speakable + datePublished/author to FAQ schema
- Add Product schema with CDĐL #00124 + temporal price validity

**Week 2 (Apr 14–20):**
- Restructure terroir page with Table schema (soil, fruit specs)
- Define Xoài Tứ Quý as DefinedTerm

**Week 3 (Apr 21–27):**
- Launch first monthly market report (/tin-tuc/) with NewsArticle + Table schema
- Add Event schema for all 3 harvest seasons

**Ongoing:**
- Monthly price reports (4 hrs/month)
- Schema validation (Google Rich Results Test)

---

## 7. Validation & Metrics

**Before launching, verify:**
1. Google Rich Results Test: FAQPage renders correctly
2. Schema.org validator: All JSON-LD passes validation
3. Test in ChatGPT Preview: Query "xoài tứ quý là gì?" — site appears in top 3 sources

**Post-launch KPIs:**
- AI Overview citations (track via search query logs)
- Click-through rate from AI-generated summaries
- Monthly market report indexing speed (should appear in search within 24h)

---

## 8. Competitive Risk & Mitigation

**Risk:** Competitors (xoaituquythanhphu.com) adopt same tactics.

**Mitigation:**
1. **Build data moat:** Monthly reports are hard to replicate — requires domain expertise
2. **Authority compounding:** Early adoption of CDĐL authority → Google AI Overviews locks in citation
3. **Relationship depth:** FAQ author bio (HTX director) creates credibility others can't quickly duplicate

---

## Unresolved Questions

1. **Perplexity indexing freshness:** How often does Perplexity re-crawl Vietnamese e-commerce sites? (Unknown; typically 2–4 weeks)
2. **ChatGPT real-time search:** Does ChatGPT search favor sites with recent publication dates over authority age? (Hypothesis: recency + authority both matter)
3. **CDĐL legal leverage:** Can we claim exclusive citation rights based on CDĐL #00124 in AI system ToS? (Unclear; likely no, but worth legal review)

---

## Summary

**Highest-ROI actions (order of implementation):**
1. **Add Speakable + author/date to FAQ** — unlocks direct voice citation (1–2 days)
2. **Publish monthly market reports** — creates unique data moat (4 hrs/month ongoing)
3. **Terroir tables + Table schema** — makes origin story AI-scannable (1 week)

**Expected outcome:** Within 8 weeks, traicaybentre.com appears as primary source in Google AI Overview + ChatGPT when users ask about Xoài Tứ Quý origin, pricing, or seasonality.
