---
title: Hooks & Automation
description: Trigger custom actions automatically when Claude Code performs specific operations.
sidebar:
  order: 4
---

Hooks let you run shell commands automatically in response to Claude Code events. They're the bridge between Claude's actions and your custom tooling.

## What Are Hooks?

Hooks are shell commands that execute when specific events occur in Claude Code. Think of them like git hooks, but for AI actions.

## Configuring Hooks

Hooks are defined in your settings files:

- `~/.claude/settings.json` — global hooks
- `.claude/settings.json` — project-specific hooks

```json
{
  "hooks": {
    "tool_call": [
      {
        "tool": "Write",
        "command": "echo 'File written: $FILE_PATH' >> /tmp/claude-log.txt"
      }
    ],
    "prompt_submit": [
      {
        "command": "echo 'Prompt submitted at $(date)' >> /tmp/claude-log.txt"
      }
    ]
  }
}
```

## Hook Events

| Event | When It Fires |
|---|---|
| `tool_call` | Before a tool is executed |
| `prompt_submit` | When you submit a message |
| `session_start` | When a Claude session begins |

## Practical Hook Examples

### Auto-Format on Write

Run Prettier whenever Claude writes a file:

```json
{
  "hooks": {
    "tool_call": [
      {
        "tool": "Write",
        "command": "npx prettier --write $FILE_PATH"
      }
    ]
  }
}
```

### Lint Check on Edit

Run ESLint after Claude edits a JavaScript/TypeScript file:

```json
{
  "hooks": {
    "tool_call": [
      {
        "tool": "Edit",
        "pattern": "*.{js,ts,jsx,tsx}",
        "command": "npx eslint --fix $FILE_PATH"
      }
    ]
  }
}
```

### Audit Log

Log all Claude actions for review:

```json
{
  "hooks": {
    "tool_call": [
      {
        "command": "echo \"$(date): $TOOL_NAME on $FILE_PATH\" >> .claude/audit.log"
      }
    ]
  }
}
```

## Hooks vs. Skills

| | Hooks | Skills |
|---|---|---|
| **Trigger** | Automatic (event-driven) | Manual (you invoke them) |
| **Purpose** | Side effects and guardrails | Complete workflows |
| **Examples** | Auto-format, lint, log | Deploy, review, commit |
| **Scope** | Individual tool calls | Multi-step processes |

## Use Cases

- **Code quality enforcement** — auto-lint and format
- **Security guardrails** — block writes to sensitive directories
- **Logging and auditing** — track what Claude does
- **Integration triggers** — notify Slack, update tickets
- **Build validation** — run type checks after edits

## Exercise

1. Add a simple logging hook to your project's `.claude/settings.json`
2. Run a Claude session and make some changes
3. Check the log to see what was captured
4. Add a formatting hook for your preferred language
