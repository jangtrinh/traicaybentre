/** Brand colors and constants for OG image generation */
export const OG = {
  width: 1200,
  height: 630,
  pad: 60,
  colors: {
    brand: "#FDDE24",
    brandCream: "#FFFEE7",
    text: "#1F2937",
    textSecondary: "#6B7280",
    mango: "#F97316",
    mangoDark: "#EA580C",
    white: "#FFFFFF",
  },
} as const;

export function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen - 1) + "…";
}

/** Brand name per locale */
export const BRAND_NAME: Record<string, string> = {
  vi: "Trái Cây Bến Tre",
  en: "Ben Tre Fruits",
  ko: "벤째 과일",
  ja: "ベンチェフルーツ",
};

/** Font family string — CJK locales need fallback to CJK font */
export function getFontFamily(locale: string): string {
  return locale === "ja" || locale === "ko" ? "CJK" : "Heading";
}
