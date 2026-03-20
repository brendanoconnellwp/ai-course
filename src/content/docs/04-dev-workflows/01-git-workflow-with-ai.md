---
title: Git Workflow with AI
description: Using Claude Code to supercharge your git workflow.
sidebar:
  order: 1
---

Git is one of the areas where Claude Code shines brightest. Claude understands git deeply and can handle everything from simple commits to complex rebases.

## Daily Git Operations

### Smart Commits

Instead of writing commit messages manually:

```
> /commit
```

Claude analyzes your changes, understands the intent, and writes a meaningful message. It matches your project's existing commit style.

### Branch Management

```
> Create a new branch for adding user authentication
```

Claude will create a descriptively named branch:
```bash
git checkout -b feature/add-user-authentication
```

### Understanding Changes

```
> What changed since the last release tag?
```

Claude runs `git log`, `git diff`, and summarizes the changes in plain language.

## Code Review Workflow

### Before Opening a PR

```
> Review all changes on this branch compared to main.
> Focus on security issues and potential bugs.
```

Claude will:
1. Run `git diff main...HEAD`
2. Analyze every change
3. Flag potential issues

### After Receiving Review Comments

```
> Read the PR comments on PR #42 and address them
```

Claude fetches comments via `gh`, understands the feedback, and makes the requested changes.

## Handling Merge Conflicts

```
> I have merge conflicts after rebasing on main. Help me resolve them.
```

Claude will:
1. Check which files have conflicts
2. Read the conflicting sections
3. Understand the intent of both sides
4. Resolve conflicts intelligently (not just picking one side)

## Git History Exploration

```
> When was the authentication system last modified and by whom?
```

```
> Show me how the database schema has evolved over the last 10 commits
```

```
> Find the commit that introduced the rate limiting bug
```

Claude uses `git log`, `git blame`, and `git bisect` concepts to track down answers.

## Best Practices

1. **Let Claude see the full diff** before committing — it writes better messages
2. **Use branches** — Claude is great at managing feature branches
3. **Review Claude's commits** — check the diff before pushing
4. **Don't force-push without understanding** — Claude will warn you about destructive operations
5. **Use conventional commits** — document the format in CLAUDE.md and Claude will follow it

## Exercise

1. Make some changes to a project
2. Use `/commit` to create a commit
3. Create a feature branch and make more changes
4. Ask Claude to summarize the branch's changes compared to main
5. Practice resolving a merge conflict with Claude's help
