# Setup Completion Report — 2026-04-09 23:10

## Decisions Locked

| # | Decision | Choice |
|---|----------|--------|
| 1 | UX writer model | **Claude Sonnet 4.6** (`claude-sonnet-4-6`) |
| 2 | Mini glossary Bến Tre | ✅ Built — `bentre-glossary.md` |
| 3 | UX effectiveness tracking | ✅ Schema `content_metrics` table (views, time, bounce, scroll, ux_pass_version) |
| 4 | Setup execution | ✅ Auto via Supabase CLI |

## Supabase Project

- **Name:** `traicaybentre`
- **Ref:** `zepsxbuxwqcsxbndbrsw`
- **Region:** Southeast Asia (Singapore) — closest to VN
- **Org:** `veutotckowpblmrbhgwv`
- **Tier:** Free (upgrade to Pro $25/mo when Vercel Cron > 2 jobs needed — already needed for 4 crons)
- **Dashboard:** https://supabase.com/dashboard/project/zepsxbuxwqcsxbndbrsw

## Database Schema (migrated ✅)

Migration file: `supabase/migrations/20260409155839_articles_prices_metrics.sql`

| Table | Purpose | RLS |
|-------|---------|-----|
| `articles` | AI content with UX gate | Public read `status='published'` |
| `price_history` | Daily-crawled mango prices | Public read all |
| `content_metrics` | UX A/B effectiveness | Service-role only |
| `holiday_calendar` | VN festivals (seeded 13 events 2026-2027) | Public read |

Key columns on `articles`:
- `body_mdx` (final), `draft_body_raw` (pre-UX audit)
- `slot` ENUM A/B/C
- `status` ENUM draft → ux_pending → ready → published → archived
- `ux_reviewed_at` MANDATORY gate (cron skips if NULL)
- `ux_pass_model` (locked = `claude-sonnet-4-6`)

## Files Created

### Code (5)
1. `src/lib/supabase-server.ts` — service-role admin client
2. `src/lib/supabase-public.ts` — anon public client
3. `src/lib/database.types.ts` — auto-generated TS types
4. `src/app/api/cron/publish-articles/route.ts` — single handler, slot via `?slot=A|B|C`
5. `src/app/api/cron/crawl-prices/route.ts` — daily price scraper + stale fallback

### Config (2)
6. `vercel.json` — 4 cron jobs (3 publish + 1 crawl)
7. `.env.local` — appended Supabase URL/anon/service-role + CRON_SECRET + DB password

### Plan docs (1)
8. `plans/260409-2215-marketing-daily-articles/bentre-glossary.md` — 80+ safe Vietnamese words + forbidden marketing-speak list + before/after example

## Vercel Cron Schedule (Asia/Saigon)

| Slot | VN time | UTC cron | Endpoint |
|------|---------|----------|----------|
| A (morning commute) | 07:00 | `0 0 * * *` | `/api/cron/publish-articles?slot=A` |
| B (lunch break) | 12:15 | `15 5 * * *` | `/api/cron/publish-articles?slot=B` |
| C (evening relax) | 20:00 | `0 13 * * *` | `/api/cron/publish-articles?slot=C` |
| Crawl | 05:30 | `30 22 * * *` | `/api/cron/crawl-prices` |

## Validation

- ✅ `npx tsc --noEmit` — clean
- ✅ `bunx eslint` on new files — clean
- ✅ `supabase db push` — migration applied
- ✅ Holiday seed inserted (13 events)
- ✅ TS types generated (373 lines)

## Next Steps (NOT yet done)

1. **Deploy to Vercel** — push env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`) via `vercel env add` or dashboard. Cron jobs only fire after deploy.
2. **Upgrade Vercel to Pro** ($20/mo) — free tier limits to 2 crons/day, plan needs 4
3. **Tune `crawl-prices` parser** — current is placeholder returning empty (auto stale fallback). After first inspection of `rauhoaquavietnam.vn` HTML, add cheerio selectors
4. **Build `articles-list` + `article-detail` pages** wired to Supabase
5. **Build `<PriceTickerFooter />`** component with disclaimer "Giá tham khảo, gọi vựa..."
6. **Build editor admin UI** for human UX-review gate (or use Supabase Studio directly initially)
7. **Seed first batch of articles** — run AI pipeline (pillar prompt → UX pass → manual review → flip status='ready')
8. **Lunar calendar lib** — install `lunar-javascript` for auto rằm/mùng 1 publish-ahead

## Cost Estimate (monthly)

| Item | Cost |
|------|------|
| Supabase Free | $0 (500MB DB enough for ~500 articles + price history) |
| Vercel Pro (cron) | $20 |
| Anthropic API (Sonnet 4.6) — 90 bài × 2 pass × ~3K tokens | ~$15-25 |
| **Total** | **~$35-45/mo** |

## Sensitive Data Note

`.env.local` contains:
- Supabase service role key (full DB write access)
- DB password
- CRON_SECRET

Ensured `.env.local` is in `.gitignore` (already covered by `.env*` pattern). DO NOT commit.
