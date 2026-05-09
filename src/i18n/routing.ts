import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "ko", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi = no prefix, en/ko/ja = /en/, /ko/, /ja/
  /* Lock default locale to vi for unprefixed URLs. Without this, browsers
     with Accept-Language: en auto-redirect /xoai-tu-quy → /en/xoai-tu-quy
     and stamp NEXT_LOCALE=en cookie, trapping VI users in EN. Foreign
     visitors use the LanguageSwitcher in the header to opt into en/ko/ja. */
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
