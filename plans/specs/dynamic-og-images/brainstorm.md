# Dynamic OG Images — Brainstorm

## Press Release

**TraiCayBenTre launches branded social sharing images for 4 languages**

When customers share a product page on Facebook, Zalo, or Telegram, they now see a professionally designed preview card — featuring the actual product photo, name, price range, and the TraiCayBenTre brand. No more generic link previews. Each of the 70+ pages generates a unique, locale-aware OG image that matches the website's warm mango-gold design system. Korean and Japanese customers see native text. The result: higher click-through rates on shared links and stronger brand recognition across social platforms.

## User Stories

1. **As a wholesale buyer**, I want shared product links to show the product photo and price, so that my partners can see what I'm recommending before clicking.
2. **As the farm owner (Anh Phúc)**, I want shared links on Zalo/Facebook to look professional, so that the brand appears trustworthy to new customers.
3. **As a Korean/Japanese visitor**, I want the OG preview in my language, so that shared links are understandable to my contacts.
4. **As an SEO manager**, I want each page to have a unique OG image with relevant content, so that social shares drive more traffic.

## MoSCoW

| Priority | Item | Rationale |
|----------|------|-----------|
| **Must (P0)** | Homepage OG template (4 locales) | Default share — most shared URL |
| **Must (P0)** | Product landing OG (3 products × 4 locales) | Product shares drive sales |
| **Must (P0)** | Article OG template (kien-thuc + tin-tuc) | Content sharing is key growth channel |
| **Should (P1)** | Shipping page OG (city-specific) | Lower share frequency |
| **Should (P1)** | Font loading for KO/JA | CJK rendering correctness |
| **Could (P2)** | Product catalog page OG | Rarely shared directly |
| **Won't** | Per-article unique hero image in OG | Too complex, reuse template with title |
| **Won't** | A/B testing framework for OG | Premature — ship baseline first |
| **Won't** | Animated/video OG previews | Not supported by platforms |

## Appetite & No-Gos

- **Time budget:** 1-2 days (leverage research + simple templates)
- **No-Gos:**
  1. No Puppeteer/Chromium — Satori only (keeps bundle <500KB)
  2. No external OG services (Cloudinary etc.) — keep it native Next.js
  3. No product photo composition in OG — use solid color templates with text only (simpler, faster, more reliable than fetching/embedding images)
  4. No custom font subsetting — use Google Fonts fetch for VI/EN, Noto Sans for KO/JA

## Research Protocol

| Step | Finding |
|------|---------|
| **Benchmark** | Vercel blog, GitHub, dev.to — all use Satori-based dynamic OG. Clean, text-focused designs outperform photo-heavy ones |
| **First Principles** | ROOT problem: shared links look like generic URLs, no brand presence = low CTR |
| **Framework** | Next.js `opengraph-image.tsx` file convention — auto-discovered, ISR-cached, zero config |
| **Cross-Domain** | Magazine covers: strong typography + color blocking + minimal elements = instant recognition at thumbnail size |
| **Trade-offs** | Text-only templates (no product photos) = simpler, faster, more reliable. Photos in OG add complexity (fetch, resize, layout) for marginal benefit at thumbnail scale |
| **Executability** | 4 templates × inline JSX, 1 font loader utility, ISR caching. Ship in 1 day |
