import { ChatCircleDots, Phone, MapPin, Lightbulb } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./fade-in";

const CONTACT_INFO = [
  {
    Icon: ChatCircleDots,
    label: "Zalo (nhanh nhất)",
    value: "0918 469 075",
    sub: "Phản hồi trong 5 phút",
  },
  {
    Icon: Phone,
    label: "Hotline",
    value: "0918 469 075",
    sub: "4h sáng — 18h hàng ngày",
  },
  {
    Icon: MapPin,
    label: "Vựa",
    value: "Thạnh Phú, Bến Tre",
    sub: "Mở cửa 4h sáng",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Liên hệ
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              Đặt hàng ngay
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <FadeIn delay={0.08}>
            <div>
              {CONTACT_INFO.map((c, i) => (
                <div key={i} className="mb-8 flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-text/8">
                    <c.Icon size={24} weight="duotone" className="text-text/70" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-text/40">
                      {c.label}
                    </div>
                    <div className="mt-1 text-xl font-bold text-text">
                      {c.value}
                    </div>
                    <div className="mt-0.5 text-sm text-text/40">{c.sub}</div>
                  </div>
                </div>
              ))}

              <div className="mt-4 rounded-2xl bg-brand-cream/80 p-6">
                <p className="mb-2 flex items-center gap-2 text-sm font-bold text-text/70">
                  <Lightbulb size={16} weight="fill" />
                  Mẹo cho tiểu thương mới
                </p>
                <p className="text-sm leading-relaxed text-text/50">
                  Đặt thử 1 thùng 20kg, bán thử 2–3 ngày. Nếu khách khen hơn → tăng đơn dần. Không rủi ro.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form — jinzhenlian style: cream card, underline inputs, black SEND */}
          <FadeIn delay={0.16}>
            <div className="rounded-3xl bg-brand-cream/80 p-8 shadow-lg">
              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                  Họ tên
                </label>
                <input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                  Số điện thoại / Zalo
                </label>
                <input
                  type="tel"
                  placeholder="0912 345 678"
                  className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                  Bạn là
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Tiểu thương", "Nhà hàng", "Mua lẻ / Quà"].map((opt, i) => (
                    <label
                      key={i}
                      className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-text/15 px-5 py-2.5 text-sm font-semibold text-text/60 has-[:checked]:border-text has-[:checked]:bg-text has-[:checked]:text-white transition-colors"
                    >
                      <input type="radio" name="type" className="hidden" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                  Ghi chú
                </label>
                <textarea
                  placeholder="VD: Cần 50kg xoài chín, giao thứ 4 hàng tuần..."
                  rows={3}
                  className="w-full resize-none border-b-2 border-text/15 bg-transparent py-3 font-[inherit] text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                />
              </div>

              <p className="mb-4 text-xs text-text/30">
                Bằng việc gửi thông tin, bạn đồng ý với chính sách bảo mật của chúng tôi.
              </p>

              {/* SEND button — jinzhenlian exact */}
              <button className="w-full rounded-full bg-black py-4 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-text transition-colors">
                Gửi
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
