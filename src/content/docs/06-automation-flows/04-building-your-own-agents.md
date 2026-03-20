---
title: Building Your Own Agents
description: Use the Claude Agent SDK to build custom AI agents for specialized tasks.
sidebar:
  order: 4
---

Beyond using Claude Code as your agent, you can build your own agents using the Claude Agent SDK. This lets you create specialized AI tools for specific workflows.

## What Is an Agent?

An agent is a program that:
1. Takes a goal or task
2. Plans how to achieve it
3. Uses tools to take actions
4. Loops until the task is complete

Claude Code itself is an agent. The Agent SDK lets you build similar systems for your own use cases.

## The Claude Agent SDK

The Agent SDK provides the building blocks:

```bash
npm install claude-agent-sdk
```

### Basic Agent Structure

```typescript
import { Agent, tool } from 'claude-agent-sdk';

const agent = new Agent({
  model: 'claude-sonnet-4-6',
  instructions: 'You are a helpful code review agent.',
  tools: [
    tool({
      name: 'read_file',
      description: 'Read a file from the repository',
      parameters: { path: { type: 'string' } },
      execute: async ({ path }) => {
        return fs.readFileSync(path, 'utf-8');
      },
    }),
    tool({
      name: 'list_files',
      description: 'List files in a directory',
      parameters: { directory: { type: 'string' } },
      execute: async ({ directory }) => {
        return fs.readdirSync(directory).join('\n');
      },
    }),
  ],
});

const result = await agent.run('Review the src/ directory for security issues');
console.log(result);
```

## Use Cases for Custom Agents

### Specialized Code Review Agent
An agent that knows your team's specific code standards and can review PRs against them.

### Content Migration Agent
An agent that reads from one CMS (WordPress) and writes to another (Astro markdown files), handling format conversion.

### Monitoring Agent
An agent that checks your services, analyzes logs, and creates incident reports.

### Data Processing Agent
An agent that reads CSV/JSON data, cleans it, transforms it, and loads it into your database.

## Agent vs. Skill vs. Script

| | Agent | Skill | Script |
|---|---|---|---|
| **Intelligence** | AI-powered decisions | AI executes a prompt | Fixed logic |
| **Flexibility** | Adapts to situations | Follows instructions | Follows code |
| **Complexity** | Can handle ambiguity | Structured workflows | Deterministic |
| **When to use** | Novel, variable tasks | Repeatable workflows | Known, fixed logic |

## When to Build an Agent

Build a custom agent when:
- The task requires AI judgment (not just following steps)
- Claude Code is too general for your specific domain
- You need to distribute the tool to others
- You want to run it in CI/CD or on a schedule

## Exercise

1. Identify a repetitive task that requires judgment
2. List the tools the agent would need
3. Define the agent's instructions
4. Build a simple version with the Agent SDK
5. Test it on real data and iterate
