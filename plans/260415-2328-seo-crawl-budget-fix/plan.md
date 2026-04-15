---
status: in-progress
domain: complex
mode: autonomous
created: 2026-04-15
issue: GSC "Discovered - currently not indexed" 102 URLs
blockedBy: []
blocks: []
---

# SEO Crawl-Budget Fix

## Problem
GSC báo 102 URL "Discovered - currently not indexed", all `Last crawled: 1970-01-01` (epoch = chưa bao giờ crawl). Root cause: site mới, zero backlinks, domain authority 0 → Google crawl budget cực thấp, sitemap bulk 137 URL làm Google delay thêm.

## Solution Strategy
Tập trung crawl budget vào ~60 URL chất lượng cao nhất + tăng internal linking + tự động IndexNow ping + cung cấp backlink action playbook.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Sitemap quality filter](phase-01-sitemap-quality-filter.md) | pending |
| 2 | [Sitemap index split (4 files)](phase-02-sitemap-index-split.md) | pending |
| 3 | [Homepage hub + cross-pillar related](phase-03-internal-linking.md) | pending |
| 4 | [Vercel cron → IndexNow auto-ping](phase-04-indexnow-cron.md) | pending |
| 5 | [Structured data SearchAction](phase-05-structured-data.md) | pending |
| 6 | [Backlink action playbook](phase-06-backlink-playbook.md) | pending |

## Key Constraints
- **Superset rule**: `scripts/verify-sitemap-superset.ts` — KHÔNG được remove URL khỏi site, chỉ filter khỏi sitemap. Legacy hardcoded URLs phải giữ.
- **Không cần GSC Indexing API** — chỉ dùng cho JobPosting, không dùng được cho e-commerce.
- **IndexNow đã có route** `/api/indexnow` với key hardcoded — chỉ cần auto-trigger.

## Success Criteria
- Sitemap giảm từ 137 → ~55-65 URL chất lượng cao
- Weekly-price articles (`gia-xoai-tu-quy-{N}-2026`, `gia-xoai-tu-quy-tuan-{N}`) ẩn khỏi sitemap (nhưng trang vẫn live)
- Homepage link tới 15-20 hub page + pillar articles
- Cron daily ping IndexNow với top 20 URL ưu tiên
- Backlink checklist ready-to-execute cho user khi thức dậy

## Reports
- Research codebase: inline (section 1-8 of Explore agent)
- Research best practices: `reports/researcher-260415-2328-seo-crawl-budget-fix.md`
