---
title: "Daily SEO automation pipeline — Xoài Tứ Quý"
description: "3 GH Action workflows: daily long-tail article gen, daily price update, weekly rank tracker."
status: pending
priority: P1
effort: 4h
branch: claude/dreamy-thompson-f9478b
tags: [seo, automation, github-actions, anthropic-api, content-gen]
created: 2026-04-21
---

## Overview

Daily SEO ops on autopilot. Three GH Action cron jobs:
1. **8am VN** — Generate 1 long-tail article from KW backlog → commit → Vercel deploys → IndexNow + Syndicate fire
2. **6am VN** — Bump `PRICE_DATA.lastUpdated` + create daily price snapshot MDX → commit
3. **Sunday 10am VN** — SerpAPI rank check on ~30 KW → markdown report → commit

All push-driven side-effects (IndexNow, Syndicate, Vercel deploy) reuse existing workflows. No duplication.

---

## Workflow 1: Daily long-tail content gen

**File:** `.github/workflows/daily-content-gen.yml` | **Cron:** `0 1 * * *` (1am UTC = 8am VN)

### Design

```
┌─ Cron 8am VN ─┐
│  checkout     │
│  read backlog │ → data/keyword-backlog.json (status: pending|generating|done|skipped)
│  pick next    │ → first status=pending, sorted by priority desc
│  call Claude  │ → anthropic-sdk, claude-sonnet-4-5, ~3000 tokens out
│  validate     │ → frontmatter required fields + AEO checks (TL;DR, H2-?, ≥3 FAQ)
│  write MDX    │ → src/content/articles/{pillar}/{type}/{slug}.mdx
│  mark done    │ → backlog[i].status = "done", usedAt = today
│  commit+push  │ → triggers IndexNow + Syndicate via existing workflows
└───────────────┘
```

### KW backlog format

**Location:** `data/keyword-backlog.json` (NEW — root-level `data/` dir)

```json
{
  "version": 1,
  "keywords": [
    {
      "id": "ktq-001",
      "keyword": "xoài tứ quý loại nào ngon nhất",
      "intent": "informational",
      "priority": 9,
      "pillar": "xoai-tu-quy",
      "type": "kien-thuc",
      "slug": "xoai-tu-quy-loai-nao-ngon-nhat",
      "title": "Xoài Tứ Quý loại nào ngon nhất? So sánh VIP, Loại 1, Loại 2",
      "secondaryKeywords": ["xoài tứ quý vip", "xoài tứ quý loại 1", "phân loại xoài tứ quý"],
      "angle": "Compare 3 tiers, when to buy each, with vựa Phúc Giang real photos",
      "status": "pending",
      "usedAt": null
    }
  ]
}
```

**Seeding strategy (one-shot, manual):**
- Use Ahrefs/Ubersuggest exports (user already has Ubersuggest data per memory)
- Bulk-insert ~60 KW (2 months runway): mix of `kien-thuc` (evergreen) + `tin-tuc` (timely)
- Maintain priority 1-10 (10 = highest search volume × lowest difficulty)
- User adds 5-10 new KW weekly (5 min task)

### Quality gate

Reject + skip (mark `status="skipped"`, log reason) if:
- Word count < 800 or > 2500
- No `## ` H2 starting with question word (Vì sao, Cách, Bao nhiêu, Khi nào, etc.)
- Missing `> **Trả lời nhanh:**` TL;DR block
- FAQ frontmatter has < 3 entries
- Slug already exists (check `src/content/articles/{pillar}/{type}/{slug}.mdx`)

If skip: keep KW in backlog, log `skipReason`. Next run picks next pending.

### Script outline

**File:** `scripts/generate-daily-article.js`

```js
// 1. Load backlog: const backlog = JSON.parse(fs.readFileSync('data/keyword-backlog.json'))
// 2. Pick: const kw = backlog.keywords.find(k => k.status === 'pending')
//    Sort by priority desc before find. If none → exit 0 with log.
// 3. Build prompt from prompts/daily-article-template.md (loads template + injects kw)
// 4. Call Anthropic:
//    const msg = await client.messages.create({
//      model: 'claude-sonnet-4-5',
//      max_tokens: 4000,
//      messages: [{ role: 'user', content: prompt }]
//    })
// 5. Parse: extract MDX from response (between ```mdx fences)
// 6. Validate: validateAeo(mdx) → throws on fail
// 7. Write file: fs.writeFileSync(targetPath, mdx)
// 8. Update backlog: kw.status = 'done', kw.usedAt = today; fs.writeFileSync(...)
// 9. Log to stdout: "✓ Generated {slug} ({wordCount} words)"
```

**Prompt template:** `prompts/daily-article-template.md` — defines AEO structure, brand voice, vựa Phúc Giang context, contact `0932 585 533`, and exemplar from existing article.

### Acceptance criteria

- [ ] First manual run via `workflow_dispatch` generates valid MDX, passes validation, commits
- [ ] Cron triggers successfully next day; check Actions tab
- [ ] IndexNow workflow triggers on the new commit (verify in Actions)
- [ ] Syndicate workflow triggers on the new commit (verify in Actions)
- [ ] If backlog empty → workflow exits 0 cleanly, no commit, no error
- [ ] If validation fails → KW marked skipped, no commit, workflow exits 0 (do not fail Actions)

---

## Workflow 2: Daily price update

**File:** `.github/workflows/daily-price-update.yml` | **Cron:** `0 23 * * *` (23:00 UTC prev day = 6am VN)

### Design

Two parts in one job:

**A. Bump `src/lib/price-data.ts`:** update `lastUpdated: "YYYY-MM-DD"` to today. Tier prices stay same unless user manually edits. This is a **freshness signal** — file mtime + commit refreshes Google's perception.

**B. Generate daily snapshot MDX:** `src/content/articles/xoai-tu-quy/tin-tuc/gia-xoai-tu-quy-{DD}-2026.mdx` (filename pattern matches existing daily snapshots — see `gia-xoai-tu-quy-21-2026.mdx`).

**Recommendation: hybrid approach.** Static MDX snapshot (one per day) + dynamic `PRICE_DATA` source. Snapshot pages are SEO targets ("giá xoài tứ quý ngày 22/4"); central source is for product page rendering.

### Price data source

**Decision: manually maintained `PRICE_DATA` in `src/lib/price-data.ts`.** No scraping.

Rationale (YAGNI):
- User is the vựa — knows true price
- Scraping (chợ đầu mối Hóc Môn, Thủ Đức) = brittle, ToS risk
- User updates price ~weekly via PR or by editing JSON in `data/daily-prices.json` (NEW)

**New file:** `data/daily-prices.json` — append-only daily log.

```json
{
  "2026-04-21": {
    "vipMin": 23000, "vipMax": 25000,
    "loai1Min": 20000, "loai1Max": 22000,
    "loai2Min": 16000, "loai2Max": 18000,
    "note": "Đầu mùa hè, sản lượng dồi dào",
    "weather": "Nắng nhẹ, nhiệt 32°C"
  }
}
```

If today's date missing → reuse most recent entry (carry-forward). User edits this file when prices shift.

### Script outline

**File:** `scripts/daily-price-snapshot.js`

```js
// 1. Read data/daily-prices.json
// 2. Get today entry OR most recent
// 3. Update src/lib/price-data.ts:
//    - Replace lastUpdated string via regex
//    - Replace each tier's priceRange + priceMin + priceMax
// 4. Generate MDX from prompts/daily-price-template.md (Handlebars-style, no Claude API needed)
//    - Inject {date}, {vipRange}, {loai1Range}, {loai2Range}, {note}, {weather}
//    - 4-5 FAQ entries (templated)
//    - Includes <PriceTable /> reference + AEO TL;DR
// 5. Write to src/content/articles/xoai-tu-quy/tin-tuc/gia-xoai-tu-quy-{DD}-2026.mdx
//    - If file exists → overwrite (idempotent)
// 6. Done — git commit handled in workflow yaml
```

**KISS:** Workflow 2 does NOT call Claude API. Pure templating. Cost = $0.

### Acceptance criteria

- [ ] Daily MDX file appears with correct date + filename pattern
- [ ] `price-data.ts` `lastUpdated` field bumped to today
- [ ] Snapshot MDX has TL;DR, ≥3 FAQ, structured table
- [ ] If today already has snapshot → re-run is idempotent (overwrite OK)
- [ ] Push triggers IndexNow + Syndicate

---

## Workflow 3: Weekly rank tracker

**File:** `.github/workflows/weekly-rank-tracker.yml` | **Cron:** `0 3 * * 0` (3:00 UTC Sunday = 10am VN)

### Tool choice: SerpAPI

| Option | Cost | Reliability | Recommendation |
|--------|------|------------|----------------|
| **SerpAPI** | $50/mo (5000 searches) | High, official | **CHOSEN** |
| DataForSEO | $50/mo similar | High, but heavier setup | Skip (overkill) |
| Free scraping | $0 | Low (CAPTCHA, IP block within days) | NO — fragile |

30 KW × 4 weeks = 120 searches/mo. SerpAPI's 100 free searches/mo plan covers this. **Start free, upgrade only if needed.**

### Design

```
┌─ Sunday 10am VN ─┐
│  checkout         │
│  read tracked KW  │ → data/tracked-keywords.json
│  loop SerpAPI     │ → google.com.vn, gl=vn, hl=vi, location=Vietnam
│  parse positions  │ → find traicaybentre.com in top 100
│  build report     │ → markdown table: KW | pos | Δ | URL
│  diff vs last     │ → load plans/reports/rank-tracker-{prev}.md
│  write report     │ → plans/reports/rank-tracker-{YYMMDD}.md
│  commit+push      │ → no IndexNow needed (reports/ excluded)
└──────────────────┘
```

### Tracked keywords file

**File:** `data/tracked-keywords.json`

```json
{
  "keywords": [
    "xoài tứ quý",
    "xoài tứ quý bến tre",
    "xoài tứ quý giá bao nhiêu",
    "mua xoài tứ quý",
    "xoài tứ quý vip",
    "xoài tứ quý hà nội",
    "..."
  ]
}
```

User seeds 30 KW initially. Plan-mode addable later.

### Script outline

**File:** `scripts/rank-tracker.js`

```js
// 1. Load tracked-keywords.json
// 2. For each KW: fetch SerpAPI
//    https://serpapi.com/search?q={kw}&engine=google&google_domain=google.com.vn&gl=vn&hl=vi&num=100&api_key=${SERPAPI_KEY}
// 3. Parse organic_results[]; find first url containing 'traicaybentre.com'
// 4. Record { keyword, position, url, snippet }
// 5. Read previous report (plans/reports/rank-tracker-* sorted desc, take 1)
// 6. Compute delta per KW (current pos - prev pos)
// 7. Write markdown:
//    | KW | Pos | Δ | URL |
//    Sort by current position asc; "—" for not-in-top-100
// 8. Add summary row: top-10 count, top-3 count, avg position
```

**Add to indexnow-notify.yml paths-ignore:** `plans/reports/**` (already implicit — only mdx + app/ paths trigger).

### Acceptance criteria

- [ ] First manual run produces valid markdown report
- [ ] Report committed to `plans/reports/rank-tracker-260427.md`
- [ ] Subsequent runs show Δ column populated correctly
- [ ] Report does NOT trigger IndexNow (excluded path)
- [ ] If SERPAPI_KEY missing → fail clearly, do not silently no-op

---

## Implementation steps (sequential, executable in 1 dev session)

1. **Add `data/keyword-backlog.json`** — seed with 10 sample KW for first week (user supplements later).
2. **Add `data/daily-prices.json`** — seed today's prices from current `PRICE_DATA`.
3. **Add `data/tracked-keywords.json`** — seed 30 KW from user's Ubersuggest export (placeholder list now, user refines).
4. **Add `prompts/daily-article-template.md`** — full prompt with AEO structure + brand voice + 1 exemplar.
5. **Add `prompts/daily-price-template.md`** — Handlebars-style template for snapshot MDX.
6. **Add `scripts/generate-daily-article.js`** — content gen (uses `@anthropic-ai/sdk`).
7. **Add `scripts/validate-aeo.js`** — shared validator (TL;DR, H2-?, FAQ ≥3, frontmatter).
8. **Add `scripts/daily-price-snapshot.js`** — price update + MDX gen.
9. **Add `scripts/rank-tracker.js`** — SerpAPI client + report builder.
10. **Add `.github/workflows/daily-content-gen.yml`** — cron + checkout + npm install + run script + commit.
11. **Add `.github/workflows/daily-price-update.yml`** — same pattern, no API key needed.
12. **Add `.github/workflows/weekly-rank-tracker.yml`** — same pattern + SERPAPI_KEY secret.
13. **Test locally:** Run each script with `--dry-run` flag (add to scripts).
14. **Add GH secrets:**
    - `ANTHROPIC_API_KEY` (already may exist — check)
    - `SERPAPI_KEY` (user signs up at serpapi.com — free tier)
15. **Manual trigger via `workflow_dispatch`** — test each workflow once.
16. **Monitor 7 days** — check Actions logs daily.

---

## Files to create

```
data/keyword-backlog.json                              [NEW]
data/daily-prices.json                                 [NEW]
data/tracked-keywords.json                             [NEW]
prompts/daily-article-template.md                      [NEW]
prompts/daily-price-template.md                        [NEW]
scripts/generate-daily-article.js                      [NEW]
scripts/validate-aeo.js                                [NEW, shared]
scripts/daily-price-snapshot.js                        [NEW]
scripts/rank-tracker.js                                [NEW]
.github/workflows/daily-content-gen.yml                [NEW]
.github/workflows/daily-price-update.yml               [NEW]
.github/workflows/weekly-rank-tracker.yml              [NEW]
```

## Files to modify

```
src/lib/price-data.ts                  [bumped daily by workflow 2]
.gitignore                             [add data/keyword-backlog.json.bak if needed]
package.json                           [no new deps — gray-matter + @anthropic-ai/sdk already present]
```

---

## Cost estimate

| Service | Tier | Monthly cost | Notes |
|---------|------|--------------|-------|
| **Anthropic API** | claude-sonnet-4-5 | **~$3-5/mo** | 1 article/day × ~$0.10-0.15 input + ~$0.06 output (~4K tokens out × $15/M) |
| **SerpAPI** | Free | **$0/mo** | 100 searches/mo free; 30 KW × 4 weeks = 120 (need $50 plan if every Sunday) |
| **SerpAPI fallback** | Developer | $50/mo | If free tier insufficient — use only after confirming need |
| **GH Actions** | Free | $0 | Public repo = unlimited; private = 2000 min/mo (we use ~5 min/day = 150/mo) |

**Realistic monthly: $3-5** (free SerpAPI tier won't cover weekly 30-KW; user can either reduce to 15 KW or upgrade later).

**One-time:** Manual prompt tuning during week 1.

---

## Risk assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Generated article quality drops | Medium | High | Validation gate; user reviews weekly; tune prompt |
| Anthropic API rate-limit / outage | Low | Medium | Workflow logs error, retries next day; backlog preserved |
| Backlog runs empty | High after 60 days | Low | User adds 5-10 KW/week (5 min task); workflow exits cleanly when empty |
| Duplicate slug overwrites article | Low | High | Validation checks file existence; mark KW skipped, log error |
| Daily price snapshot MDX flood | Medium | Low | 30 snapshots/mo = manageable; cleanup script after 90 days (future task) |
| SerpAPI free tier exhausted | High | Low | Cut to 15 KW or pay $50; reports still useful even monthly |
| Anthropic key leak | Low | Critical | Stored in GH Secrets only; never committed; rotate quarterly |
| Vercel build fails on bad MDX | Medium | High | Validation catches before commit; if slip-through → revert PR |

---

## Backwards compatibility

- All new files are additive; no existing code paths modified except `price-data.ts` (line-level edit only)
- Existing 3 workflows unchanged — new commits just trigger them as normal
- Existing articles unaffected
- Rollback: delete the 3 new workflow files to disable. Backlog/data files remain harmless.

---

## Test matrix

| Component | Test | Type |
|-----------|------|------|
| `validate-aeo.js` | Reject missing TL;DR | Unit |
| `validate-aeo.js` | Reject < 3 FAQ | Unit |
| `validate-aeo.js` | Accept valid MDX | Unit |
| `generate-daily-article.js --dry-run` | Picks correct KW, no API call | Manual |
| `daily-price-snapshot.js --dry-run` | Generates MDX, no write | Manual |
| `rank-tracker.js --dry-run` | Mock SerpAPI response, parses correctly | Manual |
| Workflow 1 manual dispatch | End-to-end commit + IndexNow + Syndicate | Integration |
| Workflow 2 manual dispatch | Bumps lastUpdated + creates today's snapshot | Integration |
| Workflow 3 manual dispatch | Generates report committed to plans/reports/ | Integration |

---

## Success criteria

- [ ] 7 consecutive days: workflow 1 generates 1 valid article/day, no manual intervention
- [ ] 7 consecutive days: workflow 2 bumps price + creates daily snapshot
- [ ] First Sunday: rank tracker report committed; deltas visible by week 2
- [ ] After 30 days: at least 50% of tracked KW in top 50; 25% in top 20
- [ ] Anthropic monthly bill < $10
- [ ] Zero broken builds caused by auto-generated content

---

## Open questions

1. **Does `ANTHROPIC_API_KEY` already exist in GH Secrets?** If not, user must add it (one-time, 1 min).
2. **SerpAPI free tier feasibility:** 100 searches/mo vs 120 needed. Recommend starting with 25 KW (= 100/mo exactly) or accepting 1 missed week. User decision.
3. **Should daily price snapshots be deleted after 90 days?** They're SEO-low-value past 30 days. Defer cleanup script to v2 (YAGNI).
4. **Where does user source new KW after backlog runs out?** Recommend monthly Ubersuggest export → manual seed PR. Could later automate with SerpAPI's `related_searches`. v2.
5. **Brand voice consistency across AI-gen articles:** initial week 1 = user reviews each output, refines `daily-article-template.md` prompt. After tuning, expect minimal touch-up.

---

**Status:** DONE
**Summary:** Plan defines 3 GH Action workflows + 4 supporting scripts + 3 data files. Reuses existing IndexNow/Syndicate. Cost ~$3-5/mo Anthropic, $0 SerpAPI free tier. Implementable in single 3-5h dev session. 5 open questions flagged (mostly user decisions, not blockers).
