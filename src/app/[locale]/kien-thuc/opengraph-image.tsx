import { ImageResponse } from "next/og";
import { getOgFonts } from "@/lib/og/og-fonts";
import { OG } from "@/lib/og/og-utils";
import { OgBaseLayout } from "@/lib/og/og-base-layout";

export const alt = "Kiến thức — Trái Cây Bến Tre";
export const size = { width: OG.width, height: OG.height };
export const contentType = "image/png";
export const revalidate = 86400;

export default async function Image() {
  return new ImageResponse(
    (
      <OgBaseLayout>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                background: OG.mango,
                color: OG.white,
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 16,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Kiến thức
            </div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: OG.text, lineHeight: 1.15, textTransform: "uppercase" }}>
            Xoài Tứ Quý
          </div>
          <div style={{ fontSize: 22, color: OG.textMuted }}>
            Hướng dẫn · So sánh · Mùa vụ · Bảo quản
          </div>
        </div>
      </OgBaseLayout>
    ),
    { ...size, fonts: getOgFonts() },
  );
}
