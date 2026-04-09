import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://traicaybentre.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/xoai-tu-quy`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gia-xoai-hom-nay`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/nguon-goc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kien-thuc/xoai-tu-quy-la-gi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/ha-noi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/tp-hcm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/da-nang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tin-tuc`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];
}
