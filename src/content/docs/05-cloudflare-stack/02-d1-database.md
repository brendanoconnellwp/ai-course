---
title: D1 Database
description: Using Cloudflare's serverless SQLite database with AI-assisted development.
sidebar:
  order: 2
---

D1 is Cloudflare's serverless SQL database. It's SQLite at the edge — familiar SQL syntax, zero server management, and it works seamlessly with Workers and Pages.

## Why D1?

- **SQLite compatible** — you already know the syntax
- **Serverless** — no database servers to manage
- **Edge-located** — data lives close to your users
- **Free tier** — 5GB storage, 5M rows read/day, 100K rows written/day
- **MCP accessible** — Claude can query it directly

## Creating a D1 Database

### Via Wrangler CLI

```bash
npx wrangler d1 create my-app-db
```

### Via Claude with MCP

```
> Create a new D1 database called "course-db"
```

Claude uses the Cloudflare MCP to create it directly.

## Schema Design with Claude

```
> Create a D1 schema for a simple blog:
> - posts (id, title, slug, content, published_at, status)
> - tags (id, name, slug)
> - post_tags (post_id, tag_id)
```

Claude generates the migration:

```sql
-- migrations/0001_initial.sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  published_at TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_tags_slug ON tags(slug);
```

### Run the migration

```bash
npx wrangler d1 execute my-app-db --file=migrations/0001_initial.sql
```

## Querying D1 from Workers

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const posts = await env.DB.prepare(
      'SELECT * FROM posts WHERE status = ? ORDER BY published_at DESC LIMIT ?'
    ).bind('published', 10).all();

    return Response.json(posts.results);
  },
};
```

## Querying D1 via MCP

With the Cloudflare MCP server, Claude can query your D1 databases directly:

```
> Query the course-db D1 database:
> SELECT COUNT(*) as total, status FROM posts GROUP BY status
```

This is incredibly useful for:
- Checking data during development
- Debugging production issues
- Generating reports

## Exercise

1. Create a D1 database
2. Ask Claude to design a schema for your use case
3. Run the migration
4. Create a Worker that reads from D1
5. Use the Cloudflare MCP to query the database directly
