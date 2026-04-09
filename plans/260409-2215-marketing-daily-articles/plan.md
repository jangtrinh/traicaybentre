---
title: "Marketing Daily Articles — 90 bài/30 ngày (3 slot × AI + Automation)"
description: "Content calendar 3 bài/ngày auto-publish, AI-drafted, price-crawler powered, holiday-aware runway"
status: blocked
priority: P2
effort: 30d (auto cadence after setup)
branch: main
tags: [marketing, content, seo, aeo, geo, blog, automation, ai]
created: 2026-04-09
updated: 2026-04-09
blockedBy: [260409-2243-information-architecture-multi-product-scale]
---

> **BLOCKED:** URL pattern cho 90 bài mới (`/kien-thuc/{slug}` → `/xoai-tu-quy/kien-thuc/{slug}`) và content source (Supabase schema) được định nghĩa trong plan IA multi-product. Chờ IA plan hoàn thành Phase 04 (Supabase Article Schema) + Phase 05 (Scoped Article Routes). `content-calendar-90-articles.md` cần update paths sau khi IA plan chốt schema.

# Marketing Daily Articles — Content Calendar 90 bài / 30 ngày

**Goal:** 3 bài/ngày × 30 ngày = **90 bài**, phủ keyword gaps + GEO (HN/HCM/ĐN/CT/HP/NT) + AEO (ChatGPT/Perplexity/AI Overviews) + holiday runway.
**Cadence:** Auto-publish 3 slot/ngày — **Slot A 07:00, Slot B 12:15, Slot C 20:00** (giờ Asia/Saigon) qua Vercel Cron + Supabase.
**Content pipeline:** AI draft (6 prompt templates) → **UX Writing Review (AI pass 2 + spot-check)** → Human edit → Supabase `status='ready'` → Cron publish → `revalidateTag` → GSC/Bing index.
**Price feed:** Auto-crawl giá 05:30 daily → `<PriceTickerFooter />` + page `/gia-xoai-hom-nay`.
**Depends on:** Blog infra từ phase-05 (đã ✅), Product/FAQ/Speakable schema từ phase-01 (đã ✅).

---

## 1. Slot Strategy (3 bài/ngày)

| Slot | Giờ VN | Intent | Pillar ưu tiên |
|---|---|---|---|
| **A — 07:00** | Morning | News/giá thị trường (commute, đọc báo sáng) | P1 (giá), P6 (mùa vụ/lễ) |
| **B — 12:15** | Noon | How-to/mẹo ngắn (nghỉ trưa scroll nhanh) | P4 (chọn/bảo quản/chế biến) |
| **C — 20:00** | Evening | Longform/so sánh/heritage (relax đọc sâu) | P2 (so sánh), P5 (heritage), P3 (GEO longform) |

---

## 2. Pillar Allocation (90 bài)

| Pillar | Số bài | % | Mục tiêu |
|---|---|---|---|
| P1 — Giá & Thị trường | 18 | 20% | Transactional, Slot A, auto-refresh từ price crawler |
| P2 — So sánh giống xoài | 14 | 16% | Commercial, Slot C |
| P3 — GEO (giao hàng theo vùng) | 14 | 16% | Informational GEO → commercial landing funnel |
| P4 — Kỹ thuật (chọn/bảo quản/thưởng thức) | 18 | 20% | HowTo, Slot B |
| P5 — Heritage Bến Tre (E-E-A-T) | 12 | 13% | Authority, Slot C |
| P6 — Mùa vụ & Lễ hội VN | 14 | 16% | Seasonal runway, publish-ahead 3–4 tuần |
| **Total** | **90** | 100% | |

Chi tiết: `content-calendar-90-articles.md` (bảng 90 bài × Slot + pillar + scheduled_for).

---

## 3. Architecture Overview

```
┌─────────────┐   AI pillar     ┌─────────────┐  UX pass 2  ┌─────────────┐   Editor    ┌─────────────┐
│ ai-writing- │ ──────────────> │  Raw Draft  │ ──────────> │ Việt-hoá    │ ──────────> │ Supabase    │
│ prompts.md  │                 │  (MDX)      │  +12-item   │  Draft      │  review +   │ articles    │
│  (6 pillars │                 │             │  UX check   │  (mình/bạn, │  hallucin.  │ status=ready│
│   + UX pass)│                 │             │             │   empathy)  │  check      │ (UX gate)   │
└─────────────┘                 └─────────────┘             └─────────────┘             └──────┬──────┘
┌─────────────┐   Playwright                                        │
│ Price sources│──> crawl ──> price_history ──┐                    │
│ (rauhoaqua,  │                              │                    │
│  bachhoaxanh)│                              ▼                    ▼
└─────────────┘                     ┌──────────────────┐  ┌──────────────────┐
                                    │ <PriceTickerFooter/>│  │ Vercel Cron × 3  │
                                    │ /gia-xoai-hom-nay │  │ slot A/B/C       │
                                    └──────────────────┘  └──────┬───────────┘
                                                                  │
                                                                  ▼
                                              revalidateTag('articles') → ISR live
                                                                  │
                                                                  ▼
                                            GSC ping + Sitemap + Social share
```

---

## 4. Files in Plan

| File | Purpose |
|---|---|
| `plan.md` | Overview (this file) |
| `content-calendar-90-articles.md` | 90 bài × 3 slot, pillar, keyword, CTA |
| `content-calendar-30-days.md` | **(legacy 30-bài seed — giữ làm reference history)** |
| `topic-clusters.md` | Pillar → cluster mapping + hub-and-spoke conflict resolution |
| `aeo-geo-seo-playbook.md` | Pre-publish checklist (SEO/GEO/AEO/editorial) + AI hallucination guard |
| `daily-publishing-workflow.md` | AI draft → edit → queue → cron publish workflow |
| `publishing-automation-spec.md` | **NEW** — Supabase schema, cron config, route code, rollback |
| `price-crawler-spec.md` | **NEW** — Playwright crawler, compliance, display layer |
| `ai-writing-prompts.md` | **NEW** — 6 pillar prompt templates + hallucination guardrails |
| `vietnamese-holiday-content-calendar.md` | **NEW** — Holiday runway 2026–2027 + rằm template + Tết cluster |

---

## 5. Phase / Milestone

| Phase | Duration | Deliverable | Status |
|---|---|---|---|
| P0 — Infra setup | 3 days | Supabase schema, cron endpoints, env vars, auth guard | pending |
| P1 — Price crawler MVP | 2 days | 2 sources live, `<PriceTickerFooter />` component, disclaimer | pending |
| P2 — AI pipeline | 2 days | 6 pillar prompts + UX Writing Review prompt validated, editor workflow documented | pending |
| P3 — Seed 90 bài | 10 days | AI-draft + edit + queue toàn bộ 90 bài vào Supabase | pending |
| P4 — Go live | 1 day | Dry-run cron, verify 3 slot × 1 day, monitor Sentry | pending |
| P5 — Automation observe | 14 days | 3 bài/ngày auto, weekly review, tune prompts | pending |
| P6 — Holiday runway kick-off | ongoing | Queue Tết Đoan Ngọ → Vu Lan → Trung Thu → Tết 2027 | pending |

---

## 6. Key Decisions Log

1. **Content creator = AI draft + UX pass 2 + human edit** — 6 pillar prompts chuẩn hoá, UX Writing Review prompt Việt hoá tone (mình/bạn, empathy, microcopy thân mật), editor gate trước `status='ready'`. UX pass = MANDATORY gate, +~10-15p/bài × 90 bài = ~18-22h editor budget cộng thêm
2. **Ảnh = internet royalty-free** — Unsplash/Pexels filter reuse, fallback ảnh repo root (`Xoai-2.jpg`..`Xoai-7.jpg`, `Loai 1.png`, `Loai 2.png`, `Banghieu.png`, `Khaitruong.png`, `VIP.png`, `Logo.png`)
3. **Auto-publish 3 bài/ngày** — Vercel Cron × 3 endpoints (chung 1 route, slot param) + Supabase queue + ISR revalidateTag
4. **Price crawler** — Playwright 05:30 daily, 2 source MVP, disclaimer "gọi vựa" bắt buộc
5. **GEO conflict KEEP BOTH** — `/giao-hang/{city}` (commercial) + `/tin-tuc/xoai-tu-quy-giao-{city}` (informational), funnel link
6. **Holiday runway** — đón đầu mọi lễ VN 2026–2027, publish-ahead 3–4 tuần, evergreen reuse

---

## 7. Success Criteria

- [ ] 90 bài published (100% qua cron, 0% manual publish sau go-live)
- [ ] 100% bài pass UX Writing Checklist 12-item (section 3d) trước khi `status='ready'`
- [ ] 0 duplicate slug, 0 404 internal link
- [ ] Price crawler uptime ≥ 95% (stale fallback OK)
- [ ] AEO: ít nhất 10 bài xuất hiện trong Google AI Overview/Perplexity cited response trong 60 ngày
- [ ] GSC: ≥ 5,000 impressions/month sau ngày 30
- [ ] Holiday: mỗi lễ P1 (Tết Đoan Ngọ, Vu Lan, Trung Thu, Tết 2027) đã index ≥ 14 ngày trước event

---

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| AI hallucinate số liệu | High | High | `context_facts` strict + `[CẦN VERIFY]` marker + editor gate |
| Price source đổi DOM/block | Medium | Medium | Fallback `is_stale=true`, multi-source |
| Cron empty queue (editor trễ draft) | Medium | Medium | Skip + Sentry + Zalo alert, buffer draft ≥ 7 bài |
| Google penalty AI content mass | Low | High | E-E-A-T signals, human edit gate, unique data từ HTX |
| Duplicate commercial vs informational GEO | Low | Low | Hub-and-spoke funnel — mitigated (see `topic-clusters.md`) |
| Vercel cron DST drift | Very Low | Low | VN không DST, monitor 1 tuần đầu |
| Tone AI khô, "dịch máy", không gần gũi người Việt | High | Medium | UX Writing Review prompt (AI pass 2) + 12-item UX checklist + editor read-aloud spot-check, gate trước `status='ready'` |
| UX pass làm lệch số liệu / schema | Low | High | Prompt constraint "KHÔNG đụng số liệu/schema/link", editor cross-check với raw draft (lưu `draft_body_raw` column) |
