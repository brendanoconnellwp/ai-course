---
title: Multi-Instance Workflows
description: Run multiple Claude Code sessions in parallel for maximum productivity.
sidebar:
  order: 5
---

One of Claude Code's under-appreciated features is that you can run multiple instances simultaneously. This unlocks powerful parallel workflows.

## Why Multiple Instances?

Each Claude Code session has its own:
- Conversation context
- Task focus
- Tool execution queue

Running multiple instances lets you:
- **Work on different parts of a project simultaneously**
- **Keep a "research" session open while a "build" session works**
- **Run long operations without blocking your main session**

## Setting It Up

Most terminal applications support split panes:

### VS Code Terminal
- `Ctrl+Shift+5` (Windows/Linux) or `Cmd+Shift+5` (Mac) to split
- Run `claude` in each pane

### Windows Terminal
- `Alt+Shift+D` to split the pane
- Run `claude` in each pane

### iTerm2 (Mac)
- `Cmd+D` for vertical split, `Cmd+Shift+D` for horizontal
- Run `claude` in each pane

## Parallel Workflow Patterns

### Pattern 1: Build + Research
```
Left pane:  Claude building your feature
Right pane: Claude researching API docs or exploring related code
```

### Pattern 2: Frontend + Backend
```
Left pane:  Claude working on React components
Right pane: Claude building API endpoints
```

### Pattern 3: Code + Tests
```
Left pane:  Claude writing implementation
Right pane: Claude writing tests for the same feature
```

### Pattern 4: Main + Review
```
Left pane:  Claude making changes
Right pane: Claude reviewing the changes in real-time
```

## Tips for Multi-Instance Work

1. **Give each instance clear scope** — "You're working on the frontend header component" vs "You're working on the API routes"
2. **Use CLAUDE.md** — both instances read it, keeping them aligned on conventions
3. **Be aware of conflicts** — two instances editing the same file can cause issues
4. **Use git branches** — have each instance work on a different branch if changes might conflict
5. **Monitor cost** — each instance uses tokens independently

## Worktrees for Isolation

For truly independent parallel work, use git worktrees:

```bash
# Create a worktree for a feature branch
git worktree add ../my-project-feature feature-branch

# Run Claude in the worktree
cd ../my-project-feature
claude
```

Each worktree is a separate copy of your repo on a different branch. No file conflicts possible.

## Exercise

1. Open two terminal panes side by side
2. Run `claude` in both
3. In pane 1: ask Claude to create a simple API
4. In pane 2: ask Claude to create tests for that API
5. Watch them work in parallel
