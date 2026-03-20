---
title: What Is MCP?
description: Understanding the Model Context Protocol and why it matters.
sidebar:
  order: 1
---

The **Model Context Protocol (MCP)** is an open standard that lets AI models connect to external tools and data sources. It's what turns Claude from a smart assistant into a connected agent.

## The Problem MCP Solves

Without MCP, Claude Code can:
- Read and write files on your machine
- Run shell commands
- Search your codebase

That's powerful, but limited. What about:
- Your Notion workspace?
- Your Cloudflare dashboard?
- Your database on a remote server?
- Your project management tool?
- Your company's internal APIs?

MCP bridges this gap. It gives Claude a standardized way to discover and use external tools.

## How MCP Works

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Claude Code  │────▶│  MCP Server   │────▶│  External     │
│  (Client)     │◀────│  (Bridge)     │◀────│  Service      │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **MCP Client** (Claude Code) discovers available tools from MCP servers
2. **MCP Server** exposes tools that Claude can call (like "create_page", "query_database")
3. **External Service** (Notion, Cloudflare, GitHub, etc.) processes the actual request

The MCP server acts as a translator between Claude's tool-calling format and the external service's API.

## What MCP Servers Provide

An MCP server can expose three types of capabilities:

### Tools
Actions Claude can take — creating records, querying data, sending messages.

### Resources
Data Claude can read — documents, database records, configuration.

### Prompts
Pre-built prompt templates for common tasks with that service.

## Available MCP Servers

The MCP ecosystem is growing fast. Some notable servers:

| Server | What It Connects To |
|---|---|
| **Cloudflare** | Workers, D1, KV, R2, Pages |
| **Notion** | Pages, databases, comments |
| **GitHub** | Issues, PRs, repos |
| **Slack** | Channels, messages |
| **PostgreSQL** | Direct database queries |
| **Filesystem** | Extended file operations |
| **Brave Search** | Web search results |

## Why MCP Matters

Before MCP, connecting an AI to a new service required:
- Custom integration code
- Service-specific prompt engineering
- Brittle API wrappers

With MCP:
- **One protocol** to learn
- **Servers are reusable** across AI clients
- **Community-maintained** servers for popular services
- **You can build your own** for internal tools

## MCP in This Course

We'll use MCP extensively:
- **Module 3** (this module) — connecting to services and building servers
- **Module 5** — Cloudflare MCP for cloud infrastructure
- **Module 6** — MCP in automation pipelines
- **Module 7** — building projects with MCP integrations
