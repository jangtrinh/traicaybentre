# Publishing Automation Spec — 3 bài/ngày × 3 slot (Asia/Saigon)

**Mục tiêu:** Auto-publish 3 bài/ngày tại 07:00, 12:15, 20:00 (giờ VN) từ hàng đợi `articles` trong Supabase, không cần human on-call mỗi slot.
**Stack:** Next.js 15 App Router + Supabase Postgres + Vercel Cron + ISR `revalidateTag`.

---

## 1. Slot Strategy

| Slot | Giờ VN | UTC cron | Intent dominant | Pillar ưu tiên |
|---|---|---|---|---|
| A — Morning | 07:00 | `0 0 * * *` | News/giá thị trường (commute, đọc báo sáng) | P1 (giá) + P6 (mùa vụ/lễ hội) |
| B — Noon | 12:15 | `15 5 * * *` | How-to/mẹo ngắn (nghỉ trưa, scroll nhanh) | P4 (chọn/bảo quản/thưởng thức) |
| C — Evening | 20:00 | `0 13 * * *` | Longform/heritage/so sánh (đọc sâu relax) | P2 (so sánh) + P5 (heritage) + P3 (GEO longform) |

**Rule:** Mỗi slot chỉ publish 1 bài. Content calendar đã pre-classified Slot A/B/C cho từng bài.

---

## 2. Supabase Schema

```sql
-- articles table
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_mdx text not null,
  pillar text not null check (pillar in ('P1','P2','P3','P4','P5','P6')),
  slot text not null check (slot in ('A','B','C')),
  primary_keyword text not null,
  secondary_keywords text[] default '{}',
  meta_description text,
  og_image_url text,
  schema_jsonld jsonb,
  internal_links jsonb default '[]',
  status text not null default 'draft' check (status in ('draft','ready','scheduled','published','failed')),
  scheduled_for timestamptz,      -- wall clock UTC for target slot
  published_at timestamptz,
  author_name text default 'Ban Biên Tập Trái Cây Bến Tre',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_articles_status_scheduled on articles(status, scheduled_for);
create index idx_articles_slot_status on articles(slot, status);
create index idx_articles_published_at on articles(published_at desc);

-- trigger updated_at
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger trg_articles_updated_at before update on articles
  for each row execute function set_updated_at();
```

**Lưu ý:**
- `scheduled_for` = target UTC datetime. Cron job sẽ query `WHERE status='ready' AND slot=$1 ORDER BY scheduled_for ASC LIMIT 1`.
- Không cần timezone column — Postgres `timestamptz` normalize về UTC, edge runtime convert về Asia/Saigon khi cần display.
- `body_mdx` là MDX source (có thể chứa component như `<PriceTickerFooter />`).

---

## 3. Vercel Cron Config

`vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/publish?slot=A", "schedule": "0 0 * * *" },
    { "path": "/api/cron/publish?slot=B", "schedule": "15 5 * * *" },
    { "path": "/api/cron/publish?slot=C", "schedule": "0 13 * * *" }
  ]
}
```

**Vì sao 1 endpoint chung:** DRY — chỉ 1 handler, slot truyền qua query param. Giảm bảo trì so với 3 endpoint.

**Protection:** Vercel tự inject `Authorization: Bearer $CRON_SECRET` khi gọi. Handler verify header trước khi exec.

---

## 4. API Route Pseudo-code

`src/app/api/cron/publish/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Supabase client needs node

const VALID_SLOTS = ['A', 'B', 'C'] as const;

export async function GET(req: NextRequest) {
  // 1. Auth guard (Vercel Cron header)
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Parse slot
  const slot = new URL(req.url).searchParams.get('slot');
  if (!slot || !VALID_SLOTS.includes(slot as any)) {
    return NextResponse.json({ error: 'invalid slot' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 3. Pick next ready article for this slot
  const { data: article, error } = await supabase
    .from('articles')
    .select('id, slug')
    .eq('status', 'ready')
    .eq('slot', slot)
    .order('scheduled_for', { ascending: true, nullsFirst: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    await logSentry('cron_publish_query_failed', { slot, error });
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }

  // 4. Failsafe: no queue → skip + alert
  if (!article) {
    await logSentry('cron_publish_empty_queue', { slot, level: 'warning' });
    return NextResponse.json({ ok: true, skipped: true, reason: 'empty_queue' });
  }

  // 5. Atomic flip: ready → published
  const { error: updErr } = await supabase
    .from('articles')
    .update({ status: 'published', published_at: new Date().toISOString() })
    .eq('id', article.id)
    .eq('status', 'ready'); // optimistic lock

  if (updErr) {
    await logSentry('cron_publish_update_failed', { slot, id: article.id, err: updErr });
    return NextResponse.json({ error: 'update_failed' }, { status: 500 });
  }

  // 6. Revalidate ISR caches
  revalidateTag('articles');
  revalidateTag(`article:${article.slug}`);
  revalidateTag('sitemap');

  // 7. Ping Google Indexing API (optional, best-effort)
  await pingSearchEngines(article.slug).catch(() => {});

  return NextResponse.json({ ok: true, published: article.slug, slot });
}
```

---

## 5. Next.js ISR Integration

### `src/app/tin-tuc/[slug]/page.tsx`
```typescript
import { unstable_cache } from 'next/cache';

const getArticle = unstable_cache(
  async (slug: string) => {
    const { data } = await supabase
      .from('articles').select('*')
      .eq('slug', slug).eq('status', 'published').maybeSingle();
    return data;
  },
  ['article-by-slug'],
  { tags: ['articles'], revalidate: 3600 }
);

export async function generateStaticParams() {
  const { data } = await supabase
    .from('articles').select('slug').eq('status', 'published');
  return (data ?? []).map(a => ({ slug: a.slug }));
}
```

### `src/app/sitemap.ts`
Tag `sitemap` → revalidated on publish.

---

## 6. Failsafe & Monitoring

| Failure mode | Detection | Mitigation |
|---|---|---|
| Empty queue khi cron chạy | `status='ready' AND slot=X` = 0 rows | Log warning Sentry, skip, send Zalo alert to editor |
| Supabase down | Query error | Return 500, Vercel retries next schedule. Sentry page on-call |
| `revalidateTag` fail | Exception | Article đã published nhưng cache stale → manual `curl /api/revalidate?tag=articles` |
| Double publish (cron retry) | Optimistic lock `.eq('status','ready')` | Update affects 0 rows → treat as idempotent success |
| Wrong timezone | Cron fires 1h sớm/muộn sau DST | VN không DST → non-issue. Validate cron UTC ↔ VN mapping trong test |
| Schema JSON-LD invalid | Runtime render error | Validate trong `status='ready'` gate trước khi enqueue (see workflow step) |

**Sentry events cần thiết:**
- `cron_publish_empty_queue` — warning level, alert sau 2 lần liên tiếp
- `cron_publish_query_failed` — error level
- `cron_publish_update_failed` — error level
- `cron_publish_success` — info level (có thể tắt để giảm noise)

**Alerting:** Zalo webhook → OA editor khi empty queue > 1 slot liên tiếp.

---

## 7. Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=     # server-only, cron handler
CRON_SECRET=                   # random 32-byte hex
SENTRY_DSN=
ZALO_ALERT_WEBHOOK=            # optional
GOOGLE_INDEXING_API_KEY=       # optional
```

---

## 8. Migration Path (existing hard-coded blog files)

Blog hiện dùng Option A (TSX pages trong `src/app/tin-tuc/...`). Migration:

1. **Giữ song song:** TSX pages cũ còn serve (backward compat). Thêm dynamic route `[slug]/page.tsx` **ưu tiên DB-backed**, fallback static nếu không có.
2. **Dual-read sitemap:** merge static list từ `blog-data.ts` + Supabase rows → dedupe by slug.
3. **Cutover:** Khi Supabase stable 7 ngày + có ≥ 10 bài auto-published, port các bài static vào DB và xóa TSX files.
4. **Rollback:** Nếu Supabase fail → disable cron + route tạm về static. Static data trong `blog-data.ts` vẫn giữ 30 bài đầu làm safety net.

---

## 9. Rollout Checklist

- [ ] Create Supabase `articles` table + indexes + trigger
- [ ] Add env vars vào Vercel project
- [ ] Implement `/api/cron/publish` route với auth guard
- [ ] Add `vercel.json` crons
- [ ] Seed 3 test articles (`slot='A','B','C'`, `status='ready'`, `scheduled_for=tomorrow`)
- [ ] Dry-run: trigger cron manually via `curl -H "Authorization: Bearer $CRON_SECRET"` trong preview env
- [ ] Verify `revalidateTag` updates `/tin-tuc` list + detail pages
- [ ] Monitor 3 ngày đầu, tune Sentry thresholds
- [ ] Wire Zalo alert cho editor OA

---

## 10. Rollback Plan

| Layer | Rollback action |
|---|---|
| Cron jobs | Remove entries from `vercel.json` → redeploy. Cron stops immediately. |
| Supabase data | `update articles set status='draft' where status='published' and published_at > :cutover` — preserves rows |
| Routes | Revert commit adding dynamic `[slug]/page.tsx` — static TSX pages kế thừa |
| Cache | `revalidateTag('articles')` manually to flush stale |

Không phá dữ liệu — luôn dùng soft status flip, không DELETE.
