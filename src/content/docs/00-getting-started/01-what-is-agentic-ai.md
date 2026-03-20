---
title: What Is Agentic AI?
description: Understanding the shift from chatbots to AI agents that can take action on your behalf.
sidebar:
  order: 1
---

The AI landscape has shifted dramatically. We've moved past the era of "ask a chatbot a question, get a text response" into something far more powerful: **agentic AI** — AI systems that can take actions, use tools, and complete multi-step tasks autonomously.

## Chat AI vs. Agentic AI

| | Chat AI | Agentic AI |
|---|---|---|
| **Input** | Text prompt | Task description |
| **Output** | Text response | Completed work |
| **Tools** | None | File system, APIs, databases, shell |
| **Memory** | Single conversation | Persistent project context |
| **Autonomy** | You do the work | It does the work, you review |

## Why This Matters for Developers

As a developer, you already have the mental models to benefit from agentic AI more than most people:

- **You understand files and directories** — AI agents work with your actual codebase
- **You understand APIs** — agents can call them on your behalf
- **You understand version control** — agents can commit, branch, and create PRs
- **You understand deployment** — agents can ship your code to production

The gap between "I know how to do this manually" and "I can instruct an AI agent to do this" is surprisingly small.

## The Tools in This Space

The agentic AI ecosystem is evolving fast. Here are the major players:

- **Claude Code** — Anthropic's CLI agent (the primary focus of this course)
- **Cursor / Windsurf** — AI-powered code editors
- **GitHub Copilot** — AI pair programming in your editor
- **Aider** — Open-source AI coding assistant
- **OpenAI Codex CLI** — OpenAI's terminal-based agent

We focus on Claude Code because it's the most capable general-purpose coding agent available today, and its extensibility (MCP, Skills, Hooks) makes it a platform, not just a tool.

## What You'll Be Able to Do

By the end of this course, you'll be able to:

1. Use Claude Code to build, debug, and deploy applications
2. Connect Claude to external services via MCP servers
3. Create custom skills and automation hooks
4. Build and deploy on the Cloudflare stack (Pages, Workers, D1, KV, R2)
5. Design AI-assisted workflows for your specific needs
6. Build WordPress plugins and themes with AI assistance

Let's get set up.
