# SEO Competitive Expansion — Top 3 Use Cases

> **Selected from brainstorm.md** | **Date:** 2026-04-27
> Filter: actionable this month, $0 cost, validated decision input.

---

## UC-1: Cross-Pillar Visibility Restoration (P0)

**Persona:** Site owner / SEO operator
**Trigger:** Realization that 25/25 tracked KW are Tứ Quý — zero data on Dừa Xiêm (30 articles) and Hoàng Kim (5 articles, 4 alleged wins).

**User Story:**
> As a site owner managing 3 pillars, I want to see weekly rank movement for ALL pillars (not just Tứ Quý), so that I can detect demand shifts and reallocate content effort to the strongest-performing pillar.

**Steps:**
1. Open `data/tracked-keywords.json`
2. Remove 5 redundant entries (e.g., `traicaybentre.com` brand, `xoài tứ quý vs xoài tượng` already-won)
3. Add 5 cross-pillar KW:
   - `dừa xiêm bến tre`
   - `mua dừa xiêm`
   - `dừa xiêm giá bao nhiêu`
   - `xoài hoàng kim`
   - `xoài hoàng kim mua ở đâu`
4. Run `node scripts/rank-tracker.js` next Friday
5. Read report at `plans/reports/rank-tracker-{date}.md` → identify top 3 surprises

**Acceptance Criteria:**
- [ ] Tracker shows positions for at least 1 KW per pillar
- [ ] Weekly delta visible for each pillar's flagship KW
- [ ] Decision documented: which pillar gets next 5 articles?

**Effort:** 30 min one-time + ongoing weekly review (5 min)
**Cost:** $0 (stays free tier)
**Risk:** LOW — reversible (re-add removed KW anytime)
**Trade-off:** Lose WoW on 5 dropped KW (acceptable — they were noise/won)

**Why this story wins:** Highest-value insight, lowest cost. Likely surfaces "Dừa Xiêm is undertracked goldmine" or "Hoàng Kim wins are vanity" — either answer is decision-changing.

---

## UC-2: GSC-Mined Backlog Refill (P0)

**Persona:** Content planner
**Trigger:** Backlog at 15 KW (15-day runway). Need refill source that's free, validated, and fast.

**User Story:**
> As a content planner, I want a 1-hour weekly ritual to extract Google-validated KW (impressions but no clicks) from GSC, so that my backlog is always full of KW Google already considers me for — not random Ubersuggest guesses.

**Steps:**
1. Open Google Search Console → Performance → Queries
2. Filter: last 28 days, impressions > 50, clicks < 5, position > 10
3. Export top 30 to CSV
4. Open CSV, manually prune (remove brand variants, navigational, off-topic)
5. Add 10-15 surviving KW to `data/keyword-backlog.json` with priority + intent + slug
6. Repeat weekly

**Acceptance Criteria:**
- [ ] Backlog ≥ 30 entries within 2 weeks
- [ ] Each new entry has: keyword, pillar, intent, priority, slug, title, angle
- [ ] At least 50% are transactional or commercial-investigation intent

**Effort:** 1h/week ongoing
**Cost:** $0
**Risk:** LOW — manual approve gate prevents thin content
**Trade-off:** GSC mining = confirmation bias (only KW Google already shows). Mitigate with monthly Ubersuggest greenfield session.

**Why this story wins:** Replaces guesswork with Google-validated signal. KW already at position 11-30 are easiest top-10 wins (10x ROI vs greenfield).

---

## UC-3: Hoàng Kim Verified Sprint (P1)

**Persona:** Pillar strategist
**Trigger:** "4/5 HK articles winning" claim drives sprint decision. Verify before committing 10 days of writing.

**User Story:**
> As a pillar strategist, I want to confirm Hoàng Kim's 4 wins are commercially valuable (not zero-competition vanity slugs) before investing 10 articles, so that I don't dilute Tứ Quý momentum on a wrong bet.

**Steps:**
1. Identify 4 winning HK KW from GSC (Performance → filter pillar URL pattern)
2. Check each KW in Ubersuggest:
   - Search volume ≥ 50/mo? → REAL win
   - Search volume < 20/mo? → vanity win
3. Decision matrix:
   - **3+ real wins** → Sprint GO. Publish 10 HK articles in 10 days (3 transactional first).
   - **1-2 real wins** → Sprint PARTIAL. Publish 5 HK articles, focus utility KW.
   - **0 real wins** → Sprint NO-GO. Reallocate effort to Dừa Xiêm.
4. If GO: execute publishing using existing templates (per memory, templates exist)

**Acceptance Criteria:**
- [ ] Sprint Y/N decision documented with evidence
- [ ] If GO: 10 HK articles published in 10 days
- [ ] If GO: HK pillar count grows from 5 → 15
- [ ] HK KW added to tracker (UC-1) to measure sprint outcome

**Effort:** 30 min verification + 1.5h/article × 10 = 15h-20h sprint
**Cost:** $0
**Risk:** MEDIUM — opportunity cost if HK wins are vanity. Mitigation = verify FIRST.
**Trade-off:** Sprint diverts time from Tứ Quý optimization. Acceptable if HK has real demand and lower competition.

**Why this story wins:** Either confirms a real strategic moat (premium positioning) or kills a wrong bet quickly — both are valuable. Verify-first costs nothing.

---

## Story Sequencing

```
Week 1: UC-1 (30 min) + UC-3 verification (30 min) = 1h investment
        → Outputs: cross-pillar tracker + HK sprint decision

Week 1-2: UC-2 (1h/week) ongoing
        → Output: backlog grows 15 → 25+

Week 2-3: UC-3 sprint (if GO) OR UC-2 deeper mining (if NO-GO)
        → Output: 10 HK articles OR 30+ backlog with TQ/DX focus

Week 4: Re-evaluate. Decide tracker upgrade ($50/mo SerpAPI Developer) Y/N.
```

---

## Stories Considered but Rejected

| Story | Why Rejected |
|-------|-------------|
| Audit 563 secondary KW | YAGNI. Low ROI vs effort. Defer until backlog full. |
| New pillar Bưởi Da Xanh | Premature. Wait until existing pillars stable. |
| Backlink outreach campaign | Q3 problem. Time-boxed within MVP. |
| Auto-extract from 677 KW universe | Variations are noise. Manual GSC-mining wins. |
| SerpAPI upgrade NOW ($50/mo) | Need 4 weeks of action evidence before committing recurring cost. |
| English/Korean/Japanese KW research | Out of scope. /ja /en /ko being removed for hreflang fix. |

---

## Unresolved Questions

1. Does owner have GSC access? UC-1, UC-2, UC-3 all depend on it.
2. Templates for HK articles confirmed available? UC-3 timeline assumes yes.
3. Publishing velocity 5 articles/week sustained? Affects backlog target sizing.
4. Should UC-2 also feed Dừa Xiêm pillar, or stay TQ-focused? Pending UC-1 outcome.
5. Define "win" threshold for tracker: position 10 or position 5? Affects how aggressive sprint targets must be.

