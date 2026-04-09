/* === Price data source — static JSON, can migrate to Supabase later === */

export interface PriceTier {
  name: string;
  sku: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  weight: string;
  description: string;
  badge: string;
  badgeColor: string;
}

export interface PriceData {
  lastUpdated: string;
  note: string;
  tiers: PriceTier[];
}

/** Current price data — edit this file to update daily prices */
export const PRICE_DATA: PriceData = {
  lastUpdated: "2026-04-09",
  note: "Giá dao động theo ngày, gọi vựa 0932 585 533 để có giá chính xác.",
  tiers: [
    {
      name: "Xoài Tứ Quý VIP",
      sku: "xoai-tu-quy-vip",
      priceRange: "23.000–25.000",
      priceMin: 23000,
      priceMax: 25000,
      weight: "600–800g+/trái",
      description:
        "Trái đẹp không tì vết, da mịn, size lớn từ 600g. Quà tặng, nhà hàng cao cấp.",
      badge: "VIP",
      badgeColor: "bg-purple-600",
    },
    {
      name: "Xoài Tứ Quý Loại 1",
      sku: "xoai-tu-quy-loai-1",
      priceRange: "20.000–22.000",
      priceMin: 20000,
      priceMax: 22000,
      weight: "600–800g+/trái",
      description:
        "Trái to, có 1 mặt xấu nhẹ nhưng chất lượng tương đương VIP. Bán chạy nhất.",
      badge: "Bán chạy #1",
      badgeColor: "bg-red-600",
    },
    {
      name: "Xoài Tứ Quý Loại 2",
      sku: "xoai-tu-quy-loai-2",
      priceRange: "16.000–18.000",
      priceMin: 16000,
      priceMax: 18000,
      weight: "400–600g/trái",
      description:
        "Trái nhỏ hơn, visual không đều — nhưng ngon không kém. Lý tưởng cho tiểu thương, làm gỏi.",
      badge: "Giá tốt",
      badgeColor: "bg-green-700",
    },
  ],
};
