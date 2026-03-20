---
title: Sub-Agents & Parallel Tasks
description: How Claude Code uses sub-agents to handle complex, multi-step tasks efficiently.
sidebar:
  order: 6
---

When Claude Code encounters complex tasks, it can spawn **sub-agents** — specialized child processes that handle specific parts of the work independently. This is one of the features that makes Claude Code truly agentic.

## What Are Sub-Agents?

Sub-agents are separate Claude instances that the main Claude session launches to handle subtasks. They:

- Run in parallel with the main session
- Have their own focused context
- Return results to the parent session
- Can use all the same tools (Read, Write, Bash, etc.)

## When Claude Uses Sub-Agents

Claude automatically spawns sub-agents for tasks like:

- **Codebase exploration** — searching across many files simultaneously
- **Multi-file operations** — making coordinated changes across a large codebase
- **Research tasks** — looking up information from multiple sources
- **Complex refactors** — analyzing dependencies before making changes

## Agent Types

Claude Code has several specialized agent types:

| Agent | Purpose |
|---|---|
| **Explore** | Fast codebase exploration — finding files, searching code |
| **Plan** | Architectural planning — designing implementation strategies |
| **Code Review** | Reviewing code for bugs, security, and quality |
| **Code Architect** | Designing feature architectures based on existing patterns |
| **Code Explorer** | Deep analysis of existing features and execution paths |

## Observing Sub-Agents

When Claude spawns sub-agents, you'll see them in your terminal. The main session coordinates while sub-agents do focused work.

```
> Refactor all API endpoints to use the new error handling pattern

Claude: I'll analyze the codebase and make changes across all endpoints.

🔍 Agent (Explore): Finding all API endpoint files...
🔍 Agent (Explore): Analyzing current error handling patterns...
📝 Edit: src/api/users.ts
📝 Edit: src/api/posts.ts
📝 Edit: src/api/auth.ts
```

## Leveraging Sub-Agents Effectively

### Give Context-Rich Prompts
The more context you provide, the better Claude can delegate:

```
# Good — clear scope for delegation
> Refactor the authentication module to use JWT tokens.
> The current session-based auth is in src/auth/.
> Tests are in tests/auth/. Update both.

# Less effective — vague scope
> Fix the auth
```

### Trust the Exploration
When Claude spawns Explore agents, let them work. They're scanning your codebase to make informed decisions rather than guessing.

### Watch for Coordination
Sub-agents are powerful but they work independently. For changes that need tight coordination (like renaming a function and all its callers), Claude typically handles these sequentially rather than in parallel.

## Exercise

1. Open a medium-sized project (or clone one)
2. Ask Claude a broad question: "How is error handling done across this codebase?"
3. Watch Claude spawn Explore agents to research
4. Follow up: "Standardize the error handling to use a consistent pattern"
5. Watch Claude coordinate changes across files
