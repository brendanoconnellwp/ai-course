---
title: CLAUDE.md & Project Memory
description: How to give Claude persistent context about your project across sessions.
sidebar:
  order: 3
---

One of Claude Code's most powerful features is its memory system. This lets Claude remember context about your project, your preferences, and how you like to work — across sessions.

## CLAUDE.md — Your Project's AI Instructions

The `CLAUDE.md` file is a markdown file in your project root that Claude reads at the start of every session. Think of it as a README for your AI collaborator.

### What to Put in CLAUDE.md

```markdown
# My Project

## Stack
- Framework: Next.js 14 (App Router)
- Database: PostgreSQL via Prisma
- Styling: Tailwind CSS
- Hosting: Vercel

## Architecture
- src/app/ — Next.js pages and API routes
- src/components/ — React components
- src/lib/ — Utility functions and database client
- prisma/ — Database schema and migrations

## Conventions
- Use TypeScript strict mode everywhere
- Components are named PascalCase
- API responses follow { data, error, meta } format
- All database queries go through src/lib/db.ts

## Testing
- Jest for unit tests
- Playwright for E2E tests
- Run tests: npm test
- Run E2E: npm run test:e2e

## Important Notes
- Never modify prisma/schema.prisma without asking first
- The auth system uses custom JWTs, not a library
- Environment variables are in .env.local (not committed)
```

### Why This Matters

Without `CLAUDE.md`, Claude starts every session blind. It has to:
- Explore your file structure to understand the project
- Guess at conventions
- Ask you questions it's asked before

With `CLAUDE.md`, Claude immediately knows:
- What stack you're using
- Where things are
- What rules to follow
- What to avoid

### CLAUDE.md at Multiple Levels

You can have `CLAUDE.md` files at multiple levels:

| Location | Purpose |
|---|---|
| `~/.claude/CLAUDE.md` | Global instructions (your preferences across all projects) |
| `./CLAUDE.md` | Project-root instructions |
| `./src/CLAUDE.md` | Directory-specific instructions |

They cascade — Claude reads all applicable files.

## Auto Memory

Beyond `CLAUDE.md`, Claude Code has an automatic memory system that persists learnings across sessions.

### How It Works

Claude stores memories in `~/.claude/projects/<project>/memory/`:
- **User memories** — who you are and how you work
- **Feedback memories** — corrections and confirmed approaches
- **Project memories** — ongoing work context
- **Reference memories** — pointers to external resources

### Triggering Memory Saves

You can explicitly tell Claude to remember things:

```
> Remember that our deploy process requires running the migration script first
```

Or Claude may save memories automatically when you correct it:

```
> No, don't use var — we use const/let exclusively
```

Claude learns: "This project uses const/let, never var."

## Exercise: Create Your CLAUDE.md

1. Open one of your existing projects
2. Create a `CLAUDE.md` in the root
3. Document your stack, conventions, and important context
4. Start a Claude session and notice how it references your instructions
5. Ask Claude to do something that should follow one of your documented conventions
