---
title: "Project: Build a Docs Site"
description: Build and deploy a documentation site with Astro Starlight and Cloudflare Pages — the same stack as this course.
sidebar:
  order: 1
---

In this project, you'll build a documentation site from scratch — the same way this course site was built. This is a meta-project: you're learning the tools by building with the tools.

## What You'll Build

A documentation/course site using:
- **Astro Starlight** for the docs framework
- **Markdown files** for content
- **Cloudflare Pages** for hosting
- **Claude Code** for the entire build process

## Step-by-Step

### 1. Scaffold the Project

```
> Create a new Astro project using the Starlight template.
> Configure it for a documentation site about [your topic].
> Set up the sidebar with 3-4 sections.
```

### 2. Customize the Theme

```
> Customize the Starlight theme:
> - Set a custom accent color
> - Update the site title and description
> - Add social links to the header
> - Configure a custom CSS file for brand colors
```

### 3. Create Content Structure

```
> Create the content directory structure with placeholder
> markdown files for each lesson. Include proper frontmatter
> with titles, descriptions, and sidebar ordering.
```

### 4. Write Initial Content

```
> Write the first 3 lessons for section 1.
> The topic is [your topic]. Make them practical
> with code examples and exercises.
```

### 5. Deploy to Cloudflare

```
> Set up Cloudflare Pages deployment:
> - Create wrangler.toml
> - Build the site
> - Deploy to Pages
> - Verify the deployment
```

### 6. Set Up CI/CD

```
> Configure GitHub Actions to automatically deploy
> to Cloudflare Pages when I push to the main branch.
```

## What You'll Practice

- Astro project setup and configuration
- Markdown content authoring
- Cloudflare Pages deployment
- Git workflow with Claude Code
- The full build → deploy cycle

## Challenge Extensions

- Add a search feature (Starlight has built-in Pagefind search)
- Add custom components (callouts, interactive examples)
- Set up a custom domain
- Add analytics
