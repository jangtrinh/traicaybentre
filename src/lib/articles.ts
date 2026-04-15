/**
 * Article system — MDX-backed, product-scoped, IA-aligned.
 *
 * Folder: `src/content/articles/{product}/{type}/{slug}.mdx`
 * Path-derived fields: product, type, slug, urlPath = `/{product}/{type}/{slug}`
 *
 * Visibility gates (BOTH must pass):
 *   1. frontmatter.uxReviewed === true   (UX writing review pass)
 *   2. publishedAt <= now()              (scheduled publish time elapsed)
 *
 * IA alignment (260409-2243-information-architecture-multi-product-scale):
 *   - Helper signatures match Phase 03 spec (`getArticleByUrlPath`, etc.)
 *   - URL pattern matches Phase 04 scoped routes
 *   - Multi-product ready: validate against products registry (Phase 01)
 *
 * Marketing alignment (260409-2215-marketing-daily-articles):
 *   - Optional pillar + slot for topic clustering / scheduling time slots
 *   - faq frontmatter for AEO FAQPage schema
 */
import "server-only";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, basename } from "node:path";
import matter from "gray-matter";
import { getProductSlugs } from "@/lib/products";
import { isEphemeralSlug } from "@/lib/sitemap-quality-filter";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ArticleType = "kien-thuc" | "tin-tuc";
export type ArticleSlot = "A" | "B" | "C";
export type ArticlePillar =
  | "gia-thi-truong"
  | "ky-thuat-bao-quan"
  | "so-sanh-giong"
  | "giao-hang-theo-vung"
  | "meo-thuong-thuc"
  | "heritage-bentre";

/** Vietnamese display labels for pillar slugs — used in category pills, breadcrumbs, etc. */
export const PILLAR_LABELS: Record<ArticlePillar, string> = {
  "gia-thi-truong": "Giá & thị trường",
  "ky-thuat-bao-quan": "Kỹ thuật bảo quản",
  "so-sanh-giong": "So sánh giống xoài",
  "giao-hang-theo-vung": "Giao hàng theo vùng",
  "meo-thuong-thuc": "Mẹo thưởng thức",
  "heritage-bentre": "Di sản Bến Tre",
};

/** Localize a pillar slug, falling back to a humanized version for unknown values. */
export function localizePillar(pillar: string | undefined | null): string {
  if (!pillar) return "";
  if (pillar in PILLAR_LABELS) return PILLAR_LABELS[pillar as ArticlePillar];
  // Fallback: kebab-case → Capitalized words
  return pillar
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export interface ArticleFrontmatter {
  title: string;
  publishedAt: string;
  primaryKeyword: string;
  metaDescription: string;
  uxReviewed: boolean;
  secondaryKeywords?: string[];
  ogImage?: string;
  uxPassModel?: string;
  author?: string;
  pillar?: ArticlePillar;
  slot?: ArticleSlot;
  faq?: { q: string; a: string }[];
  geoCity?: string;
  geoRegion?: string;
}

export interface Article {
  product: string;
  type: ArticleType;
  slug: string;
  urlPath: string;
  frontmatter: ArticleFrontmatter;
  body: string;
  filePath: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_ROOT = join(process.cwd(), "src", "content", "articles");
const VALID_TYPES: ArticleType[] = ["kien-thuc", "tin-tuc"];

/**
 * Known product whitelist — sourced from products registry (IA Phase 01 F8).
 * Adding a new product = add entry to `src/content/products.ts`, no changes here.
 */
function isKnownProduct(slug: string): boolean {
  return getProductSlugs().includes(slug);
}

// ─────────────────────────────────────────────────────────────────────────────
// Loaders
// ─────────────────────────────────────────────────────────────────────────────

function parseArticleFile(absPath: string, product: string, type: ArticleType): Article {
  const raw = readFileSync(absPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<ArticleFrontmatter>;

  const required: (keyof ArticleFrontmatter)[] = [
    "title",
    "publishedAt",
    "primaryKeyword",
    "metaDescription",
    "uxReviewed",
  ];
  for (const key of required) {
    if (fm[key] === undefined || fm[key] === null || fm[key] === "") {
      throw new Error(`[articles] ${absPath} missing required frontmatter: ${key}`);
    }
  }

  const slug = basename(absPath, ".mdx");
  return {
    product,
    type,
    slug,
    urlPath: `/${product}/${type}/${slug}`,
    frontmatter: fm as ArticleFrontmatter,
    body: content,
    filePath: absPath,
  };
}

/** Walk `src/content/articles/{product}/{type}/*.mdx` — no filtering. */
function loadAllArticlesUnfiltered(): Article[] {
  if (!existsSync(CONTENT_ROOT)) return [];

  const articles: Article[] = [];
  for (const product of readdirSync(CONTENT_ROOT)) {
    if (!isKnownProduct(product)) continue;
    const productDir = join(CONTENT_ROOT, product);
    if (!statSync(productDir).isDirectory()) continue;

    for (const type of readdirSync(productDir)) {
      if (!VALID_TYPES.includes(type as ArticleType)) continue;
      const typeDir = join(productDir, type);
      if (!statSync(typeDir).isDirectory()) continue;

      for (const file of readdirSync(typeDir)) {
        if (!file.endsWith(".mdx")) continue;
        articles.push(parseArticleFile(join(typeDir, file), product, type as ArticleType));
      }
    }
  }
  return articles;
}

function isVisible(a: Article): boolean {
  // Publish immediately once UX-reviewed.
  // Note: publishedAt is still used for sort order and "Đăng ngày..." display,
  // but no longer gates visibility — avoids 404s for pre-dated content drops.
  return a.frontmatter.uxReviewed === true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public helpers (IA Phase 03 aligned)
// ─────────────────────────────────────────────────────────────────────────────

/** All published articles, newest first. */
export function getAllPublishedArticles(type?: ArticleType): Article[] {
  return loadAllArticlesUnfiltered()
    .filter(isVisible)
    .filter((a) => (type ? a.type === type : true))
    .sort(
      (x, y) =>
        new Date(y.frontmatter.publishedAt).getTime() -
        new Date(x.frontmatter.publishedAt).getTime()
    );
}

/** Lookup by full URL path, e.g. "/xoai-tu-quy/kien-thuc/cach-chon". */
export function getArticleByUrlPath(urlPath: string): Article | null {
  return getAllPublishedArticles().find((a) => a.urlPath === urlPath) ?? null;
}

/** All published articles for a given product (optionally filter by type). */
export function getArticlesByProduct(product: string, type?: ArticleType): Article[] {
  return getAllPublishedArticles().filter(
    (a) => a.product === product && (type ? a.type === type : true)
  );
}

/**
 * Related articles — pillar-aware with cross-type fallback.
 * Ranking priority:
 *   1. Same product + same pillar + same type (strongest topical match)
 *   2. Same product + same pillar + opposite type (cross-type pillar boost)
 *   3. Same product + same type (loose topical match)
 * This surfaces more internal links per article page, helping Google discover
 * "orphan" long-tail content via the hub-and-spoke crawl pattern.
 */
export function getRelatedArticles(
  product: string,
  type: ArticleType,
  excludeSlug: string,
  limit = 6,
  pillar?: ArticlePillar
): Article[] {
  const pool = getArticlesByProduct(product).filter(
    (a) => a.slug !== excludeSlug
  );

  const samePillarSameType: Article[] = [];
  const samePillarCrossType: Article[] = [];
  const sameTypeFallback: Article[] = [];

  for (const a of pool) {
    const matchesPillar = pillar && a.frontmatter.pillar === pillar;
    if (matchesPillar && a.type === type) {
      samePillarSameType.push(a);
    } else if (matchesPillar && a.type !== type) {
      samePillarCrossType.push(a);
    } else if (a.type === type) {
      sameTypeFallback.push(a);
    }
  }

  const ranked = [
    ...samePillarSameType,
    ...samePillarCrossType,
    ...sameTypeFallback,
  ];
  // Dedupe while preserving rank order
  const seen = new Set<string>();
  const unique: Article[] = [];
  for (const a of ranked) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    unique.push(a);
  }
  return unique.slice(0, limit);
}

/**
 * Homepage featured articles — picks top evergreen articles across all pillars.
 * Used by the homepage hub section to seed internal links to unindexed long-tail
 * pages. Excludes ephemeral slugs (weekly prices, seasonal) so Google's crawl
 * follows these links to the evergreen content worth indexing.
 */
export function getHomepageFeaturedArticles(limit = 12): Article[] {
  const evergreen = getAllPublishedArticles().filter(
    (a) => !isEphemeralSlug(a.slug)
  );

  // Bucket by pillar, round-robin up to `limit` so all pillars get visibility.
  const buckets = new Map<string, Article[]>();
  for (const a of evergreen) {
    const key = a.frontmatter.pillar ?? "misc";
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(a);
  }

  const picked: Article[] = [];
  let added = true;
  while (picked.length < limit && added) {
    added = false;
    for (const bucket of buckets.values()) {
      if (picked.length >= limit) break;
      const next = bucket.shift();
      if (next) {
        picked.push(next);
        added = true;
      }
    }
  }
  return picked;
}

/** generateStaticParams source — published articles only. */
export function getAllPublishedArticleParams(): Array<{
  product: string;
  type: ArticleType;
  slug: string;
}> {
  return getAllPublishedArticles().map((a) => ({
    product: a.product,
    type: a.type,
    slug: a.slug,
  }));
}

/**
 * generateStaticParams source — ALL articles regardless of publishedAt gate.
 * Used so future-scheduled articles get prerendered routes; runtime visibility
 * check (getArticleByUrlPath) returns null until publishedAt elapses, then ISR
 * picks up the article on next revalidate.
 */
export function getAllArticleParamsForBuild(): Array<{
  product: string;
  type: ArticleType;
  slug: string;
}> {
  return loadAllArticlesUnfiltered()
    .filter((a) => a.frontmatter.uxReviewed === true)
    .map((a) => ({ product: a.product, type: a.type, slug: a.slug }));
}

/**
 * Lookup variant that BYPASSES the publishedAt gate (still respects uxReviewed).
 * Used by the article page render — combined with route-level visibility check
 * to support ISR-based scheduled publishing.
 */
export function getArticleByUrlPathIncludingScheduled(urlPath: string): Article | null {
  return (
    loadAllArticlesUnfiltered()
      .filter((a) => a.frontmatter.uxReviewed === true)
      .find((a) => a.urlPath === urlPath) ?? null
  );
}
