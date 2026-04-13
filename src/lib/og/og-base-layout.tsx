import { OG, loadImageBase64 } from "./og-utils";

const logoSrc = loadImageBase64("images/logo.png");
const mangoSrc = loadImageBase64("images/xoai-real-2.jpg");

/**
 * Shared OG base — solid yellow bg, mango photo right, brand logo bottom-left.
 * Vietnamese only. Bold, minimal text. Mango image always visible.
 */
export function OgBaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: OG.width,
        height: OG.height,
        display: "flex",
        flexDirection: "row",
        background: OG.bg,
        fontFamily: "Heading",
        overflow: "hidden",
      }}
    >
      {/* Left — text content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          padding: "50px 50px 40px 50px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          {children}
        </div>

        {/* Brand logo bottom-left */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={120}
          height={48}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Right — mango photo */}
      <div
        style={{
          display: "flex",
          width: "40%",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mangoSrc}
          width={480}
          height={630}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    </div>
  );
}
