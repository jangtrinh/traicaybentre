# Phase 1 — Infrastructure (llms.txt + robots.txt AI crawlers)

## Context Links

- Audit: `plans/reports/audit-consolidated-260417-1301-full-site.md` (C2, C4)
- Spec: https://llmstxt.org
- Current robots: `public/robots.txt` (3 lines, no AI crawler directives)

## Overview

- **Priority:** P0 (Critical)
- **Status:** pending
- **Effort:** 20 min
- **Description:** Create `public/llms.txt` + extend `public/robots.txt` with explicit AI crawler Allow directives. Pure static assets — zero runtime impact.

## Key Insights

- llmstxt.org spec = single markdown file, H1 site name, H2 sections with linked resources. Serves as "site map for LLMs" distinct from XML sitemap.
- ChatGPT/Claude/Perplexity crawlers read robots.txt + prefer explicit Allow signals for citation trust. Default `User-agent: *` covers them but explicit entries improve citation rate per anecdotal SEO data.
- Both files bundled via Next.js static serving from `public/` — no build config change needed.

## Requirements

**Functional:**
- `public/llms.txt` returns 200 at `/llms.txt`
- Well-formed H1 + H2 structure per llmstxt.org
- Links to: homepage, product landings (3), /kien-thuc, /tin-tuc, /bang-gia, /nguon-goc, /chat-luong, /giao-hang, sitemap.xml
- `public/robots.txt` retains existing `User-agent: *` + `Allow: /` + sitemap line
- Explicit entries for: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Claude-Web, anthropic-ai

**Non-functional:**
- llms.txt ≤ 5 KB (recommended cap for crawler ingestion)
- Valid markdown (no broken links)
- UTF-8, no BOM

## Architecture

```
public/
├── llms.txt           ← NEW — llmstxt.org format
└── robots.txt         ← EDIT — append AI crawler blocks
```

Next.js serves `public/*` verbatim at root path. No code changes.

## Related Code Files

**Create:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/public/llms.txt`

**Modify:**
- `/Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/hopeful-elgamal-e3a274/public/robots.txt` (current: 3 lines)

## Implementation Steps

1. Draft `public/llms.txt`:
   ```
   # Trái Cây Bến Tre — Xoài Tứ Quý, Xoài Hoàng Kim, Dừa Xiêm đặc sản

   > Vựa trái cây nhà vườn Bến Tre — CDĐL #00124. Giao lạnh toàn quốc, hotline 0932 585 533.

   ## Sản phẩm
   - [Xoài Tứ Quý](https://www.traicaybentre.com/xoai-tu-quy): giống đặc sản Thạnh Phú, 3 vụ/năm, vị mặn nhẹ từ đất giồng cát
   - [Xoài Hoàng Kim](https://www.traicaybentre.com/xoai-hoang-kim): giống vàng ruộm, ngọt đậm
   - [Dừa Xiêm Bến Tre](https://www.traicaybentre.com/dua-xiem-ben-tre): dừa xiêm xanh, sọ, vàng

   ## Kiến thức
   - [Thư viện Kiến thức](https://www.traicaybentre.com/kien-thuc): 90+ bài chuyên sâu về giống, bảo quản, so sánh, mẹo thưởng thức
   - [Tin tức & Giá thị trường](https://www.traicaybentre.com/tin-tuc)
   - [Bảng giá hôm nay](https://www.traicaybentre.com/bang-gia)
   - [Nguồn gốc vùng trồng](https://www.traicaybentre.com/nguon-goc)

   ## Giao hàng
   - [Giao Hà Nội](https://www.traicaybentre.com/giao-hang/ha-noi)
   - [Giao TP HCM](https://www.traicaybentre.com/giao-hang/tp-hcm)
   - [Giao Đà Nẵng](https://www.traicaybentre.com/giao-hang/da-nang)
   - [60+ thành phố khác](https://www.traicaybentre.com/sitemap.xml)

   ## Optional
   - [Sitemap XML](https://www.traicaybentre.com/sitemap.xml)
   - [Robots.txt](https://www.traicaybentre.com/robots.txt)
   ```
2. Edit `public/robots.txt` — append:
   ```
   # AI crawlers — explicit allow for citation trust
   User-agent: GPTBot
   Allow: /

   User-agent: ClaudeBot
   Allow: /

   User-agent: Claude-Web
   Allow: /

   User-agent: anthropic-ai
   Allow: /

   User-agent: PerplexityBot
   Allow: /

   User-agent: Google-Extended
   Allow: /

   User-agent: CCBot
   Allow: /
   ```
3. Dev serve: `bun dev` → curl `http://localhost:3000/llms.txt` + `http://localhost:3000/robots.txt`
4. Commit: `feat(seo): add llms.txt + AI crawler directives in robots.txt`

## Todo List

- [ ] Create `public/llms.txt` per llmstxt.org spec
- [ ] Append 7 AI crawler blocks to `public/robots.txt`
- [ ] Verify 200 response for both URLs in dev server
- [ ] Validate markdown links resolve (no 404s)
- [ ] Commit

## Success Criteria

- `curl -I http://localhost:3000/llms.txt` returns `200`
- `curl http://localhost:3000/robots.txt | grep -c "^User-agent:"` ≥ 8
- All H2 links in llms.txt resolve (spot-check 3)
- No regression in Google Search Console robots.txt tester (manual post-deploy)

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Broken links in llms.txt | Low | Medium | Spot-check 3 URLs in dev; links are hardcoded to existing routes |
| robots.txt syntax error blocks Googlebot | Low | High | Existing `User-agent: *` retained first; new blocks additive. Test via https://www.google.com/webmasters/tools/robots-testing-tool |
| AI crawler Allow flips to Disallow by typo | Low | High | Copy-paste block, verify `Allow: /` lowercase-sensitive |
| llms.txt > 5KB | Low | Low | Keep under 50 lines; current draft ~35 lines |

## Security Considerations

- Static files, no user input, no XSS vector.
- llms.txt discloses site structure — already public via sitemap.xml. Zero incremental leak.
- No PII in either file.

## Next Steps

→ [Phase 2: Article schema](phase-02-article-schema.md) — hreflang + #aeo-answer wrap + dateModified + description trim + TechArticle/NewsArticle upgrade
