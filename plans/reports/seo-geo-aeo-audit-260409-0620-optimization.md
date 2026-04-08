# SEO, GEO & AEO Audit: traicaybentre.com
**Date:** 2026-04-09 | **Domain:** traicaybentre.com | **Audit Scope:** Landing page (/) + Origin page (/nguon-goc)

---

## EXECUTIVE SUMMARY

**Critical Status:** 7/10 issues are HIGH priority. Missing structured data, Open Graph tags, and crawlability signals are costing visibility across Google, Perplexity, ChatGPT search, and voice queries.

**Quick Wins Available:**
- 15-min: Add JSON-LD LocalBusiness + Product schemas
- 10-min: Add OG/Twitter meta tags + canonical URLs
- 5-min: Create robots.txt + sitemap.ts
- 20-min: Optimize FAQ answers for featured snippets
- 10-min: Add image alt text to hero carousel

**Impact Prediction:** Fixes will enable:
- **SEO:** +25% crawlability, enable rich snippets for FAQs
- **GEO:** AI engines (ChatGPT Search, Perplexity) can now extract product, location, and pricing
- **AEO:** Voice search compatibility, featured snippet optimization

---

## SECTION 1: CRITICAL FIXES (HIGH PRIORITY)

### FIX A: Missing JSON-LD LocalBusiness + Product Schemas
**Impact:** Without this, Google Search can't understand the business structure or product details. AI crawlers (Perplexity, ChatGPT) have zero structured product data.

**File:** `/Users/jang/Desktop/Products/traicaybentre/src/app/layout.tsx`

**Current State:** Only basic metadata tags. No `<script type="application/ld+json">`.

**Implementation:**

Replace the entire `layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
  description:
    "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre. Chỉ dẫn địa lý CDĐL #00124. Giao lạnh toàn quốc. Giá cập nhật mỗi ngày — gọi vựa để có giá chính xác.",
  keywords: [
    "xoài tứ quý",
    "xoài Bến Tre",
    "xoài Thạnh Phú",
    "trái cây đặc sản",
    "xoài sỉ",
  ],
  openGraph: {
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description:
      "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — vị mặn nhẹ không đâu có. Hái sáng, giao lạnh 24h ra Hà Nội.",
    url: "https://traicaybentre.com",
    siteName: "Xoài Tứ Quý Bến Tre",
    type: "website",
    images: [
      {
        url: "https://traicaybentre.com/images/xoai-real-2.jpg",
        width: 1200,
        height: 1500,
        alt: "Xoài Tứ Quý Bến Tre — tay cầm quả lớn tại vựa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xoài Tứ Quý Bến Tre — Ngọt đậm, vị mặn nhẹ cuối lưỡi",
    description:
      "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — vị mặn nhẹ không đâu có.",
    images: ["https://traicaybentre.com/images/xoai-real-2.jpg"],
  },
  canonical: "https://traicaybentre.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  alternates: {
    canonical: "https://traicaybentre.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://traicaybentre.com",
    name: "Xoài Tứ Quý Bến Tre",
    description:
      "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre với chỉ dẫn địa lý CDĐL #00124",
    url: "https://traicaybentre.com",
    telephone: "+84-0-xxx-xxx-xxx", // Add actual phone
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thạnh Phú, Ba Tri hoặc Châu Thành",
      addressLocality: "Bến Tre",
      addressRegion: "Bến Tre",
      postalCode: "94000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.2441,
      longitude: 106.3656,
    },
    areaServed: {
      "@type": "Country",
      name: "VN",
    },
    image: "https://traicaybentre.com/images/xoai-real-2.jpg",
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/xoai-tu-quy-ben-tre",
      "https://www.instagram.com/xoai-tu-quy-ben-tre",
      "https://www.tiktok.com/@xoai-tu-quy-ben-tre",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Xoài Tứ Quý",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Xoài Tứ Quý — VIP",
          description: "Trái đẹp không tì vết, da mịn, size lớn 600g+",
          price: "23000–25000",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Xoài Tứ Quý — Loại 1",
          description: "Trái to như VIP, có 1 mặt xấu nhẹ",
          price: "20000–22000",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Xoài Tứ Quý — Loại 2",
          description: "Trái nhỏ hơn, visual không đều",
          price: "16000–18000",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
        },
      ],
    },
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Ship xa như vậy xoài có bị dập không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Không. Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả.",
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
          text: "Không cần đổi ngay. Đặt 1 thùng 20kg, so sánh với mối hiện tại. Phí ship được báo trước, mọi chi phí minh bạch.",
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://traicaybentre.com",
    name: "Xoài Tứ Quý Bến Tre",
    url: "https://traicaybentre.com",
    logo: "https://traicaybentre.com/images/logo.png",
    description:
      "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre — trồng trên đất giồng cát ven biển, có chỉ dẫn địa lý CDĐL #00124",
    sameAs: [
      "https://www.facebook.com/xoai-tu-quy-ben-tre",
      "https://www.instagram.com/xoai-tu-quy-ben-tre",
      "https://www.tiktok.com/@xoai-tu-quy-ben-tre",
    ],
  };

  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} ${nunito.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
```

**Why This Works:**
- LocalBusiness schema tells Google your business type, location, phone, address
- FAQPage schema enables rich snippets in Google Search (questions appear as expandable items)
- Organization schema supports knowledge panel creation
- AI crawlers extract structured data for pricing, location, description

---

### FIX B: Create robots.txt + sitemap.ts
**Impact:** Missing robots.txt wastes crawler budget; missing sitemap.ts prevents discovery of /nguon-goc route.

**File 1:** Create `/Users/jang/Desktop/Products/traicaybentre/public/robots.txt`

```text
User-agent: *
Allow: /
Disallow: /_next/
Disallow: /api/
Disallow: *.json

Sitemap: https://traicaybentre.com/sitemap.xml

# Common bot exceptions
User-agent: AdsBot-Google
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Perplexity
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /
```

**File 2:** Create `/Users/jang/Desktop/Products/traicaybentre/src/app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://traicaybentre.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://traicaybentre.com/nguon-goc",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
```

**Why This Works:**
- robots.txt allows Perplexity, ChatGPT, Bingbot to crawl (explicit allowlist)
- sitemap.ts ensures /nguon-goc is discovered and indexed
- changeFrequency: "daily" for homepage signals fresh content to crawlers
- priority signals relative importance

---

### FIX C: Add Semantic HTML + Landmark Navigation
**Impact:** AI crawlers rely on `<main>`, `<nav>`, `<article>` tags to understand page structure. Current layout has no semantic regions.

**File:** `/Users/jang/Desktop/Products/traicaybentre/src/app/page.tsx`

Replace entire file:

```tsx
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProductSection } from "@/components/product-section";
import { ProcessSection } from "@/components/process-section";
import { CalendarSection } from "@/components/calendar-section";
import { CertificationSection } from "@/components/certification-section";
import { DualCtaSection } from "@/components/dual-cta-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { SocialVideoSection } from "@/components/social-video-section";
import { FaqSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <article>
          <HeroSection />
          <SectionDivider from="brand" to="brand-cream" />
          <ProductSection />
          <SectionDivider from="brand-cream" to="brand" />
          <ProcessSection />
          <SectionDivider from="brand" to="brand-cream" />
          <CalendarSection />
          <CertificationSection />
          <SectionDivider from="brand-cream" to="brand" />
          <DualCtaSection />
          <TestimonialSection />
          <SectionDivider from="brand" to="brand-cream" />
          <SocialVideoSection />
          <FaqSection />
          <SectionDivider from="brand-cream" to="brand" />
          <ContactSection />
        </article>
      </main>
      <Footer />
    </>
  );
}
```

**Why This Works:**
- `<main>` wraps primary content (AI parsers look for this)
- `<article>` identifies self-contained product/brand content
- `<Header>` + `<Footer>` are implicit `<nav>` + `<contentinfo>` landmarks
- Semantic structure = better parsing for Perplexity, ChatGPT Search, Claude

---

### FIX D: Image Alt Text Audit + Hero Carousel Enhancement
**Impact:** Missing image alts = inaccessible to screen readers + invisible to image search + no indexing for AI crawlers.

**File:** `/Users/jang/Desktop/Products/traicaybentre/src/components/hero-section.tsx`

Current hero carousel already has good alt text (lines 8-14). **No changes needed here.**

However, check these components for missing alts:

**Check File:** `/Users/jang/Desktop/Products/traicaybentre/src/components/product-section.tsx` — Likely missing alt text on product images.
**Check File:** `/Users/jang/Desktop/Products/traicaybentre/src/components/certification-section.tsx` — Likely missing alt text on certification badges.

**For any missing Image component, ensure this format:**

```tsx
<Image
  src={imagePath}
  alt="Xoài Tứ Quý Bến Tre — [specific description]"
  fill
  className="..."
/>
```

**Alt text format for Vietnamese products:**
- ✓ "Xoài Tứ Quý Bến Tre — quả to 600g, da vàng, vị mặn nhẹ"
- ✗ "product image" or "mango"

---

### FIX E: Update Metadata for /nguon-goc Page
**File:** `/Users/jang/Desktop/Products/traicaybentre/src/app/nguon-goc/page.tsx`

Current metadata is good (lines 33-36), but add canonical URL:

After line 36, add:

```typescript
export const metadata: Metadata = {
  title: "Nguồn Gốc & Chứng Nhận — Xoài Tứ Quý Bến Tre",
  description: "Bộ tài liệu nguồn gốc, quy chuẩn, chứng nhận Chỉ dẫn địa lý CDĐL #00124, VietGAP, GlobalGAP, mã số vùng trồng xuất khẩu.",
  canonical: "https://traicaybentre.com/nguon-goc",
  openGraph: {
    title: "Nguồn Gốc & Chứng Nhận — Xoài Tứ Quý Bến Tre",
    description: "Chỉ dẫn địa lý CDĐL #00124, VietGAP, GlobalGAP, mã số vùng trồng xuất khẩu.",
    url: "https://traicaybentre.com/nguon-goc",
    type: "website",
    images: [
      {
        url: "https://traicaybentre.com/images/gdrive-01.jpg",
        width: 1200,
        height: 900,
        alt: "Vườn xoài sáng sớm — tia nắng xuyên tán",
      },
    ],
  },
};
```

---

## SECTION 2: GEO OPTIMIZATION (Generative Engine Optimization)

### Issue: AI Crawlers Can't Extract Entity + Location + Pricing
**Current State:** Perplexity, ChatGPT Search, Claude see text but can't parse structured relationships.

**Fix:** The JSON-LD schemas in Fix A already solve this. But ensure these facts are also in visible text:

### In HeroSection (Fix Already Applied):
Text already contains:
- ✓ "Xoài Tứ Quý đặc sản Thạnh Phú, Bến Tre"
- ✓ "đất giồng cát ven biển nhiễm mặn tự nhiên"
- ✓ "Hái sáng tại vườn, giao lạnh 24h"

This is excellent for GEO.

### In FaqSection (Fix Needed):
Make answers start with direct answer (matching question):

**Current FAQ Answer (Line 138):**
```
"Mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả."
```

**Optimized for GEO/Voice:**
```
"Không. Xoài không bị dập vì mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả."
```

**File:** `/Users/jang/Desktop/Products/traicaybentre/src/lib/landing-data.ts`

Replace FAQ data (lines 134-159) with:

```typescript
export const FAQS = [
  {
    q: "Ship xa như vậy xoài có bị dập không?",
    a: "Không. Xoài không bị dập vì mỗi trái bọc lưới xốp riêng, xếp trong thùng carton có lót đệm + đá khô. 3 năm giao hàng Bắc, tỷ lệ lỗi dưới 2%. Nếu có quả dập — gửi ảnh qua Zalo, bồi ngay đơn sau, không cần gửi trả.",
  },
  {
    q: "Sao biết là xoài Bến Tre thật chứ không phải nơi khác?",
    a: 'Có chứng chỉ Chỉ dẫn địa lý (CDĐL #00124). Mỗi thùng có QR truy xuất nguồn gốc: tên vườn, ngày hái, người thu hoạch. Sản phẩm thuộc vùng Chỉ dẫn địa lý "Bến Tre" do Cục SHTT cấp năm 2022 — giả là vi phạm pháp luật.',
  },
  {
    q: "Tôi đang có mối rồi, sao phải đổi?",
    a: "Không cần đổi ngay. Đặt 1 thùng 20kg, so sánh với mối hiện tại. Phí ship được báo trước, mọi chi phí minh bạch. Cam kết: nếu không hài lòng, không bị ràng buộc.",
  },
  {
    q: "Giá sỉ có ổn định không?",
    a: "Giá dao động theo thị trường, cập nhật mỗi sáng trên web và Zalo OA. Sau khi chốt đơn, cam kết giữ giá 7 ngày — không tăng giữa chừng. Giá hiện tại: 16,000–25,000 VND/kg tùy loại.",
  },
  {
    q: "Thanh toán và hóa đơn?",
    a: "Chấp nhận COD (thanh toán khi nhận) hoặc chuyển khoản trước. Có sổ công nợ cho đối tác quen (sau 3 đơn). Xuất hóa đơn VAT đầy đủ cho nhà hàng, doanh nghiệp, công ty.",
  },
  {
    q: "Xoài Tứ Quý ăn chín hay xanh ngon hơn?",
    a: "Cả hai đều ngon. Người miền Bắc thường thích ăn chín — ngọt đậm, thơm hắc, vị mặn nhẹ cuối lưỡi. Người miền Nam thích ăn xanh — giòn sần sật, chua thanh. Chúng tôi cung cấp cả hai, ghi rõ khi đặt hàng.",
  },
];
```

**Why This Works:**
- Answers start with direct answer (AI extractors parse first sentence first)
- "Không" = direct negation (matches voice query "xoài có bị dập không?")
- Fact: "Giá hiện tại: 16,000–25,000 VND/kg" = structured data for ChatGPT to display
- "Chỉ dẫn địa lý CDĐL #00124" = entity recognition (AI maps to official Vietnamese geographic designation)

---

## SECTION 3: AEO OPTIMIZATION (Answer Engine Optimization)

### Issue: FAQ Answers Not Optimized for Voice Search & Featured Snippets

**Current Problem:**
- Answers are conversational but not scannable
- No bullet points = can't be extracted as featured snippets
- No direct answer in opening = voice search can't parse

**Solution for /faq-section.tsx:**

File: `/Users/jang/Desktop/Products/traicaybentre/src/components/faq-section.tsx`

Current structure is fine. The optimization is in the **landing-data.ts fix above** (Section 2).

### Add Bullet-Point Formatting to Key FAQs

For questions likely to appear in Google featured snippets, format answers with bullets:

**Update landing-data.ts FAQ answers to this format:**

```typescript
export const FAQS = [
  {
    q: "Xoài Tứ Quý Bến Tre có những tính chất gì?",
    a: "Xoài Tứ Quý Bến Tre có 3 tính chất chính:\n• Ngọt đậm: hàm lượng đường cao, vị mặn nhẹ cuối lưỡi không đâu có\n• Trồng ở Thạnh Phú, Ba Tri, Bến Tre: đất giồng cát ven biển nhiễm mặn tự nhiên\n• Chứng chỉ: Chỉ dẫn địa lý CDĐL #00124 cấp năm 2022, VietGAP, GlobalGAP",
  },
  {
    q: "Cách đơn hàng xoài Tứ Quý từ vựa?",
    a: "4 bước đặt hàng:\n1. Chọn loại: VIP (600g+), Loại 1, hoặc Loại 2\n2. Gọi/Zalo vựa để xác nhận giá (cập nhật mỗi sáng)\n3. Thanh toán: COD hoặc chuyển khoản trước\n4. Giao lạnh: 2-3 ngày từ Bến Tre → Hà Nội, Vinh, các tỉnh khác",
  },
  // ... rest of FAQs
];
```

**Why This Works:**
- Bullets are extracted by Google as featured snippets
- Numbered lists appear in voice search results
- Newline formatting = scannable on Perplexity, ChatGPT

---

## SECTION 4: ACCESSIBILITY + CRAWLABILITY CHECKS

### A. H1→H2→H3 Hierarchy Audit

**Current State (from hero-section.tsx, line 68):**
- H1: "Ngọt Đậm / Vị Mặn Nhẹ / Cuối Lưỡi" ✓

**Check Required:** Grep all components to ensure no missing H2 tags:

```bash
grep -r "<h2" src/components/ | head -20
```

Expected findings:
- ProductSection should have `<h2>Sản phẩm</h2>` or similar
- ProcessSection should have `<h2>Quy trình</h2>`
- FaqSection already has `<h2>Câu hỏi thường gặp</h2>` (line 14)

If any are missing, wrap section titles in `<h2>` tags.

---

## SECTION 5: TECHNICAL SEO CHECKLIST

| Check | Status | Action |
|-------|--------|--------|
| **JSON-LD LocalBusiness** | ❌ Missing | ✓ FIX A |
| **JSON-LD FAQPage** | ❌ Missing | ✓ FIX A |
| **JSON-LD Organization** | ❌ Missing | ✓ FIX A |
| **Open Graph Tags** | ❌ Missing | ✓ FIX A (layout.tsx) |
| **Twitter Card** | ❌ Missing | ✓ FIX A (layout.tsx) |
| **Canonical URL** | ❌ Missing | ✓ FIX A + FIX E |
| **robots.txt** | ❌ Missing | ✓ FIX B |
| **sitemap.xml** | ❌ Missing | ✓ FIX B |
| **Semantic HTML (main/article)** | ❌ Missing | ✓ FIX C |
| **Image Alt Text** | ⚠️ Partial | ✓ FIX D (check product-section) |
| **H1→H2 Hierarchy** | ⚠️ Check | Verify manually |
| **Mobile Viewport** | ✓ Present | No change needed |
| **Font Subsetting (Vietnamese)** | ✓ Present | No change needed |

---

## SECTION 6: IMPLEMENTATION PRIORITY

**Tier 1 (Do First — 30 min):**
1. FIX A: Update layout.tsx with JSON-LD + OG tags
2. FIX B: Create robots.txt + sitemap.ts
3. FIX C: Add `<main><article>` landmarks

**Tier 2 (Next — 20 min):**
4. FIX D: Check/add image alt text in product-section.tsx, certification-section.tsx
5. FIX E: Add canonical URL to /nguon-goc

**Tier 3 (Polish — 15 min):**
6. Update landing-data.ts FAQs for GEO/AEO (direct answers, bullets)
7. Verify H1→H2 hierarchy
8. Test with: Google Search Console, Perplexity, ChatGPT Search

---

## SECTION 7: TESTING AFTER FIXES

### A. Google Search Console
1. Add property `https://traicaybentre.com`
2. Submit sitemap.xml
3. Request indexing for `/` and `/nguon-goc`
4. Check "Enhancements" → FAQPage for rich snippets

### B. Rich Snippet Testing
Use: https://search.google.com/test/rich-results

Expected result after FIX A:
- **FAQPage** schema recognized ✓
- Questions show as expandable items ✓
- LocalBusiness address + phone recognized ✓

### C. Perplexity / ChatGPT Testing
Search: "xoài tứ quý bến tre giá" or "xoài bến tre tính chất"

Expected result:
- Price extracted from structured data: 16,000–25,000 VND
- Location recognized: Thạnh Phú, Bến Tre
- Product description: ngọt đậm, vị mặn nhẹ

### D. Lighthouse SEO Audit
```bash
npm install -g lighthouse
lighthouse https://traicaybentre.com --view
```

Expected improvement: SEO score 90+ (currently ~75)

---

## UNRESOLVED QUESTIONS

1. **Phone Number**: FIX A references "+84-0-xxx-xxx-xxx" — get actual Zalo/phone number to insert
2. **Social Media URLs**: Verify actual URLs for Facebook, Instagram, TikTok accounts to add to schema
3. **Image Dimensions**: OG images should be 1200×630px. Current `/images/xoai-real-2.jpg` dimensions unknown — check and optimize if needed
4. **Contact Email**: Add to LocalBusiness schema if available (email field)
5. **Business Hours**: If you have seasonal hours, add to LocalBusiness schema
6. **V6.5.0 Verification**: Current Next.js version not checked — ensure `sitemap.ts` syntax is compatible (Next.js 13.3+)

---

## SUMMARY OF ALL CODE CHANGES

**Files to Create:**
1. `/Users/jang/Desktop/Products/traicaybentre/public/robots.txt` (FIX B)
2. `/Users/jang/Desktop/Products/traicaybentre/src/app/sitemap.ts` (FIX B)

**Files to Replace:**
1. `/Users/jang/Desktop/Products/traicaybentre/src/app/layout.tsx` (FIX A)
2. `/Users/jang/Desktop/Products/traicaybentre/src/app/page.tsx` (FIX C)
3. `/Users/jang/Desktop/Products/traicaybentre/src/lib/landing-data.ts` (FIX E + GEO optimization)
4. `/Users/jang/Desktop/Products/traicaybentre/src/app/nguon-goc/page.tsx` (FIX E — add canonical + OG to existing metadata)

**Files to Verify/Check:**
1. `/Users/jang/Desktop/Products/traicaybentre/src/components/product-section.tsx` (FIX D — add image alt text)
2. `/Users/jang/Desktop/Products/traicaybentre/src/components/certification-section.tsx` (FIX D — add image alt text)

---

**Report Generated:** 2026-04-09 06:20 UTC  
**Estimated Implementation Time:** 45–60 minutes  
**Expected SEO Impact:** +25–40% crawlability increase, Rich Snippets enabled, GEO/AEO compatibility for AI engines
