---
title: "Project: Build a WP Plugin"
description: Use Claude Code to build a complete WordPress plugin from scratch.
sidebar:
  order: 2
---

Build a real WordPress plugin using Claude Code as your development partner. This project bridges your WordPress expertise with AI-assisted development.

## What You'll Build

A **"Quick Links" WordPress plugin** that:
- Adds a custom post type for managing links/resources
- Provides a Gutenberg block to display links
- Includes a shortcode for classic editor users
- Has an admin settings page
- Exposes links via the REST API

## Step-by-Step

### 1. Plugin Scaffold

```
> Create a WordPress plugin called "Quick Links" with:
> - Main plugin file with proper header
> - Activation/deactivation hooks
> - Standard WordPress plugin structure
> - Text domain for translations
```

### 2. Custom Post Type

```
> Register a "quick_link" custom post type with:
> - Title, editor, and thumbnail support
> - Custom fields: URL, description, category
> - Custom taxonomy: link_category
> - REST API enabled
```

### 3. Admin Interface

```
> Create an admin settings page for Quick Links:
> - Number of links to display (default 6)
> - Display style: grid or list
> - Show/hide descriptions
> - Custom CSS class option
```

### 4. Shortcode

```
> Create a [quick_links] shortcode that:
> - Accepts count, category, and style attributes
> - Renders a responsive grid of links
> - Uses the admin settings as defaults
> - Includes basic CSS styling
```

### 5. Gutenberg Block

```
> Create a Gutenberg block for Quick Links:
> - Block controls for count, category, style
> - Server-side rendering
> - Live preview in the editor
```

### 6. REST API Endpoints

```
> Add custom REST API endpoints:
> - GET /wp-json/quick-links/v1/links (with filters)
> - GET /wp-json/quick-links/v1/categories
> - POST /wp-json/quick-links/v1/links (with auth)
```

## What You'll Practice

- WordPress plugin development patterns
- Custom post types and taxonomies
- Gutenberg block development
- REST API extension
- Claude Code for PHP development

## Challenge Extensions

- Add import/export functionality (CSV)
- Build a widget for the sidebar
- Add click tracking
- Create a companion MCP server for managing links from Claude
