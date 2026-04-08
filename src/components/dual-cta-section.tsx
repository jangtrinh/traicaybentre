import { Storefront, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
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
      <div className="mx-auto max-w-[700px]">
        <FadeIn>
          <h2 className="mb-12 text-center font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
            Lấy mối sỉ
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark to-primary text-white shadow-md">
            {/* Header image */}
            <div className="relative h-48 w-full">
              <Image
                src="/images/cta-wholesale.jpg"
                alt="Chợ trái cây — lấy mối sỉ xoài Bến Tre"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-dark/80" />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-8 pt-5">
              <div className="mb-2 flex items-center gap-3">
                <Storefront size={28} weight="duotone" className="text-white/80" />
                <h3 className="font-heading text-2xl font-bold text-white">
                  Lấy Mối Sỉ
                </h3>
              </div>
              <p className="mb-5 text-sm text-white/70">
                Tiểu thương · Đại lý · Nhà hàng / Khách sạn
              </p>

              <div className="flex-1">
                {WHOLESALE_ITEMS.map((item, j) => (
                  <div
                    key={j}
                    className="mb-2.5 flex items-start gap-2 text-sm leading-snug text-white/85"
                  >
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-5 block w-full rounded-full bg-white py-3 text-center text-sm font-bold text-primary-dark shadow-md transition-all hover:-translate-y-0.5 hover:bg-accent-light"
              >
                Gửi đơn lấy giá sỉ
              </a>
              <p className="mt-2 text-center text-xs text-white/50">
                Phản hồi trong 5 phút
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
