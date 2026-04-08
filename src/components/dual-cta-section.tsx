import Image from "next/image";
import { Storefront, House, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";

const CTA_OPTIONS = [
  {
    Icon: Storefront,
    title: "Lấy Mối Sỉ",
    sub: "Tiểu thương · Đại lý · Nhà hàng",
    headerImage: "/images/cta-wholesale.jpg",
    headerAlt: "Chợ trái cây — lấy mối sỉ xoài Bến Tre",
    items: [
      "Giá sỉ theo tấn, cập nhật mỗi sáng",
      "MOQ: 1 thùng 20kg — thử trước, mua sau",
      "Phí ship báo trước — tuỳ tuyến và quy cách",
      "Sổ công nợ sau 3 đơn",
      "Hóa đơn VAT đầy đủ",
    ],
    cta: "Zalo Lấy Giá Sỉ",
    ctaSub: "Phản hồi trong 5 phút",
    dark: true,
  },
  {
    Icon: House,
    title: "Mua Lẻ / Quà Tặng",
    sub: "Gia đình Hà Nội · Quà đối tác",
    headerImage: "/images/cta-giftbox.jpg",
    headerAlt: "Hộp quà trái cây — combo xoài 5kg",
    items: [
      "Combo 5kg hộp quà — giá liên hệ",
      "Giao lạnh 24h tận cửa Hà Nội",
      "Đóng hộp sang trọng, kèm thiệp",
      "Đổi 100% nếu xoài dập — không hỏi lý do",
      "Kèm hướng dẫn bảo quản + ăn ngon nhất",
    ],
    cta: "Đặt Combo 5kg — Liên hệ giá",
    ctaSub: "Giao lạnh trong 24h",
    dark: false,
  },
];

export function DualCtaSection() {
  return (
    <section className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <h2 className="mb-12 text-center font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
            Bạn muốn mua như thế nào?
          </h2>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2">
          {CTA_OPTIONS.map((option, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div
                className={`flex flex-col overflow-hidden rounded-3xl shadow-md ${
                  option.dark
                    ? "bg-gradient-to-br from-primary-dark to-primary text-white"
                    : "border border-border bg-surface"
                }`}
              >
                {/* Header image */}
                <div className="relative h-40 w-full">
                  <Image
                    src={option.headerImage}
                    alt={option.headerAlt}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 ${
                      option.dark
                        ? "bg-gradient-to-b from-transparent to-primary-dark/80"
                        : "bg-gradient-to-b from-transparent to-white/60"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8 pt-5">
                  <div className="mb-2 flex items-center gap-3">
                    <option.Icon
                      size={28}
                      weight="duotone"
                      className={option.dark ? "text-white/80" : "text-primary"}
                    />
                    <h3
                      className={`font-heading text-2xl font-bold ${
                        option.dark ? "text-white" : "text-text"
                      }`}
                    >
                      {option.title}
                    </h3>
                  </div>
                  <p
                    className={`mb-5 text-sm ${
                      option.dark ? "text-white/70" : "text-text-muted"
                    }`}
                  >
                    {option.sub}
                  </p>

                  <div className="flex-1">
                    {option.items.map((item, j) => (
                      <div
                        key={j}
                        className={`mb-2.5 flex items-start gap-2 text-sm leading-snug ${
                          option.dark ? "text-white/85" : "text-text-secondary"
                        }`}
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className={`mt-0.5 shrink-0 ${
                            option.dark ? "text-accent" : "text-primary"
                          }`}
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    className={`mt-5 w-full rounded-full py-3 text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 ${
                      option.dark
                        ? "bg-white text-primary-dark hover:bg-accent-light"
                        : "bg-primary text-white shadow-primary/20 hover:bg-primary-dark"
                    }`}
                  >
                    {option.cta}
                  </button>
                  <p
                    className={`mt-2 text-center text-xs ${
                      option.dark ? "text-white/50" : "text-text-muted"
                    }`}
                  >
                    {option.ctaSub}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
