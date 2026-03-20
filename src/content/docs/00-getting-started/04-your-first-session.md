---
title: Your First Session
description: A guided walkthrough of your first real Claude Code session.
sidebar:
  order: 4
---

Let's do something real. In this lesson, you'll use Claude Code to create a small project from scratch and experience the core interaction loop.

## Start a Session

Create a fresh directory and launch Claude:

```bash
mkdir ~/ai-course-playground
cd ~/ai-course-playground
claude
```

## Exercise 1: Create a File

Ask Claude to create a simple HTML file:

```
Create an index.html with a page that says "Hello from Claude Code"
with some basic styling
```

Watch what happens:
1. Claude will use its **Write** tool to create the file
2. You'll see the file contents in your terminal
3. The file is immediately on your filesystem — open it in a browser

## Exercise 2: Modify a File

Now ask Claude to change it:

```
Add a dark mode toggle button that switches between light and dark themes
```

Notice how Claude:
- **Reads** the existing file first
- **Edits** specific parts rather than rewriting everything
- Shows you the diff of what changed

## Exercise 3: Ask Questions About Code

```
Explain how the dark mode toggle works
```

Claude can read and explain code it wrote or code you bring to it.

## Exercise 4: Use the Shell

```
Create a package.json and install a local http server so I can preview this
```

Claude will:
- Use **Bash** to run `npm init` and `npm install`
- Suggest how to start the server
- You approve each command before it runs

## The Interaction Loop

Every Claude Code session follows this pattern:

1. **You describe what you want** (natural language)
2. **Claude plans an approach** (sometimes visible, sometimes implicit)
3. **Claude takes actions** (read, write, edit, run commands)
4. **You review and approve** (or deny and redirect)
5. **Repeat**

The key insight: you're not writing code and asking Claude to review it. You're describing intent and Claude is doing the implementation. Your job shifts from **writing** to **directing and reviewing**.

## Tips for Effective Sessions

- **Be specific about what you want**, vague about how to do it
- **Let Claude read existing code** before asking it to modify things
- **Review diffs carefully** — Claude is good but not perfect
- **Use follow-up messages** to refine — "make the button bigger", "use a different color"
- **Don't restart sessions unnecessarily** — Claude remembers the full conversation

## Clean Up

You can keep the playground directory for experimentation throughout the course, or remove it:

```bash
rm -rf ~/ai-course-playground
```

You've now completed your first real Claude Code session. Next, we'll dive deep into the fundamentals.
