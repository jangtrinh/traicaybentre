import Image from "next/image";

type BrandName =
  | "tiktok"
  | "facebook"
  | "instagram"
  | "zalo"
  | "messenger"
  | "x"
  | "telegram";

const BRAND_ICONS: Record<BrandName, string> = {
  tiktok: "/icons/tiktok.svg",
  facebook: "/icons/facebook.svg",
  instagram: "/icons/instagram.svg",
  zalo: "/icons/zalo.svg",
  messenger: "/icons/messenger.svg",
  x: "/icons/x.svg",
  telegram: "/icons/telegram.svg",
};

export function BrandIcon({
  brand,
  size = 20,
  className = "",
}: {
  brand: BrandName;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={BRAND_ICONS[brand]}
      alt={brand}
      width={size}
      height={size}
      className={className}
    />
  );
}
