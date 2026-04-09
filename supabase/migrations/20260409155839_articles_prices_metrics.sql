-- ============================================================================
-- Marketing Daily Articles — Initial Schema
-- Date: 2026-04-09
-- Plan: plans/260409-2215-marketing-daily-articles/
-- ============================================================================

create extension if not exists "pgcrypto";

-- ============================================================================
-- Table: articles (AI-generated SEO/GEO/AEO content with UX-review gating)
-- ============================================================================
create table if not exists public.articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  meta_description text,
  body_mdx        text not null,
  draft_body_raw  text,
  pillar          text not null,
  slot            text not null check (slot in ('A','B','C')),
  primary_keyword text not null,
  secondary_keywords text[],
  schema_jsonld   jsonb,
  og_image_url    text,
  status          text not null default 'draft' check (status in ('draft','ux_pending','ready','published','archived')),
  scheduled_for   timestamptz,
  published_at    timestamptz,
  ux_reviewed_at  timestamptz,
  ux_pass_model   text,
  author          text default 'ai',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists articles_status_scheduled_idx on public.articles (status, scheduled_for);
create index if not exists articles_pillar_idx on public.articles (pillar);
create index if not exists articles_published_at_idx on public.articles (published_at desc);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Table: price_history
-- ============================================================================
create table if not exists public.price_history (
  id              uuid primary key default gen_random_uuid(),
  source          text not null,
  source_url      text,
  variety         text not null,
  region          text,
  price_vnd_per_kg integer not null,
  quality_grade   text,
  market_type     text,
  is_stale        boolean not null default false,
  crawled_at      timestamptz not null default now()
);

create index if not exists price_history_variety_crawled_idx on public.price_history (variety, crawled_at desc);
create index if not exists price_history_source_idx on public.price_history (source, crawled_at desc);

-- ============================================================================
-- Table: content_metrics (UX writing pass effectiveness tracking)
-- ============================================================================
create table if not exists public.content_metrics (
  id              uuid primary key default gen_random_uuid(),
  article_id      uuid not null references public.articles(id) on delete cascade,
  views           integer not null default 0,
  avg_time_on_page_seconds integer,
  bounce_rate     numeric(5,2),
  scroll_depth_75_pct numeric(5,2),
  ux_pass_version text,
  recorded_date   date not null default current_date,
  recorded_at     timestamptz not null default now()
);

create index if not exists content_metrics_article_date_idx on public.content_metrics (article_id, recorded_date desc);

-- ============================================================================
-- Table: holiday_calendar (Vietnamese festivals requiring fruit)
-- ============================================================================
create table if not exists public.holiday_calendar (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  solar_date      date not null,
  lunar_date      text,
  is_recurring_monthly boolean default false,
  fruit_relevance text,
  publish_runway_days integer default 28,
  target_keyword_cluster text,
  evergreen       boolean default true,
  notes           text
);

create index if not exists holiday_calendar_solar_idx on public.holiday_calendar (solar_date);

-- ============================================================================
-- RLS
-- ============================================================================
alter table public.articles enable row level security;
alter table public.price_history enable row level security;
alter table public.content_metrics enable row level security;
alter table public.holiday_calendar enable row level security;

drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select using (status = 'published');

drop policy if exists "public read prices" on public.price_history;
create policy "public read prices"
  on public.price_history for select using (true);

drop policy if exists "public read holidays" on public.holiday_calendar;
create policy "public read holidays"
  on public.holiday_calendar for select using (true);

-- content_metrics: service-role only (RLS enabled, no select policy → public denied)

-- ============================================================================
-- Seed: Vietnamese holiday calendar 2026-2027
-- ============================================================================
insert into public.holiday_calendar (name, solar_date, lunar_date, fruit_relevance, target_keyword_cluster, notes) values
  ('Giỗ tổ Hùng Vương',   '2026-04-26', '10/3 ÂL',  'cúng',         'trái cây cúng giỗ tổ',     'Lễ quốc gia'),
  ('Lễ Phật Đản',         '2026-05-31', '15/4 ÂL',  'cúng chùa',    'trái cây cúng phật đản',   'Rằm tháng 4'),
  ('Tết Đoan Ngọ',        '2026-06-19', '5/5 ÂL',   'giết sâu bọ', 'trái cây tết đoan ngọ',    'Mận, vải, xoài cao điểm'),
  ('Lễ Vu Lan',           '2026-08-27', '15/7 ÂL',  'cúng/biếu',   'giỏ trái cây vu lan',      'Báo hiếu'),
  ('Tết Trung Thu',       '2026-09-25', '15/8 ÂL',  'mâm ngũ quả', 'mâm ngũ quả trung thu',    'Peak season biếu'),
  ('Ngày Nhà giáo VN',    '2026-11-20', null,        'biếu',        'giỏ trái cây 20-11',       'Quà giáo viên'),
  ('Noel',                '2026-12-25', null,        'biếu/tiệc',   'giỏ trái cây giáng sinh',  'Quà sếp'),
  ('Tết Dương lịch',      '2027-01-01', null,        'biếu',        'giỏ trái cây tết tây',     'Năm mới'),
  ('Ông Công Ông Táo',    '2027-01-31', '23/12 ÂL', 'cúng tiễn',   'mâm quả ông công ông táo', 'Đưa Táo về trời'),
  ('Tết Nguyên Đán 2027', '2027-02-17', '1/1 ÂL',   'mâm ngũ quả', 'mâm ngũ quả tết',          'PEAK runway 60+ ngày'),
  ('Rằm tháng Giêng',     '2027-03-04', '15/1 ÂL',  'cúng chùa',   'trái cây rằm tháng giêng', 'Nguyên Tiêu')
on conflict do nothing;

insert into public.holiday_calendar (name, solar_date, lunar_date, is_recurring_monthly, fruit_relevance, target_keyword_cluster, publish_runway_days, notes) values
  ('Rằm hàng tháng',   '2026-04-01', '15 ÂL', true, 'cúng', 'trái cây cúng rằm',    7, 'Auto-template'),
  ('Mùng 1 hàng tháng','2026-04-01', '1 ÂL',  true, 'cúng', 'trái cây cúng mùng 1', 5, 'Auto-template')
on conflict do nothing;
