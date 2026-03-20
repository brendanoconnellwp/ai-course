---
title: Deploying with Claude
description: End-to-end deployment workflows using Claude Code and Cloudflare.
sidebar:
  order: 4
---

Deployment is where everything comes together. Claude Code can handle the entire flow from code to production.

## The Deployment Workflow

### 1. Build Verification

```
> Run the build and make sure there are no errors
```

Claude runs your build command, reads the output, and fixes any issues.

### 2. Pre-Deploy Checks

```
> Before deploying, check:
> - All tests pass
> - No TypeScript errors
> - No console.logs in production code
> - Environment variables are set
```

Claude runs through each check systematically.

### 3. Deploy

```
> Deploy to Cloudflare Pages
```

```bash
npx wrangler pages deploy dist --project-name my-app
```

### 4. Post-Deploy Verification

```
> Check that the deployment is live and the homepage loads
```

Claude can curl the deployed URL and verify it's responding.

## Wrangler Configuration

A complete `wrangler.toml` for a full-stack app:

```toml
name = "my-app"
compatibility_date = "2024-01-01"
pages_build_output_dir = "./dist"

# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "your-database-id"

# KV Namespace
[[kv_namespaces]]
binding = "KV"
id = "your-kv-id"

# R2 Bucket
[[r2_buckets]]
binding = "ASSETS"
bucket_name = "my-assets"

# Environment Variables
[vars]
ENVIRONMENT = "production"
```

## Local Development

```bash
# Pages with Functions
npx wrangler pages dev dist

# Workers
npx wrangler dev
```

Both commands start a local server with access to your Cloudflare bindings (D1, KV, R2) using local emulation.

## Creating a Deploy Skill

Automate your deployment with a custom skill:

```markdown
---
name: deploy
description: Build, verify, and deploy to Cloudflare
---

1. Run the build: `npm run build`
2. Run tests: `npm test`
3. Check for issues:
   - No TypeScript errors
   - No console.log statements in src/
   - Build output exists in dist/
4. Deploy: `npx wrangler pages deploy dist --project-name PROJECT_NAME`
5. Verify the deployment URL responds with 200
6. Report the deployment URL
```

Now deployment is just:
```
> /deploy
```

## Exercise

1. Set up a `wrangler.toml` for your project
2. Test locally with `wrangler pages dev`
3. Deploy to Cloudflare Pages
4. Create a custom `/deploy` skill for your workflow
5. Use the Cloudflare MCP to verify the deployment
