/**
 * Sitemap quality filter — concentrates crawl budget on evergreen URLs.
 *
 * Problem: new domain with zero authority, GSC reports 102 URLs "Discovered -
 * currently not indexed" (Last crawled 1970-01-01 = never). Google de-prioritizes
 * crawling when sitemap is large relative to domain authority.
 *
 * Strategy: exclude time-sensitive / ephemeral slugs from sitemap so Google
 * focuses crawl budget on hub pages, product pages, and evergreen articles.
 * Excluded pages remain LIVE and reachable via internal links — they just
 * don't get aggressive crawl prioritization from sitemap.xml.
 */

import type { Article } from "@/lib/articles";

/**
 * Slug patterns excluded from sitemap.
 * Each pattern explains WHY it's ephemeral / low-priority for fresh crawl.
 */
const EPHEMERAL_SLUG_PATTERNS: Array<{ name: string; regex: RegExp }> = [
  // gia-xoai-tu-quy-20-2026, gia-xoai-tu-quy-tuan-25-2026 — weekly price snapshot
  { name: "weekly-price", regex: /^gia-xoai-tu-quy-(tuan-)?\d{1,2}-\d{4}$/ },
  // gia-xoai-cho-dau-moi-hoc-mon-hom-nay — daily wholesale market price
  { name: "daily-market", regex: /^gia-xoai-cho-dau-moi-/ },
  // bao-gia-xoai-tu-quy-thang-04-2026 — monthly price circular
  { name: "monthly-quote", regex: /^bao-gia-.*-thang-\d+/ },
  // du-bao-gia-xoai-thang-05 — monthly price forecast
  { name: "price-forecast", regex: /^du-bao-gia-.*-thang-\d+/ },
  // tong-ket-gia-xoai-thang-04-2026 — monthly wrap-up
  { name: "monthly-summary", regex: /^tong-ket-gia-.*-thang-\d+/ },
  // gia-thung-xoai-20kg-thang-04 — monthly box price
  { name: "monthly-box-price", regex: /^gia-thung-xoai-\d+kg-thang-\d+/ },
  // xoai-tu-quy-chuan-bi-trung-thu-2026, xoai-tu-quy-chuan-bi-vu-lan-2026 — seasonal prep
  { name: "seasonal-prep", regex: /^xoai-tu-quy-chuan-bi-.*-\d{4}$/ },
  // trai-cay-cung-ram-thang-4-am-lich, trai-cay-cung-tet-doan-ngo-* — lunar holiday
  { name: "lunar-holiday", regex: /^trai-cay-cung-.+/ },
  // thi-truong-xoai-noi-dia-q2-2026, thi-truong-xoai-xuat-khau-2026 — quarterly market report
  { name: "market-report", regex: /^thi-truong-xoai-.*-(q\d-)?\d{4}$/ },
  // bao-gia-si-xoai-tu-quy-thang-4 — wholesale monthly
  { name: "wholesale-monthly", regex: /^bao-gia-si-.*-thang-\d+$/ },
];

/** Returns true if the slug should be excluded from sitemap (but page remains live). */
export function isEphemeralSlug(slug: string): boolean {
  return EPHEMERAL_SLUG_PATTERNS.some((p) => p.regex.test(slug));
}

/**
 * Filter articles for sitemap inclusion.
 * Ephemeral slugs are dropped; everything else passes through.
 * Articles can also opt out via `sitemapExclude: true` frontmatter override.
 */
export function filterArticlesForSitemap(articles: Article[]): Article[] {
  return articles.filter((a) => {
    // Explicit opt-out wins
    const fm = a.frontmatter as { sitemapExclude?: boolean };
    if (fm.sitemapExclude === true) return false;
    // Pattern-based ephemeral exclusion
    if (isEphemeralSlug(a.slug)) return false;
    return true;
  });
}
