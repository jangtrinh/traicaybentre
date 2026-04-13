import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, getFontFamily, truncate } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";
import { products } from "@/content/products";

export const alt = "Product — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 600;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product: slug } = await params;
  const ff = getFontFamily(locale);
  const entry = products[slug];

  if (!entry) {
    // Fallback — generic brand OG
    return new ImageResponse(
      (
        <OgBaseLayout locale={locale}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: OG.colors.text, fontFamily: ff }}>
              🥭
            </div>
          </div>
        </OgBaseLayout>
      ),
      { ...size, fonts: getOgFonts(locale) },
    );
  }

  return new ImageResponse(
    (
      <OgBaseLayout locale={locale}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 12 }}>
          {/* Product name */}
          <div style={{ fontSize: 52, fontWeight: 700, color: OG.colors.text, fontFamily: ff, lineHeight: 1.2 }}>
            {truncate(entry.name, 50)}
          </div>

          {/* Tagline */}
          <div style={{ fontSize: 26, color: OG.colors.textSecondary, fontFamily: ff, lineHeight: 1.4 }}>
            {truncate(entry.tagline, 80)}
          </div>

          {/* Price pill */}
          <div style={{ display: "flex", marginTop: 16, gap: 12, alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                background: OG.colors.mango,
                color: OG.colors.white,
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: 22,
                fontWeight: 700,
                fontFamily: "Heading",
              }}
            >
              {entry.seo.title.match(/\d[\d.]+đ/)?.[0] ?? "Giá cập nhật mỗi ngày"}
            </div>
            <div style={{ fontSize: 18, color: OG.colors.textSecondary, fontFamily: "Heading" }}>
              CDĐL #00124
            </div>
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts(locale) },
  );
}
