import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
  description:
    "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh toàn quốc. Giá cập nhật mỗi ngày — gọi vựa để có giá chính xác.",
  keywords: [
    "xoài tứ quý",
    "xoài Bến Tre",
    "xoài Thạnh Phú",
    "trái cây đặc sản",
    "xoài sỉ",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${nunito.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
