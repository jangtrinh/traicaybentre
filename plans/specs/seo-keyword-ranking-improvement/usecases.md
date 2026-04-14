# SEO Keyword Ranking Improvement — Use Cases

## UC-01: On-Page Keyword Optimization (P0)

**Actor:** Google crawler / search engine
**Precondition:** Pages exist but title/description don't match target keywords precisely
**Happy Path:**
1. Each landing page has unique title containing primary keyword
2. Meta description contains keyword + CTA + value prop (< 160 chars)
3. H1 matches primary keyword naturally
4. H2s contain secondary/long-tail keywords
5. Content body mentions keyword 2-3x naturally (not stuffed)

**Edge Cases:**
- i18n pages (en/ko/ja) should NOT target Vietnamese keywords — use translated keywords or noindex
- Product pages with dynamic data still need static keyword-rich descriptions

---

## UC-02: Internal Linking Mesh (P0)

**Actor:** Google crawler
**Precondition:** Pages exist but are isolated (few cross-links)
**Happy Path:**
1. Every article page links to 2-3 related articles (contextual, in-content)
2. Every article links back to its hub page (/kien-thuc or /tin-tuc)
3. Hub pages list all articles with keyword-rich anchor text
4. Product pages link to relevant knowledge articles
5. Footer/sidebar has "Bài viết liên quan" section

**Edge Cases:**
- Circular links (A→B→A) are fine for SEO, encourage them
- Dynamic product pages need static related-articles data

---

## UC-03: FAQ Schema Expansion (P1)

**Actor:** Google SERP (rich snippets)
**Precondition:** FAQ schema only on homepage
**Happy Path:**
1. Each knowledge article has 2-3 FAQ items specific to that topic
2. Each giao-hang city page has FAQ about shipping to that city
3. Product pages have FAQ about that specific product
4. FAQ answers contain keywords naturally

**Edge Cases:**
- Don't duplicate FAQ across pages — each page gets unique Q&As
- FAQ answers should be 40-80 words (Google's sweet spot for featured snippets)

---

## UC-04: Canonical & Hreflang Audit (P0)

**Actor:** Google crawler
**Precondition:** i18n routes create potential duplicate content
**Happy Path:**
1. Vietnamese pages (default locale) have canonical = `https://www.traicaybentre.com/{path}`
2. Non-vi pages have canonical = `https://www.traicaybentre.com/{locale}/{path}`
3. All pages have hreflang tags for all 4 locales
4. Sitemap entries match canonical URLs exactly

**Edge Cases:**
- Homepage: vi canonical = `/`, en canonical = `/en`
- Pages that don't have translations yet should still have self-referencing hreflang

---

## UC-05: Content Freshness Signals (P1)

**Actor:** Google ranking algorithm
**Precondition:** Some articles have stale dates
**Happy Path:**
1. Blog posts with price info show "Cập nhật: {today}" date
2. Article dateModified in schema matches actual content updates
3. Homepage shows recent activity (tin tức section, price updates)

**Edge Cases:**
- Don't fake dateModified — only update when content actually changes
- Price pages can legitimately update daily (giá xoài hôm nay)

---

## Acceptance Criteria (Gherkin)

### UC-01: On-Page Keyword Optimization
```gherkin
Given a landing page for "xoài tứ quý Bến Tre"
When Google crawls the page
Then the title tag contains "xoài tứ quý Bến Tre"
And the meta description contains "xoài tứ quý" and a CTA
And the H1 contains "xoài tứ quý" naturally
And the page has at least 300 words of content
```

### UC-02: Internal Linking
```gherkin
Given any article page on the site
When rendered
Then it contains at least 2 internal links to related content
And it contains 1 link back to its parent hub page
And anchor text of links contains relevant keywords
```

### UC-03: FAQ Schema
```gherkin
Given a knowledge article page
When Google crawls it
Then the page contains FAQPage JSON-LD schema
And each FAQ answer is 40-80 words
And FAQ questions use natural language (how people actually search)
```

### UC-04: Canonical & Hreflang
```gherkin
Given any page on the site
When rendered with locale "vi"
Then canonical URL is "https://www.traicaybentre.com/{path}" (no /vi/ prefix)
And hreflang tags exist for vi, en, ko, ja
```

---

## Appetite Check

| UC | Effort | Value | Ship this cycle? |
|----|--------|-------|------------------|
| UC-01 On-Page Keywords | Medium | **Very High** | Yes — highest ROI |
| UC-02 Internal Linking | Medium | **High** | Yes — multiplier effect |
| UC-03 FAQ Schema | Low | **High** | Yes — quick wins for rich snippets |
| UC-04 Canonical Audit | Low | **High** | Yes — prevents penalties |
| UC-05 Content Freshness | Low | Medium | Yes — easy to add |
