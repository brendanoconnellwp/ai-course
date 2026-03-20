---
title: KV & R2 Storage
description: Key-value storage and object storage on Cloudflare's edge network.
sidebar:
  order: 3
---

Beyond D1's relational database, Cloudflare offers two more storage primitives: **KV** for fast key-value lookups and **R2** for object/file storage.

## KV (Key-Value Store)

KV is a global, low-latency key-value store. Think of it as Redis at the edge.

### Best For
- Configuration and feature flags
- Session data
- Caching API responses
- Simple counters and metadata

### Creating a KV Namespace

```bash
npx wrangler kv namespace create "MY_KV"
```

Or via Claude + MCP:
```
> Create a KV namespace called "site-config"
```

### Using KV in Workers

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Read
    const value = await env.MY_KV.get('site-title');

    // Write
    await env.MY_KV.put('last-visit', new Date().toISOString());

    // Write with expiration (TTL in seconds)
    await env.MY_KV.put('cache:api-response', JSON.stringify(data), {
      expirationTtl: 3600
    });

    // Delete
    await env.MY_KV.delete('old-key');

    // List keys
    const keys = await env.MY_KV.list({ prefix: 'cache:' });

    return Response.json({ title: value });
  },
};
```

### KV Characteristics
- **Eventually consistent** — writes propagate globally in ~60 seconds
- **Read-heavy workloads** — optimized for reads, not rapid writes
- **25MB max value size**
- **String or ArrayBuffer values**

## R2 (Object Storage)

R2 is Cloudflare's S3-compatible object storage. Zero egress fees.

### Best For
- Image and file uploads
- Static assets
- Backups
- Large data sets

### Creating an R2 Bucket

```bash
npx wrangler r2 bucket create my-assets
```

### Using R2 in Workers

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'GET') {
      // Get an object
      const object = await env.MY_BUCKET.get(url.pathname.slice(1));
      if (!object) return new Response('Not Found', { status: 404 });

      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        },
      });
    }

    if (request.method === 'PUT') {
      // Upload an object
      await env.MY_BUCKET.put(url.pathname.slice(1), request.body, {
        httpMetadata: {
          contentType: request.headers.get('Content-Type') || 'application/octet-stream',
        },
      });
      return new Response('Uploaded', { status: 201 });
    }

    return new Response('Method Not Allowed', { status: 405 });
  },
};
```

## KV vs R2 vs D1

| Feature | KV | R2 | D1 |
|---|---|---|---|
| **Data model** | Key-value | Objects/files | Relational (SQL) |
| **Max item size** | 25 MB | 5 TB | Row-based |
| **Best for** | Config, cache | Files, assets | Structured data |
| **Query** | By key | By key | SQL |
| **Consistency** | Eventual | Strong | Strong |
| **Cost** | Very cheap | Zero egress | Very cheap |

## Combining All Three

A typical full-stack Cloudflare app uses all three:

```
User uploads profile photo → R2 (store the image)
User profile data → D1 (structured user record)
User session token → KV (fast auth lookups)
```

## Exercise

1. Create a KV namespace and store some configuration values
2. Create an R2 bucket and upload a file
3. Build a Worker that reads from both KV and R2
4. Use the Cloudflare MCP to list and inspect your storage
