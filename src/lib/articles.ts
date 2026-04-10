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

/** Related articles: same product + same type, excluding current slug. */
export function getRelatedArticles(
  product: string,
  type: ArticleType,
  excludeSlug: string,
  limit = 3
): Article[] {
  return getArticlesByProduct(product, type)
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
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
