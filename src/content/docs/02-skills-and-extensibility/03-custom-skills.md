---
title: Creating Custom Skills
description: Build your own skills to automate your specific workflows.
sidebar:
  order: 3
---

Custom skills let you encode your most common workflows into reusable commands. This is where Claude Code becomes truly personalized.

## Skill File Structure

Skills are markdown files with frontmatter that define their behavior:

```markdown
---
name: my-skill
description: What this skill does
---

The prompt that Claude will execute when this skill is invoked.
You can include multi-step instructions, templates, and rules.
```

## Where Skills Live

Skills can be defined at multiple levels:

| Location | Scope |
|---|---|
| `~/.claude/skills/` | Global — available in all projects |
| `.claude/skills/` | Project — available in this project only |

## Example: WordPress Deploy Skill

Let's create a skill for deploying WordPress changes:

```markdown
---
name: wp-deploy
description: Deploy WordPress theme changes to staging
---

Follow these steps to deploy the current theme changes:

1. Run the build process:
   - Execute `npm run build` in the theme directory
   - Verify the build succeeded with no errors

2. Check for common issues:
   - Grep for console.log statements and remove them
   - Verify no .env files are included
   - Check that all PHP files pass syntax validation

3. Create a deployment summary:
   - List all changed files since the last commit
   - Note any new dependencies added
   - Flag any database migration requirements

4. Stage and commit with a deploy-prefixed message

5. Push to the staging branch
```

Save this as `.claude/skills/wp-deploy.md` and use it with:
```
> /wp-deploy
```

## Example: Code Review Skill

```markdown
---
name: review
description: Thorough code review with security focus
---

Review the staged changes (or recent commits if nothing staged) with focus on:

## Security
- SQL injection, XSS, CSRF vulnerabilities
- Hardcoded secrets or credentials
- Insecure API endpoints
- Missing input validation

## Code Quality
- Functions over 50 lines
- Deeply nested conditionals
- Missing error handling at API boundaries
- Unused imports or variables

## Performance
- N+1 queries
- Missing database indexes for new queries
- Unnecessary re-renders in React components
- Large bundle additions

Format findings as:
- 🔴 Critical — must fix before merge
- 🟡 Warning — should fix, not blocking
- 🟢 Suggestion — nice to have
```

## Skill Arguments

Skills can accept arguments:

```
> /review-pr 42
```

The argument (`42`) is passed to the skill and available in the prompt context.

## Sharing Skills

Since skills are just markdown files:
- **Commit them** to your project repo for team sharing
- **Create a personal skills repo** for your global skills
- **Share with the community** — skills are portable across projects

## Exercise

1. Think of a workflow you do repeatedly
2. Write it out as step-by-step instructions
3. Save it as a skill file in `.claude/skills/`
4. Test it by invoking the skill
5. Iterate — refine the instructions based on results
