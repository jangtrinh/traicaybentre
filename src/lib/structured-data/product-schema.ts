/**
 * Product + Pricing page JSON-LD helpers.
 * Preserves existing getProductJsonLd and getPricingPageJsonLd signatures.
 */

import { SITE_URL, BUSINESS_NAME } from "./constants";
import { localBusiness, productSchema } from "./organization-schema";

/** Minimal Schema.org Product — no nested Offer (price fluctuates). */
export function getProductJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
  category?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: opts.image,
    url: opts.url,
    category: opts.category ?? "Trái cây đặc sản Bến Tre",
    brand: {
      "@type": "Brand",
      name: BUSINESS_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#business`,
    },
    ...(opts.dateModified && { dateModified: opts.dateModified }),
  };
}

/** Pricing page JSON-LD — Product with Offer array + dateModified for freshness. */
export function getPricingPageJsonLd(opts: { lastUpdated: string }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...productSchema,
        dateModified: opts.lastUpdated,
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/bang-gia`,
        url: `${SITE_URL}/bang-gia`,
        name: "Bảng Giá Xoài Tứ Quý Bến Tre Hôm Nay",
        dateModified: opts.lastUpdated,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#xoai-tu-quy` },
      },
      localBusiness,
    ],
  };
}
