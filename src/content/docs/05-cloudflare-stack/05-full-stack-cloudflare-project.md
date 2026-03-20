---
title: Full-Stack Cloudflare Project
description: Build a complete application on Cloudflare's platform using Claude Code.
sidebar:
  order: 5
---

Let's tie everything together by building a complete full-stack application on Cloudflare — entirely with Claude Code's assistance.

## What We're Building

A **link bookmarking app** — save URLs with tags, search them, share collections. Simple enough to build in a lesson, complex enough to use every Cloudflare primitive.

### Architecture

```
┌─────────────────┐
│   Astro Frontend │  ← Cloudflare Pages
│   (Static + SSR) │
├─────────────────┤
│  Pages Functions │  ← API endpoints
├─────────────────┤
│     D1 Database  │  ← Bookmarks, tags, users
│     KV Store     │  ← Sessions, config
│     R2 Bucket    │  ← Screenshots, exports
└─────────────────┘
```

## Step 1: Scaffold with Claude

```
> Create a new Astro project for a bookmark manager.
> Use Tailwind for styling.
> Set up wrangler.toml with D1, KV, and R2 bindings.
```

## Step 2: Database Schema

```
> Create D1 migrations for:
> - bookmarks (id, url, title, description, created_at)
> - tags (id, name)
> - bookmark_tags (bookmark_id, tag_id)
> Add indexes for common queries.
```

## Step 3: API Endpoints

```
> Create Pages Functions for:
> - POST /api/bookmarks — save a new bookmark
> - GET /api/bookmarks — list bookmarks (with search and tag filter)
> - DELETE /api/bookmarks/:id — remove a bookmark
> - GET /api/tags — list all tags
> Use D1 for data storage.
```

## Step 4: Frontend

```
> Build the frontend pages:
> - Homepage with bookmark list and search
> - Add bookmark form
> - Tag management
> Use Astro components with Tailwind styling.
```

## Step 5: Storage Integration

```
> Add screenshot capture for bookmarked URLs:
> - When a bookmark is saved, take a screenshot (use a Worker)
> - Store the screenshot in R2
> - Display thumbnails in the bookmark list
```

## Step 6: Deploy

```
> Deploy the complete app to Cloudflare.
> Run migrations on the production D1 database.
> Verify everything works.
```

## What You've Used

By the end of this project, you've used:

- **Cloudflare Pages** — hosting the Astro frontend
- **Pages Functions** — serverless API endpoints
- **D1** — structured data storage
- **KV** — session and config storage
- **R2** — file/image storage
- **Claude Code** — building the entire thing
- **MCP** — managing Cloudflare resources
- **Wrangler** — local dev and deployment

## Exercise

Build it! Follow the steps above with Claude Code. The goal isn't a production-ready app — it's experiencing the full Cloudflare stack with AI assistance. Modify the idea to suit your interests:

- A recipe collection app
- A project/task tracker
- A code snippet manager
- A reading list with notes
