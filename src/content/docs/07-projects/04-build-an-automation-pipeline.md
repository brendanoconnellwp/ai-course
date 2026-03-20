---
title: "Project: Automation Pipeline"
description: Build a complete automation pipeline that connects multiple services using MCP and Claude Code.
sidebar:
  order: 4
---

Build an automation pipeline that demonstrates the power of connecting multiple services through Claude Code and MCP.

:::tip[Real-World Reference]
Before starting this project, read the [Agentic WordPress Pipeline case study](/04-dev-workflows/08-agentic-wordpress-pipeline/) — it's a working version of this pattern that turns client emails into deployed WordPress features in 10 minutes. The project below adapts the same architecture for a content publishing workflow.
:::

## What You'll Build

A **content publishing pipeline** that automates the journey from idea to published content:

```
Notion (ideas) → Claude (draft) → GitHub (review) → Astro (site) → Cloudflare (deploy)
```

## The Pipeline

### Stage 1: Content Intake
Pull content ideas from a Notion database with fields for:
- Title
- Topic/category
- Key points to cover
- Target audience
- Status (idea → drafting → review → published)

### Stage 2: Draft Generation
Using Claude Code to:
- Read the content brief from Notion
- Generate a markdown draft
- Include code examples where relevant
- Add frontmatter for the Astro site

### Stage 3: Review & Publish
- Create a GitHub PR with the new content
- Review the content for quality
- Merge and trigger Cloudflare deployment
- Update the Notion status to "published"

## Step-by-Step

### 1. Notion Setup

```
> Help me create a Notion database structure for content planning.
> Fields: Title, Topic, Key Points, Target Audience, Status, Published URL
```

### 2. Pipeline Script

```
> Create a Node.js script that:
> 1. Connects to Notion API and fetches items with status "ready"
> 2. For each item, generates a markdown file using the Claude API
> 3. Saves to the Astro content directory
> 4. Creates a git branch and commits
> 5. Opens a PR via GitHub CLI
```

### 3. Custom MCP Server

```
> Create an MCP server for the pipeline that exposes:
> - fetch_ready_content → get content briefs from Notion
> - generate_draft → create markdown from a brief
> - publish_content → commit, push, deploy, update Notion
```

### 4. Pipeline Skill

```
> Create a Claude Code skill /publish that runs the full pipeline:
> 1. Check Notion for ready content
> 2. Show me the briefs and let me pick which to process
> 3. Generate and save the draft
> 4. Create a PR for review
> 5. After approval, deploy and update Notion
```

### 5. Scheduled Automation

```
> Create a Cloudflare Worker cron that:
> - Runs daily at 9 AM
> - Checks Notion for content due today
> - Sends a notification (webhook) with the day's content tasks
```

## What You'll Practice

- Multi-service orchestration
- MCP server development
- Custom skill creation
- Cloudflare Workers and cron triggers
- Content automation workflows
- The full AI-assisted development loop

## Adapt to Your Workflow

This pipeline pattern works for any content flow:
- **Agency**: Client request → proposal → implementation → delivery
- **E-commerce**: Product data → description → listing → publish
- **Documentation**: API change → doc update → review → deploy
- **Marketing**: Campaign brief → assets → approval → launch

The tools (Notion, GitHub, Cloudflare) are interchangeable. The pattern is what matters.

## Challenge Extensions

- Add image generation with an AI image API
- Include SEO optimization checks before publishing
- Build a dashboard showing pipeline metrics
- Add Slack notifications at each stage
- Create an approval workflow for multi-person teams
