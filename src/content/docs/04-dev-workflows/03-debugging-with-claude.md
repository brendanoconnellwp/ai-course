---
title: Debugging with Claude
description: Use Claude Code as a debugging partner to find and fix issues faster.
sidebar:
  order: 3
---

Debugging is one of Claude Code's strongest use cases. Instead of staring at stack traces alone, you have an agent that can read your code, run commands, and systematically track down issues.

## Sharing Error Context

The most effective way to debug with Claude is to give it the error:

### Paste the Error

```
> I'm getting this error:
>
> TypeError: Cannot read properties of undefined (reading 'map')
>   at UserList (src/components/UserList.tsx:15:28)
>   at renderWithHooks (node_modules/react-dom/...)
```

Claude will:
1. Read `UserList.tsx` around line 15
2. Identify the undefined variable
3. Trace back to find why it's undefined
4. Suggest a fix

### Pipe Logs

```bash
npm run dev 2>&1 | head -50 | claude -p "what's wrong?"
```

### Screenshot Errors

If you have a browser error, take a screenshot and share the path:

```
> Look at @/tmp/error-screenshot.png and help me fix this
```

## Debugging Strategies Claude Uses

### 1. Read and Trace
Claude reads the error location, then traces the data flow:
- Where does the variable come from?
- What function sets it?
- What conditions could make it undefined/null?

### 2. Search for Patterns
Claude greps the codebase for similar patterns:
- Are there other places with the same bug?
- How is this function called elsewhere?
- Has this pattern worked before?

### 3. Check Recent Changes
```
> What changed in the last 3 commits that could have caused this?
```

Claude diffs recent commits to find the culprit.

### 4. Add Debugging Output
```
> Add some console.logs to trace the data flow through the auth middleware
```

Claude adds targeted logging, you reproduce the issue, then share the output.

### 5. Test Hypotheses
```
> I think the issue is that the database connection pool is exhausted.
> Can you verify?
```

Claude checks connection pool config, current usage patterns, and confirms or refutes.

## Common Debugging Prompts

```
> Why is this API endpoint returning 500?
> The login form submits but nothing happens
> This query is taking 30 seconds, help me optimize it
> The build passes locally but fails in CI — here's the CI log: ...
> Users report intermittent 403 errors on the dashboard
```

## Anti-Patterns

**Don't:** "Fix the bug"
**Do:** "The user list page shows a blank screen. Here's the console error: ..."

**Don't:** Ask Claude to guess without context
**Do:** Share the error, reproduction steps, and relevant file paths

**Don't:** Let Claude make changes without understanding them
**Do:** Ask Claude to explain the root cause before applying a fix

## Exercise

1. Introduce a deliberate bug in a project (e.g., misspell a variable name)
2. Run the project and capture the error
3. Share the error with Claude and watch it trace through the code
4. Ask Claude to explain the root cause before fixing
5. Verify the fix works
