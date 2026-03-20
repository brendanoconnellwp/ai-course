---
title: Building Your Own MCP Server
description: Create a custom MCP server to connect Claude to your own tools and APIs.
sidebar:
  order: 3
---

When there's no existing MCP server for a service you use, you can build your own. This is simpler than it sounds.

## When to Build Your Own

- Your company has internal APIs Claude should access
- You use a niche service without a community MCP server
- You want to expose a database or tool in a controlled way
- You need custom logic between Claude and an external service

## MCP Server Architecture

An MCP server is a program that:
1. Communicates with Claude Code via stdio (stdin/stdout)
2. Declares what tools/resources it provides
3. Handles tool calls and returns results

## Building with the TypeScript SDK

The official `@modelcontextprotocol/sdk` makes this straightforward.

### Setup

```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

### Basic Server

```typescript
// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-custom-server",
  version: "1.0.0",
});

// Define a tool
server.tool(
  "get_weather",
  "Get current weather for a city",
  {
    city: z.string().describe("City name"),
  },
  async ({ city }) => {
    // Your logic here — call an API, query a database, etc.
    const response = await fetch(
      `https://api.weather.example/current?city=${encodeURIComponent(city)}`
    );
    const data = await response.json();

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Compile and Run

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/"]
}
```

```bash
npx tsc
node dist/index.js
```

## Registering Your Server

Point Claude Code at your server in settings:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

## Real-World Example: WordPress REST API Server

Here's a practical example — an MCP server that connects Claude to a WordPress site:

```typescript
server.tool(
  "wp_get_posts",
  "Get posts from WordPress",
  {
    post_type: z.string().default("posts"),
    per_page: z.number().default(10),
  },
  async ({ post_type, per_page }) => {
    const response = await fetch(
      `${process.env.WP_URL}/wp-json/wp/v2/${post_type}?per_page=${per_page}`,
      {
        headers: {
          Authorization: `Basic ${btoa(
            `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
          )}`,
        },
      }
    );
    const posts = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
    };
  }
);

server.tool(
  "wp_create_post",
  "Create a new WordPress post",
  {
    title: z.string(),
    content: z.string(),
    status: z.enum(["draft", "publish"]).default("draft"),
  },
  async ({ title, content, status }) => {
    const response = await fetch(
      `${process.env.WP_URL}/wp-json/wp/v2/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(
            `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
          )}`,
        },
        body: JSON.stringify({ title, content, status }),
      }
    );
    const post = await response.json();
    return {
      content: [{ type: "text", text: `Created post #${post.id}: ${post.link}` }],
    };
  }
);
```

## Testing Your Server

The MCP Inspector tool lets you test servers without Claude Code:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

This opens a web UI where you can call tools and see responses.

## Exercise

1. Create a simple MCP server with one tool (e.g., a random quote generator)
2. Register it in your Claude Code settings
3. Restart Claude and verify the tool appears
4. Ask Claude to use the tool
5. Expand the server with additional tools
