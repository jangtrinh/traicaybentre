/**
 * FAQ / Shipping FAQ JSON-LD helpers.
 * Generic helper reusable for article FAQPage and shipping-page FAQPage.
 */

/** Build a Schema.org FAQPage from a flat Q&A array. Returns null if empty. */
export function getShippingFaqJsonLd(
  faqs: { q: string; a: string }[]
): object | null {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: { "@type": "Answer", text: qa.a },
    })),
  };
}
