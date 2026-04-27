---
title: "SEO Competitive Expansion — Cross-pillar tracker + GSC backlog + HK sprint"
description: "Reshuffle tracker for 3-pillar visibility, mine GSC for validated KW, conditionally sprint Hoàng Kim 5 articles."
status: pending
priority: P1
effort: 3.5h (Phases A-C) + conditional 8-10h (Phase D)
branch: claude/dreamy-thompson-f9478b
tags: [seo, content, gsc, tracker, hoang-kim]
created: 2026-04-27
---

## Overview

Execute UC-1/2/3 from `plans/specs/seo-competitive-expansion/` in 1 cook session. Reshuffle tracker for cross-pillar visibility (Phase A), verify Hoàng Kim wins to gate sprint (Phase B), mine GSC for Google-validated backlog (Phase C), conditionally publish 5 HK articles (Phase D), commit/verify (Phase E). Total $0, decision-quality data secured before any sprint commitment.

**Sequencing rationale:** A→B in parallel (independent file edits + browser work), then C, then conditional D, then E. Phase B gates Phase D — never publish 10 HK articles on unverified vanity wins.

---

## Phase A: Tracker reshuffle (UC-1, 30 min)

**File modified:** `data/tracked-keywords.json`

**Current state:** 25 entries, 100% Tứ Quý (zero Dừa Xiêm / Hoàng Kim visibility).

**Removals (5):**
| KW | Reason |
|----|--------|
| `traicaybentre.com` | Brand — always #1, zero signal value |
| `xoài tứ quý vs xoài tượng` | Was won pre-/ja/en/ko removal; redundant with `vs cát hoà lộc` |
| `xoài tứ quý loại 2` | Low intent + thin content — no article targets it |
| `xoài tứ quý cdđl bến tre` | Duplicate of `xoài tứ quý bến tre` semantically; CDĐL too niche |
| `phúc giang xoài bến tre` | Brand variant — internal navigational |

**Additions (5, cross-pillar):**
| KW | Pillar | Intent | Why |
|----|--------|--------|-----|
| `dừa xiêm bến tre` | Dừa Xiêm | Commercial | Flagship — 30 articles need flagship tracker |
| `mua dừa xiêm` | Dừa Xiêm | Transactional | Conversion KW |
| `giá dừa xiêm` | Dừa Xiêm | Transactional | Price-checker traffic |
| `xoài hoàng kim` | Hoàng Kim | Commercial | Pillar flagship |
| `xoài hoàng kim mua ở đâu` | Hoàng Kim | Transactional | Confirms HK win claim |

**Steps:**
1. Edit `data/tracked-keywords.json` — replace 5 entries listed above
2. Validate JSON: `cat data/tracked-keywords.json | python3 -m json.tool > /dev/null`
3. Commit: `feat(seo): reshuffle tracker for cross-pillar visibility (UC-1)`

**Success:** JSON valid, 25 KW total, distribution = 20 TQ + 3 DX + 2 HK.

---

## Phase B: Hoàng Kim verification (UC-3 gate, 30 min)

**Tool:** Chrome MCP (`mcp__claude-in-chrome__*`).

**Steps:**
1. Open GSC: `https://search.google.com/search-console?resource_id=sc-domain%3Atraicaybentre.com`
2. Navigate Performance → Search results → Pages tab
3. Filter pages by URL contains: `xoai-hoang-kim`
4. Date range: Last 28 days
5. For each ranking page (5 articles total), capture top 3 queries → record (query, position, impressions, clicks)
6. Cross-check 4 candidate winning queries (from previous audit) in Ubersuggest:
   - URL pattern: `https://app.neilpatel.com/en/ubersuggest/keyword_ideas?keyword={KW}&locId=2704&lang=vi`
   - Capture monthly volume per KW
7. Apply decision matrix from UC-3:
   - **3+ KW with vol ≥50/mo at position ≤10** → **GO** (Phase D = 5 articles this session, 5 next)
   - **1-2 KW** → **PARTIAL** (Phase D = 3 articles, prioritize transactional)
   - **0 KW** → **NO-GO** (skip Phase D, redirect to Dừa Xiêm next session)
8. Document decision in `plans/260427-1020-seo-competitive-expansion/hk-verification.md` with table: KW | GSC pos | impressions | Ubersuggest vol | verdict

**Success:** Decision documented with evidence. GO/PARTIAL/NO-GO recorded.

**Risk:** GSC data lag (24-48h). Mitigation: use 28-day window to smooth noise.

---

## Phase C: GSC backlog mining (UC-2, 1h)

**File modified:** `data/keyword-backlog.json` (currently structured as `{version, keywords: [{id, keyword, intent, priority, pillar, type, slug, title, secondaryKeywords, angle, status, usedAt}]}`)

**Steps:**
1. GSC → Performance → Queries tab
2. Date: last 28 days
3. Apply filters in order:
   - Position > 10 (page 2+)
   - Impressions > 50 (proven demand)
   - Clicks < 5 (under-monetized)
4. Sort by impressions desc, capture top 30
5. Manual prune (remove brand variants, navigational, off-topic exports)
6. Bucket survivors by pillar (TQ / DX / HK), prioritize undertracked (DX + HK)
7. Add 10-15 entries to `data/keyword-backlog.json` following existing schema:
   - `id`: `k{pillar-prefix}-{NNN}` (e.g., `kdx-001`, `khk-001`)
   - `priority`: 1-10 (transactional=8-10, informational=5-7)
   - `status`: `pending`
   - `usedAt`: `null`
   - All other fields per existing exemplar (lines 4-17 of backlog file)
8. Validate JSON
9. Commit: `feat(seo): mine GSC for 10-15 backlog KW (UC-2)`

**Success:** Backlog grows from 15 → 25-30 entries, ≥50% transactional/commercial intent, all 3 pillars represented.

**Risk:** Confirmation bias (only KW Google already shows). Acceptable for now per brainstorm — mitigate with monthly Ubersuggest greenfield in future sessions.

---

## Phase D: HK sprint (CONDITIONAL on Phase B verdict, 8-10h for 5 articles)

**Trigger:** Phase B = GO or PARTIAL.

**Skip if:** Phase B = NO-GO. Document reason in commit message and END at Phase E.

**Files created (5 articles, max for token budget):**

Priority order (transactional first per brainstorm D2 reorder):
1. `src/content/articles/xoai-hoang-kim/tin-tuc/xoai-hoang-kim-mua-o-dau.mdx` — TX
2. `src/content/articles/xoai-hoang-kim/tin-tuc/xoai-hoang-kim-gia-bao-nhieu.mdx` — TX
3. `src/content/articles/xoai-hoang-kim/kien-thuc/cach-bao-quan-xoai-hoang-kim.mdx` — INFO (high vol)
4. `src/content/articles/xoai-hoang-kim/kien-thuc/xoai-hoang-kim-bao-nhieu-calo.mdx` — INFO
5. `src/content/articles/xoai-hoang-kim/kien-thuc/xoai-hoang-kim-mua-nao-ngon-nhat.mdx` — INFO

**Deferred to next session (5 more, if GO):** quà biếu sếp variant, cho bé ăn dặm, vs cát hoà lộc (extend), recipe sấy dẻo, cho bầu.

**Per-article steps:**
1. Read exemplar `src/content/articles/xoai-tu-quy/kien-thuc/cach-bao-quan-xoai-tu-quy.mdx` for frontmatter + structure pattern
2. Read 1 existing HK kien-thuc article (e.g., `cach-an-xoai-hoang-kim-ngon-nhat.mdx`) for HK voice + CTA conventions
3. Write new article: frontmatter (title, description, slug, pubDate, author, image, pillar, type, primaryKeyword, secondaryKeywords), TL;DR block, H2 question-style (per AEO patterns), FAQ section, internal links to existing HK articles + Phúc Giang CTA
4. Run `node scripts/validate-aeo.js` per article — fix any issues before next
5. Update `data/keyword-backlog.json` entry status from `pending` → `published` (if KW already in backlog from Phase C)

**Per-batch steps:**
1. After all 5 articles written: `bun run build` to verify no MDX/typescript errors
2. Commit: `feat(content): publish 5 Hoàng Kim articles (UC-3 sprint batch 1)`

**Success:** 5 MDX files compile, AEO validation passes, no broken internal links, HK pillar grows 5 → 10.

**Risk:** Token budget exhaustion mid-batch. Mitigation: write 1 article fully + verify build, then iterate. Stop at 3 if budget tight; document remaining 2 for next session.

---

## Phase E: Commit & verify (15 min)

**Commands (in order):**
```bash
# Per phase commits already done; final verification:
cd /Users/jang/Desktop/Products/traicaybentre/.claude/worktrees/dreamy-thompson-f9478b
npx tsc --noEmit                  # typecheck
bun run build                      # build
git status                         # confirm clean
git log --oneline -10              # confirm phase commits
git push origin claude/dreamy-thompson-f9478b
```

**Success:** typecheck + build pass, git clean, push succeeds.

**If build fails:** Identify offending file via stderr, fix, re-build, re-commit. Do NOT push broken builds.

---

## Files to create/modify

**Modified:**
- `data/tracked-keywords.json` — Phase A (5 swaps)
- `data/keyword-backlog.json` — Phase C (10-15 additions), Phase D (status updates)

**Created (Phase D, conditional):**
- `src/content/articles/xoai-hoang-kim/tin-tuc/xoai-hoang-kim-mua-o-dau.mdx`
- `src/content/articles/xoai-hoang-kim/tin-tuc/xoai-hoang-kim-gia-bao-nhieu.mdx`
- `src/content/articles/xoai-hoang-kim/kien-thuc/cach-bao-quan-xoai-hoang-kim.mdx`
- `src/content/articles/xoai-hoang-kim/kien-thuc/xoai-hoang-kim-bao-nhieu-calo.mdx`
- `src/content/articles/xoai-hoang-kim/kien-thuc/xoai-hoang-kim-mua-nao-ngon-nhat.mdx`
- `plans/260427-1020-seo-competitive-expansion/hk-verification.md` (Phase B output)

**Reference (read-only):**
- `src/content/articles/xoai-tu-quy/kien-thuc/cach-bao-quan-xoai-tu-quy.mdx` — exemplar
- `src/content/articles/xoai-hoang-kim/kien-thuc/cach-an-xoai-hoang-kim-ngon-nhat.mdx` — HK voice ref
- `scripts/validate-aeo.js` — AEO compliance check
- `scripts/rank-tracker.js` — to confirm tracked-keywords.json schema

---

## Verification commands

```bash
# Phase A
cat data/tracked-keywords.json | python3 -m json.tool > /dev/null && echo "JSON OK"
jq '.keywords | length' data/tracked-keywords.json   # expect 25

# Phase C
jq '.keywords | length' data/keyword-backlog.json    # expect ≥25 after additions
jq '[.keywords[] | select(.pillar == "xoai-hoang-kim")] | length' data/keyword-backlog.json
jq '[.keywords[] | select(.pillar == "dua-xiem")] | length' data/keyword-backlog.json

# Phase D
node scripts/validate-aeo.js src/content/articles/xoai-hoang-kim/**/*.mdx
bun run build

# Phase E
npx tsc --noEmit
git status
```

---

## Risk + Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| GSC data stale (post /ja/en/ko removal noise) | High | Med | 28-day window smooths; cross-check Ubersuggest for 4 HK candidates |
| Phase B verdict ambiguous (1-2 wins) | Med | Low | PARTIAL path defined — 3 articles still a valid bet on transactional KW |
| HK templates differ from TQ exemplar | Low | Low | 5 HK articles already exist — mimic their structure not just TQ |
| Token budget cuts Phase D mid-batch | Med | Low | Write+verify per article, stop at 3 if needed, document remainder |
| Build fails after MDX additions | Low | High | Run `bun run build` BEFORE commit on Phase D batch |
| Tracker JSON schema mismatch | Low | High | rank-tracker.js reads `keywords` array of strings — confirmed via Read |
| Removed KW reverses → lose data | Low | Low | Reversible — re-add anytime; only 5 KW affected |
| Backlog pillar field naming inconsistent | Low | Med | Match existing `xoai-tu-quy` slug pattern → `dua-xiem`, `xoai-hoang-kim` |

**Backwards compat:** Tracker file is array of strings — no schema change. Backlog adds entries to existing array — no breaking change. New MDX files use existing pillar/type folders — no routing changes needed.

**Rollback per phase:** Each phase = separate commit. `git revert <sha>` undoes any phase independently. No cascading dependencies.

---

## Phase ownership (no overlap)

| Phase | File ownership |
|-------|---------------|
| A | `data/tracked-keywords.json` |
| B | `plans/260427-1020-seo-competitive-expansion/hk-verification.md` (new) |
| C | `data/keyword-backlog.json` |
| D | `src/content/articles/xoai-hoang-kim/**/*.mdx` (new) + `data/keyword-backlog.json` (status updates only) |
| E | No file edits — verify + push only |

C and D both touch `keyword-backlog.json` but Phase D only updates `status` field on entries created by Phase C — sequential, not parallel. Safe.

---

## Unresolved Questions

1. **Phase B Ubersuggest access** — does owner have Ubersuggest free tier session active? If captcha-walled, fallback to Google Keyword Planner (requires Google Ads account) or skip Ubersuggest validation and use GSC impressions as proxy (≥100 impressions/28d ≈ "real demand").
2. **Phase D MDX schema** — does the project enforce a Zod content schema (Astro `defineCollection`)? If so, frontmatter must match exactly. Will inspect first article's collection config before writing.
3. **HK sprint commit granularity** — 1 commit per article (5 commits) or 1 batch commit? Plan assumes batch; user may prefer per-article for cleaner revert.
4. **Phase B = NO-GO outcome** — plan ends at Phase E. Should a stub Dừa Xiêm article be drafted instead with leftover capacity, or fully defer to next session? Plan defaults to defer (KISS).
5. **Phase D image assets** — new HK articles need hero images. Are HK photos available in `public/images/`? If not, reuse existing or document as TODO.

---

**Status:** DONE
**Summary:** Plan saved with 5 phases (A-E), explicit file ownership, conditional gating on Phase B verdict, rollback per phase, and 9-row risk matrix. Total scope: 3.5h baseline + 8-10h conditional sprint, all $0 cost.
**Concerns/Blockers:** 5 unresolved Qs listed at end — most resolvable inline during execution; Q2 (MDX schema) needs verification before Phase D.
