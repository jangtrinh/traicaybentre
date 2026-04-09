"use client";

import { useState, useRef } from "react";
import { ChatCircleDots, Phone, MapPin, Lightbulb, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";

const CONTACT_INFO = [
  {
    Icon: ChatCircleDots,
    label: "Zalo (trả nhanh)",
    value: "0932 585 533",
    sub: "Anh Phúc trả trong 5 phút",
  },
  {
    Icon: Phone,
    label: "Gọi trực tiếp",
    value: "0932 585 533",
    sub: "4h sáng – 18h · Anh Phúc nghe máy",
  },
  {
    Icon: MapPin,
    label: "Địa chỉ vựa",
    value: "Thạnh Phú, Bến Tre",
    sub: "Mở cửa 4h sáng",
  },
];

const CUSTOMER_TYPES = ["Tiểu thương", "Đại lý", "Nhà hàng / Khách sạn"];

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [note, setNote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formLoadTime = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !customerType) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, customerType, note, website: honeypot, _t: formLoadTime.current }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <section id="contact" className="bg-brand px-5 py-24">
      <div className="mx-auto max-w-[1200px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Liên hệ lấy mối
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              Để Vựa Gọi Lại
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
                  Mẹo cho mối mới
                </p>
                <p className="text-sm leading-relaxed text-text/50">
                  Lấy 1 thùng 20kg, bán thử 2–3 ngày, coi khách nói sao so với mối cũ. Khách khen hơn thì tăng đơn dần — vựa không ép.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.16}>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-3xl bg-brand-cream/80 p-8 shadow-lg min-h-[400px] text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle size={48} weight="fill" className="text-green-600" />
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-text">
                  Gửi thành công!
                </h3>
                <p className="mb-1 text-text/60">
                  Cảm ơn anh/chị <strong>{name}</strong>! Vựa đã nhận thông tin.
                </p>
                <p className="text-text/60">
                  Anh Phúc sẽ gọi vô <strong>{phone}</strong> trong vòng 15 phút (giờ làm việc).
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setName("");
                    setPhone("");
                    setCustomerType("");
                    setNote("");
                    setHoneypot("");
                    formLoadTime.current = Date.now();
                  }}
                  className="mt-6 rounded-full border-2 border-text/15 px-6 py-2.5 text-sm font-semibold text-text/60 hover:border-text hover:text-text transition-colors"
                >
                  Gửi liên hệ khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-brand-cream/80 p-8 shadow-lg">
                {/* Honeypot — invisible to humans, bots auto-fill */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    Anh/chị tên gì <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Anh Hùng"
                    className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    SĐT / Zalo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full border-b-2 border-text/15 bg-transparent py-3 text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    Anh/chị là <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CUSTOMER_TYPES.map((opt) => (
                      <label
                        key={opt}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors ${
                          customerType === opt
                            ? "border-text bg-text text-white"
                            : "border-text/15 text-text/60 hover:border-text/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="customerType"
                          value={opt}
                          checked={customerType === opt}
                          onChange={(e) => setCustomerType(e.target.value)}
                          className="hidden"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-text/50">
                    Nhắn thêm
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VD: Cần 50kg xoài chín Loại 1, giao thứ 4 mỗi tuần..."
                    rows={3}
                    className="w-full resize-none border-b-2 border-text/15 bg-transparent py-3 font-[inherit] text-base text-text outline-none placeholder:text-text/25 focus:border-text transition-colors"
                  />
                </div>

                {status === "error" && (
                  <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending" || !name || !phone || !customerType}
                  className="w-full rounded-full bg-black py-4 text-sm font-bold uppercase tracking-[0.2em] text-white hover:bg-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <>
                      <CircleNotch size={18} className="animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    "Gửi thông tin — vựa gọi lại"
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
