/**
 * Article JSON-LD helpers — TechArticle / NewsArticle with E-E-A-T author,
 * ImageObject, ISO 8601 +07:00, hreflang-friendly.
 *
 * Depends on: organization-schema (publisher), authors.ts (Person)
 */

import { SITE_URL, BUSINESS_NAME } from "./constants";
import { getAuthorByKey, getDefaultAuthor } from "@/content/authors";
import type { ArticleFrontmatter } from "@/lib/articles";

/* ── Utilities ────────────────────────────────────────────────────────────── */

/** Trim meta description to ≤maxLen chars, appending "…" if truncated. */
export function truncateDescription(text: string, maxLen = 160): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1).trimEnd() + "…";
}

/**
 * Ensure ISO 8601 string includes +07:00 timezone offset.
 * - "YYYY-MM-DD"              → "YYYY-MM-DDT00:00:00+07:00"
 * - "YYYY-MM-DDTHH:mm:ss"    → "YYYY-MM-DDTHH:mm:ss+07:00"
 * - Already has Z or +HH:MM  → unchanged
 */
export function ensureIsoWithOffset(iso: string): string {
  if (/(?:Z|[+-]\d{2}:\d{2})$/.test(iso)) return iso;
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return `${iso}T00:00:00+07:00`;
  return `${iso}+07:00`;
}

/* ── Person helper ────────────────────────────────────────────────────────── */

/**
 * Emit Schema.org Person from author registry.
 * Falls back to default author (htx-thanh-phong) if key unknown.
 */
export function getAuthorPersonJsonLd(key?: string | null) {
  const author = getAuthorByKey(key) ?? getDefaultAuthor();
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    url: author.url,
    ...(author.sameAs.length > 0 && { sameAs: author.sameAs }),
    ...(author.image && { image: `${SITE_URL}${author.image}` }),
  };
}

/* ── Article schema ───────────────────────────────────────────────────────── */

export interface ArticleJsonLdOpts {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  imageCaption?: string;
  contentLocation?: string;
  /** 'kien-thuc' → TechArticle, 'tin-tuc' → NewsArticle */
  articleType?: "kien-thuc" | "tin-tuc";
  /** Slug from authors.ts — resolved to Person schema */
  authorKey?: string | null;
}

/** Article JSON-LD: TechArticle or NewsArticle with Person author, ImageObject. */
export function getArticleJsonLd(opts: ArticleJsonLdOpts) {
  const schemaType =
    opts.articleType === "tin-tuc" ? "NewsArticle" : "TechArticle";

  const image = opts.image
    ? {
        "@type": "ImageObject",
        url: opts.image,
        contentUrl: opts.image,
        caption: opts.imageCaption ?? opts.title,
        ...(opts.contentLocation && {
          contentLocation: { "@type": "Place", name: opts.contentLocation },
        }),
      }
    : `${SITE_URL}/images/xoai-real-2.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: ensureIsoWithOffset(opts.datePublished),
    dateModified: ensureIsoWithOffset(opts.dateModified),
    image,
    author: getAuthorPersonJsonLd(opts.authorKey),
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    inLanguage: "vi",
    mainEntityOfPage: opts.url,
  };
}

/* ── Recipe schema ────────────────────────────────────────────────────────── */

export interface RecipeJsonLdOpts {
  name: string;
  description: string;
  image: string;
  url: string;
  authorKey?: string | null;
  datePublished: string;
  dateModified: string;
  recipe: NonNullable<ArticleFrontmatter["recipe"]>;
}

/** Recipe JSON-LD per Schema.org/Recipe — unlocks Google recipe rich result. */
export function getRecipeJsonLd(opts: RecipeJsonLdOpts) {
  const r = opts.recipe;
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: r.name ?? opts.name,
    description: r.description ?? opts.description,
    image: r.image ? `${SITE_URL}${r.image}` : opts.image,
    url: opts.url,
    author: getAuthorPersonJsonLd(opts.authorKey),
    datePublished: ensureIsoWithOffset(opts.datePublished),
    dateModified: ensureIsoWithOffset(opts.dateModified),
    ...(r.prepTime && { prepTime: r.prepTime }),
    ...(r.cookTime && { cookTime: r.cookTime }),
    ...(r.totalTime && { totalTime: r.totalTime }),
    ...(r.recipeYield && { recipeYield: r.recipeYield }),
    ...(r.recipeCuisine && { recipeCuisine: r.recipeCuisine }),
    ...(r.recipeCategory && { recipeCategory: r.recipeCategory }),
    recipeIngredient: r.recipeIngredient,
    recipeInstructions: r.recipeInstructions.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      ...(step.name && { name: step.name }),
      text: step.text,
      ...(step.image && { image: `${SITE_URL}${step.image}` }),
    })),
    ...(r.nutrition?.calories && {
      nutrition: { "@type": "NutritionInformation", calories: r.nutrition.calories },
    }),
    ...(r.keywords && { keywords: r.keywords }),
  };
}
