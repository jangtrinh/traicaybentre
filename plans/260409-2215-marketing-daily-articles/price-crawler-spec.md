# Price Crawler Spec — Auto cào giá xoài thị trường

**Mục tiêu:** Cào giá xoài từ nhiều nguồn công khai hằng ngày 05:30 VN, normalize vào `price_history`, phục vụ bài Slot A (news/giá thị trường) và component `<PriceTickerFooter />`.
**Stack:** Playwright headless + Vercel Cron + Supabase.

---

## 1. Sources (ưu tiên theo độ tin cậy)

| # | Source | URL/selector | Tần suất cập nhật | Độ khó scrape | Hợp pháp |
|---|---|---|---|---|---|
| 1 | rauhoaquavietnam.vn | `https://rauhoaquavietnam.vn/gia-ca-thi-truong` | Daily | Low (HTML table) | Public, robots allow |
| 2 | nongsan.gov.vn | `https://nongsan.gov.vn/` | Weekly | Medium | Public |
| 3 | Bách Hóa Xanh | `https://www.bachhoaxanh.com/trai-cay-tuoi/xoai` | Realtime | Medium (JS render) | Public product page, respect ToS |
| 4 | Tiki / Shopee | Search API "xoài tứ quý" | Realtime | High (anti-bot) | Use public search, rate-limit |
| 5 | FB groups chợ đầu mối Thủ Đức / Hóc Môn | N/A | Realtime | Very High (login required) | **Skip phase 1** — legal grey zone |

**Phase 1 MVP:** Chỉ scrape source #1 + #3. Các nguồn khác là bonus.

---

## 2. Supabase Schema

```sql
create table public.price_history (
  id bigserial primary key,
  source text not null,                 -- 'rauhoaquavietnam' | 'bachhoaxanh' | 'tiki' | ...
  source_url text,
  variety text not null,                -- 'xoai_tu_quy' | 'xoai_cat_hoa_loc' | 'xoai_cat_chu' | ...
  quality_grade text,                   -- 'vip' | 'loai_1' | 'loai_2' | 'le' | null
  price_vnd_per_kg integer not null,
  currency text default 'VND',
  market_region text,                   -- 'thu_duc' | 'hoc_mon' | 'ben_tre' | 'toan_quoc'
  crawled_at timestamptz not null default now(),
  raw_payload jsonb,                    -- full scraped row for audit
  is_stale boolean default false        -- marked true if fallback to previous day
);

create index idx_price_variety_crawled on price_history(variety, crawled_at desc);
create index idx_price_source_crawled on price_history(source, crawled_at desc);
```

**Query latest giá:**
```sql
select distinct on (variety, quality_grade) *
from price_history
where variety = 'xoai_tu_quy'
order by variety, quality_grade, crawled_at desc;
```

---

## 3. Vercel Cron

`vercel.json` thêm vào crons array:
```json
{ "path": "/api/cron/crawl-prices", "schedule": "30 22 * * *" }
```
UTC 22:30 = VN 05:30 hôm sau.

---

## 4. Crawler Handler Pseudo-code

`src/app/api/cron/crawl-prices/route.ts`:

```typescript
import { chromium } from 'playwright';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300; // 5 min for scraping

const SCRAPERS = [
  { name: 'rauhoaquavietnam', fn: scrapeRauHoaQua },
  { name: 'bachhoaxanh', fn: scrapeBachHoaXanh },
];

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const browser = await chromium.launch({ headless: true });
  const results: any[] = [];

  try {
    for (const { name, fn } of SCRAPERS) {
      try {
        const rows = await fn(browser);
        results.push(...rows.map(r => ({ ...r, source: name })));
        await sleep(3000); // polite rate limit 1 req / 3s
      } catch (e) {
        await logSentry('crawler_source_failed', { source: name, err: String(e) });
      }
    }
  } finally {
    await browser.close();
  }

  // Fallback: if total rows < 3, clone yesterday with is_stale=true
  if (results.length < 3) {
    await cloneYesterdayStale();
    return Response.json({ ok: true, used_fallback: true, count: results.length });
  }

  // Insert normalized rows
  const supabase = createClient(/* ... */);
  const { error } = await supabase.from('price_history').insert(results);
  if (error) {
    await logSentry('crawler_insert_failed', { err: error });
    return Response.json({ error: 'insert_failed' }, { status: 500 });
  }

  return Response.json({ ok: true, inserted: results.length });
}

async function scrapeRauHoaQua(browser) {
  const ctx = await browser.newContext({
    userAgent: 'TraiCayBenTreBot/1.0 (+https://traicaybentre.com/bot)',
  });
  const page = await ctx.newPage();
  await page.goto('https://rauhoaquavietnam.vn/gia-ca-thi-truong', { waitUntil: 'domcontentloaded' });
  // Example selector (verify actual markup):
  const rows = await page.$$eval('table.price-table tr', trs =>
    trs.map(tr => {
      const cells = tr.querySelectorAll('td');
      return {
        name: cells[0]?.textContent?.trim(),
        price: cells[1]?.textContent?.trim(),
        unit: cells[2]?.textContent?.trim(),
      };
    })
  );
  await ctx.close();
  return normalizeRows(rows);
}

function normalizeRows(raw) {
  return raw
    .filter(r => /xoài|xoai/i.test(r.name ?? ''))
    .map(r => ({
      variety: detectVariety(r.name),            // map keywords → variety enum
      quality_grade: detectGrade(r.name),
      price_vnd_per_kg: parsePriceVnd(r.price, r.unit),
      market_region: 'toan_quoc',
      raw_payload: r,
    }))
    .filter(r => r.price_vnd_per_kg > 0);
}
```

---

## 5. Legal / Ethical Compliance

- **robots.txt:** check mỗi source trước khi enable. Nếu disallow → skip source.
- **Rate limit:** 1 request / 3 giây tối thiểu. Không parallel scrape cùng domain.
- **User-Agent:** định danh rõ `TraiCayBenTreBot/1.0 (+https://traicaybentre.com/bot)` — không giả browser.
- **Cache respect:** Không bypass cache headers.
- **Data use:** chỉ hiển thị giá trung bình + link about page của source, không clone nguyên table → tránh copyright claim.
- **FB scrape:** KHÔNG làm ở phase 1 — TOS nghiêm, login required.
- **Opt-out:** Nếu source liên hệ yêu cầu dừng → remove ngay, log trong `docs/crawler-compliance.md`.

---

## 6. Display Layer

### Component `<PriceTickerFooter />`
Placement: cuối mỗi bài article (layout template).

```tsx
// src/components/price-ticker-footer.tsx
export async function PriceTickerFooter() {
  const prices = await getLatestPrices(); // ISR cache 1h, tag 'prices'
  const lastCrawl = prices[0]?.crawled_at;

  return (
    <aside className="mt-12 border-t pt-6 text-sm">
      <h3 className="font-semibold mb-2">Giá xoài thị trường tham khảo</h3>
      <table>{/* render prices */}</table>
      <p className="text-amber-700 mt-3">
        💬 Giá tham khảo thị trường, cập nhật {formatVN(lastCrawl)}.
        Vui lòng <strong>gọi vựa (0xxx xxx xxxx)</strong> để có báo giá sỉ/lẻ chính xác theo số lượng.
      </p>
      {prices.some(p => p.is_stale) && (
        <p className="text-xs text-gray-500">* Dữ liệu có thể trễ 1 ngày do nguồn tạm gián đoạn.</p>
      )}
    </aside>
  );
}
```

### Page `/gia-xoai-hom-nay`
- Full bảng giá + line chart 30 ngày (dùng raw SQL query group by variety)
- Có cùng disclaimer "gọi vựa" bắt buộc ở đầu + cuối
- Schema: `Dataset` + `PriceSpecification` cho AEO

---

## 7. Slot A Auto-reference

Template bài Slot A hằng tuần:
- **Title:** "Giá xoài tứ quý tuần {WW}/{YYYY} ở chợ đầu mối" (cho weekly) hoặc "Giá xoài hôm nay {DD/MM}" (daily news)
- **Body:** Query `price_history` 7 ngày gần nhất → render table + short analysis → auto-publish
- **Tần suất:** 1 bài/tuần vào Slot A thứ Hai hoặc theo schedule
- **Human review:** Editor xác nhận analysis paragraph trước khi flip `status='ready'`

Phase sau: auto-generate draft bài từ template → cần editor approve (không publish thẳng, tránh hallucination).

---

## 8. Failure Modes & Mitigation

| Failure | Detection | Fallback |
|---|---|---|
| Source đổi DOM → selector fail | 0 rows từ source đó | `crawler_source_failed` Sentry, vẫn dùng source khác |
| Tất cả source fail | Total rows < 3 | Clone yesterday với `is_stale=true` + Zalo alert |
| Playwright timeout | `maxDuration=300` hit | Vercel kills cron, retry ngày sau. Nếu lặp 3 ngày → escalate |
| Bị block IP | HTTP 403/429 | Tăng delay, rotate UA, cuối cùng skip source |
| Dirty data (giá abnormal) | Sanity check: nếu lệch > 3σ 30-day avg | Flag `raw_payload.suspicious=true`, không insert vào display query |

---

## 9. Rollback Plan

| Layer | Action |
|---|---|
| Cron | Remove entry từ `vercel.json` |
| Data | Không DELETE — chỉ stop inserting mới. History giữ để audit |
| Component | `<PriceTickerFooter />` có prop `enabled={false}` để tắt global không cần redeploy |
| Display | Fallback về giá static trong `src/data/prices-fallback.json` nếu DB fail |

---

## 10. Rollout Checklist

- [ ] Verify `robots.txt` từng source
- [ ] Install Playwright: `bun add -d playwright && npx playwright install chromium`
- [ ] Create `price_history` table + indexes
- [ ] Implement scraper per source + unit test với HTML fixture
- [ ] Deploy cron route, trigger manually
- [ ] Monitor 7 ngày — kiểm tra data quality
- [ ] Add `<PriceTickerFooter />` vào article layout
- [ ] Publish page `/gia-xoai-hom-nay` với disclaimer
- [ ] Document compliance trong `docs/crawler-compliance.md`
