"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Drop, Leaf, Sparkle, Cookie, Basket, Gift } from "@phosphor-icons/react";
import { FadeIn } from "./fade-in";
import { PRODUCTS, type Product } from "@/lib/landing-data";
import type { Icon } from "@phosphor-icons/react";

/* Map tag text → Phosphor icon */
const TAG_ICONS: Record<string, Icon> = {
  "Ngọt đậm": Drop,
  "Ít xơ": Leaf,
  "Vị mặn đặc trưng": Sparkle,
  "Giòn sần sật": Cookie,
  "Chua thanh": Drop,
  "Làm gỏi": Basket,
  "Có thiệp": Gift,
  "Đóng hộp đẹp": Gift,
  "Tặng được ngay": Sparkle,
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isCombo = !!product.unit;
  const unitLabel = isCombo ? "/hộp" : "/kg";

  return (
    <FadeIn delay={index * 0.12}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`overflow-hidden rounded-3xl bg-white transition-all duration-300 ${
          hovered ? "-translate-y-2 shadow-xl" : "shadow-md"
        }`}
      >
        {/* Real photo + sticker overlay bottom-right */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          {/* Sticker label — small, bottom right */}
          <Image
            src={product.sticker}
            alt=""
            width={72}
            height={72}
            className="absolute bottom-3 right-3 h-auto w-[72px] drop-shadow-lg"
          />
          <span
            className={`absolute top-4 left-4 rounded-full ${product.badgeColor} px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white`}
          >
            {product.badge}
          </span>
        </div>

        <div className="p-6">
          <h3 className="font-heading text-2xl font-bold uppercase text-text">
            {product.name}
          </h3>
          <p className="mt-2 flex items-center gap-1 text-xs text-text-muted">
            <MapPin size={12} weight="fill" /> {product.farm} · Hái ngày{" "}
            {product.harvestDate}
          </p>

          {/* Tag pills with icons — gentle style */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => {
              const Icon = TAG_ICONS[tag] || Leaf;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-text/10 bg-brand-cream px-2.5 py-1 text-xs font-medium text-text/70"
                >
                  <Icon size={12} weight="duotone" />
                  {tag}
                </span>
              );
            })}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-text-secondary">
            {product.desc}
          </p>

          {/* Price range — call for exact daily price */}
          <div className="mt-5 border-t border-border pt-5">
            <div className="font-heading text-3xl font-bold text-text">
              {product.priceSi}
              <span className="text-sm font-medium text-text-secondary">
                đ/kg
              </span>
            </div>
            <p className="mt-1 text-xs text-text-muted">
              Giá dao động theo ngày — gọi vựa để có giá chính xác
            </p>
          </div>

          {product.stockUntil && (
            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-600">
              <Clock size={12} weight="bold" /> Giá áp dụng đến{" "}
              {product.stockUntil}
            </p>
          )}

          {/* Black CTA — jinzhenlian style */}
          <a
            href="#contact"
            className="mt-5 block w-full rounded-full bg-black py-4 text-center text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-text transition-colors"
          >
            Liên hệ đặt hàng
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

export function ProductSection() {
  return (
    <section id="products" className="bg-brand-cream px-5 py-24">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="mb-16 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text/50">
              Sản phẩm của chúng tôi
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold uppercase text-text sm:text-5xl">
              Chọn ngay
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
