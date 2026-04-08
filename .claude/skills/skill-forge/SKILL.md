---
name: es:skill-forge
description: "Create deep knowledge-graph skills. Use when building new es: skills — runs 6-phase workflow: audit, research, analyze, design, build, validate. Research-first, never write from scratch."
license: Apache-2.0
argument-hint: "[domain or language to create skill for]"
metadata:
  author: easestart
  version: 1.0.0
  category: meta
  tags: [skill-creation, knowledge-graph, meta, workflow]
---

# Skill Forge

Workflow for creating deep, authoritative knowledge-graph skills that prevent AI hallucination, enable precise diagnosis, and teach correct first-principles thinking.

## When to Activate

- Creating a new `es:` skill for a language, framework, or domain
- Expanding an existing `es:` skill with new references
- Auditing skill coverage gaps in the project
- User asks to "build knowledge about X" or "create a skill for X"

## The Spirit (Non-Negotiable)

Every skill we build must:

1. **Prevent hallucination** — right vs wrong code examples, authoritative sources only
2. **Diagnose precisely** — exact error messages, failure modes, common pitfalls
3. **Build from scratch correctly** — teach philosophy and principles, not just syntax
4. **Decide with tables, not opinions** — when to use, when NOT to use, trade-offs
5. **Show failure modes** — what breaks, exact symptoms, how to fix
6. **Consolidate, don't fragment** — one authoritative skill per domain
7. **Pure knowledge graph** — no scripts; the agent has tools, it needs judgment
8. **Research first** — leverage existing open-source knowledge, never reinvent

## 6-Phase Workflow

### Phase 1: AUDIT (What exists? What's missing?)

```
1. Grep existing skills for the domain keywords
2. Read relevant SKILL.md files and references
3. Identify coverage gaps (what's shallow, what's absent)
4. Check if backend-development, devops, test already cover parts
5. Define the boundary: what THIS skill covers vs what others handle
```

**Output:** Gap analysis table showing existing vs needed coverage.

### Phase 2: RESEARCH (What has the community built?)

```
1. WebSearch for: "[domain] claude code skills" repos
2. WebSearch for: "[domain] cursor rules" / ".cursorrules"
3. WebSearch for: "[domain] copilot instructions"
4. WebSearch for: "awesome-[domain]" GitHub repos
5. WebSearch for: "[domain] llms.txt"
6. WebSearch for: "[domain] best practices" / style guide repos
7. Clone top 5-8 repos to /tmp/ck-research/
8. Check licenses (must be permissive: MIT, Apache 2.0, CC BY)
```

**Output:** Research report with repo URLs, quality assessment, reusability rating.

### Phase 3: ANALYZE (What's reusable? What needs adaptation?)

```
1. Read all cloned SKILL.md files and references
2. Compare quality: human-edited > AI-generated > auto-generated
3. Identify directly reusable content vs needs-adaptation
4. Map content to planned reference file structure
5. Check for conflicting advice between sources (resolve to authoritative)
6. Note license requirements (attribution, source disclosure)
```

**Output:** Content mapping table: source repo → target reference file.

### Phase 4: DESIGN (Skill structure)

```
1. Write SKILL.md outline (<300 lines):
   - YAML frontmatter (es: namespace, <200 char description)
   - When to Activate (trigger phrases)
   - Philosophy/Principles (domain-specific)
   - Quick Start / Quick Reference
   - Decision tables (framework selection, pattern selection)
   - Common Pitfalls (hallucination prevention)
   - Best Practices (8-10 bullets)
   - References index (load-when guidance)
   - Scope boundary (what this skill does NOT cover)
2. Plan reference files (each <300 lines):
   - One file per cohesive topic
   - kebab-case, self-documenting names
   - No duplication between SKILL.md and references
```

**Output:** File list with topic coverage per file.

### Phase 5: BUILD (Write the files)

```
1. Write SKILL.md first (defines contract)
2. Write reference files (parallelize with agents)
3. Every reference MUST include:
   - Right vs wrong code examples
   - Decision tables with trade-offs
   - Common pitfalls with exact error messages
   - "When NOT to use" for every pattern
4. Write ATTRIBUTION.md (source repos + licenses)
5. Mirror to opencode/skills/
```

**Quality gate per reference file:**
- [ ] Under 300 lines
- [ ] Has right vs wrong code examples
- [ ] Has decision table or trade-off matrix
- [ ] Has common pitfalls section
- [ ] Has "when NOT to use" for patterns
- [ ] No fluff prose — tables, bullets, code blocks only

### Phase 6: VALIDATE

```
1. Line count check: SKILL.md < 300, each reference < 300
2. Description < 200 characters
3. Valid YAML frontmatter (es: namespace)
4. Mirror identical: claude/skills/ == opencode/skills/
5. No duplication with existing ck: or es: skills
6. kebab-case file naming throughout
7. ATTRIBUTION.md present
```

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Skill namespace | `es:` (easestart) | `es:go`, `es:rust` |
| Skill folder | kebab-case | `system-architecture/` |
| Reference files | kebab-case, descriptive | `ownership-borrowing-lifetimes.md` |
| SKILL.md | Exactly `SKILL.md` | uppercase |
| Attribution | `ATTRIBUTION.md` | uppercase |

## File Structure Template

```
claude/skills/{skill-name}/
├── SKILL.md              # <300 lines, quick reference + philosophy
├── ATTRIBUTION.md        # Source repos and licenses
└── references/           # Deep knowledge, <300 lines each
    ├── {topic-one}.md
    ├── {topic-two}.md
    └── {topic-n}.md

opencode/skills/{skill-name}/   # Identical mirror
```

## Reference Quality Checklist

Every reference file must answer these questions for its domain:

- **What is the correct way?** (idiomatic code examples)
- **What is the wrong way?** (anti-patterns with why)
- **When do I choose X over Y?** (decision table)
- **What will break?** (failure modes, exact errors)
- **What should I never do?** (common pitfalls)

## Research Sources Priority

| Priority | Source Type | Where to Find |
|----------|-----------|---------------|
| P0 | Existing Claude Code skills | GitHub: "[domain] claude skills" |
| P0 | Cursor rules | cursor.directory, awesome-cursorrules |
| P1 | Official style guides | Google, Uber, Airbnb, etc. |
| P1 | Language/framework llms.txt | llms-txt-hub, official docs |
| P2 | Copilot instructions | github/awesome-copilot |
| P2 | Best practices repos | awesome-[domain], patterns repos |
| P3 | AGENTS.md from real projects | GitHub search: "AGENTS.md [domain]" |
| P3 | Aider conventions | Aider-AI/conventions repo |

## References

- [Research Methodology](references/research-methodology.md) — detailed search queries, repo evaluation criteria, content extraction patterns
- [Quality Criteria](references/quality-criteria.md) — what makes a reference file excellent vs mediocre, scoring rubric

## Scope

This skill is for creating `es:` knowledge-graph skills. For CK kit's built-in `ck:` skills, use `ck:skill-creator`. For implementation planning, use `ck:plan`.
