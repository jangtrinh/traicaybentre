# Dynamic OG Images — Use Cases

## UC-01: Homepage Share
**Actor:** Any visitor
**Precondition:** User is on homepage (any locale)
**Happy Path:**
1. User copies URL or clicks share button
2. Social platform fetches `/[locale]/opengraph-image`
3. Platform displays branded OG with tagline in correct language
**Edge Cases:**
- Font fails to load → fallback to system font
- Locale invalid → default to Vietnamese

## UC-02: Product Page Share
**Actor:** Wholesale buyer, retail customer
**Precondition:** User is on a product landing page
**Happy Path:**
1. User shares `/en/xoai-tu-quy` on Facebook/Zalo
2. OG image shows: product name, tagline, price range, brand
3. Text is in the page's locale
**Edge Cases:**
- Product slug not found → generic brand OG
- Very long product name → truncate at 2 lines

## UC-03: Article Share
**Actor:** Content reader
**Precondition:** User is on kien-thuc or tin-tuc article
**Happy Path:**
1. User shares article link
2. OG shows: category pill, article title, brand
3. Category and title in page locale
**Edge Cases:**
- Title exceeds 3 lines → truncate with ellipsis
- No category → skip category pill

## UC-04: Shipping Page Share
**Actor:** Wholesale buyer checking delivery
**Precondition:** User on giao-hang/[city] page
**Happy Path:**
1. User shares shipping page for their city
2. OG shows: city name, delivery time, brand
**Edge Cases:**
- City name very long → truncate

## Acceptance Criteria (Gherkin)

```gherkin
# UC-01
Given I am on the English homepage
When Facebook fetches the OG image
Then the image is 1200x630px PNG
And contains "Ben Tre Fruits" in English
And uses mango-gold brand colors

# UC-02
Given I am on /ko/xoai-tu-quy
When Telegram fetches the OG image
Then the product name appears in Korean
And the price range is displayed
And the image is under 300KB

# UC-03
Given I am on /ja/kien-thuc/xoai-tu-quy-la-gi
When Twitter fetches the OG image
Then the title renders in Japanese characters
And a category label is visible
And the brand logo area is present

# UC-04
Given I am on /en/giao-hang/tp-hcm
When any platform fetches the OG image
Then "TP. Hồ Chí Minh" (Vietnamese proper noun) is shown
And delivery time "24h" is displayed
```

## UX Decisions

| Decision | Principle | Rationale |
|----------|-----------|-----------|
| Text-only templates, no product photos | KISS | Photos add fetch complexity, thumbnails too small to see detail anyway |
| Large bold title (48-64px) | Fitts' Law / Visibility | Must be readable at thumbnail size (300×157px on mobile) |
| Brand color gradient background | Recognition | Consistent mango-gold = instant brand ID across platforms |
| Max 2-3 lines title | Miller's Law | Social previews are glanced, not read |
| Locale-specific font loading | Accessibility | CJK characters must render correctly, not as boxes |

## Design System Check

**Existing tokens (from design-system/tokens.json):**
- brand color, brand-cream, text, mango, mango-dark → use in OG gradient
- Plus Jakarta Sans (heading), Nunito (body) → use for VI/EN
- Need: Noto Sans JP/KR fonts for CJK (NEW — download required)

## Appetite Check

| UC | Effort | Value | Ship? |
|----|--------|-------|-------|
| UC-01 Homepage | Low | High | Yes |
| UC-02 Product | Low | High | Yes |
| UC-03 Article | Low | Medium | Yes |
| UC-04 Shipping | Low | Low | Yes (simple variant of template) |
