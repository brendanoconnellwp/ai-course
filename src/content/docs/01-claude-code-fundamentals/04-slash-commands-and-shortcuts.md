---
title: Slash Commands & Shortcuts
description: Speed up your Claude Code workflow with built-in commands and keyboard shortcuts.
sidebar:
  order: 4
---

Claude Code has a set of built-in slash commands and keyboard shortcuts that make your workflow faster. These are worth memorizing early — they'll save you time on every session.

## Built-in Slash Commands

Type `/` in the Claude prompt to see all available commands:

### Session Management

| Command | Description |
|---|---|
| `/clear` | Clear conversation history and start fresh |
| `/compact` | Compress the conversation to save context window space |
| `/continue` | Continue the last conversation |
| `/cost` | Show token usage and estimated cost for this session |

### Configuration

| Command | Description |
|---|---|
| `/model` | Switch the active model (Opus, Sonnet, Haiku) |
| `/memory` | View and manage Claude's persistent memories |
| `/help` | Show help and available commands |

### Workflow

| Command | Description |
|---|---|
| `/commit` | Stage and commit changes with an AI-generated message |
| `/review` | Review code changes |

## Custom Slash Commands (Skills)

Beyond built-ins, you can use **Skills** — custom slash commands that expand into full prompts. We'll cover these in depth in the Skills module, but here's a preview:

```
/commit         → Stage and commit with a good message
/review-pr 123  → Review pull request #123
/simplify       → Review changed code for quality issues
```

## Keyboard Shortcuts

### In the Prompt

| Shortcut | Action |
|---|---|
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Up Arrow` | Recall previous message |
| `Tab` | Autocomplete file paths |
| `Ctrl+C` | Cancel current generation |
| `Ctrl+D` | Exit Claude Code |
| `Escape` | Cancel current input |

### During Tool Execution

When Claude is executing tool calls:

| Shortcut | Action |
|---|---|
| `y` or `Enter` | Approve the tool call |
| `n` | Deny the tool call |
| `Escape` | Stop generation |

## The Power of `/compact`

The `/compact` command deserves special attention. It compresses your conversation while preserving key context. Use it when:

- Your session is getting long and responses slow down
- Claude starts forgetting earlier context
- You've changed topics within a session
- You see a warning about approaching context limits

You can also add a message to guide the compression:

```
/compact focus on the authentication refactor we've been doing
```

## Exercise

1. Start a Claude session
2. Use `/model` to see available models
3. Ask Claude to create a simple file
4. Use `/cost` to check token usage
5. Use `/compact` to compress the conversation
6. Use `/cost` again — notice the reduced context
