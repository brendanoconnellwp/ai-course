---
title: "Case Study: Agentic WordPress Pipeline"
description: A real-world pipeline that turns client emails into deployed WordPress features in 10 minutes using Cloudflare Workers, GitHub Actions, and Claude Code.
sidebar:
  order: 8
---

This lesson walks through a real, working pipeline that demonstrates what agentic WordPress development looks like in production. It connects everything we've covered — Claude Code, Cloudflare Workers, GitHub workflows, CLAUDE.md, and ACF block development — into a single automated system.

**The flow:** Client sends email → Cloudflare Worker creates GitHub Issue → GitHub Action runs Claude Code → Claude scaffolds ACF blocks, writes styles, seeds content → PR created → You review and merge → Deploy workflow rsyncs to production → Site updated.

**Total time:** ~10 minutes from email to deployed feature.

## Architecture Overview

```
┌────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Client    │────▶│ Cloudflare Worker │────▶│   GitHub Issue    │
│   Email     │     │ (webhook)        │     │ (client-request)  │
└────────────┘     └──────────────────┘     └────────┬─────────┘
                                                      │
                                                      ▼
┌────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Production  │◀───│ Deploy Action     │◀───│  Claude Code      │
│ WordPress   │    │ (rsync over SSH)  │    │  GitHub Action    │
└────────────┘     └──────────────────┘     │  (scaffolds code, │
                          ▲                  │   opens PR)       │
                          │                  └──────────────────┘
                    ┌─────┴──────┐
                    │ Human Review│
                    │ (merge PR)  │
                    └────────────┘
```

## Component 1: The Cloudflare Worker (Intake)

The Worker accepts POST requests and creates GitHub Issues. It's intentionally simple — no dependency on email providers, Slack, or any specific input source.

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Authenticate
    const auth = request.headers.get('Authorization');
    if (auth !== `Bearer ${env.WEBHOOK_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { from, subject, message } = await request.json();

    // Create GitHub Issue
    const response = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: subject,
          body: `**From:** ${from}\n\n${message}`,
          labels: ['client-request'],
        }),
      }
    );

    const issue = await response.json();
    return Response.json({ issue: issue.number });
  },
};
```

**Why a Worker?** It's always-on, globally distributed, and costs essentially nothing. Any system that can make an HTTP POST can trigger the pipeline — email forwarding rules, Slack bots, form submissions, CRM webhooks.

### Testing the Intake

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer your-webhook-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "client@example.com",
    "subject": "Add a team section to the homepage",
    "message": "4 team members with names and roles."
  }'
```

## Component 2: Claude Code in GitHub Actions

This is the most novel part — running Claude Code as a CI step, not just locally. When an issue with the `client-request` label is created, a GitHub Action:

1. Checks out the repo
2. Installs Claude Code CLI
3. Reads `CLAUDE.md` for codebase conventions
4. Creates a feature branch
5. Scaffolds new ACF blocks following established patterns
6. Writes seed files to populate content
7. Commits, pushes, and opens a PR referencing the issue

```yaml
name: Claude Agent
on:
  issues:
    types: [opened, labeled]

jobs:
  agent:
    if: contains(github.event.issue.labels.*.name, 'client-request')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Agent
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          BRANCH="feature/issue-${{ github.event.issue.number }}"
          git checkout -b "$BRANCH"

          claude -p "Read CLAUDE.md for project conventions. Then:
            Based on this client request, scaffold the necessary
            ACF blocks and seed files.

            Issue: ${{ github.event.issue.title }}
            Details: ${{ github.event.issue.body }}

            Follow the established block structure exactly.
            Create seed files for any new content."

          git add -A
          git commit -m "feat: ${{ github.event.issue.title }}"
          git push origin "$BRANCH"

          gh pr create \
            --title "${{ github.event.issue.title }}" \
            --body "Closes #${{ github.event.issue.number }}" \
            --base main

      - name: Comment on Issue
        run: |
          PR_URL=$(gh pr view "$BRANCH" --json url -q .url)
          gh issue comment ${{ github.event.issue.number }} \
            --body "PR created: $PR_URL"
```

**Processing time:** 5-8 minutes per request.

### Why This Works

The key insight: **CLAUDE.md makes this possible.** Without thorough documentation of your codebase conventions, Claude running in CI would produce generic, inconsistent code. With a good CLAUDE.md, it produces code that follows your exact patterns.

> "The quality of Claude's output is directly proportional to how well the codebase conventions are documented."

This is true locally, but it's **critical** in CI where there's no human to redirect Claude mid-session.

## Component 3: ACF Block Architecture (The Pattern)

For Claude to reliably scaffold blocks, every block must follow the same structure. This is the standardized 4-file pattern:

```
blocks/team-section/
├── block.json      # Metadata, style references
├── fields.php      # ACF field registration in code
├── render.php      # Server-side template with proper escaping
└── style.scss      # Block-specific styles using design tokens
```

### block.json

```json
{
  "name": "acf/team-section",
  "title": "Team Section",
  "description": "Displays team members in a grid",
  "category": "theme",
  "acf": { "mode": "preview", "renderTemplate": "blocks/team-section/render.php" },
  "style": ["file:./style.css"]
}
```

### fields.php

```php
<?php
if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group([
        'key' => 'group_team_section',
        'title' => 'Team Section',
        'fields' => [
            [
                'key' => 'field_team_members',
                'label' => 'Team Members',
                'name' => 'team_members',
                'type' => 'repeater',
                'sub_fields' => [
                    ['key' => 'field_member_name', 'label' => 'Name', 'name' => 'name', 'type' => 'text'],
                    ['key' => 'field_member_role', 'label' => 'Role', 'name' => 'role', 'type' => 'text'],
                    ['key' => 'field_member_photo', 'label' => 'Photo', 'name' => 'photo', 'type' => 'image'],
                ],
            ],
        ],
        'location' => [
            [['param' => 'block', 'operator' => '==', 'value' => 'acf/team-section']],
        ],
    ]);
}
```

### render.php

```php
<?php
$members = get_field('team_members');
if (!$members) return;
?>
<section class="team-section">
    <div class="team-grid">
        <?php foreach ($members as $member) : ?>
            <div class="team-member">
                <?php if ($member['photo']) : ?>
                    <img src="<?php echo esc_url($member['photo']['url']); ?>"
                         alt="<?php echo esc_attr($member['name']); ?>">
                <?php endif; ?>
                <h3><?php echo esc_html($member['name']); ?></h3>
                <p><?php echo esc_html($member['role']); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>
```

### Why This Pattern Matters for AI

When every block follows the same structure, Claude can:
- **Read existing blocks** to learn the pattern
- **Scaffold new blocks** that are consistent with the rest
- **Modify existing blocks** without breaking conventions
- **Generate fields.php** from a natural language description

Document this pattern in your `CLAUDE.md` and Claude will follow it reliably.

## Component 4: Content as Code (Seed Files)

Instead of storing page content only in the WordPress database, this pipeline uses **seed files** — PHP scripts that define page content in code.

```php
<?php
// seeds/pages/homepage.php
function seed_homepage() {
    $page = get_page_by_path('home');
    $page_id = $page ? $page->ID : wp_insert_post([
        'post_title' => 'Home',
        'post_name' => 'home',
        'post_type' => 'page',
        'post_status' => 'publish',
    ]);

    $content = <<<BLOCKS
    <!-- wp:acf/hero {"name":"acf/hero"} /-->
    <!-- wp:acf/team-section {"name":"acf/team-section"} /-->
    <!-- wp:acf/contact-form {"name":"acf/contact-form"} /-->
    BLOCKS;

    // IMPORTANT: Use $wpdb->update, NOT wp_update_post
    // WordPress mangles backslashes in ACF block JSON
    global $wpdb;
    $wpdb->update(
        $wpdb->posts,
        ['post_content' => $content],
        ['ID' => $page_id]
    );

    // Seed ACF field values
    update_field('team_members', [
        ['name' => 'Jane Smith', 'role' => 'Lead Developer'],
        ['name' => 'Alex Chen', 'role' => 'Designer'],
    ], $page_id);
}
```

### Why Content as Code?

- **Reproducible** — clone the repo, run seeds, get the same site
- **Version controlled** — content changes are in git history
- **AI-friendly** — Claude can read and write seed files
- **No database syncing** — no need for DB export/import between environments
- **Reviewable** — content changes go through the same PR process as code

:::caution[Critical Gotcha]
**Never use `wp_update_post()` for block content.** WordPress mangles the backslashes in ACF block JSON comments, breaking the block parser. Use `$wpdb->update()` directly instead. This is a real production bug that will cost you hours if you don't know about it.
:::

## Component 5: Deploy Pipeline

The deploy step uses rsync over SSH — simple and fast (~90 seconds):

```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    - name: Deploy theme via rsync
      run: |
        rsync -avz --delete \
          --exclude='.git/' \
          --exclude='.github/' \
          --exclude='node_modules/' \
          --exclude='workers/' \
          ./ ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.THEME_PATH }}/
```

**Why rsync?** The production server runs PHP but not Node.js. Assets are built in CI (`npm run build`), committed back to the repo, and rsynced to production. Simple, reliable, auditable.

## Human-in-the-Loop: The Right Default

The pipeline creates PRs, not direct deployments. This is intentional:

- **AI isn't perfect** — Claude generates good code, but review catches edge cases
- **Client requests are ambiguous** — "Add a team section" needs human interpretation
- **Production is sacred** — one bad deploy can break a live site
- **Learning opportunity** — reviewing Claude's output teaches you the patterns

As trust builds, you can selectively auto-merge low-risk PRs (copy changes, style tweaks) while keeping structural changes in review.

## Putting It All Together

This pipeline touches nearly every module in this course:

| Course Module | Pipeline Component |
|---|---|
| Claude Code Fundamentals | CLAUDE.md drives AI output quality |
| Skills & Extensibility | WordPress agent skills improve block scaffolding |
| MCP Servers | Cloudflare MCP for Worker management |
| Dev Workflows | Git branching, PRs, code review |
| Cloudflare Stack | Worker as webhook processor |
| Automation Flows | End-to-end orchestration |

## Exercise: Build Your Own Pipeline

1. **Start small** — create a Cloudflare Worker that accepts a POST and creates a GitHub Issue
2. **Add Claude** — create a GitHub Action that runs Claude Code on new issues
3. **Document your patterns** — write a thorough CLAUDE.md for your WordPress project
4. **Standardize your blocks** — adopt the 4-file ACF block pattern
5. **Add content seeding** — create seed files for one page
6. **Add deployment** — set up rsync or your preferred deploy method
7. **Test the full loop** — send a curl request and watch it flow through

You don't need to build all of this in one sitting. Each component is independently useful. But together, they demonstrate what "agentic WordPress" really means in practice.
