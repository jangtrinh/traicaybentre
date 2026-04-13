import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, getFontFamily, BRAND_NAME } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";

export const alt = "Trái Cây Bến Tre — Xoài Tứ Quý & Dừa Xiêm";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 3600;

const TAGLINE: Record<string, string> = {
  vi: "Ngọt Đậm · Vị Mặn Nhẹ · Cuối Lưỡi",
  en: "Deep Sweet · Hint of Salt · On the Tongue",
  ko: "진한 달콤함 · 은은한 짠맛 · 혀끝에서",
  ja: "濃厚な甘さ · ほのかな塩味 · 舌先に",
};

const SUBTITLE: Record<string, string> = {
  vi: "Đặc sản Thạnh Phú, Bến Tre · CDĐL #00124",
  en: "Thanh Phu Specialty, Ben Tre · GI #00124",
  ko: "타인푸 특산, 벤째 · 지리적 표시 #00124",
  ja: "タインフー特産、ベンチェ · 地理的表示 #00124",
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
          <div style={{ fontSize: 48, fontWeight: 700, color: OG.colors.text, fontFamily: ff, lineHeight: 1.2 }}>
            {BRAND_NAME[locale] ?? BRAND_NAME.vi}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: OG.colors.mango, fontFamily: ff, lineHeight: 1.3 }}>
            {TAGLINE[locale] ?? TAGLINE.vi}
          </div>
          <div style={{ fontSize: 22, color: OG.colors.textSecondary, fontFamily: ff, marginTop: 8 }}>
            {SUBTITLE[locale] ?? SUBTITLE.vi}
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts(locale) },
  );
}
