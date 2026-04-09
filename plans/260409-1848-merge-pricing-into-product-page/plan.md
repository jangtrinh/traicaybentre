# Plan — Merge /gia-xoai-hom-nay vào /xoai-tu-quy

**Date:** 2026-04-09
**Domain:** Complicated
**Appetite:** ~1.5 hours

## Goal

1. Gộp 2 trang `/gia-xoai-hom-nay` + `/xoai-tu-quy` → còn 1 trang canonical `/xoai-tu-quy`.
2. Trang mới có entry points dẫn tới 3 trang shipping `/giao-hang/{tp-hcm,ha-noi,da-nang}`.
3. Không mất SEO juice: 301 redirect + preserve nav label "Giá hôm nay".

## Canonical Decision

**Chọn `/xoai-tu-quy` làm canonical** vì:
- Content đã rộng hơn (hero, selling points, bảng giá, shipping, internal links)
- Keyword mạnh hơn (`mua xoài tứ quý`, `xoài tứ quý bến tre`)
- URL mô tả sản phẩm, không phải trạng thái thời gian

`/gia-xoai-hom-nay` còn giá trị là **deep link** vào section giá → giữ intent qua anchor `#gia`.

## Content Merge

| Section | Nguồn | Điểm |
|---|---|---|
| Hero | xoai-tu-quy (nguyên) | Thêm "Cập nhật giá: {ngày}" badge nhỏ dưới h1 |
| Selling points | xoai-tu-quy (nguyên) | — |
| Bảng giá | xoai-tu-quy (3 cards) | Thêm `id="gia"` + `scroll-mt-28` để anchor link không bị header che |
| **Thông tin đặt hàng (MỚI)** | gia-xoai-hom-nay | MOQ, thanh toán, giờ hoạt động |
| Vận chuyển | xoai-tu-quy | **Convert 3 cards → `<Link>` clickable + arrow icon**, thêm `id="giao-hang"` |
| Internal links | cả 2 | Remove link tự tham chiếu |

## Metadata Merge

```ts
title: "Mua Xoài Tứ Quý Bến Tre — Giá Hôm Nay, Giao Toàn Quốc | CDĐL #00124"
description: "Xoài Tứ Quý Thạnh Phú trực tiếp từ vựa. VIP 23k/kg, Loại 1 20k/kg — cập nhật mỗi sáng. CDĐL #00124. Giao lạnh 24h TP.HCM, 48h Hà Nội."
keywords: [...gộp cả 2 page, dedupe]
```

## SEO — 301 Redirect

`next.config.ts`:
```ts
async redirects() {
  return [
    {
      source: "/gia-xoai-hom-nay",
      destination: "/xoai-tu-quy#gia",
      permanent: true,
    },
  ];
}
```

## Internal Link Rewrite

Tất cả `href="/gia-xoai-hom-nay"` → `href="/xoai-tu-quy#gia"` trong ~20 files:
- `src/components/header.tsx` (nav "Giá hôm nay")
- `src/components/footer.tsx`
- `src/components/article-layout.tsx`
- `src/app/tin-tuc/*/page.tsx`, `src/app/kien-thuc/*/page.tsx`, `src/app/giao-hang/*/page.tsx`
- (xóa link từ page `/gia-xoai-hom-nay` vì page bị xoá)

Header nav label vẫn là **"Giá hôm nay"** — user không thấy thay đổi UX, chỉ URL thay.

## Phases

| # | Phase | File |
|---|---|---|
| 01 | Update `/xoai-tu-quy/page.tsx` (merge content + shipping Link) | [phase-01](./phase-01-merge-page-content.md) |
| 02 | Delete old page + redirect + sitemap | [phase-02](./phase-02-redirect-and-cleanup.md) |
| 03 | Rewrite internal links | [phase-03](./phase-03-rewrite-internal-links.md) |
| 04 | Verify | [phase-04](./phase-04-verify.md) |

## Success Criteria

- `/gia-xoai-hom-nay` redirect 301 → `/xoai-tu-quy#gia`
- `/xoai-tu-quy` chứa toàn bộ thông tin của cả 2 page cũ
- Click 3 cards vận chuyển → chuyển đến `/giao-hang/{slug}` tương ứng
- Không có link gãy trong codebase (`grep gia-xoai-hom-nay` chỉ còn trong redirect config)
- `tsc --noEmit` + `lint` pass
