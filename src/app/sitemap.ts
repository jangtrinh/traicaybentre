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

export const dynamic = "force-static";
export const revalidate = 3600;

const BASE = "https://www.traicaybentre.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static routes that are neither products nor articles.
  const statics: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/san-pham`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/nguon-goc`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/kien-thuc`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/tin-tuc`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/giao-hang/ha-noi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/giao-hang/tp-hcm`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/giao-hang/da-nang`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  // Active product landing pages (from registry).
  const productPages: MetadataRoute.Sitemap = getActiveProducts().map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.95,
  }));

  // Legacy kien-thuc articles (hardcoded TSX pages at /kien-thuc/{slug}).
  const legacyKnowledge: MetadataRoute.Sitemap = KNOWLEDGE_ARTICLES.map((a) => ({
    url: `${BASE}${a.urlPath ?? `/kien-thuc/${a.slug}`}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Legacy tin-tuc articles (hardcoded TSX pages at /tin-tuc/{slug}).
  const legacyBlog: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${BASE}${p.urlPath ?? `/tin-tuc/${p.slug}`}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // New MDX articles (visible only when uxReviewed + publishedAt elapsed).
  const mdxArticles: MetadataRoute.Sitemap = getAllPublishedArticles().map((a) => ({
    url: `${BASE}${a.urlPath}`,
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: a.type === "tin-tuc" ? ("weekly" as const) : ("monthly" as const),
    priority: a.type === "kien-thuc" ? 0.75 : 0.65,
  }));

  return [...statics, ...productPages, ...legacyKnowledge, ...legacyBlog, ...mdxArticles];
}
