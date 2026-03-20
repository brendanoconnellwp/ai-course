---
title: The CLI Interface
description: Understanding Claude Code's terminal interface, modes, and navigation.
sidebar:
  order: 1
---

Claude Code lives in your terminal. Understanding the interface is the first step to using it effectively.

## Launching Claude

```bash
# Interactive mode (most common)
claude

# One-shot mode (run a single prompt and exit)
claude -p "explain this error log"

# Pipe input to Claude
cat error.log | claude -p "what went wrong?"

# Resume your last conversation
claude --continue
```

## The Interactive Prompt

When you run `claude`, you get an interactive session:

```
> _
```

This is where you type natural language instructions. Claude reads your message, decides what tools to use, and takes action.

## Key Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Enter` | Send message |
| `Shift+Enter` | New line (multi-line input) |
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `/` | Open slash command menu |

## Slash Commands

Type `/` to see available commands:

- `/help` — show help
- `/clear` — clear conversation history
- `/compact` — compress conversation to save context
- `/model` — switch models mid-session
- `/cost` — show token usage and cost
- `/memory` — manage Claude's project memory

## Understanding Tool Calls

When Claude works, you'll see tool calls in your terminal:

```
Claude: I'll create that file for you.

📝 Write: src/index.html
───────────────────────
<html>
  <body>Hello World</body>
</html>
───────────────────────

Allow? [y/n]
```

Each tool call shows:
- **What tool** is being used (Read, Write, Edit, Bash, etc.)
- **What it will do** (the file path, command, etc.)
- **A preview** of the content or command
- **A permission prompt** (unless you've pre-approved it)

## Permission Modes

Claude Code has three permission modes:

1. **Ask every time** (default) — you approve each tool call
2. **Allow specific tools** — pre-approve safe operations like file reads
3. **YOLO mode** — auto-approve everything (use with caution!)

Configure permissions in `~/.claude/settings.json` or per-project in `.claude/settings.json`.

## Context Window

Claude has a context window limit. As your conversation grows, earlier messages get compressed. The `/compact` command forces this compression, which is useful when:

- You're running low on context
- The conversation has drifted from the original topic
- You want to "reset" while keeping key information

## Tips

- **Use one-shot mode for quick questions**: `claude -p "what does this regex do: ^[a-z]+$"`
- **Use `--continue` to pick up where you left off** after closing your terminal
- **Watch the cost with `/cost`** — Opus is powerful but uses more tokens
