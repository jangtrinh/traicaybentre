import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";
import { getCity } from "@/content/cities";

export const alt = "Giao hàng — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 1800;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCity(slug);

  return new ImageResponse(
    (
      <OgBaseLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 28, color: OG.textMuted }}>
            Giao hàng đến
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: OG.text, lineHeight: 1.1, textTransform: "uppercase" }}>
            {city?.name ?? slug}
          </div>
          {city && (
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
              <div
                style={{
                  display: "flex",
                  background: OG.mango,
                  color: OG.white,
                  padding: "8px 20px",
                  borderRadius: 999,
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                {city.shippingHours}h
              </div>
              <div style={{ fontSize: 20, color: OG.textMuted }}>
                từ vựa Thạnh Phú
              </div>
            </div>
          )}
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts() },
  );
}
