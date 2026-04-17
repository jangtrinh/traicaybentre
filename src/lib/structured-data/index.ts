/**
 * Structured data barrel — re-exports all JSON-LD helpers.
 * Import from "@/lib/structured-data" works as before.
 *
 * Split from monolithic structured-data.ts (was 442+ lines) into:
 *   constants.ts          — SITE_URL, PHONE, BUSINESS_NAME
 *   organization-schema.ts — LocalBusiness, Organization, WebSite, Product, FAQ, Events
 *   article-schema.ts     — TechArticle/NewsArticle, Recipe, Person helpers, utils
 *   faq-schema.ts         — FAQPage helper (shipping + generic)
 *   product-schema.ts     — getProductJsonLd, getPricingPageJsonLd
 */

export { SITE_URL, PHONE, BUSINESS_NAME } from "./constants";

export {
  localBusiness,
  organizationSchema,
  websiteSchema,
  productSchema,
  faqSchema,
  harvestEvents,
  definedTerm,
} from "./organization-schema";

export {
  truncateDescription,
  ensureIsoWithOffset,
  getAuthorPersonJsonLd,
  getArticleJsonLd,
  getRecipeJsonLd,
} from "./article-schema";

export type { ArticleJsonLdOpts, RecipeJsonLdOpts } from "./article-schema";

export { getShippingFaqJsonLd } from "./faq-schema";

export { getProductJsonLd, getPricingPageJsonLd } from "./product-schema";

/* ── Homepage graph builder ─────────────────────────────────────────────── */

import {
  localBusiness,
  organizationSchema,
  websiteSchema,
  definedTerm,
  productSchema,
  faqSchema,
  harvestEvents,
} from "./organization-schema";

/** Full JSON-LD graph for homepage (layout.tsx) */
export function getHomepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      organizationSchema,
      websiteSchema,
      definedTerm,
      productSchema,
      faqSchema,
      ...harvestEvents,
    ],
  };
}

/* ── Breadcrumb builder ──────────────────────────────────────────────────── */

/** Breadcrumb builder for subpages */
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
