import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "ko", "ja"],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi = no prefix, en/ko/ja = /en/, /ko/, /ja/
});

export type Locale = (typeof routing.locales)[number];
