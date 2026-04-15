/**
 * Dynamic sitemap — assembled from products registry, legacy article registries,
 * and MDX articles. Strict superset of the former hardcoded 16-entry sitemap.
 *
 * SEO-first hard constraint: every legacy URL that used to appear here MUST
 * still appear here. Verified by `scripts/verify-sitemap-superset.ts`.
 *
 * ISR: force-static + 1-hour revalidate avoids cold-start filesystem walks on
 * Vercel serverless (red-team F10).
 */
import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/lib/products";
import { getAllPublishedArticles } from "@/lib/articles";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { filterArticlesForSitemap } from "@/lib/sitemap-quality-filter";

export const dynamic = "force-static";
export const revalidate = 3600;

const BASE = "https://www.traicaybentre.com";
const LOCALES = ["vi", "en", "ko", "ja"] as const;

/** Builds a sitemap entry with hreflang alternates for all 4 locales. */
function localizedUrl(path: string) {
  return {
    url: `${BASE}${path}`,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE}${l === "vi" ? "" : `/${l}`}${path}`])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes that are neither products nor articles.
  const statics: MetadataRoute.Sitemap = [
    { ...localizedUrl(""), lastModified: now, changeFrequency: "daily", priority: 1 },
    { ...localizedUrl("/san-pham"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { ...localizedUrl("/nguon-goc"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { ...localizedUrl("/kien-thuc"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { ...localizedUrl("/tin-tuc"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { ...localizedUrl("/giao-hang/ha-noi"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { ...localizedUrl("/giao-hang/tp-hcm"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { ...localizedUrl("/giao-hang/da-nang"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { ...localizedUrl("/bang-gia"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { ...localizedUrl("/dat-hang"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];

  // Active product landing pages (from registry).
  const productPages: MetadataRoute.Sitemap = getActiveProducts().map((p) => ({
    ...localizedUrl(`/${p.slug}`),
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  // Legacy kien-thuc articles (hardcoded TSX pages at /kien-thuc/{slug}).
  const legacyKnowledge: MetadataRoute.Sitemap = KNOWLEDGE_ARTICLES.map((a) => ({
    ...localizedUrl(a.urlPath ?? `/kien-thuc/${a.slug}`),
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Legacy tin-tuc articles (hardcoded TSX pages at /tin-tuc/{slug}).
  const legacyBlog: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    ...localizedUrl(p.urlPath ?? `/tin-tuc/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // New MDX articles (visible only when uxReviewed + publishedAt elapsed).
  // Crawl-budget filter: ephemeral slugs (weekly prices, seasonal, lunar) are
  // excluded from sitemap to concentrate Google's crawl budget on evergreen
  // content. Excluded pages remain live and are reachable via internal links.
  // See src/lib/sitemap-quality-filter.ts for exclusion patterns.
  const mdxArticles: MetadataRoute.Sitemap = filterArticlesForSitemap(
    getAllPublishedArticles()
  ).map((a) => ({
    ...localizedUrl(a.urlPath),
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: a.type === "tin-tuc" ? ("weekly" as const) : ("monthly" as const),
    priority: a.type === "kien-thuc" ? 0.75 : 0.65,
  }));

  return [...statics, ...productPages, ...legacyKnowledge, ...legacyBlog, ...mdxArticles];
}
