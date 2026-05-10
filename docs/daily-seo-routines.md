# Daily SEO Push Routines — Spec

**Status:** Pending Claude Code Routines API (currently auth issue)
**Created:** 2026-05-09
**Purpose:** Comprehensive daily automation để push KW rankings

## Architecture

7 routines: 5 daily + 2 weekly. Tất cả chạy via Claude Code Routines (cloud, bundled subscription).

## Routine specs

### 1. daily-content-gen — 8am VN
**Cron:** `0 1 * * *` (1am UTC)
**Cost:** $0 (Claude subscription)
**Prompt:**
```
Read data/keyword-backlog.json. Pick highest-priority pending KW.
Spawn opus researcher to write 1500-word article following docs/source-citation-guide.md.
Apply convention 27/04 (sources mandatory).
Set frontmatter uxReviewed: true (sitemap visibility).
Validate via scripts/validate-aeo.js — must pass.
Update backlog status pending → published.
Commit + push to claude/dreamy-thompson-f9478b branch.
Report: slug + word count + sources count.
```

### 2. daily-sitemap-audit — 7am VN
**Cron:** `0 0 * * *` (0am UTC)
**Prompt:**
```
Find all articles in src/content/articles có uxReviewed: false.
For each, run validate-aeo. If pass, flip uxReviewed: true.
If fail, log error to plans/reports/sitemap-audit-{date}.md.
Commit if any flipped.
Goal: Prevent 09/05-style invisible content bug.
```

### 3. daily-rank-track-top5 — 10am VN
**Cron:** `0 3 * * *` (3am UTC)
**Cost:** ~150 SerpAPI/mo (free tier 100 — split usage)
**Prompt:**
```
Run scripts/rank-tracker.js với --top5 flag (curated 5 most-important KW).
Compare với yesterday's report.
If drop >3 positions OR win lost: create alert in plans/reports/rank-alert-{date}.md.
Save full report plans/reports/rank-daily-{date}.md.
Commit.
```

### 4. weekly-gsc-mine — Sunday 9am VN
**Cron:** `0 2 * * 0` (2am UTC Sunday)
**Prompt:**
```
Open GSC via Chrome MCP (https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain:traicaybentre.com).
Filter: last 7 days, sort by impressions desc.
Extract top 30 queries với impressions >5 + clicks <2 + position >10.
Pre-existing slug check: skip nếu match existing article.
Add 5-10 new KW to data/keyword-backlog.json với priority 7-10.
Commit + report.
```

### 5. daily-backlog-health — 12pm VN
**Cron:** `0 5 * * *` (5am UTC)
**Prompt:**
```
Count pending KW in data/keyword-backlog.json.
If <14 days runway (assuming 1 article/day):
  - Trigger weekly-gsc-mine routine manually
  - Report low backlog warning
Else: silent OK.
```

### 6. weekly-quality-audit — Friday 3pm VN
**Cron:** `0 8 * * 5` (8am UTC Friday)
**Prompt:**
```
Audit src/content/articles:
- Articles uxReviewed:true nhưng missing sources frontmatter
- Articles không validate-aeo pass
- Duplicate slugs
- AI-tells (>20 emoji, "phiên bản hoàng gia" cliché, "Calorit" typos)
Save report plans/reports/quality-audit-{date}.md.
Alert if any critical issues.
```

### 7. weekly-rank-full — Sunday 10am VN
**Cron:** `0 3 * * 0` (3am UTC Sunday)
**Status:** ✅ Already exists as `.github/workflows/weekly-rank-tracker.yml`
**Note:** Có thể migrate sang Claude Routine để consolidate.

---

## Setup instructions (when API works)

1. Authenticate Claude Code với claude.ai (Settings → Account)
2. For each routine, run:
   ```
   /schedule create
   - Name: {routine-name}
   - Cron: {cron-expression}
   - Prompt: {paste from spec above}
   - Working dir: /Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/dreamy-thompson-f9478b/
   ```
3. Verify via `/schedule list`
4. Test each routine với `/schedule run-now {routine-name}`

## Fallback (if Routines unavailable long-term)

Use GH Actions cron để invoke `claude-code` CLI:
- Need: ANTHROPIC_API_KEY in GH Secrets
- Cost: per-call API ($0.10-0.50/article)
- Total: ~$10-20/mo for full pipeline

## Open questions

1. Does Claude Code Routines support `Agent` tool (for subagent spawning)?
2. Cost model — does each routine count against subscription quota?
3. Concurrent routine execution — can 2 routines run simultaneously?
4. Failure handling — auto-retry, alert mechanism?
5. State persistence — does routine remember previous runs?
