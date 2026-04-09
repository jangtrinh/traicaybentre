import type { MetadataRoute } from "next";
import { getAllPublishedArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://traicaybentre.com";

  // Dynamic entries from MDX articles (visible only when uxReviewed + publishedAt elapsed)
  const articleEntries: MetadataRoute.Sitemap = getAllPublishedArticles().map((a) => ({
    url: `${base}${a.urlPath}`,
    lastModified: new Date(a.frontmatter.publishedAt),
    changeFrequency: a.type === "tin-tuc" ? "weekly" : "monthly",
    priority: a.type === "kien-thuc" ? 0.75 : 0.65,
  }));

  return [
    ...articleEntries,
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/xoai-tu-quy`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/nguon-goc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kien-thuc`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/kien-thuc/xoai-tu-quy-la-gi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kien-thuc/xoai-tu-quy-vs-xoai-cat-hoa-loc`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/ha-noi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/tp-hcm`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/giao-hang/da-nang`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/tin-tuc`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/tin-tuc/nguon-goc-xoai-tu-quy-cau-chuyen-1982`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tin-tuc/7-mon-ngon-tu-xoai-tu-quy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kien-thuc/chi-dan-dia-ly-cd-dl-00124`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kien-thuc/vung-trong-xoai-mien-tay`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kien-thuc/mua-vu-xoai-tu-quy-3-vu-nam`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
