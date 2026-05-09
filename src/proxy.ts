import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

/* Map country codes (ISO 3166-1 alpha-2) → supported locales.
   Vercel provides x-vercel-ip-country header automatically on Edge. */
const COUNTRY_TO_LOCALE: Record<string, string> = {
  // Korean
  KR: "ko",
  // Japanese
  JP: "ja",
  // English-speaking countries
  US: "en",
  GB: "en",
  AU: "en",
  CA: "en",
  NZ: "en",
  SG: "en",
  IN: "en",
  PH: "en",
  // Vietnamese — default, no mapping needed (falls through to defaultLocale)
};

const intlMiddleware = createMiddleware(routing);

/* Search-engine + AI crawler User-Agents. GEO redirect MUST be skipped for these,
   otherwise Googlebot from US edges gets 307'd to /en/* (noindex) and vi pages
   never get crawled — destroying organic ranking on the canonical Vietnamese site. */
const BOT_UA_PATTERN = /bot|crawler|spider|slurp|mediapartners|facebookexternalhit|applebot|gptbot|claude|anthropic-ai|perplexity|ccbot|google-extended/i;

export default function proxy(request: NextRequest) {
  /* If user already has a locale cookie (NEXT_LOCALE), next-intl respects it
     automatically — no GEO override needed. GEO only applies on first visit. */
  const hasLocaleCookie = request.cookies.has("NEXT_LOCALE");
  const userAgent = request.headers.get("user-agent") ?? "";
  const isBot = BOT_UA_PATTERN.test(userAgent);

  if (!hasLocaleCookie && !isBot) {
    const country = request.headers.get("x-vercel-ip-country") ?? "";
    const geoLocale = COUNTRY_TO_LOCALE[country];

    if (geoLocale && routing.locales.includes(geoLocale as typeof routing.locales[number])) {
      /* Inject Accept-Language header so next-intl picks up GEO-based locale
         when no cookie exists. This is cleaner than manually redirecting. */
      const headers = new Headers(request.headers);
      headers.set("Accept-Language", `${geoLocale}, vi;q=0.5`);
      const modifiedRequest = new NextRequest(request.url, {
        headers,
        method: request.method,
      });
      return intlMiddleware(modifiedRequest);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|images|fonts|favicon.ico|sitemap.xml|robots.txt|feed.xml|.*\\..*).*)",
  ],
};
