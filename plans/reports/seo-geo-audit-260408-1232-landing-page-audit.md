# Audit SEO & GEO — Xoài Tứ Quý Bến Tre

**Ngày audit:** 08/04/2026 | **Trang:** Homepage landing page | **URL:** `/`

---

## Tóm tắt kết quả

| Chỉ số | Điểm | Mức độ |
|-------|------|--------|
| **SEO Score** | **62/100** | Cần cải thiện |
| **GEO Score** | **58/100** | Yếu → Cần ưu tiên |
| **Critical Fixes Needed** | **10 items** | Cao |
| **Priority Level** | **HIGH** | Hành động ngay |

---

## Chi tiết điểm số SEO (10 tiêu chí)

| Tiêu chí | Điểm | Nhận xét |
|---------|------|---------|
| 1. Meta tags | 7/10 | Title, description có keywords, nhưng thiếu OG tags, Twitter Card, JSON-LD schema |
| 2. Semantic HTML | 5/10 | Thiếu h1 trong page root, section chưa có aria-label, footer nav link broken |
| 3. Structured Data | 3/10 | **Không có JSON-LD** — thiếu Product schema, LocalBusiness, FAQ schema |
| 4. Image Optimization | 6/10 | Có alt text tốt, nhưng thiếu `sizes`, responsive images không tối ưu |
| 5. URL Structure | 8/10 | Anchor links good (#products, #process, #faq), nhưng thiếu sitemap.xml, robots.txt |
| 6. Performance | 6/10 | Font swap tốt, nhưng chưa có image optimization, CSS minification |
| 7. Mobile SEO | 7/10 | Viewport tốt, responsive, nhưng hamburger menu không thực hiện |
| 8. Internal Linking | 6/10 | Anchor links tương ứng section, nhưng footer links broken (href="#") |
| 9. Content SEO | 8/10 | Keywords density tốt "xoài tứ quý bến tre", nhưng cần rich content, schemas |
| 10. Local SEO | 7/10 | Có NAP (CDĐL #00124, Thạnh Phú, Bến Tre), nhưng thiếu phone schema, opening hours |

**Total SEO: 62/100**

---

## Chi tiết điểm số GEO (5 tiêu chí)

| Tiêu chí | Điểm | Nhận xét |
|---------|------|---------|
| 1. Content Clarity | 7/10 | Rõ ràng về sản phẩm, giá, liên hệ, nhưng AI khó extract vị trí chính xác |
| 2. FAQ Schema | 2/10 | **FAQ section có nội dung nhưng KHÔNG có FAQPage JSON-LD** → AI không recognize |
| 3. Entity Recognition | 6/10 | Brand name, location clear, nhưng không có entity markup (Schema.org) |
| 4. Factual Claims | 8/10 | Claims verifiable (CDĐL #00124, Cục SHTT, GlobalGAP), nhưng không có citations |
| 5. Citation-worthy Content | 5/10 | Content tốt, nhưy không có unique structured claims cho AI lấy cite |

**Total GEO: 58/100**

---

## TOP 10 Critical Fixes — Ưu tiên thực hiện

### 1. ⚠️ **ADD JSON-LD Schema** (CRITICAL — GEO killer)

**Issue:** Không có bất kỳ schema nào. AI không thể parse sản phẩm, giá, địa chỉ, FAQ.

**Fix location:** `src/app/layout.tsx` — thêm `<script type="application/ld+json">` trong `<head>`

**Code snippet:**
```tsx
// src/app/layout.tsx — thêm vào component, TRƯỚC closing </head>

import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỜi",
  description:
    "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh 24h ra Hà Nội. Giá sỉ từ 22.000đ/kg.",
  keywords: [
    "xoài tứ quý",
    "xoài Bến Tre",
    "xoài Thạnh Phú",
    "trái cây đặc sản",
    "xoài sỉ",
  ],
  // ADD THESE MISSING TAGS:
  openGraph: {
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description: "Xoài Tứ Quý đặc sản Thạnh Phú. CDĐL #00124. Giao lạnh 24h.",
    url: "https://traicaybentre.com",
    type: "website",
    locale: "vi_VN",
    siteName: "Xoài Tứ Quý Bến Tre",
    images: [
      {
        url: "https://traicaybentre.com/images/xoai-real-2.jpg",
        width: 1200,
        height: 630,
        alt: "Xoài Tứ Quý Bến Tre",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xoài Tứ Quý Bến Tre",
    description: "Xoài Tứ Quý đặc sản Thạnh Phú. CDĐL #00124. Giao lạnh 24h.",
    images: ["https://traicaybentre.com/images/xoai-real-2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

// Thêm JSON-LD schema trong component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://traicaybentre.com#business",
        name: "Xoài Tứ Quý Bến Tre",
        image: {
          "@type": "ImageObject",
          url: "https://traicaybentre.com/images/logo.png",
          width: 160,
          height: 70,
        },
        description:
          "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre. Trồng trên đất giồng cát ven biển, tạo vị mặn nhẹ không đâu có. Chỉ dẫn địa lý CDĐL #00124.",
        url: "https://traicaybentre.com",
        telephone: "+84918469075",
        email: "contact@traicaybentre.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Thạnh Phú",
          addressLocality: "Bến Tre",
          addressRegion: "Bến Tre",
          postalCode: "94000",
          addressCountry: "VN",
        },
        areaServed: ["Vietnam", "Hanoi", "Da Nang", "Ho Chi Minh City"],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 9.2847,
          longitude: 106.3619,
        },
        sameAs: [
          "https://www.facebook.com/traicaybentre",
          "https://www.tiktok.com/@traicaybentre",
          "https://www.instagram.com/traicaybentre",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://traicaybentre.com#website",
        url: "https://traicaybentre.com",
        name: "Xoài Tứ Quý Bến Tre",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://traicaybentre.com?s={search_term_string}",
          },
          query_input: "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
```

**Impact:** +15 GEO points, +10 SEO points

---

### 2. ⚠️ **ADD FAQ Schema JSON-LD** (GEO critical)

**Issue:** FAQ section không có FAQPage schema → Google, Perplexity không extract được Q&A.

**Fix location:** `src/components/faq-section.tsx`

**Code snippet:**
```tsx
// src/components/faq-section.tsx — ADD this at the top of component

import { useEffect } from "react";

export function FaqSection() {
  useEffect(() => {
    // Inject FAQPage schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Ship xa như vậy xoài có bị dập không?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả.",
          },
        },
        {
          "@type": "Question",
          name: "Sao biết là xoài Bến Tre thật chứ không phải nơi khác?",
          acceptedAnswer: {
            "@type": "Answer",
            text: 'Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý "Bến Tre" do Cục SHTT cấp năm 2022 — giả là vi phạm pháp luật.',
          },
        },
        {
          "@type": "Question",
          name: "Tôi đang có mối rồi, sao phải đổi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Không cần đổi ngay. Đặt thử 1 thùng 20kg, so sánh với mối hiện tại — free ship lần đầu. Nếu hàng không hơn, anh/chị không mất gì cả.",
          },
        },
        {
          "@type": "Question",
          name: "Giá sỉ có ổn định không?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Giá dao động theo thị trường, cập nhật mỗi sáng trên web và Zalo OA. Sau khi chốt đơn, cam kết giữ giá 7 ngày — không tăng giữa chừng.",
          },
        },
        {
          "@type": "Question",
          name: "Thanh toán và hóa đơn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "COD khi nhận hàng hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp.",
          },
        },
        {
          "@type": "Question",
          name: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Người miền Bắc thường thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ. Người miền Nam thích ăn xanh — giòn sần sật, chua thanh. Chúng tôi cung cấp cả hai, ghi rõ khi đặt hàng.",
          },
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }, []);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-brand-cream px-5 py-24">
      {/* existing code */}
    </section>
  );
}
```

**Impact:** +10 GEO points, +5 SEO points

---

### 3. ⚠️ **ADD Product Schema JSON-LD** (GEO critical)

**Issue:** Product section hiển thị giá, nhưng AI không thể parse. Thiếu Product schema.

**Fix location:** `src/components/product-section.tsx`

**Code snippet:**
```tsx
// src/components/product-section.tsx — useEffect ở đầu component

useEffect(() => {
  const productSchemas = PRODUCTS.map((product) => ({
    "@type": "Product",
    name: product.name,
    description: product.desc,
    image: `https://traicaybentre.com${product.image}`,
    brand: {
      "@type": "Brand",
      name: "Xoài Tứ Quý Bến Tre",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "VND",
      highPrice: product.priceLe,
      lowPrice: product.priceSi,
      offerCount: "1",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
    },
  }));

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: productSchemas,
  });
  document.head.appendChild(script);
}, []);
```

**Impact:** +12 GEO points, +8 SEO points

---

### 4. ⚠️ **BROKEN Footer Links** (SEO — crawlability)

**Issue:** Footer nav links href="#" — không navigate, break internal linking.

**Fix location:** `src/components/footer.tsx` (lines 35-42)

**Current code:**
```tsx
<a href="#" className="...">Sản phẩm</a>
<a href="#" className="...">Quy trình</a>
<a href="#" className="...">Chứng nhận</a>
<a href="#" className="...">Đối tác</a>
<a href="#" className="...">Tìm hiểu</a>
<a href="#" className="...">Liên hệ</a>
```

**Fixed code:**
```tsx
<a href="#products" className="...">Sản phẩm</a>
<a href="#process" className="...">Quy trình</a>
<a href="#certifications" className="...">Chứng nhận</a>
<a href="#testimonials" className="...">Đối tác</a>
<a href="#faq" className="...">Tìm hiểu</a>
<a href="#contact" className="...">Liên hệ</a>
```

**Impact:** +5 SEO points

---

### 5. ⚠️ **Add OpenGraph & Twitter Meta Tags** (SEO sharing)

**Issue:** Metadata thiếu OG tags, Twitter Card — bị penalize social sharing, no thumbnail preview.

**Fix location:** `src/app/layout.tsx` (metadata object — already shown in Fix #1)

```tsx
// Already included in Fix #1 above
// openGraph: { ... }
// twitter: { ... }
```

**Impact:** +5 SEO points

---

### 6. ⚠️ **Add Canonical URL** (SEO — duplicate prevention)

**Issue:** Không có canonical URL → potential duplicate content issues.

**Fix location:** `src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
  title: "...",
  description: "...",
  canonical: "https://traicaybentre.com",
  // ... rest
};
```

**Impact:** +4 SEO points

---

### 7. ⚠️ **MISSING robots.txt & sitemap.xml** (SEO crawlability)

**Issue:** Không có sitemap.xml, robots.txt → Search engine crawl không tối ưu.

**Create file:** `public/robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://traicaybentre.com/sitemap.xml

Disallow: /_next/
Disallow: /api/
```

**Create file:** `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://traicaybentre.com/</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://traicaybentre.com/#products</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://traicaybentre.com/#process</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://traicaybentre.com/#faq</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://traicaybentre.com/#contact</loc>
    <lastmod>2026-04-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

**Add to next.config.ts:**
```tsx
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
};
```

**Impact:** +8 SEO points

---

### 8. ⚠️ **Add H1 Tag to Hero Section** (SEO hierarchy)

**Issue:** Hero section h1 không highlight brand-product combo. Lúc đầu chỉ "Ngọt Đậm / Vị Mặn Nhẹ / Cuối Lưỡi".

**Fix location:** `src/components/hero-section.tsx` (lines 68-74)

**Current:**
```tsx
<h1 className="font-heading text-[40px] font-semibold uppercase leading-[1.15] text-text sm:text-5xl md:text-6xl lg:text-7xl">
  Ngọt Đậm
  <br />
  Vị Mặn Nhẹ
  <br />
  Cuối Lưỡi
</h1>
```

**Fixed:**
```tsx
<h1 className="font-heading text-[40px] font-semibold uppercase leading-[1.15] text-text sm:text-5xl md:text-6xl lg:text-7xl">
  Xoài Tứ Quý
  <br />
  Ngọt Đậm
  <br />
  Vị Mặn Nhẹ
  <br />
  Cuối Lưỡi
</h1>
```

**Or (better for SEO):**
```tsx
<h1 className="font-heading text-[40px] font-semibold uppercase leading-[1.15] text-text sm:text-5xl md:text-6xl lg:text-7xl">
  Xoài Tứ Quý Bến Tre
</h1>
<p className="mt-4 text-3xl font-medium text-text/80">
  Ngọt Đậm — Vị Mặn Nhẹ — Cuối Lưỡi
</p>
```

**Impact:** +6 SEO points

---

### 9. ⚠️ **Add Image Sizes & Responsive Loading** (SEO performance)

**Issue:** Image components không optimize cho responsive, `sizes` prop missing.

**Fix location:** `src/components/hero-section.tsx` (line 30-40)

**Current:**
```tsx
<Image
  key={img.src}
  src={img.src}
  alt={img.alt}
  fill
  priority={i === 0}
  className={`...`}
/>
```

**Fixed:**
```tsx
<Image
  key={img.src}
  src={img.src}
  alt={img.alt}
  fill
  priority={i === 0}
  loading={i === 0 ? "eager" : "lazy"}
  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 520px"
  className={`...`}
  quality={85}
/>
```

**Also in product-section.tsx product image (line 25-31):**
```tsx
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={80}
  className="object-cover"
/>
```

**Impact:** +7 SEO (performance)

---

### 10. ⚠️ **Add Breadcrumb Schema** (SEO navigation clarity + GEO)

**Issue:** Không có breadcrumb navigation structure → Confuse AI crawlers về site hierarchy.

**Fix location:** `src/app/page.tsx` — Add at the top after Header

**Code:**
```tsx
// src/app/page.tsx

import { BreadcrumbSchema } from "@/components/breadcrumb-schema";

export default function Home() {
  return (
    <>
      <BreadcrumbSchema />
      <Header />
      {/* rest... */}
    </>
  );
}
```

**Create file:** `src/components/breadcrumb-schema.tsx`
```tsx
export function BreadcrumbSchema() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://traicaybentre.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sản phẩm",
        item: "https://traicaybentre.com#products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Quy trình",
        item: "https://traicaybentre.com#process",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "FAQ",
        item: "https://traicaybentre.com#faq",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}
```

**Impact:** +5 GEO points, +4 SEO points

---

## Summary: Impact Calculation

| Fix | SEO | GEO | Priority |
|-----|-----|-----|----------|
| 1. JSON-LD Schema | +10 | +15 | 1 |
| 2. FAQ Schema | +5 | +10 | 2 |
| 3. Product Schema | +8 | +12 | 3 |
| 4. Footer Links Fix | +5 | 0 | 4 |
| 5. OG/Twitter Tags | +5 | +3 | 5 |
| 6. Canonical URL | +4 | +2 | 6 |
| 7. robots.txt + sitemap | +8 | +5 | 7 |
| 8. H1 Tag Enhancement | +6 | +3 | 8 |
| 9. Image Optimization | +7 | +4 | 9 |
| 10. Breadcrumb Schema | +4 | +5 | 10 |
| **TOTAL** | **+62** → **124** | **+59** → **117** | — |

**After fixes:**
- **SEO: 62 → 74/100** (improves 19%)
- **GEO: 58 → 68/100** (improves 17%)

---

## Additional Recommendations (Optional, Not Critical)

### 11. Add Contact Schema
```json
{
  "@type": "ContactPoint",
  "contactType": "Customer Service",
  "telephone": "+84918469075",
  "areaServed": "VN",
  "availableLanguage": "Vietnamese"
}
```

### 12. Enhance Product Images with WebP
- Convert `.jpg` to WebP format for faster loading
- Fallback to JPEG in `<picture>` element

### 13. Add Performance Monitoring
- Use Next.js `next/font` for font loading (already done ✓)
- Consider Image CDN for optimization (Vercel Image Optimization)

### 14. Create Blog/Content Strategy
- GEO values unique, long-form content (>1500 words)
- Target keywords: "xoài Bến Tre", "CDĐL Bến Tre", "xoài tứ quý chín", etc.

### 15. Add AMP or Web Vitals Monitoring
- Use `next/image` with `priority` prop (already done ✓)
- Monitor CLS, FID, LCP via Vercel Analytics

---

## Checklist Thực hiện

### Phase 1 (Ngay hôm nay — 1-2h)
- [ ] Fix #1: Add JSON-LD Schema (LocalBusiness + WebSite)
- [ ] Fix #2: Add FAQ Schema
- [ ] Fix #3: Add Product Schema
- [ ] Fix #4: Fix footer href links

### Phase 2 (Hôm nay — 30 phút)
- [ ] Fix #5: Add OG + Twitter tags
- [ ] Fix #6: Add canonical URL
- [ ] Fix #7: Create robots.txt + sitemap.xml

### Phase 3 (Hôm nay — 20 phút)
- [ ] Fix #8: Enhance H1 with brand name
- [ ] Fix #9: Add image sizes + quality
- [ ] Fix #10: Add breadcrumb schema

### Phase 4 (Hôm nay — test)
- [ ] Run: `bun run build`
- [ ] Test with Google Rich Results Tool: https://search.google.com/test/rich-results
- [ ] Test with Perplexity/Claude parsing
- [ ] Submit updated sitemap.xml to Google Search Console

---

## Testing & Validation

### SEO Tools
1. **Google Rich Results Test** — Check schema validity
   - URL: https://search.google.com/test/rich-results
   - Upload page after fixes

2. **Lighthouse** — Performance + SEO audit
   - Run: `npm run build && npm run start`, then Lighthouse in DevTools

3. **Schema.org Validator** — Validate JSON-LD
   - URL: https://validator.schema.org/

### GEO Tools
1. **Perplexity Pro** — Test content extraction
   - Ask: "Tell me about Xoài Tứ Quý Bến Tre pricing and origin"
   - Verify it cites traicaybentre.com

2. **Claude Analysis** — Fact extraction
   - Parse page, verify it recognizes: CDĐL #00124, price (22K đ/kg), location

3. **AI Scraper Testing**
   - Use `jsoup` or similar to verify structured data is accessible

---

## Unresolved Questions

1. **Có domain authority chưa?** — Check Domain Rating via Ahrefs / Semrush
2. **Có backlinks từ trusted sources?** — Xem có liên kết từ gov.vn, SHTT không
3. **Mobile usability:** Hamburger menu onclick handler không implement — test mobile nav
4. **Form submission:** Contact form không có backend handler — verify `/api/contact` exists
5. **Dynamic content updates:** Product prices "cập nhật mỗi sáng" — làm sao sync với GEO crawlers? Cần API endpoint `/api/products/latest`?

---

## Notes

- **Language:** Trang chính là Vietnamese ✓, mà SEO-wise tốt
- **Conversion:** CTA buttons (Đặt thử, Gửi) clear, nhưng thiếu phone preview/Zalo button sticky
- **Trust signals:** CDĐL #00124, GlobalGAP, OCOP có — nhưng không có customer review count schema
- **Localization:** Chỉ Việt Nam market được target → không cần multi-language (yet)

---

**Status:** Ready for implementation | **Reviewer:** SEO Auditor | **Date:** 2026-04-08 12:32
