import Image from "next/image";
import { BrandIcon } from "./brand-icon";

export function Footer() {
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
                Follow us
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
              <a href="#products" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Sản phẩm</a>
              <a href="#process" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Quy trình</a>
              <a href="/nguon-goc" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Nguồn gốc</a>
            </div>
            <div className="flex flex-col gap-4">
              <a href="#testimonials" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Đối tác</a>
              <a href="#faq" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Tìm hiểu</a>
              <a href="#contact" className="text-base font-semibold uppercase text-text hover:text-text/60 transition-colors">Liên hệ</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        {/* Official site promote */}
        <div className="mt-16 rounded-2xl bg-text/5 p-6 text-center">
          <p className="text-sm font-semibold text-text/70">
            Trang web chính thức của Xoài Tứ Quý Thạnh Phú
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
            © 2026 Xoài Tứ Quý Bến Tre · CDĐL số 00124 · Thạnh Phú, Bến Tre
          </p>
        </div>
      </div>
    </footer>
  );
}
