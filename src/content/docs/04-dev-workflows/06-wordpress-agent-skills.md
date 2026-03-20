---
title: WordPress Agent Skills
description: The official WordPress agent skills system — teaching AI agents to build WordPress correctly.
sidebar:
  order: 6
---

In January 2026, WordPress officially entered the agentic AI era. The [WordPress agent-skills project](https://github.com/WordPress/agent-skills) provides structured skill bundles that teach AI coding agents how to build WordPress the right way — not just generate code, but follow current best practices, security patterns, and modern WordPress architecture.

This is a big deal. It means WordPress core contributors are actively shaping how AI agents interact with the platform.

## The Problem Agent Skills Solve

Without guidance, AI agents building WordPress code tend to:

- **Generate outdated patterns** — pre-Gutenberg approaches, classic themes when block themes are the standard
- **Miss security considerations** — skipping nonce verification, improper capability checks
- **Skip block deprecations** — breaking existing content when updating blocks
- **Ignore project tooling** — not using wp-scripts, wp-env, or existing build configs
- **Improvise instead of follow standards** — guessing at WordPress conventions rather than following them

Agent skills fix this by giving AI systems **structured, expert-level WordPress knowledge** in a format they can actually use.

## What Are Agent Skills?

Agent skills are portable bundles of:

- **Instructions** — step-by-step procedures for WordPress tasks
- **Checklists** — verification steps to ensure quality
- **Scripts** — helper tools for detection and validation
- **Reference docs** — deep-dive documentation on specific topics

Each skill follows a consistent structure:

```
skills/wp-block-development/
├── SKILL.md           # Main procedures and checklist
├── references/        # Deep-dive documentation
│   ├── block-json.md
│   └── deprecations.md
└── scripts/           # Helper tools
    └── list_blocks.mjs
```

## Available Skills

The project includes 13 skills covering the full WordPress development surface:

| Skill | What It Teaches the Agent |
|---|---|
| `wordpress-router` | Classify repos and route to the right workflow |
| `wp-project-triage` | Detect project type, tooling, and environment |
| `wp-block-development` | Gutenberg blocks, `block.json`, deprecation handling |
| `wp-block-themes` | Block themes, `theme.json`, templates, template parts |
| `wp-plugin-development` | Plugin architecture, hooks, security patterns |
| `wp-rest-api` | REST endpoints, authentication, schemas |
| `wp-interactivity-api` | Frontend interactivity with directives and stores |
| `wp-abilities-api` | Permissions, capabilities, authentication |
| `wp-wpcli-and-ops` | WP-CLI automation, multisite, operations |
| `wp-performance` | Caching, profiling, database optimization |
| `wp-phpstan` | Static analysis configuration for WordPress |
| `wp-playground` | WordPress Playground for instant testing environments |
| `wpds` | WordPress Design System integration |

## Installing Agent Skills

### For Claude Code (Global)

Install skills globally so every WordPress project benefits:

```bash
git clone https://github.com/WordPress/agent-skills.git
cd agent-skills
node shared/scripts/skillpack-build.mjs --clean
node shared/scripts/skillpack-install.mjs --global
```

Skills install to `~/.claude/skills/` where Claude Code automatically discovers them.

### For a Specific Project

```bash
node shared/scripts/skillpack-install.mjs --dest=../your-wp-project \
  --targets=claude
```

This creates `.claude/skills/` in your project directory with the relevant skill files.

### Selective Installation

Don't need all 13? Pick the ones relevant to your work:

```bash
node shared/scripts/skillpack-install.mjs --global \
  --skills=wp-playground,wp-block-development,wp-plugin-development
```

### Multi-Agent Installation

If you use multiple AI tools, install for all of them at once:

```bash
node shared/scripts/skillpack-install.mjs --dest=../your-wp-project \
  --targets=codex,vscode,claude,cursor
```

This creates platform-specific directories:
- `.codex/skills/` — OpenAI Codex
- `.github/skills/` — VS Code / GitHub Copilot
- `.claude/skills/` — Claude Code
- `.cursor/skills/` — Cursor

## The wp-playground Skill

The `wp-playground` skill deserves special attention. It lets AI agents **spin up a full WordPress environment in ~3 seconds** for testing:

```
> Test this plugin in a fresh WordPress installation
```

With the skill installed, Claude can:
1. Start WordPress via Playground CLI (3 seconds vs ~1 minute traditional setup)
2. Auto-detect whether your code is a plugin or theme
3. Mount it in the correct directory
4. Log into WP-Admin automatically
5. Test with curl or Playwright

This creates a **feedback loop** — the agent writes code, tests it in a real WordPress instance, sees the result, and iterates. No more "it should work" — the agent can verify.

> "AI agents work better when they have a clear feedback loop. That's why I made the wp-playground skill."
> — Brandon Payton, WordPress Contributor

## How Skills Change the Development Experience

### Without Agent Skills

```
> Create a Gutenberg block for displaying testimonials

Claude generates a block using patterns from 2021.
Missing block.json metadata. Classic editor fallback code.
No deprecation handling. wp-scripts not used.
```

### With Agent Skills

```
> Create a Gutenberg block for displaying testimonials

Claude reads wp-block-development skill:
- Uses block.json for all metadata
- Follows current block API patterns
- Includes proper deprecation array
- Uses wp-scripts for build tooling
- Adds render.php for server-side rendering
- Follows WordPress Design System patterns
```

The difference is significant. Skills don't just make the agent better — they make it **current**.

## Exercise

1. Clone the WordPress agent-skills repo
2. Install skills globally for Claude Code
3. Start a Claude session in a WordPress project
4. Ask Claude to create a Gutenberg block — notice how it follows modern patterns
5. Try the wp-playground skill to test the block in a live environment
