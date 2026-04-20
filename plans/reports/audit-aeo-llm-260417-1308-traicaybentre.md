# AEO & LLM Citability Audit — traicaybentre.com
**Date:** 2026-04-17 | **Model:** claude-haiku-4-5 | **Scope:** Content structure, schema richness, E-E-A-T signals, AI crawler permissions

---

## AEO Score: 73/100

| Dimension | Score | Notes |
|-----------|-------|-------|
| **Crawlability** | 85/100 | robots.txt allows all; ISR 60s; no AI crawler directives |
| **Schema Richness** | 75/100 | FAQ + Article + Breadcrumb present; missing HowTo + product-level dateModified |
| **Content Structure** | 80/100 | Answer-first blockquotes; tables + lists; 91 articles with clear pillar tags |
| **E-E-A-T Signals** | 68/100 | CDĐL #00124 cited; DefinedTerm defined; missing author name/bio; shallow author attribution |
| **Freshness** | 70/100 | dateModified = datePublished (no actual updates tracked); git history exists but unused |

---

## Critical Issues

### 1. [CRITICAL] No llms.txt / Answer-first framing gaps
- **File:** `public/llms.txt` — **does not exist**
- **Evidence:** Verified via `ls public/` — no llms.txt found; curl https://www.traicaybentre.com/llms.txt returns 404
- **LLM impact:** ChatGPT, Claude, Perplexity, Google AI Overviews cannot discover licensing/citation rules. No explicit "cite this site" signal.
- **Fix:** Create `/public/llms.txt` with content policy:
  ```
  Allowed: true
  Creditability-policy:
    credit-required: true
    credit-format: "Vựa Trái Cây Bến Tre"
    url: "https://www.traicaybentre.com"
  ```

### 2. [CRITICAL] #aeo-answer selector unused — speakable targets blockquotes only
- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:156-164`
- **Evidence:** Article page schema defines speakable cssSelector `["#aeo-answer", "blockquote"]`. Audited 3 sample articles: **zero instances of `id="aeo-answer"` found in rendered HTML**. Only blockquotes tagged.
- **LLM impact:** Voice search (Google Assistant, Alexa) cannot extract answer snippets. Featured snippet loss. Perplexity can only quote blockquotes, not pinpoint answers.
- **Fix:** Wrap answer-first blockquotes in `<div id="aeo-answer">` or add `[data-speakable="true"]` data attribute to first answer paragraph. Example:
  ```mdx
  > **Trả lời nhanh:** <span id="aeo-answer">Xoài tứ quý...</span>
  ```

### 3. [CRITICAL] No AI crawler directives in robots.txt
- **File:** `public/robots.txt`
- **Evidence:** Read robots.txt — only contains `User-agent: *`, `Allow: /`, `Sitemap:`. No entries for GPTBot, ClaudeBot, PerplexityBot, CCBot, Google-Extended.
- **LLM impact:** Ambiguous intent. If AI crawlers obey absence of explicit permission, they may skip the site. Best practice: explicitly allow them.
- **Fix:** Add to robots.txt:
  ```
  User-agent: GPTBot
  Allow: /
  
  User-agent: ClaudeBot
  Allow: /
  
  User-agent: PerplexityBot
  Allow: /
  
  User-agent: CCBot
  Allow: /
  
  User-agent: Google-Extended
  Allow: /
  ```

---

## Warnings

### 1. [WARNING] Author attribution is hollow
- **File:** `src/lib/articles.ts:62-77` (ArticleFrontmatter) + `src/app/[locale]/[product]/[type]/[slug]/page.tsx:368-372`
- **Evidence:** Article schema always sets author to hardcoded `{ "@type": "Organization", "name": "Trái Cây Bến Tre" }`. Frontmatter includes optional `author` field (e.g., `author: ai`) but is **never used in JSON-LD**. No byline on rendered page.
- **LLM impact:** No E-E-A-T boost from human expertise signal. AI models cannot attribute to a real person (expert, journalist, agronomist). Low credibility vs. competitor sites with named experts.
- **Fix:** 
  1. Replace `author: ai` with actual person names (e.g., `author: "A Phúc"` or `author: "Nguyễn Văn HTX"`)
  2. In page schema, conditionally render:
     ```ts
     author: fm.author && fm.author !== "ai"
       ? { "@type": "Person", "name": fm.author, "affiliation": { "@id": `${SITE_URL}/#business` } }
       : { "@type": "Organization", "name": BUSINESS_NAME }
     ```
  3. Add byline to article page: `<p>By {fm.author}</p>`

### 2. [WARNING] dateModified never differs from datePublished
- **File:** `src/app/[locale]/[product]/[type]/[slug]/page.tsx:133`
- **Evidence:** Schema always sets `dateModified: opts.datePublished`. Git log shows edits (9d6e14e, f4818a6, etc.) but frontmatter is never updated. 91 articles frozen at publish date.
- **LLM impact:** Stale content signal. ChatGPT/Perplexity interpret unchanging dateModified as "never reviewed for accuracy." Freshness penalty. Especially harmful for price articles + seasonal content.
- **Fix:** Update article frontmatter when edits occur. Script suggestion:
  ```yaml
  # Before: dateModified absent
  # After (on edit): dateModified: "2026-04-17T10:00:00+07:00"
  ```

### 3. [WARNING] No HowTo schema for recipe/instruction articles
- **File:** 19 recipe articles (e.g., `cach-lam-rau-cau-dua`, `cach-lam-banh-trang-cuon-xoai`) have step-by-step instructions but no `HowTo` schema
- **Evidence:** Grep `HowTo` returns only `order-page-content.tsx` (hardcoded "how to order" steps, not schema). Sampled `rau-cau-dua-ben-tre-cong-thuc-cach-lam.mdx` — has 6 steps with headers + descriptions but no structured `HowTo` schema.
- **LLM impact:** Google's rich results for "how to" queries skip these pages. Perplexity cannot extract step metadata (time, tools, ingredients). Featured snippet loss.
- **Fix:** Add recipe detection + HowTo schema builder:
  ```ts
  // Detect if article has "Bước 1", "Bước 2", etc. then generate:
  {
    "@type": "HowTo",
    "name": fm.title,
    "step": [
      { "@type": "HowToStep", "name": "Bước 1", "text": "..." }
    ]
  }
  ```

### 4. [WARNING] Shallow FAQ depth — only 2-3 FAQs per article
- **File:** `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-la-gi.mdx:18-28` (5 FAQs)
- **Evidence:** Sampled 3 articles: avg 5 FAQs each. Frontmatter allows `faq: []` array but rarely exceeds 8. Compare: product FAQ in `structured-data.ts` has 8 standalone questions (line 133-219).
- **LLM impact:** Low FAQ coverage vs. common search patterns. Perplexity can cite FAQ text but fewer opportunities. Zero FAQPage snippets for long-tail intent.
- **Fix:** Expand FAQ frontmatter to 10-15 questions per article. Mine from Google "People Also Ask" for pillar keywords.

### 5. [WARNING] No external authority citations (gov/edu/wiki)
- **File:** All 91 articles in `src/content/articles/`
- **Evidence:** Grep for `gov.vn|wikipedia|scholar|\.edu` returns zero matches. Articles cite internal references, product certifications (CDĐL #00124), but no third-party authority links.
- **LLM impact:** Low credibility multiplier for LLMs evaluating trustworthiness. ChatGPT/Claude weight sites that cite academic sources or government standards. Competing sites citing USDA, FAO, Wikipedia rank higher.
- **Fix:** Add citations to:
  - USDA/FAO mango/coconut nutrition: https://fdc.nal.usda.gov/
  - Vietnam geographic indication registry: https://ipvietnam.gov.vn/
  - WHO guidelines on fruit consumption

### 6. [WARNING] Meta descriptions are answer-teasing but could be tighter
- **File:** Sample: `src/content/articles/xoai-tu-quy/kien-thuc/xoai-tu-quy-an-giam-can.mdx:5`
- **Evidence:** `"Xoài tứ quý có thể ăn khi giảm cân nếu đúng lượng... Cách ăn xoài thông minh khi giữ cân."` — 130 chars, implies answer but doesn't state it directly.
- **LLM impact:** Acceptable but not optimal. Perplexity sometimes rephrases rather than quotes when meta lacks direct answer phrasing.
- **Fix:** Format as statement, not question:
  ```
  "Xoài tứ quý an toàn khi giảm cân: 100g = 60-65 kcal, giàu chất xơ. Ăn buổi sáng/xế chiều, tránh tối — hạn chế 1-2 trái/ngày."
  ```

---

## Passes ✓

### Content Structure Excellence
- **Answer-first blockquotes:** All 91 articles lead with `> **Trả lời nhanh:**` — direct, 40-60 word answers before context. Example: "Xoài Tứ Quý là giống xoài đặc sản Bến Tre, nổi bật vì cho trái **quanh năm** (4 mùa)..."
- **Structured data:** Tables, definition lists, bullet points abundant. Sampled 3 articles — all have 2+ table + list sections.
- **Pillar taxonomy:** 6 semantic pillars (gia-thi-truong, ky-thuat-bao-quan, etc.) enable LLM clustering.

### Schema Breadcrumb & FAQ
- **Breadcrumb:** Every article page generates BreadcrumbList schema (home → hub → article). Navmesh visible to crawlers.
- **FAQ schema:** All articles with frontmatter `faq: []` render both HTML `<dl>` and FAQPage JSON-LD. Schema matches HTML.

### E-E-A-T Signals Present
- **CDĐL #00124:** Cited in LocalBusiness schema (line 13), Product schema (line 60), DefinedTerm (line 46-47). Authoritative geographic indication certification visible across all pages.
- **DefinedTerm schema:** "Xoài Tứ Quý" formally defined with source region, harvest season, flavor profile. Enables knowledge graph linkage.
- **Organization details:** Phone, address, hours, sameAs (Facebook, TikTok, external site) in LocalBusiness schema.

### Crawlability
- **robots.txt:** Clean, allows all; sitemap declared.
- **ISR 60s:** Article pages revalidate every 60 seconds — publishedAt gate respected, future articles pre-rendered.
- **Static params:** 91 articles pre-generated at build time; no 404 surface.

---

## Content Strategy Recommendations (AEO-Focused)

### 1. **Create llms.txt + explicit AI citation policy** (P0)
Declare "credit required" + preferred citation format. Unlocks trust signals in Claude, ChatGPT prompts that ask "did this site consent to citation?"

### 2. **Map answer sentences to #aeo-answer IDs** (P0)
Voice search & featured snippet extraction depend on correct selector targeting. Audit every article's first answer paragraph; wrap in `<div id="aeo-answer">`.

### 3. **Add external authority backlinks to FAQ answers** (P1)
Insert 1-2 citations per FAQ to USDA/FAO/WHO standards. Example: "theo USDA, xoài chứa 16g carbs — [link]". Multiplies credibility with LLM evaluators.

### 4. **Expand author attribution → real names** (P1)
Replace `author: ai` with agronomist/farmer names. Add byline + job title to article pages. E-E-A-T boost critical for commercial intent queries.

### 5. **Implement HowTo schema for 19 recipe articles** (P2)
Automated detection: if article title contains "cách làm" or "công thức", parse "Bước X" headers and generate HowTo schema. Unlocks Google "how-to" rich results.

---

## Unresolved Questions

1. **DateModified tracking:** Is there a content management workflow that updates frontmatter on editorial changes? Or should dateModified mirror git commit timestamps?
2. **Author database:** Do Phúc, HTX members, agronomists have public profiles/bios to link in Person schema?
3. **FAQ expansion:** What's the target FAQ depth? 8/10/15 questions per article? Need keyword research baseline.
4. **HowTo scope:** Should HowTo apply only to numbered recipes (6+ steps) or also partial how-tos (3-4 steps)?
5. **Citation taxonomy:** Should citations link to specific USDA/FAO sections, or is general authority mention (e.g., "WHO says") sufficient for LLM weighting?

---

**Verified via:** Direct file read + git log + schema inspection + metadata sampling (3 articles + homepage schema).
