---
title: "Project: Cloudflare Worker App"
description: Build a full-stack application on Cloudflare Workers with D1, KV, and R2.
sidebar:
  order: 3
---

Build a complete serverless application that uses the full Cloudflare stack — Workers, D1, KV, and R2.

## What You'll Build

A **URL shortener** with analytics:
- Create short URLs that redirect to long URLs
- Track clicks with timestamps and referrer data
- Dashboard showing click analytics
- Custom slug support
- API for programmatic access

## Architecture

```
┌─────────────────────┐
│  Astro Frontend      │  ← Cloudflare Pages
│  (Dashboard + Form)  │
├─────────────────────┤
│  Pages Functions     │  ← API layer
├─────────────────────┤
│  D1: URLs + Clicks   │  ← Persistent storage
│  KV: URL → slug map  │  ← Fast redirects
│  R2: Export files     │  ← CSV/JSON exports
└─────────────────────┘
```

## Step-by-Step

### 1. Setup

```
> Create a new Astro project for a URL shortener.
> Set up wrangler.toml with D1, KV, and R2 bindings.
> Create the D1 database and KV namespace.
```

### 2. Database Schema

```
> Create D1 migrations for:
> - urls (id, slug, target_url, created_at, click_count)
> - clicks (id, url_id, timestamp, referrer, country, user_agent)
> Add appropriate indexes.
```

### 3. Redirect Worker

```
> Create the redirect logic:
> - GET /:slug → look up in KV (fast), redirect to target URL
> - Record the click in D1 asynchronously (waitUntil)
> - If not in KV, check D1 and populate KV
> - Return 404 for unknown slugs
```

### 4. API Endpoints

```
> Create API endpoints:
> - POST /api/urls → create a new short URL
> - GET /api/urls → list all URLs with click counts
> - GET /api/urls/:slug/analytics → detailed click data
> - DELETE /api/urls/:slug → remove a URL
```

### 5. Dashboard

```
> Build the dashboard:
> - Form to create new short URLs
> - Table of all URLs with click counts
> - Click analytics chart for individual URLs
> - Export button (saves CSV to R2)
```

### 6. Deploy

```
> Deploy everything to Cloudflare:
> - Run D1 migrations
> - Deploy Pages + Functions
> - Test the full flow
```

## What You'll Practice

- Full Cloudflare stack integration
- D1 schema design and queries
- KV for caching and fast lookups
- R2 for file storage
- Workers cron triggers (optional: daily analytics summary)
- Claude Code for full-stack development

## Challenge Extensions

- Add QR code generation for short URLs
- Password-protected URLs
- Custom domains for branded short links
- API key authentication
- Webhook notifications on click milestones
