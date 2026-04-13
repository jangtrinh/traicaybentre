import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG, truncate } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";
import { products } from "@/content/products";

export const alt = "Sản phẩm — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 600;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { product: slug } = await params;
  const entry = products[slug];
  const name = entry?.shortName ?? "Trái Cây Bến Tre";
  const tagline = entry?.tagline ?? "";

  return new ImageResponse(
    (
      <OgBaseLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 52, fontWeight: 800, color: OG.text, lineHeight: 1.1, textTransform: "uppercase" }}>
            {truncate(name, 30)}
          </div>
          {tagline && (
            <div style={{ fontSize: 22, color: OG.textMuted, marginTop: 4, lineHeight: 1.4 }}>
              {truncate(tagline, 70)}
            </div>
          )}
          <div style={{ display: "flex", marginTop: 12 }}>
            <div
              style={{
                display: "flex",
                background: OG.mango,
                color: OG.white,
                padding: "8px 20px",
                borderRadius: 999,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              Giao lạnh toàn quốc
            </div>
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts() },
  );
}
