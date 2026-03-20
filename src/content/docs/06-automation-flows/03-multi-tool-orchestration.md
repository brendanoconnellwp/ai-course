---
title: Multi-Tool Orchestration
description: Combining Claude Code, MCP servers, and external tools into powerful workflows.
sidebar:
  order: 3
---

The real power of AI-assisted development emerges when you orchestrate multiple tools together. Claude Code acts as the conductor, coordinating between different systems.

## What Is Multi-Tool Orchestration?

Instead of using one tool at a time, you chain them:

```
Email → Cloudflare Worker → GitHub Issue → Claude Code → PR → Deploy
```

Claude coordinates the entire flow in a single session.

## Pattern: Spec-to-Deployment

```
> Read the feature spec from our Notion workspace,
> implement it, create a PR, and deploy to staging.
```

Claude's workflow:
1. **Notion MCP** → Reads the feature specification
2. **File tools** → Creates/modifies code based on the spec
3. **Bash** → Runs tests to verify the implementation
4. **Git** → Creates a branch and commits
5. **GitHub CLI** → Creates a pull request
6. **Cloudflare MCP** → Deploys to staging environment

For a complete working example of this pattern applied to WordPress, see the [Agentic WordPress Pipeline case study](/04-dev-workflows/08-agentic-wordpress-pipeline/).

## Pattern: Issue-Driven Development

```
> Look at the top-priority GitHub issue, fix it,
> write tests, and open a PR.
```

1. **GitHub CLI** → Fetches issue details
2. **Grep/Read** → Finds relevant code
3. **Edit** → Implements the fix
4. **Bash** → Writes and runs tests
5. **Git + GitHub** → Branch, commit, PR

## Pattern: Data-Driven Content

```
> Query our D1 database for the top performing products,
> generate marketing copy for each,
> and create draft Notion pages for review.
```

1. **Cloudflare MCP** → Queries D1 for product data
2. **Claude** → Generates marketing copy
3. **Notion MCP** → Creates draft pages

## Setting Up for Orchestration

### Your MCP Stack

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://mcp.cloudflare.com/sse"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://mcp.notion.com/sse"]
    }
  }
}
```

### Your CLAUDE.md

```markdown
## Available Integrations
- Cloudflare: Full access (Pages, Workers, D1, KV, R2)
- Notion: Engineering workspace
- GitHub: via gh CLI (already authenticated)

## Workflow Conventions
- Always create a feature branch before making changes
- Run tests before creating PRs
- Deploy to staging before production
- Update Notion docs after significant changes
```

## Tips for Orchestration

1. **Start with two tools**, then add more as you get comfortable
2. **Define the workflow in CLAUDE.md** so Claude follows it consistently
3. **Use skills for repeatable workflows** — `/deploy`, `/spec-to-code`, etc.
4. **Review at each step** — don't auto-approve everything in a complex chain
5. **Log the workflow** — hooks can track what Claude does across tools

## Exercise

1. Configure at least two MCP servers
2. Define a multi-step workflow in your CLAUDE.md
3. Ask Claude to execute the full workflow
4. Note which steps needed your intervention
5. Refine the workflow based on what you learned
