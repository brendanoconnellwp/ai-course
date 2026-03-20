---
title: Reading & Editing Files
description: How Claude Code interacts with your filesystem — reading, writing, and editing files.
sidebar:
  order: 2
---

File manipulation is the core of what Claude Code does. Understanding how it reads and writes files will make you a much more effective user.

## How Claude Reads Files

Claude has several tools for understanding your codebase:

### Read Tool
Reads a specific file by path. Claude uses this when it knows exactly which file to look at.

```
> What's in my package.json?
```

Claude will call `Read("package.json")` and show you the contents.

### Glob Tool
Finds files matching a pattern. Used when Claude needs to discover files.

```
> Find all TypeScript files in the src directory
```

Claude calls `Glob("src/**/*.ts")` to find matches.

### Grep Tool
Searches file contents with regex. Used when Claude needs to find specific code.

```
> Where is the database connection configured?
```

Claude might call `Grep("database|connection|DB_HOST")` across your project.

## How Claude Edits Files

### Write Tool
Creates new files or completely replaces existing ones.

```
> Create a new utils/helpers.ts file with a slugify function
```

### Edit Tool
Makes targeted changes to existing files. This is the most common editing operation — Claude identifies the exact string to replace and swaps it.

```
> Change the primary color from blue to red in the CSS
```

Claude will:
1. Read the file
2. Find the exact line(s) to change
3. Show you the diff
4. Apply the change on your approval

## The @ Symbol

You can reference files directly with `@`:

```
> Look at @src/components/Header.tsx and make the nav responsive
```

This is a hint to Claude about which file to focus on. It's especially useful when:
- Your project is large and you want to direct attention
- The file name is ambiguous
- You want Claude to read it before you ask your question

## Best Practices

### Let Claude Read First
Don't ask Claude to modify code it hasn't seen. Always let it read the current state:

```
# Good
> Read @src/api/auth.ts and then add rate limiting to the login endpoint

# Less good
> Add rate limiting to the login endpoint in src/api/auth.ts
```

The second version works, but Claude will read it anyway — being explicit sets clearer expectations.

### Review Diffs Carefully
Claude's Edit tool shows you exactly what's changing. Take a moment to review:
- Is it changing the right file?
- Is the replacement correct?
- Are there side effects?

### Use Multi-File Operations
Claude can work across multiple files in a single response:

```
> Rename the "users" API endpoint to "members" across all files
```

Claude will grep for references, then edit each file in sequence.

## Exercise

1. Create a new project directory
2. Ask Claude to create a simple Express.js API with two endpoints
3. Ask Claude to add a third endpoint
4. Ask Claude to refactor the routes into a separate file
5. Watch how it reads, creates, and edits files throughout
