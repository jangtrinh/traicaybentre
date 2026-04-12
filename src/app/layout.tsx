/* Root layout — minimal passthrough. Locale-specific layout lives in [locale]/layout.tsx */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
