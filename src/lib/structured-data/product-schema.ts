/**
 * Product + Pricing page JSON-LD helpers.
 * Preserves existing getProductJsonLd and getPricingPageJsonLd signatures.
 */

import { SITE_URL, BUSINESS_NAME } from "./constants";
import { localBusiness, productSchema } from "./organization-schema";

/**
 * Schema.org Product with optional AggregateOffer.
 * Passing `offers.lowPrice`/`highPrice` enables Google Product rich result —
 * without them the card won't render. Price range reflects SKU variation per
 * product (e.g. "35.000–45.000 đ/kg" for Hoàng Kim). Use AggregateOffer when
 * price fluctuates so we don't have to update schema on every price change.
 */
export function getProductJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
  category?: string;
  dateModified?: string;
  offers?: {
    lowPrice: number;
    highPrice: number;
    priceCurrency?: string;
    offerCount?: number;
    availability?: string;
    unitText?: string;
  };
}) {
  const schema: Record<string, unknown> = {
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
  };
  if (opts.dateModified) schema.dateModified = opts.dateModified;
  if (opts.offers) {
    schema.offers = {
      "@type": "AggregateOffer",
      lowPrice: opts.offers.lowPrice,
      highPrice: opts.offers.highPrice,
      priceCurrency: opts.offers.priceCurrency ?? "VND",
      availability: opts.offers.availability ?? "https://schema.org/InStock",
      ...(opts.offers.offerCount && { offerCount: opts.offers.offerCount }),
      ...(opts.offers.unitText && {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: opts.offers.priceCurrency ?? "VND",
          price: opts.offers.lowPrice,
          unitText: opts.offers.unitText,
        },
      }),
    };
  }
  return schema;
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
