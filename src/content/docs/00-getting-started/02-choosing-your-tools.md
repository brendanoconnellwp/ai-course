---
title: Choosing Your Tools
description: What you need installed and configured before starting the course.
sidebar:
  order: 2
---

Before diving in, let's get your environment ready. This course is hands-on — you'll be running real commands from lesson one.

## Required

### Claude Code

Claude Code is a CLI tool from Anthropic that gives Claude direct access to your terminal, file system, and development tools.

**Requirements:**
- Node.js 18+ installed
- A Claude Pro ($20/mo) or Max ($100/mo) subscription
- A terminal (VS Code terminal, Windows Terminal, iTerm2, etc.)

**Install:**
```bash
npm install -g @anthropic-ai/claude-code
```

**Verify:**
```bash
claude --version
```

### A Code Editor

You'll want a code editor open alongside Claude Code. We recommend:

- **VS Code** — free, great terminal integration, works everywhere
- **Cursor** — VS Code fork with built-in AI (good complement to Claude Code)

### Git

Version control is essential. Claude Code works directly with git.

```bash
git --version
```

If you don't have it: [git-scm.com](https://git-scm.com/)

## Recommended

### A Cloudflare Account

Free tier is plenty for this course. You'll use it for:
- **Pages** — static site hosting
- **Workers** — serverless functions
- **D1** — SQLite database
- **KV** — key-value storage
- **R2** — object storage

Sign up at [dash.cloudflare.com](https://dash.cloudflare.com/)

### GitHub Account

For pushing code, creating PRs, and using GitHub MCP integrations.

## Optional but Useful

- **Notion** — we'll show MCP integration with Notion
- **A WordPress local dev environment** — if you want to follow the WordPress-specific lessons (we use [LocalWP](https://localwp.com/))

## Verifying Your Setup

Once you have Claude Code installed, run:

```bash
claude
```

You should see Claude's interactive prompt. Type a simple message to confirm it's working:

```
> What directory am I in?
```

Claude should read your current directory and respond. If that works, you're ready to go.
