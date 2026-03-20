---
title: PR Reviews & Commits
description: Using Claude Code for pull request workflows — creating, reviewing, and iterating.
sidebar:
  order: 2
---

Pull requests are where code review, collaboration, and quality control happen. Claude Code integrates deeply with this workflow.

## Creating Pull Requests

Claude can create PRs with well-structured descriptions:

```
> Create a pull request for this branch.
> We added rate limiting to all API endpoints.
```

Claude will:
1. Check the branch status and push if needed
2. Analyze all commits on the branch
3. Write a PR title and description
4. Create the PR via `gh pr create`

The PR description typically includes:
- Summary of changes
- What was changed and why
- Test plan or verification steps

## Reviewing Pull Requests

### Quick Review

```
> /review-pr 42
```

### Detailed Review with Focus

```
> Review PR #42. This touches our payment processing,
> so focus on security and data handling.
```

Claude will:
1. Fetch the PR diff
2. Read changed files for context
3. Analyze with your specified focus areas
4. Report findings by severity

### What Claude Catches

- **Security vulnerabilities** — injection, XSS, exposed secrets
- **Logic errors** — off-by-one, null pointer, race conditions
- **Code quality** — complexity, duplication, naming
- **Performance** — N+1 queries, missing indexes, unnecessary computation
- **Style** — inconsistency with project conventions

## Addressing Review Feedback

When you receive review comments:

```
> Read the comments on PR #42 and fix the issues
```

Claude will:
1. Fetch all review comments
2. Group them by file
3. Address each comment with code changes
4. Create a new commit with the fixes

## PR Descriptions That Matter

A good PR description helps both human reviewers and future developers. Here's what Claude typically generates:

```markdown
## Summary
- Add token bucket rate limiting to auth endpoints
- Configure 10 requests/minute/IP for login and register
- Add rate-limiter-flexible package

## Changes
- `src/middleware/rateLimit.ts` — new rate limiting middleware
- `src/api/auth.ts` — apply middleware to login/register routes
- `package.json` — add rate-limiter-flexible dependency

## Test Plan
- [ ] Verify login works normally under the limit
- [ ] Verify rate limit triggers after 10 rapid requests
- [ ] Verify rate limit resets after 1 minute
- [ ] Verify other endpoints are unaffected
```

## Exercise

1. Create a feature branch and make some changes
2. Ask Claude to create a PR
3. Review the PR description — is it accurate?
4. Ask Claude to review its own PR (meta, but useful for learning)
5. Practice the feedback-and-fix loop
