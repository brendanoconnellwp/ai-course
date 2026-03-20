---
title: What Are Skills?
description: Understanding Claude Code's skill system for extending functionality.
sidebar:
  order: 1
---

Skills are one of Claude Code's most powerful extensibility features. They're custom commands that expand into full prompts, giving Claude specialized capabilities beyond its defaults.

## Skills vs. Slash Commands

| Feature | Built-in Slash Commands | Skills |
|---|---|---|
| Source | Shipped with Claude Code | Custom-defined or community |
| Examples | `/clear`, `/compact`, `/model` | `/commit`, `/review-pr`, `/simplify` |
| Customizable | No | Yes |
| Expandable | No | Expand into full prompts |

## How Skills Work

When you type a skill like `/commit`, Claude Code:

1. Looks up the skill definition
2. Expands it into a detailed prompt (instructions for how to handle the task)
3. Claude executes that prompt as if you'd typed it yourself

This means a simple `/commit` actually becomes a multi-step workflow:
- Check git status
- Review staged and unstaged changes
- Analyze recent commit message style
- Draft an appropriate commit message
- Stage files and create the commit

## Built-in Skills

Claude Code comes with several pre-installed skills:

### `/commit`
Stages changes and creates a well-formatted commit with an AI-generated message.

### `/review-pr`
Reviews a pull request for bugs, security issues, and code quality.

### `/simplify`
Analyzes changed code for opportunities to improve reuse, quality, and efficiency.

## Finding Skills

Skills can come from:
- **Built into Claude Code** — always available
- **Community skills** — shared by other users
- **Your own custom skills** — defined in your project or global config

## When to Use Skills

Skills are ideal for:
- **Repetitive workflows** you do often (committing, reviewing, deploying)
- **Complex multi-step processes** that benefit from standardized execution
- **Team standardization** — everyone runs the same skill, gets consistent results
- **Domain-specific tasks** — WordPress development, Cloudflare deployments, etc.

## Next Steps

In the following lessons, we'll explore the built-in skills in detail and then learn how to create your own custom skills.
