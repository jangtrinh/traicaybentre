# Daily Publishing Workflow — AI Draft → Editor → Auto-publish

**Mục tiêu (updated 2026-04-09):** Publish **3 bài/ngày** × 30 ngày = 90 bài, tự động qua cron (Slot A 07:00, B 12:15, C 20:00 giờ VN).
**Workflow mới:** AI draft → human edit → Supabase `status='ready'` → Vercel Cron auto-publish → `revalidateTag` → index.
**Nguyên tắc:** Editor batch 7 bài/tuần (buffer), không viết ngày nào publish ngày đó. Cron skip nếu queue rỗng (fail-safe, không publish bài kém chất lượng).

> Stack/schema/route chi tiết xem `publishing-automation-spec.md`. Prompt templates xem `ai-writing-prompts.md`.

---

## 1. Daily Timeline — AI Pipeline

| Thời gian | Actor | Hoạt động | Thời lượng |
|---|---|---|---|
| Weekly Mon 09:00 | Editor | Batch plan 21 bài tuần (3 × 7) từ content-calendar-90 | 60p |
| Daily AM | AI | Generate drafts theo pillar prompt (Claude/GPT) | 5p/bài |
| Daily AM+ | AI pass 2 | **UX Writing Review prompt** — Việt hoá tone, bỏ sáo rỗng, thêm empathy | 3p/bài |
| Daily 10:00–12:00 | Editor | Review AI draft + UX pass: verify số liệu, fix `[CẦN VERIFY]`, tone, alt ảnh | 25p/bài |
| Daily 12:00–12:15 | Editor | UX spot-check: read-aloud test, 12-item UX checklist | 10p/bài |
| Daily 14:00 | Editor | Flip Supabase `status='draft' → 'ready'` + schedule_for (chỉ sau khi UX pass) | 5p/bài |
| **07:00 VN** | Cron | Auto-publish Slot A (pick `ready` oldest) | — |
| **12:15 VN** | Cron | Auto-publish Slot B | — |
| **20:00 VN** | Cron | Auto-publish Slot C | — |
| Hourly | Sentry | Monitor cron success/empty-queue alerts | — |
| Weekly Sun 20:00 | Editor | Review GSC + tune prompts + holiday runway check | 45p |

---

## 2. Các Bước Chi Tiết — AI-first

### Step 1 — Research + Prepare `context_facts`
- Gõ primary keyword vào Google → note "People Also Ask" (lấy FAQ)
- Scan top 3 SERP → tìm góc content chưa ai làm
- Check `topic-clusters.md` để xác định pillar + internal link bắt buộc
- Nếu bài P1 (giá): query `price_history` Supabase lấy data tươi nhất
- Điền `context_facts` block theo template pillar trong `ai-writing-prompts.md`:
  - `primary_keyword`, `secondary_keywords`, `intent`, `persona`
  - Số liệu thực (giá, khoảng cách, % thành phần đất, etc.)
  - `paa[]`, `internal_link_pool[]`

### Step 2 — AI Draft Generation
- Copy pillar prompt template từ `ai-writing-prompts.md` (P1–P6)
- Inject `context_facts` vào system prompt
- Chạy Claude Sonnet 4.5 (hoặc GPT-4o)
- Output: title, meta, slug, direct_answer, tldr, outline, body, faq, internal_links, flags
- **KHÔNG edit trực tiếp AI output** — save full draft vào Supabase `status='draft'` + `body_mdx`

### Step 2b — UX Writing Review Pass (MANDATORY gate)

**Mục tiêu:** Việt hoá tone AI draft trước khi editor review, đảm bảo ngôn ngữ thân thiện, gần gũi người Việt — tránh văn phong dịch máy, khô khan.

**Cách chạy (KISS cho solo founder):**
1. Lấy output `body` từ Step 2 (AI draft pillar prompt)
2. Chạy AI pass thứ 2 với **"UX Writing Review Prompt"** (xem `ai-writing-prompts.md` → section "UX Writing Review Prompt")
3. Nhận output đã Việt hoá + diff summary 3–5 thay đổi lớn
4. Editor spot-check 5 phút: đọc to lên (read-aloud test) → câu nào vấp = fix
5. Chạy checklist 12-item (xem `aeo-geo-seo-playbook.md` → section "3d. UX Writing Checklist")

**Reviewer:** 1 người — editor kiêm UX reviewer nếu solo. Output của AI pass 2 chỉ là gợi ý, editor có quyền override.

**Time budget:** ~10–15p/bài (AI pass 3p + human spot-check 7–12p).

**Gate rule:** **KHÔNG flip `status='ready'` nếu chưa pass UX checklist.** Đây là mandatory gate trước Step 3.

**Output:** bài đã được "Việt hoá" tone, giữ nguyên số liệu/schema/internal link từ Step 2.

---

### Step 3 — Editor Review Pass (human gate)
- Mở AI draft trong Supabase studio (hoặc editor UI)
- Kiểm tra 100% `[CẦN VERIFY]` markers → confirm fact / fix / remove
- Chạy checklist `aeo-geo-seo-playbook.md` (incl. AI hallucination guard + section 3d UX Writing Checklist)
- Cross-check số liệu với `context_facts` — không có con số "từ trên trời"
- Xác nhận UX pass (Step 2b) đã chạy — bài đã được Việt hoá tone
- Bold keyword 2-3 lần tự nhiên
- Thêm 2-4 internal links (theo ma trận `topic-clusters.md`)
- Thêm 1-2 outbound link authority (rel="noopener")
- Verify tone thân thiện miền Tây, không sáo rỗng
- Source ảnh (xem Step 3b — Image Sourcing SOP)

### Step 3b — Image Sourcing SOP
**Nguồn ưu tiên (theo thứ tự):**
1. **Repo root** — ảnh có sẵn: `Xoai-2.jpg`, `Xoai-3.jpg`, `Xoai-4.jpg`, `Xoai-5.jpg`, `Xoai-6.jpg`, `Xoai-7.jpg`, `Loai 1.png`, `Loai 2.png`, `Banghieu.png`, `Khaitruong.png`, `VIP.png`, `Logo.png`
2. **Unsplash** (https://unsplash.com) — search "mango vietnam" / "mango farm" — license free
3. **Pexels** (https://pexels.com) — backup, license free
4. **Pixabay** — backup
5. **Google Images** với filter `Tools → Usage Rights → Creative Commons licenses` — cuối cùng

**Checklist:**
- [ ] Source = royalty-free / Creative Commons / đã mua license
- [ ] Attribution khi source yêu cầu (footer hoặc caption)
- [ ] Resize → max 1200px width
- [ ] Compress `< 200KB` (tinypng.com hoặc `sharp`)
- [ ] Alt text SEO-optimized: chứa primary keyword + mô tả thực
- [ ] Filename kebab-case: `xoai-tu-quy-vang-chin-tren-cay.jpg`
- [ ] Upload tới Supabase Storage bucket `article-images/` hoặc CDN
- [ ] Set `og_image_url` trong `articles` row (1200×630)

**KHÔNG:**
- Không scrape/hotlink ảnh từ site khác
- Không dùng ảnh Google Images mặc định (có copyright)
- Không dùng ảnh có watermark

### Step 4 — Schema (D-1 night)
- Tạo JSON-LD theo loại bài (Article / HowTo / NewsArticle / Comparison)
- Thêm `#aeo-answer` id vào direct answer block
- Thêm Speakable targeting `#aeo-answer` + `#tldr`
- Validate qua Google Rich Results Test
- Nếu fail → fix và re-validate

### Step 5 — Queue → Auto-publish (cron)

Editor KHÔNG publish trực tiếp. Chỉ flip `status='draft' → 'ready'` khi đã review xong **VÀ pass UX Writing Checklist (Step 2b)**:

```sql
update articles
set status = 'ready', scheduled_for = :target_slot_time
where id = :article_id;
```

Hệ thống tự động:
1. Vercel Cron `/api/cron/publish?slot=A|B|C` fires tại 07:00 / 12:15 / 20:00 VN
2. Handler pick bài có `status='ready' AND slot=$slot` (oldest first)
3. Update `status='published'` + `published_at=now()`
4. `revalidateTag('articles')` → ISR refresh list + detail
5. Ping Google Indexing API + Bing URL submission
6. Fire Sentry event `cron_publish_success` (info level)

**Failsafe:** Nếu queue slot rỗng → log `cron_publish_empty_queue` warning + Zalo alert editor. Không publish bất kỳ bài nào thay thế.

> Full spec: `publishing-automation-spec.md`

### Step 6 — Post-publish Distribution + Cron Monitoring

**Auto (cron handler đã làm):**
- GSC Indexing API ping
- Bing URL submission
- Sitemap revalidate

**Manual (editor check sau mỗi slot):**
- Verify live URL load đúng (no 500, schema render)
- Check Sentry — có event `cron_publish_success` cho slot không
- Nếu `cron_publish_empty_queue` → fix queue ngay, chuẩn bị bài cho slot kế

**Social distribution (daily batch):**
- Facebook page: post 3 link buổi tối (sau slot C)
- Zalo OA: gửi 1 link/ngày tới tập khách B2B
- Google Business Profile: 1 post/tuần
- Email newsletter: tuần 21 bài tổng hợp

**Cron monitoring dashboard:**
- Sentry project → filter `cron_publish_*`
- Empty queue 2 lần liên tiếp → auto Zalo alert editor
- Thất bại 3 ngày → escalate lead dev

---

## 3. Tools / Commands Quick Reference

```bash
# Dev preview
bun dev

# Typecheck
npx tsc --noEmit

# Lint
bun run lint

# Build production
bun run build

# Test (passWithNoTests OK cho content-only)
bunx jest --passWithNoTests
```

**Schema validators:**
- https://search.google.com/test/rich-results
- https://validator.schema.org/

**Indexing:**
- GSC: https://search.google.com/search-console
- Bing WMT: https://www.bing.com/webmasters/

**Keyword tracking:** GSC Performance → Filter by page URL sau 7 ngày

---

## 4. Weekly Review (Chủ nhật 20:00)

- [ ] Đã publish đủ **21 bài** tuần này? (3 × 7)
- [ ] Có slot nào bị skip (empty queue)? Root cause?
- [ ] GSC impressions tuần so với tuần trước
- [ ] Bài nào có CTR > 3% → nhân rộng angle (cập nhật prompt template)
- [ ] Bài nào 0 impression sau 7 ngày → kiểm tra index status
- [ ] Price crawler uptime tuần này (≥ 95%)
- [ ] Holiday runway: tuần tới có lễ nào? đã queue bài chưa?
- [ ] Chuẩn bị `context_facts` cho 21 bài tuần sau (buffer)
- [ ] Prompt tuning: `[CẦN VERIFY]` flag rate giảm dần?

---

## 5. Contingency — Empty Queue / Quality Issues

**Queue rỗng 1 slot:** Cron skip + Sentry warning. Editor phải queue bài trong ≤ 6h để tránh lặp slot kế.
**Queue rỗng 2 slot liên tiếp:** Zalo alert → editor phải drop mọi task khác, ưu tiên queue.
**AI draft kém chất lượng:** Giữ `status='draft'`, KHÔNG flip `ready`. Retry prompt với `context_facts` chi tiết hơn. Không bao giờ publish để "đủ số".
**Bài publish sai nội dung:** Flip `status='published' → 'draft'` + `revalidateTag('articles')`. GSC remove URL nếu nghiêm trọng.

---

## 6. Roles (AI-assisted team)

| Role | Nhiệm vụ |
|---|---|
| AI (Claude/GPT) | Step 2 — generate draft theo 6 pillar prompt; Step 2b — UX Writing Review pass 2 |
| Editor | Step 1 (context_facts), Step 2b (UX spot-check + read-aloud test), Step 3 (review + hallucination check), Step 4 (schema validate), Step 3b (image sourcing) |
| Dev (setup) | P0 infra: Supabase schema, cron endpoints, env vars (one-time) |
| Marketing | Step 6 distribution (social, email) |

**Solo operator:** AI cuts work 60%. Editor cần ~35p/bài × 3 = ~105p/ngày (25p editor + 10p UX spot-check), thay vì 3-4h.
**Total UX budget:** ~10-15p × 90 bài = **~18-22h / 30 ngày** editor time cộng thêm cho UX gate.
