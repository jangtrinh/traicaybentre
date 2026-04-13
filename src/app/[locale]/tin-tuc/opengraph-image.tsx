import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, getFontFamily } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";

export const alt = "Tin tức — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 86400;

const TITLE: Record<string, string> = {
  vi: "Tin Tức & Báo Giá",
  en: "News & Pricing",
  ko: "소식 & 시세",
  ja: "ニュース＆相場",
};

const SUBTITLE: Record<string, string> = {
  vi: "Báo giá tháng, món ngon từ xoài, chuyện vựa Thạnh Phú",
  en: "Monthly prices, mango recipes, stories from Thanh Phu farm",
  ko: "월별 시세, 망고 레시피, 타인푸 농장 이야기",
  ja: "月次相場、マンゴーレシピ、タインフー農園の話",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ff = getFontFamily(locale);

  return new ImageResponse(
    (
      <OgBaseLayout locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 16 }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                background: OG.colors.mangoDark,
                color: OG.colors.white,
                padding: "6px 18px",
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "Heading",
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {locale === "vi" ? "Tin tức" : locale === "en" ? "News" : locale === "ko" ? "소식" : "ニュース"}
            </div>
          </div>

          <div style={{ fontSize: 52, fontWeight: 700, color: OG.colors.text, fontFamily: ff, lineHeight: 1.2 }}>
            {TITLE[locale] ?? TITLE.vi}
          </div>
          <div style={{ fontSize: 24, color: OG.colors.textSecondary, fontFamily: ff }}>
            {SUBTITLE[locale] ?? SUBTITLE.vi}
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts(locale) },
  );
}
