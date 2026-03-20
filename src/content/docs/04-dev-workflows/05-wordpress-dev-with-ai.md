---
title: WordPress Development with AI
description: Using Claude Code to build WordPress themes, plugins, and manage WP sites.
sidebar:
  order: 5
---

If you're a WordPress developer, Claude Code is a game-changer. It understands PHP, WordPress hooks, the REST API, and the entire WP ecosystem.

## Why Claude Code + WordPress Works

- **WordPress has extensive documentation** Claude was trained on
- **PHP patterns are well-established** — actions, filters, hooks
- **The REST API is standardized** — Claude can query it directly
- **Database schema is known** — Claude knows wp_posts, wp_postmeta, etc.

## Setting Up Your CLAUDE.md for WordPress

Your `CLAUDE.md` is critical for WordPress projects because WordPress is **database-driven** — Claude can't discover post types, fields, or settings by reading PHP files alone.

```markdown
# WordPress Project

## Environment
- Local dev: LocalWP
- Site URL: http://mysite.local/
- DB: MySQL (root/root on localhost)
- Theme: wp-content/themes/my-theme

## WordPress Conventions
- Use WordPress coding standards for PHP
- Prefix all custom functions with mytheme_
- Use ACF for custom fields (not raw postmeta)
- Custom post types are registered via ACF UI

## Important
- Query the REST API first: curl http://mysite.local/wp-json/wp/v2/types
- Check database for actual state, not PHP files
- ACF field groups are in wp_posts (post_type = 'acf-field-group')
```

## Common WordPress Tasks with Claude

### Building Theme Templates

```
> Create a single-tool.php template for the "tools" custom post type.
> It should display the tool name, description, URL (ACF field),
> and a screenshot. Use Tailwind classes for styling.
```

### Creating Plugins

```
> Create a simple WordPress plugin that adds a shortcode [recent_tools]
> which displays the 6 most recent tools posts in a grid.
```

### Working with ACF Fields

```
> Query the database to see what ACF field groups exist,
> then create a template that displays all fields for the "tools" post type.
```

### REST API Development

```
> Add a custom REST API endpoint at /wp-json/mysite/v1/featured-tools
> that returns the 3 most recently published tools with their ACF fields.
```

### Bulk Operations

```
> Write a PHP script that creates 20 sample "tools" posts
> with realistic data including ACF fields for URL, category, and description.
```

## Database-First Approach

WordPress is database-driven. Always query the database to understand state:

```
> What custom post types are registered?
> Show me: SELECT post_title, post_name FROM wp_posts
> WHERE post_type = 'acf-post-type'
```

This is faster and more accurate than searching PHP files.

## Building a WordPress MCP Server

For frequent WordPress work, consider building an MCP server (Module 3) that connects Claude directly to your WP REST API. This lets Claude:

- List and create posts without curl commands
- Manage media uploads
- Configure plugin settings
- Run WP-CLI commands remotely

## Exercise

1. Set up a local WordPress site (LocalWP recommended)
2. Create a CLAUDE.md with your site's details
3. Ask Claude to query your site's REST API
4. Have Claude create a custom template for an existing post type
5. Have Claude create a simple plugin
