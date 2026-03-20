---
title: Connecting to Services
description: Set up MCP servers to connect Claude Code to Notion, GitHub, Cloudflare, and more.
sidebar:
  order: 2
---

Let's get hands-on and connect Claude Code to external services using MCP servers.

## Configuring MCP Servers

MCP servers are configured in your Claude Code settings:

### Global (all projects)
`~/.claude/settings.json`

### Per-project
`.claude/settings.json`

### Configuration Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-name"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## Example: Cloudflare MCP

Connect Claude to your Cloudflare account:

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://mcp.cloudflare.com/sse"],
      "env": {}
    }
  }
}
```

Once connected, Claude can:
- List your Workers, D1 databases, KV namespaces, and R2 buckets
- Query D1 databases directly
- Deploy Workers
- Manage Cloudflare resources

```
> List all my Cloudflare Workers

Claude uses: mcp__cloudflare__workers_list

  You have 3 workers:
  - api-proxy (last deployed: 2024-01-15)
  - image-resizer (last deployed: 2024-01-10)
  - auth-worker (last deployed: 2024-01-08)
```

## Example: Notion MCP

Connect Claude to your Notion workspace:

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-remote", "https://mcp.notion.com/sse"],
      "env": {}
    }
  }
}
```

Now Claude can:
- Search across your Notion workspace
- Read and create pages
- Query databases
- Add comments

```
> Search my Notion for the API architecture doc

Claude uses: mcp__notion__notion-search

  Found: "API Architecture v2" in Engineering workspace
  Last edited: January 12, 2024
```

## Example: GitHub (via CLI)

GitHub access typically works through the `gh` CLI rather than a dedicated MCP server, since Claude Code can run shell commands:

```
> Show me the open PRs on our repo

Claude runs: gh pr list --state open
```

But there are MCP servers for GitHub that provide richer integration if needed.

## Verifying Connections

After configuring an MCP server, restart Claude Code and check:

```
> What MCP tools do you have available?
```

Claude will list all tools from connected MCP servers.

## Troubleshooting

### Server won't start
- Check that Node.js is installed and `npx` works
- Verify the package name is correct
- Check environment variables (API keys, tokens)

### Authentication fails
- Most MCP servers use OAuth — you'll be prompted in browser on first use
- Some require API keys in the `env` config
- Check the specific server's documentation

### Tools not appearing
- Restart Claude Code after config changes
- Check for JSON syntax errors in settings
- Ensure the MCP server package is accessible

## Exercise

1. Choose one service you use daily (Notion, Cloudflare, etc.)
2. Add the MCP server config to your settings
3. Restart Claude Code
4. Ask Claude to interact with that service
5. Try both reading data and creating/modifying something
