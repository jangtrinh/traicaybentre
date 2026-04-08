# Quality Criteria

Scoring rubric for evaluating whether a skill and its reference files meet the `es:` standard.

## SKILL.md Scoring (Must Score ≥ 8/10)

| Criterion | Points | How to Evaluate |
|-----------|--------|----------------|
| **Philosophy section** | 2 | Does it teach HOW to think in this domain, not just what to do? |
| **Hallucination prevention** | 2 | Does "Common Pitfalls" section list things the AI commonly gets wrong? |
| **Decision tables** | 2 | Can a developer pick the right framework/pattern from a table alone? |
| **Scope boundary** | 1 | Does it clearly state what it does NOT cover and which skills handle those? |
| **Trigger phrases** | 1 | Will the skill activate for relevant queries? Are triggers specific enough? |
| **Quick reference** | 1 | Can someone get started in 30 seconds from the Quick Start section? |
| **Description quality** | 1 | Under 200 chars, includes action verbs and specific trigger terms? |

## Reference File Scoring (Must Score ≥ 7/10)

| Criterion | Points | How to Evaluate |
|-----------|--------|----------------|
| **Right vs wrong examples** | 2 | Does every major pattern show both correct and incorrect code? |
| **Exact error messages** | 2 | When code is wrong, does it show the actual compiler/runtime error? |
| **Decision framework** | 2 | For choices (X vs Y), is there a table with trade-offs? |
| **Failure modes** | 2 | Does every pattern include what can go wrong and symptoms? |
| **When NOT to use** | 1 | Is there explicit guidance on when a pattern is the wrong choice? |
| **Conciseness** | 1 | No fluff prose? Uses tables, bullets, code blocks? |

## Excellence Markers (What Separates Great from Good)

### Great Reference File
```markdown
## Worker Pool Pattern

### When to Use
- Processing N items with bounded concurrency
- I/O-bound tasks (HTTP calls, DB queries)

### When NOT to Use
- CPU-bound work (use runtime.GOMAXPROCS instead)
- < 10 items (overhead exceeds benefit)

### Implementation
​```go
func workerPool(ctx context.Context, jobs <-chan Job, results chan<- Result, workers int) {
    var wg sync.WaitGroup
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs {
                select {
                case <-ctx.Done():
                    return
                case results <- process(job):
                }
            }
        }()
    }
    wg.Wait()
    close(results)
}
​```

### Common Pitfalls

| Pitfall | Symptom | Fix |
|---------|---------|-----|
| Goroutine leak | Memory grows forever | Always drain channels or use context |
| Unbounded workers | OOM under load | Set workers = runtime.NumCPU() or lower |
| Panic in worker | Silent data loss | Recover in worker, log + continue |
| Closed channel send | `panic: send on closed channel` | Only close from sender side |
```

### Mediocre Reference File (What to Avoid)
```markdown
## Worker Pool

A worker pool is a concurrency pattern where multiple goroutines
process jobs from a shared channel. This is useful when you need
to limit the number of concurrent operations.

Worker pools are commonly used in Go applications for processing
large numbers of tasks efficiently...

[200 lines of prose without decision tables or error messages]
```

## Red Flags (Immediate Rewrite Triggers)

- **No code examples** — reference file is just prose
- **Only happy path** — no error handling, no failure modes
- **Generic advice** — "use best practices" without specifics
- **Contradicts official docs** — claims that don't match language/framework docs
- **Missing "when NOT to"** — only shows when to use a pattern
- **Stale versions** — references deprecated APIs or removed features
- **Copy-pasted from AI** — generic phrasing, no domain-specific precision

## Validation Commands

```bash
# Line count check (all files < 300)
for f in SKILL.md references/*.md; do
  lines=$(wc -l < "$f")
  [ "$lines" -gt 300 ] && echo "FAIL: $f ($lines lines)"
done

# Description length check (< 200 chars)
desc=$(grep '^description:' SKILL.md | sed 's/^description: "//' | sed 's/"$//')
[ ${#desc} -gt 200 ] && echo "FAIL: description too long (${#desc} chars)"

# Frontmatter check
head -1 SKILL.md | grep -q '^---$' || echo "FAIL: missing frontmatter"

# Namespace check
grep -q '^name: es:' SKILL.md || echo "FAIL: must use es: namespace"

# Mirror check
diff -rq claude/skills/{name}/ opencode/skills/{name}/ || echo "FAIL: mirrors differ"
```

## The Golden Rule

> If a developer reads this reference file and still makes the wrong decision,
> the file has failed. Every pattern must lead to a correct choice.

Not "the developer should research more." Not "it depends." The file should contain
enough context for the AI agent to make the right call or know exactly what question
to ask the user.
