---
title: Installing Claude Code
description: Step-by-step installation and first-run configuration.
sidebar:
  order: 3
---

Let's walk through installation in detail and get Claude Code configured for the best experience.

## Installation

```bash
npm install -g @anthropic-ai/claude-code
```

:::tip
If you get permission errors on macOS/Linux, you may need `sudo` or to fix your npm global prefix. See the [npm docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).
:::

## First Run

Navigate to any project directory and launch Claude:

```bash
cd ~/my-project
claude
```

On first run, Claude will:
1. Open your browser for authentication
2. Ask you to authorize with your Anthropic account
3. Create a `~/.claude/` directory for global configuration

## Key Directories

After installation, Claude Code uses these locations:

| Path | Purpose |
|---|---|
| `~/.claude/` | Global config, memory, settings |
| `~/.claude/settings.json` | Global permission settings |
| `.claude/` (in project) | Project-specific config and memory |
| `CLAUDE.md` (in project root) | Project instructions Claude reads on every session |

## The CLAUDE.md File

This is one of the most important concepts in Claude Code. A `CLAUDE.md` file in your project root acts as persistent instructions that Claude reads at the start of every conversation.

```markdown
# Project: My App

## Stack
- Next.js 14 with App Router
- Tailwind CSS
- Prisma + PostgreSQL

## Conventions
- Use TypeScript strict mode
- Components go in src/components/
- API routes go in src/app/api/

## Do NOT
- Install new dependencies without asking
- Modify the database schema without confirmation
```

Think of it as a README for your AI collaborator. We'll use `CLAUDE.md` extensively throughout this course.

## Choosing Your Model

Claude Code lets you pick which model powers your session:

- **Opus** — most capable, best for complex tasks (default on Max plan)
- **Sonnet** — fast and capable, good for most work
- **Haiku** — fastest, good for simple tasks

You can set this in your config or switch during a session.

## Next Steps

With Claude Code installed and running, we're ready to learn the fundamentals of working with it effectively.
