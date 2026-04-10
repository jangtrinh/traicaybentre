# Phase 06 — Google Ads Launch + Monitor

**Status:** pending | **Effort:** 7d | **Blocks:** P07 | **Blocked by:** P05

## Goal

Parallel paid search campaign covering 10 long-tail keywords. CPC target 2k-4k VND, daily cap conservative, conversion tracking to Zalo + phone.

## Campaign structure

**Campaign name:** TCBT — Long-tail Sprint 30d
**Type:** Search Network only (no Display)
**Location:** Vietnam (all regions) + bid adjustment +20% cho HN, HCM
**Language:** Vietnamese
**Daily budget:** 100k-200k VND (confirm với user)
**Bid strategy:** Maximize clicks (start) → Target CPA (after week 2 with data)

## Ad groups (1 per keyword = 10 ad groups)

| # | Ad group | Match type | Landing page | Max CPC |
|---|---|---|---|---|
| 1 | xoai-1-kg-bao-nhieu-trai | Phrase | `/xoai-tu-quy/kien-thuc/xoai-tu-quy-1-kg-bao-nhieu-trai` | 3k |
| 2 | cach-bao-quan-xoai-ben-tre | Phrase | `/kien-thuc/cach-bao-quan-lam-chin-xoai-tu-quy` | 2k |
| 3 | an-song-hay-chin | Phrase | `/xoai-tu-quy/kien-thuc/an-song-hay-chin` | 2k |
| 4 | mua-xoai-chinh-goc-ha-noi | Phrase + Exact | `/giao-hang/ha-noi` | 4k |
| 5 | dua-xiem-ben-tre-vs-mien-tay | Phrase | `/dua-xiem-ben-tre/kien-thuc/dua-xiem-ben-tre-vs-dua-xiem-mien-tay` | 3k |
| 6 | dat-dua-xiem-online-ship | Phrase + Exact | `/dua-xiem-ben-tre` | 4k |
| 7 | xoai-thanh-phu-loai-1-gia | Phrase | `/xoai-tu-quy/kien-thuc/xoai-tu-quy-thanh-phu-loai-1-gia-bao-nhieu` | 3k |
| 8 | qua-bieu-ben-tre | Phrase + Exact | `/qua-bieu-trai-cay-ben-tre` | 4k |
| 9 | vua-xoai-gia-si | Phrase + Exact | `/vua-xoai-ben-tre-gia-si` | 4k |
| 10 | xoai-ben-tre-dac-biet | Phrase | `/xoai-tu-quy/kien-thuc/xoai-ben-tre-co-gi-dac-biet` | 2k |

## Ad copy template (responsive search ads)

**Headlines (13-15 per ad group):**
1. Exact keyword phrase
2. "CDĐL #00124 Bến Tre" / "Dừa sọ Bến Tre gọt sẵn"
3. "Trực tiếp từ vựa Thạnh Phú"
4. "Giao lạnh 24h TP.HCM, 48h Hà Nội"
5. "Zalo 0932 585 533"
6. Price signal (VIP từ 23k/kg)
7. Trust signal (3+ năm, X khách)
... up to 15

**Descriptions (4 per ad group):**
1. Cover exact keyword + USP + CTA
2. Benefits (giao nhanh, cân dư 2%, hàng hư bồi)
3. Trust (CDĐL, nhà vườn trực tiếp)
4. CTA (Zalo / gọi / đặt ngay)

## Negative keywords (campaign-level)

- giống, cây giống, cây con, ươm (nursery intent)
- recipe, công thức nấu (cooking intent only, not buy intent)
- wiki, wikipedia (reference intent)
- giá rẻ, giảm giá, khuyến mãi (price-shopper, low LTV)

Add to negative keyword list after week 1 based on Search Terms report.

## Conversion tracking

1. **Zalo click**: event on CTA click → Google Tag Manager → GA4 event `zalo_click` → GA4 goal
2. **Phone call**: `tel:` click tracking via gtag.js `phone_call` event
3. **Form submit** (landing #8, #9): form submit → GA4 event `lead_submit`
4. **Scroll depth** (soft conversion): 75% page scroll → `engaged_scroll`

## Weekly monitoring

### Week 1 (launch)
- Daily: check spend vs budget, CTR, search terms
- Add negative keywords from irrelevant searches
- Pause ad groups with CTR < 3% after 50 impressions

### Week 2 (optimize)
- Review Quality Score per ad group — rewrite ads if QS < 6
- Bid adjustment: increase +20% on high-converting ad groups
- A/B test headlines: swap low performers

### Week 3 (scale)
- Switch to Target CPA bidding on top 3 ad groups
- Increase budget +50% on winners
- Add location bid adjustments (HN +30% if converting)

### Week 4 (decision)
- Evaluate: which keywords profitable? (Cost/conversion < order value)
- Keep winners running
- Pause losers, reallocate to winners
- Report to user

## Files to Create

- `docs/seo/google-ads-campaign-config.md` — full campaign config for reference
- `docs/seo/conversion-tracking-setup.md` — GTM/GA4 setup instructions

## Todo

- [ ] Confirm daily budget với user
- [ ] Setup GA4 conversion events
- [ ] Setup GTM tags (Zalo click, phone call)
- [ ] Create Google Ads account (if not exist) + link GA4
- [ ] Build 10 ad groups per spec
- [ ] Write ad copy (13 headlines + 4 descriptions × 10)
- [ ] Add negative keywords list
- [ ] Launch campaign
- [ ] Daily monitor week 1
- [ ] Weekly optimization reviews
- [ ] Week 4 decision report

## Success Criteria

- 10 ad groups live với Quality Score ≥6
- CTR ≥3% per ad group by week 2
- ≥20 conversions (Zalo clicks + phone calls) by week 4
- Cost per conversion < 40k VND (assuming 400k average order margin)
- No invalid click spikes

## Risks

| Risk | Mitigation |
|---|---|
| Quality Score < 6 → high CPC | Tight keyword-landing match, exact phrase in H1 |
| Budget overspend | Daily cap + manual review week 1 |
| Click fraud | Google's invalid click filter + IP exclusion if pattern |
| Conversion tracking misfire | Test with GTM preview before launch |

## Next

→ P07: Verify + GSC 30-day tracking (parallel throughout sprint)
