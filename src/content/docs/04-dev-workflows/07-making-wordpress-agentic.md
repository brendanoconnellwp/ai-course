---
title: Making WordPress Agentic
description: How to make your WordPress stack AI-friendly and choose the right tools for agentic development.
sidebar:
  order: 7
---

"Making WordPress agentic" means restructuring how you build and manage WordPress so that AI agents can effectively assist at every stage — from local development to deployment. This isn't about replacing your workflow — it's about making it machine-readable.

## What Makes a Stack "AI-Friendly"?

An AI-friendly stack has three properties:

1. **Queryable state** — the agent can discover what exists (APIs, database, CLI)
2. **Text-based configuration** — config lives in files the agent can read and edit
3. **Feedback loops** — the agent can verify its changes worked

WordPress is partially there by default (REST API, PHP files), but some stacks are dramatically better than others for agentic work.

## WordPress Stack Comparison for AI Development

### Classic WordPress Stack

```
Theme: PHP template files + custom CSS
Fields: Hand-coded meta boxes
Build: None (edit PHP directly)
Local dev: MAMP/XAMPP
Deployment: FTP
```

**AI-friendliness: Low**
- No build pipeline for the agent to run
- Meta boxes are spread across files with no schema
- FTP deployment can't be automated safely
- No way to verify changes without manually checking the browser

### Modern WordPress Stack (Recommended)

```
Theme: Block theme with theme.json
Fields: ACF Pro (JSON synced to files)
Build: wp-scripts / Vite
Local dev: WordPress Playground or wp-env
Deployment: Git-based (GitHub Actions → WP Engine, Cloudways, etc.)
```

**AI-friendliness: High**
- `theme.json` is a single readable config file
- ACF JSON sync means field groups are version-controlled files
- Build tools give the agent a verify step (`npm run build`)
- Playground gives instant test environments
- Git deployment means the agent can push changes through a safe pipeline

### Headless WordPress Stack

```
CMS: WordPress (content API only)
Frontend: Astro / Next.js / Nuxt
Fields: ACF or custom fields exposed via REST/GraphQL
Build: Node.js build pipeline
Local dev: Docker or wp-env + Node dev server
Deployment: Cloudflare Pages / Vercel + managed WP hosting
```

**AI-friendliness: Highest**
- Frontend is pure code (no WordPress template quirks)
- Clear API boundary — agent can work on frontend and backend independently
- Modern build tools with excellent error messages
- Static output is easy to verify
- Cloudflare/Vercel deployment is CLI-driven

## The Key Decisions

### 1. Local Environment: Playground vs. LocalWP vs. wp-env

| Environment | Agent-Friendliness | Best For |
|---|---|---|
| **WordPress Playground** | Excellent — 3-second startup, CLI-driven, disposable | Testing, rapid iteration |
| **wp-env** | Great — Docker-based, config in `.wp-env.json` | Plugin/theme development |
| **LocalWP** | Good — GUI-based but has CLI, persistent sites | Full site development |
| **MAMP/XAMPP** | Poor — manual setup, no CLI automation | Legacy projects |

**Recommendation:** Use **Playground for testing** (via agent skills) and **LocalWP or wp-env for development**. They complement each other.

### 2. Custom Fields: ACF JSON Sync vs. Database Only

By default, ACF stores field groups in the database. This is invisible to AI agents. Enable **JSON sync** to save field groups as files:

```php
// In your theme's functions.php
add_filter('acf/settings/save_json', function() {
    return get_stylesheet_directory() . '/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});
```

Now Claude can read your field definitions directly:

```
> Read the ACF field groups in acf-json/ and create
> a template that displays all fields for the "tools" post type
```

Without JSON sync, Claude has to query the database — which works but is slower and requires DB access.

### 3. Theme Architecture: Block Theme vs. Classic

| | Block Theme | Classic Theme |
|---|---|---|
| **Config** | `theme.json` (one file) | `functions.php` + scattered CSS |
| **Templates** | HTML files with block markup | PHP files with template tags |
| **Agent readability** | High — structured, declarative | Medium — imperative PHP |
| **Agent editability** | High — JSON and HTML | Medium — PHP logic interleaved |

Block themes are significantly more AI-friendly because they're **declarative** — the agent reads `theme.json` and immediately knows the design system, colors, typography, and spacing.

### 4. Build Tools: wp-scripts vs. Vite vs. None

| Tool | Agent-Friendliness | Why |
|---|---|---|
| **wp-scripts** | Great | WordPress-official, handles blocks, linting, testing |
| **Vite** | Great | Fast, modern, excellent error messages |
| **Webpack (custom)** | OK | Complex configs, harder for agents to debug |
| **None** | Poor | No build verification, no linting, no feedback loop |

A build step is essential because it gives the agent a **verification command**:

```bash
npm run build  # Did my changes compile?
npm run lint   # Did I follow the coding standards?
npm test       # Did I break anything?
```

Without this, the agent is flying blind.

### 5. Deployment: Git-Push vs. FTP vs. CLI

| Method | Agent-Friendliness | Why |
|---|---|---|
| **Git push → CI/CD** | Excellent | Agent commits, pipeline deploys |
| **Wrangler / CLI deploy** | Excellent | Direct CLI deployment |
| **WP-CLI remote** | Good | Command-line site management |
| **FTP/SFTP** | Poor | Fragile, no verification, security risk |

## The Ideal Agentic WordPress Stack

Here's what we recommend for maximum AI-agent productivity:

```
📁 my-wp-project/
├── CLAUDE.md                    # Agent instructions
├── .claude/skills/              # WordPress agent skills
├── theme.json                   # Block theme config
├── acf-json/                    # Synced field definitions
├── src/
│   ├── blocks/                  # Custom Gutenberg blocks
│   ├── patterns/                # Block patterns
│   └── styles/                  # Theme styles
├── templates/                   # Block theme templates (HTML)
├── functions.php                # Minimal — hooks and setup only
├── package.json                 # wp-scripts or Vite
├── .wp-env.json                 # Local dev environment config
└── .github/
    └── workflows/deploy.yml     # CI/CD pipeline
```

With this setup, Claude Code can:
- **Read** `theme.json` and `acf-json/` to understand the project
- **Build** with `npm run build` and verify output
- **Test** with WordPress Playground instantly
- **Lint** with `npm run lint` against WordPress coding standards
- **Deploy** through git push → CI/CD

## Making Existing Projects More AI-Friendly

You don't need to rebuild from scratch. These incremental changes make any WordPress project better for AI agents:

### Quick Wins (30 minutes)
1. Create a `CLAUDE.md` with your site's details
2. Add the WordPress agent skills to `.claude/skills/`
3. Document your REST API endpoints

### Medium Effort (half day)
4. Enable ACF JSON sync
5. Add a `package.json` with build/lint commands
6. Create a `.wp-env.json` for reproducible local dev

### Bigger Changes (when starting new work)
7. Migrate to a block theme
8. Set up git-based deployment
9. Add CI/CD with linting and build verification

## The Mindset Shift

Traditional WordPress development:
> "I'll build this in the browser, clicking through the admin, adding code where needed."

Agentic WordPress development:
> "I'll describe what I want, let the agent build it, verify it in Playground, and deploy through git."

The tools are ready. The WordPress community is actively building the agent skill infrastructure. The developers who adopt this workflow now will have a significant advantage as these tools mature.

## Exercise

1. Audit your current WordPress stack — rate each component's AI-friendliness
2. Enable ACF JSON sync on an existing project
3. Install WordPress agent skills for Claude Code
4. Add a `CLAUDE.md` and a `package.json` with build/lint commands
5. Try building a block with the agent skills installed vs. without — compare the quality
