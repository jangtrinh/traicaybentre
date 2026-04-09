-- ============================================================================
-- Pivot: drop `articles` table — content moves to MDX files in repo
-- Reason: KISS — git = source of truth, ISR + publishedAt frontmatter
-- handles scheduled publishing without DB or cron
-- Date: 2026-04-09
-- ============================================================================

alter table if exists public.content_metrics
  drop constraint if exists content_metrics_article_id_fkey;

alter table if exists public.content_metrics
  drop column if exists article_id;

alter table if exists public.content_metrics
  add column if not exists article_slug text not null default '';

create index if not exists content_metrics_slug_date_idx
  on public.content_metrics (article_slug, recorded_date desc);

drop table if exists public.articles cascade;
