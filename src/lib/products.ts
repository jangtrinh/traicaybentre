/**
 * Products registry helpers.
 *
 * Dependency direction: `@/content/products` → `@/lib/products` → consumers.
 * Never import consumers from this file.
 */

import {
  products,
  RESERVED_PATHS,
  type ProductEntry,
} from "@/content/products";

/** Get a single product by slug, or null if not in registry. */
export function getProduct(slug: string): ProductEntry | null {
  return products[slug] ?? null;
}

/** All products with status "active" — routed, rendered, sitemapped. */
export function getActiveProducts(): ProductEntry[] {
  return Object.values(products)
    .filter((p) => p.status === "active")
    .sort((a, b) => a.order - b.order);
}

/** All products regardless of status — used by catalog hub to show coming-soon. */
export function getAllProducts(): ProductEntry[] {
  return Object.values(products).sort((a, b) => a.order - b.order);
}

/** Slugs of all products (active + coming-soon). */
export function getProductSlugs(): string[] {
  return Object.keys(products);
}

/** Slugs of active products only — use for generateStaticParams + sitemap. */
export function getActiveProductSlugs(): string[] {
  return getActiveProducts().map((p) => p.slug);
}

/**
 * Check whether a URL segment is reserved (i.e. used by a static route).
 * The `[product]` dynamic route calls `notFound()` for any reserved segment.
 */
export function isReservedPath(segment: string): boolean {
  return (RESERVED_PATHS as readonly string[]).includes(segment);
}

/**
 * Seasonal hero product — used by homepage hero rotation.
 *
 * Rules (in order):
 *   1. Prefer an active product whose `season` includes the current month.
 *   2. Else prefer an active year-round product.
 *   3. Else fall back to the first active product by `order`.
 */
export function getSeasonalHeroProduct(now: Date = new Date()): ProductEntry {
  const active = getActiveProducts();
  if (active.length === 0) {
    throw new Error("[products] No active products in registry");
  }

  const month = now.getMonth() + 1; // 1-12

  const inSeason = active.filter((p) => {
    if (p.season === "year-round") return false;
    return p.season.includes(month);
  });
  if (inSeason.length > 0) return inSeason[0]!;

  const yearRound = active.filter((p) => p.season === "year-round");
  if (yearRound.length > 0) return yearRound[0]!;

  return active[0]!;
}
