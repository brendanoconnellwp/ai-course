---
title: Built-in Skills Deep Dive
description: Mastering the skills that ship with Claude Code.
sidebar:
  order: 2
---

Let's go deeper on the skills that come bundled with Claude Code and how to get the most out of them.

## /commit — Smart Git Commits

The `/commit` skill is probably the one you'll use most. Here's what it does behind the scenes:

### The Workflow
1. Runs `git status` to see all changes
2. Runs `git diff` to understand what changed
3. Reads recent `git log` to match your commit message style
4. Analyzes the changes to categorize them (feature, fix, refactor, etc.)
5. Drafts a concise commit message
6. Stages relevant files and creates the commit

### Tips
- **Stage files yourself first** if you only want to commit specific changes
- **Let Claude see the full diff** — it writes better messages with more context
- Claude will **warn you about sensitive files** (.env, credentials) and skip them

### Example
```
> /commit

Claude: Looking at the changes...

  Modified: src/api/auth.ts (added rate limiting)
  Modified: src/middleware/rateLimit.ts (new file)
  Modified: package.json (added rate-limiter-flexible)

  Commit message: "Add rate limiting to auth endpoints

  - Implement token bucket rate limiting on login/register
  - Add rate-limiter-flexible package
  - Configure 10 requests per minute per IP"

  Proceed? [y/n]
```

## /review-pr — Pull Request Reviews

Reviews a PR for issues before merge.

```
> /review-pr 42
```

Claude will:
- Fetch the PR diff from GitHub
- Analyze for bugs, security issues, performance problems
- Check code quality and consistency
- Provide a structured review

## /simplify — Code Quality Check

After making changes, run `/simplify` to have Claude review your work:

```
> /simplify
```

Claude analyzes recently changed code for:
- Duplicate logic that could be consolidated
- Overly complex implementations
- Performance issues
- Opportunities to use existing utilities

## Combining Skills with Regular Prompts

Skills work alongside normal conversation:

```
> Create a new API endpoint for user profiles
[Claude builds the endpoint]

> /simplify
[Claude reviews what it just built]

> /commit
[Claude commits the changes]
```

This is a natural development loop: **build → review → commit**.
