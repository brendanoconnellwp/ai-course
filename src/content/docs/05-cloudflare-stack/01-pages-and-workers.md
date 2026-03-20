---
title: Pages & Workers
description: Deploy static sites and serverless functions on Cloudflare with AI assistance.
sidebar:
  order: 1
---

Cloudflare's edge platform is a perfect match for AI-assisted development. Claude can build, configure, and deploy to Cloudflare directly.

## Cloudflare Pages

Pages is Cloudflare's platform for deploying static sites and full-stack applications.

### Why Pages?

- **Free tier** is generous (500 builds/month, unlimited bandwidth)
- **Global CDN** — your site is served from 300+ edge locations
- **Git integration** — push to deploy
- **Preview deployments** — every branch gets a unique URL

### Deploying This Course (Meta Example)

This course site is built with Astro and deployed to Cloudflare Pages. Here's how Claude set it up:

```
> Set up Cloudflare Pages deployment for this Astro site
```

Claude creates `wrangler.toml`:
```toml
name = "ai-course"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"
```

And configures the build:
```bash
npx wrangler pages deploy dist --project-name ai-course
```

### With MCP

If you have the Cloudflare MCP server configured, Claude can interact with Pages directly:

```
> List my Cloudflare Pages projects
> Deploy the current build to production
```

## Cloudflare Workers

Workers are serverless functions that run at the edge — no cold starts, global distribution.

### Creating a Worker with Claude

```
> Create a Cloudflare Worker that proxies API requests
> to my WordPress site, adding caching headers
```

Claude generates:

```typescript
// src/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const wpUrl = `https://mysite.com/wp-json${url.pathname.replace('/api', '')}`;
      const response = await fetch(wpUrl);

      return new Response(response.body, {
        headers: {
          ...Object.fromEntries(response.headers),
          'Cache-Control': 'public, max-age=300',
          'CDN-Cache-Control': 'max-age=3600',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};
```

### Deploying Workers

```bash
npx wrangler deploy
```

Or via Claude:
```
> Deploy this Worker to Cloudflare
```

## Pages + Workers Together

Modern Cloudflare apps combine both:
- **Pages** serves the frontend (HTML, CSS, JS)
- **Workers** (via Pages Functions) handle server-side logic

```
project/
├── src/           # Frontend (Astro, React, etc.)
├── functions/     # Pages Functions (Workers at /api/*)
│   └── api/
│       └── users.ts
└── wrangler.toml
```

## Exercise

1. Create a simple Astro or HTML site
2. Deploy it to Cloudflare Pages using Wrangler
3. Add a Pages Function (API endpoint)
4. Test the full stack locally with `wrangler pages dev`
