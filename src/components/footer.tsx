import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandIcon } from "./brand-icon";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="bg-brand px-5 pt-20 pb-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-wrap justify-between gap-12">
          {/* Brand + social — jinzhenlian style */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Xoài Bến Tre"
              width={160}
              height={70}
              className="h-16 w-auto"
            />
            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
                {t("followUs")}
              </span>
              <div className="mt-3 flex items-center gap-4">
                {(["facebook", "tiktok", "instagram"] as const).map((brand) => (
                  <a key={brand} href="#" className="hover:opacity-70 transition-opacity">
                    <BrandIcon brand={brand} size={32} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav links — jinzhenlian 2-column style */}
          <div className="flex gap-20">
            <div className="flex flex-col gap-4">
              <Link href="/san-pham" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{t("sanPham")}</Link>
              <Link href="/xoai-tu-quy" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("xoaiTuQuy")}</Link>
              <Link href="/dua-xiem-ben-tre" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("duaXiem")}</Link>
              <Link href="/nguon-goc" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("nguonGoc")}</Link>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/kien-thuc" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("kienThuc")}</Link>
              <Link href="/tin-tuc" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("tinTuc")}</Link>
              <Link href="/#contact" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">{tNav("lienHe")}</Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {/* Official site promote */}
        <div className="mt-16 rounded-2xl bg-text/5 p-6 text-center">
          <p className="text-sm font-semibold text-text/70">
            {t("officialSite")}
          </p>
          <a
            href="https://xoaituquythanhphu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-base font-bold text-text underline underline-offset-4 hover:text-text/70 transition-colors"
          >
            xoaituquythanhphu.com
          </a>
        </div>

        <div className="mt-8 border-t border-text/10 pt-6">
          <p className="text-sm text-text/30">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
