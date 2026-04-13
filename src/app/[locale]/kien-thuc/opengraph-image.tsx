import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, getFontFamily } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";

export const alt = "Kiến thức — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 86400;

const TITLE: Record<string, string> = {
  vi: "Kiến Thức Xoài Tứ Quý",
  en: "Tu Quy Mango Knowledge",
  ko: "뜨꾸이 망고 정보",
  ja: "トゥクイマンゴー豆知識",
};

const SUBTITLE: Record<string, string> = {
  vi: "Hướng dẫn, so sánh, mùa vụ & bảo quản",
  en: "Guides, comparisons, seasons & storage",
  ko: "가이드, 비교, 제철 & 보관법",
  ja: "ガイド・比較・旬・保存方法",
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
          {/* Category pill */}
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                background: OG.colors.mango,
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
              {locale === "vi" ? "Kiến thức" : locale === "en" ? "Knowledge" : locale === "ko" ? "정보" : "豆知識"}
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
