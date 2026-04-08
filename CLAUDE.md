# TraiCayBenTre

## Product Identity

Read `.project-agent.md` for product config, tech stack, commands, and binding rules.

## CK Workflow

- Rules: `.claude/rules/*` (if CK kit installed)
- Use `/ck:cook` for implementation, `/es-feature-dev` for full feature pipeline

## Development Rules

- Modularize if file exceeds 200 lines
- kebab-case with long descriptive names (self-documenting for LLM tools)
- Check existing modules before creating new ones
- Always read `.project-agent.md` first for product context

## Commands

- Dev: `bun dev`
- Build: `bun run build`
- Test: `bunx jest --passWithNoTests`
- Lint: `bun run lint`
- Typecheck: `npx tsc --noEmit`

## Git Rules

- Don't use `chore` or `docs` in commit messages for `.claude` directory changes
- Concise commit messages focused on "why"

## Binding Rules

- Always respect constraints defined in `.project-agent.md`
- Design tokens live in `design-system/tokens.json`
- Component registry in `design-system/component-registry.md`
