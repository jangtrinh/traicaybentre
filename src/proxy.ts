import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/* Vanilla next-intl middleware. URL prefix or NEXT_LOCALE cookie decides locale.
   Foreign visitors use the LanguageSwitcher in the header to opt into en/ko/ja.

   Removed: GEO Accept-Language injection (was causing 307 → /en/* + cookie
   poisoning that trapped users in EN permanently). Bot UA exemption no longer
   needed because GEO logic is gone — bots get the same vanilla treatment. */
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|images|fonts|favicon.ico|sitemap.xml|robots.txt|feed.xml|.*\\..*).*)",
  ],
};
