---
title: AI Content Pipelines
description: Build automated content creation and processing workflows with Claude Code.
sidebar:
  order: 1
---

One of the most practical applications of AI tooling is automating content workflows — transforming, enriching, and publishing content with minimal manual effort.

## What Is a Content Pipeline?

A content pipeline is a series of automated steps that process content from input to output:

```
Source → Transform → Enrich → Format → Publish
```

With Claude Code, each step can be AI-powered.

## Pipeline Example: Blog Post Workflow

### Input
A rough outline or notes in a markdown file.

### Pipeline Steps

```
> Read my outline at @notes/post-idea.md
> and create a full blog post:
> 1. Expand the outline into full paragraphs
> 2. Add code examples where relevant
> 3. Create a meta description for SEO
> 4. Generate frontmatter (title, date, tags, description)
> 5. Save to src/content/blog/[slug].md
```

## Pipeline Example: Documentation Generation

```
> Read all the API route files in src/app/api/
> For each endpoint:
> 1. Extract the HTTP method, path, and parameters
> 2. Read the request/response types
> 3. Generate API documentation in markdown
> 4. Save to docs/api/[endpoint].md
```

## Pipeline Example: WordPress Content Import

```
> Fetch all published posts from my WordPress REST API:
> curl http://mysite.local/wp-json/wp/v2/posts?per_page=100
>
> For each post:
> 1. Convert the HTML content to clean markdown
> 2. Extract and download featured images
> 3. Create frontmatter from WP metadata
> 4. Save as markdown files for the Astro site
```

## Building Reusable Pipelines

### As a Skill

```markdown
---
name: content-pipeline
description: Process content files through the standard pipeline
---

For each markdown file in the input directory:

1. Read the file
2. Check for required frontmatter (title, description, date)
3. Add missing frontmatter with AI-generated values
4. Lint the markdown for formatting issues
5. Generate a summary for social media sharing
6. Move to the output directory

Report a summary of processed files when done.
```

### As a Script

For complex pipelines, Claude can write a Node.js script:

```
> Create a content pipeline script that:
> 1. Reads markdown files from content/drafts/
> 2. Validates frontmatter
> 3. Optimizes any images referenced
> 4. Generates social media preview text
> 5. Moves processed files to content/ready/
```

## Tips for Content Pipelines

1. **Start manual, then automate** — run the pipeline with Claude interactively first, then convert to a skill or script
2. **Validate outputs** — always review AI-generated content before publishing
3. **Version control everything** — content files in git means you can review and revert
4. **Batch process** — Claude handles multiple files well, process in batches

## Exercise

1. Gather 5-10 pieces of raw content (notes, outlines, drafts)
2. Define your pipeline steps
3. Run the pipeline with Claude Code interactively
4. Review the outputs
5. Convert the workflow into a reusable skill
