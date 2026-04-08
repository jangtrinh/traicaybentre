# Research Methodology

How to find, evaluate, and extract knowledge from existing open-source repos when building a new `es:` skill.

## Search Queries (Run All of These)

For any domain `{X}` (e.g., "go", "rust", "tauri", "kubernetes"):

```
GitHub searches:
  "{X} claude code skills"
  "{X} claude skill" language:markdown
  "{X} cursor rules" OR ".cursorrules {X}"
  "{X} copilot instructions"
  "awesome-{X}" stars:>500
  "{X} best practices" stars:>1000
  "{X} style guide"
  "{X} patterns" stars:>500
  "{X} cheat sheet"
  "AGENTS.md {X}"

Web searches:
  site:cursor.directory {X}
  site:fastmcp.me {X}
  "{X} llms.txt"
  "{X} llms-full.txt"
  localskills.sh {X}
```

## Repo Evaluation Criteria

Score each repo 1-5 on these dimensions:

| Criterion | 5 (Best) | 1 (Worst) |
|-----------|----------|-----------|
| **Format** | SKILL.md / .cursorrules / structured MD | Unstructured blog post |
| **Authority** | Official team, industry leader | Unknown author, no stars |
| **Freshness** | Updated within 6 months | Abandoned 2+ years |
| **Specificity** | Exact code examples, error messages | Generic advice |
| **License** | MIT, Apache 2.0 | No license, GPL |
| **LLM-ready** | Written for AI consumption | Written for humans only |

**Clone if score ≥ 18/30.** Skip if < 12/30.

## Clone Strategy

```bash
mkdir -p /tmp/ck-research
cd /tmp/ck-research
git clone --depth 1 <repo-url>  # shallow clone, save time
```

- Clone to `/tmp/ck-research/` — temporary, clean up after
- `--depth 1` — we need content, not history
- Maximum 8 repos — diminishing returns after that

## Content Extraction Patterns

### From Claude Code Skills
- Read all SKILL.md files — structure is directly reusable
- Read references/ — content may be copy-adaptable
- Check evals/ — reveals what the skill is optimized for

### From Cursor Rules (.mdc files)
- Extract the rule content (skip YAML frontmatter globs)
- Group rules by topic for consolidation
- Translate Cursor-specific syntax to neutral markdown

### From Copilot Instructions
- Usually single .md files per language
- High quality but shallow — use as foundation, add depth

### From Style Guides (Google, Uber, etc.)
- Authoritative but verbose — distill key rules
- Extract decision criteria, not explanations
- Keep code examples, drop prose

### From Awesome Lists
- Don't clone the list — use it as discovery index
- Follow links to actual repos worth cloning

### From llms.txt
- WebFetch the URL directly — no clone needed
- Often too large for a single reference — extract relevant sections
- Good for API surface coverage

## Quality Signals (Trust Hierarchy)

```
Official documentation      > highest trust
Industry style guides       > very high (Google, Uber, Airbnb)
Human-edited AI skills      > high (explicit "no AI slop")
Production AGENTS.md files  > high (real project constraints)
Community pattern repos     > medium (verify accuracy)
AI-generated skills         > low (may contain hallucinations)
Blog posts                  > lowest (often outdated, opinionated)
```

## Deduplication Strategy

When multiple repos cover the same topic:

1. **Compare accuracy** — test claims against official docs
2. **Pick the most specific** — exact code > general advice
3. **Merge complementary content** — repo A has patterns, repo B has pitfalls
4. **Resolve conflicts** — defer to official sources, then production-tested repos
5. **Never include contradictory advice** — pick one, document why

## Cleanup

After skill is built and validated:

```bash
rm -rf /tmp/ck-research  # always clean up cloned repos
```

## Anti-Patterns

- **Copying verbatim** — always adapt to our format (right/wrong, decision tables, pitfalls)
- **Trusting AI-generated repos** — verify claims against official docs
- **Cloning everything** — 5-8 repos max, diminishing returns fast
- **Skipping license check** — GPL contaminates, always verify
- **Research without building** — time-box research to 30% of total effort
