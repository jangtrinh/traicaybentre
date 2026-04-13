import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, getFontFamily } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";
import { getCity } from "@/content/cities";

export const alt = "Giao hàng — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 1800;

const DELIVERY_LABEL: Record<string, string> = {
  vi: "Giao hàng từ vựa Thạnh Phú",
  en: "Delivery from Thanh Phu Farm",
  ko: "타인푸 농장에서 배송",
  ja: "タインフー農園からお届け",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { locale, city: slug } = await params;
  const ff = getFontFamily(locale);
  const city = getCity(slug);
  const cityName = city?.name ?? slug;
  const hours = city?.shippingHours ?? "";

  return new ImageResponse(
    (
      <OgBaseLayout locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 20 }}>
          <div style={{ display: "flex", fontSize: 24, color: OG.colors.textSecondary, fontFamily: ff }}>
            {DELIVERY_LABEL[locale] ?? DELIVERY_LABEL.vi}
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, color: OG.colors.text, fontFamily: ff }}>
            {cityName}
          </div>
          {hours && (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  background: OG.colors.mango,
                  color: OG.colors.white,
                  padding: "10px 24px",
                  borderRadius: 999,
                  fontSize: 28,
                  fontWeight: 700,
                  fontFamily: "Heading",
                }}
              >
                {hours}h
              </div>
            </div>
          )}
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts(locale) },
  );
}
