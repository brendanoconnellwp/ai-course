---
title: Scheduled Tasks & Crons
description: Automate recurring tasks with Cloudflare Workers Cron Triggers and Claude Code.
sidebar:
  order: 2
---

Some tasks need to run on a schedule — checking for updates, generating reports, cleaning up data. Cloudflare Workers Cron Triggers make this serverless and free.

## Cron Triggers on Cloudflare Workers

A Worker can be triggered on a schedule instead of (or in addition to) HTTP requests:

```toml
# wrangler.toml
[triggers]
crons = ["0 * * * *"]  # Every hour
```

```typescript
export default {
  // HTTP handler (optional)
  async fetch(request: Request, env: Env) {
    return new Response('OK');
  },

  // Cron handler
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    // This runs on schedule
    await checkForUpdates(env);
  },
};
```

## Common Scheduled Tasks

### Daily Site Health Check

```
> Create a Worker cron that runs daily and:
> 1. Checks that our main site returns 200
> 2. Checks response time
> 3. Stores the result in D1
> 4. Sends a Slack notification if anything is wrong
```

### Weekly Content Report

```
> Create a cron Worker that every Monday:
> 1. Queries D1 for content published last week
> 2. Generates engagement statistics
> 3. Creates a summary report
> 4. Stores it in R2
```

### Data Cleanup

```
> Create a cron that runs nightly and:
> 1. Deletes expired sessions from KV
> 2. Removes orphaned files from R2
> 3. Archives old records in D1
```

## Cron Schedule Syntax

```
┌─── minute (0-59)
│ ┌─── hour (0-23)
│ │ ┌─── day of month (1-31)
│ │ │ ┌─── month (1-12)
│ │ │ │ ┌─── day of week (0-6, Sun=0)
│ │ │ │ │
* * * * *
```

Common patterns:
- `*/5 * * * *` — every 5 minutes
- `0 * * * *` — every hour
- `0 0 * * *` — daily at midnight
- `0 0 * * 1` — every Monday
- `0 0 1 * *` — first of every month

## Building with Claude

Ask Claude to create the complete cron Worker:

```
> Create a Cloudflare Worker with a cron trigger that runs every 6 hours.
> It should:
> 1. Fetch our WordPress site's latest posts via REST API
> 2. Compare with what's stored in D1
> 3. If there are new posts, store them in D1
> 4. Log a summary of new posts found
>
> Include the wrangler.toml configuration.
```

Claude will create the Worker code, types, and Wrangler config — ready to deploy.

## Exercise

1. Think of a recurring task in your workflow
2. Ask Claude to build a cron Worker for it
3. Test locally with `wrangler dev`
4. Deploy and monitor with `wrangler tail`
