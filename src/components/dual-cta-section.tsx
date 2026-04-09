import { CheckCircle, Phone, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./fade-in";

const WHOLESALE_ITEMS = [
  "Giá sỉ theo tấn, cập nhật mỗi sáng",
  "MOQ: 1 thùng 20kg — thử trước, mua sau",
  "Phí ship báo trước — tuỳ tuyến và quy cách",
  "Sổ công nợ sau 3 đơn",
  "Hóa đơn VAT đầy đủ",
];

export function DualCtaSection() {
  return (
    <section className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1100px]">
        <FadeIn>
          <span className="block text-center text-xs font-bold uppercase tracking-[0.2em] text-text/50">
            Dành cho đối tác
          </span>
          <h2 className="mt-3 text-center font-heading text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
            Lấy Mối Sỉ
            <br />
            <span className="text-mango">Từ Vựa</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-lg lg:grid lg:grid-cols-5">
            {/* Image side — real vựa photo với khai trương */}
            <div className="relative aspect-[4/3] lg:col-span-2 lg:aspect-auto">
              <Image
                src="/images/vua-khai-truong.jpg"
                alt="Vựa Trái Cây Bến Tre — ngày khai trương, xã Đại Điền, Thạnh Phú"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(min-width: 1024px) 440px, 100vw"
              />
              {/* Subtle bottom gradient để text badge dễ đọc trên mọi ảnh */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-text shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-mango" />
                  Vựa Phúc Giang · Thạnh Phú
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-col p-8 sm:p-10 lg:col-span-3 lg:p-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
                Tiểu thương · Đại lý · Nhà hàng / Khách sạn
              </span>
              <h3 className="mt-3 font-heading text-2xl font-bold text-text sm:text-3xl">
                Trực tiếp từ vườn, giá tận gốc
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text/60 sm:text-base">
                Lấy hàng trực tiếp từ vựa — không qua trung gian, không markup.
                Cập nhật giá mỗi sáng, hỗ trợ đóng thùng theo yêu cầu.
              </p>

              <ul className="mt-6 space-y-3">
                {WHOLESALE_ITEMS.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm leading-snug text-text/80 sm:text-base"
                  >
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-mango"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#contact"
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-text"
                >
                  Gửi đơn lấy giá sỉ
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="tel:0932585533"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-text/15 px-6 py-4 text-sm font-bold text-text transition-colors hover:border-text"
                >
                  <Phone size={16} weight="bold" />
                  0932 585 533
                </a>
              </div>
              <p className="mt-3 text-center text-xs text-text/40 sm:text-left">
                Zalo phản hồi trong 5 phút · 4h sáng — 18h hàng ngày
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
