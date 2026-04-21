# SEO Automation Pipeline — Setup Guide

Three GitHub Actions workflows automate daily SEO ops for traicaybentre.com.

## Required Secrets

| Secret | Used by | Required |
|--------|---------|----------|
| `ANTHROPIC_API_KEY` | `daily-content-gen.yml` (Workflow 1) | Yes |
| `SERPAPI_KEY` | `weekly-rank-tracker.yml` (Workflow 3) | Yes |

### ANTHROPIC_API_KEY

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Navigate to **API Keys** → **Create Key**
3. Copy the key (shown once — save it)
4. Add to GitHub:
   ```bash
   gh secret set ANTHROPIC_API_KEY --body "sk-ant-..."
   ```
   Or: GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### SERPAPI_KEY

1. Sign up at [serpapi.com](https://serpapi.com) (free tier: 100 searches/month)
2. Go to [serpapi.com/manage-api-key](https://serpapi.com/manage-api-key)
3. Copy your API key
4. Add to GitHub:
   ```bash
   gh secret set SERPAPI_KEY --body "your-serpapi-key"
   ```

> **Free tier note:** 25 keywords × 4 Sundays = 100 searches/month — exactly matches the free tier. If you add more keywords, upgrade to the $50/mo Developer plan.

---

## Expected Monthly Cost

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| Anthropic API | claude-sonnet-4-5 | ~$3–5/mo | 1 article/day × ~$0.10–0.15 input + ~$0.06 output |
| SerpAPI | Free | $0/mo | 100 searches/mo (25 KW × 4 weeks) |
| GitHub Actions | Free (public repo) | $0/mo | ~5 min/day = ~150 min/mo of 2,000 free |

**Total: ~$3–5/month.**

---

## Workflow Schedule

| Workflow | File | Schedule | Vietnam Time |
|----------|------|----------|-------------|
| Daily article gen | `daily-content-gen.yml` | `0 1 * * *` | 8am daily |
| Daily price update | `daily-price-update.yml` | `0 23 * * *` | 6am daily |
| Weekly rank tracker | `weekly-rank-tracker.yml` | `0 3 * * 0` | Sunday 10am |

---

## Manual Triggers

Trigger any workflow without waiting for cron:

```bash
# Trigger article generation
gh workflow run daily-content-gen.yml

# Trigger price update
gh workflow run daily-price-update.yml

# Trigger rank tracker
gh workflow run weekly-rank-tracker.yml
```

Or via GitHub UI: **Actions** tab → select workflow → **Run workflow** button.

---

## Data Files (user-maintained)

### `data/daily-prices.json`

Add a new entry when prices change (you don't need to update daily — the script carries forward the most recent entry):

```json
{
  "2026-04-22": {
    "vipMin": 23000,
    "vipMax": 25000,
    "loai1Min": 20000,
    "loai1Max": 22000,
    "loai2Min": 16000,
    "loai2Max": 18000,
    "note": "Sản lượng dồi dào đầu vụ hè",
    "weather": "Nắng, 33°C"
  }
}
```

### `data/keyword-backlog.json`

Add new keywords when backlog runs low (aim for 2 months runway = ~60 KW):

```json
{
  "id": "ktq-016",
  "keyword": "your new keyword",
  "intent": "informational",
  "priority": 8,
  "pillar": "xoai-tu-quy",
  "type": "kien-thuc",
  "slug": "your-new-slug",
  "title": "Your Article Title",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "angle": "What angle/content focus this article should take",
  "status": "pending",
  "usedAt": null
}
```

### `data/tracked-keywords.json`

Add/remove keywords to track weekly. Keep at 25 to stay within SerpAPI free tier (100/mo).

---

## Troubleshooting

### Workflow 1 (article gen) fails with "ANTHROPIC_API_KEY not set"

The `ANTHROPIC_API_KEY` secret is missing or named incorrectly. Check:
```bash
gh secret list
```

### Workflow 1 generates article but it fails AEO validation

The article is marked `status: "skipped"` in `data/keyword-backlog.json` with a `skipReason`. Check Actions logs for the specific validation error. Common fix: edit `prompts/daily-article-template.md` to strengthen the prompt instructions.

### Workflow 2 (price update) shows "No changes to commit"

Today's snapshot already exists (idempotent — safe to re-run). Or `daily-prices.json` hasn't changed since the last run and `price-data.ts` `lastUpdated` is already today.

### Workflow 3 (rank tracker) fails with "SERPAPI_KEY secret is not configured"

Add the `SERPAPI_KEY` secret (see setup above). The workflow prints exact instructions in the error log.

### Workflow 3 shows all keywords "not found"

Either: (a) the domain hasn't ranked for those terms yet — expected initially; (b) SerpAPI free tier exhausted for the month — check your usage at [serpapi.com/dashboard](https://serpapi.com/dashboard).

### Vercel build fails after auto-generated article

The generated MDX has a syntax error that slipped past AEO validation. Revert the commit:
```bash
git revert HEAD
git push
```
Then check Actions logs for the validation warnings and tighten `prompts/daily-article-template.md`.

---

## Local Testing

Test scripts without committing or calling APIs:

```bash
# Test article generator (no API call)
node scripts/generate-daily-article.js --dry-run

# Test price snapshot (no writes)
node scripts/daily-price-snapshot.js --dry-run

# Test rank tracker (mock SerpAPI responses)
node scripts/rank-tracker.js --dry-run
```

---

## Rotating API Keys

Rotate the Anthropic key quarterly:
```bash
# Generate new key at console.anthropic.com, then:
gh secret set ANTHROPIC_API_KEY --body "sk-ant-new-key..."
```

Old key can be revoked immediately after the secret is updated — GitHub Actions picks up the new value on the next run.
