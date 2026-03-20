---
title: Test-Driven Development with AI
description: Using Claude Code to write tests first, then implement features that pass them.
sidebar:
  order: 4
---

TDD with an AI agent is a different experience than traditional TDD. Claude can write both the tests and the implementation, but the workflow structure still matters.

## The AI-Assisted TDD Loop

### Traditional TDD
1. Write a failing test
2. Write code to pass the test
3. Refactor

### AI-Assisted TDD
1. **Describe the behavior** you want
2. **Claude writes tests** based on your description
3. **You review the tests** (are they testing the right things?)
4. **Claude writes the implementation** to pass the tests
5. **You run and verify**

## Why TDD Still Matters with AI

"If Claude writes both the tests and code, what's the point?"

Good question. The value is:
- **Tests as specification** — you review tests to verify Claude understood your intent
- **Regression safety** — the tests catch future breakage
- **Confidence in refactoring** — you can ask Claude to refactor knowing tests will catch issues
- **Better code** — code written to be testable is usually better code

## Workflow Example

```
> I need a function that validates email addresses.
> Requirements:
> - Must contain @ and a domain
> - Domain must have at least one dot
> - No spaces allowed
> - Maximum 254 characters
>
> Write the tests first.
```

Claude writes tests:
```typescript
describe('validateEmail', () => {
  it('accepts valid email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('rejects emails without @', () => {
    expect(validateEmail('userexample.com')).toBe(false);
  });

  it('rejects emails without domain dot', () => {
    expect(validateEmail('user@localhost')).toBe(false);
  });

  it('rejects emails with spaces', () => {
    expect(validateEmail('user @example.com')).toBe(false);
  });

  it('rejects emails over 254 characters', () => {
    const longEmail = 'a'.repeat(245) + '@example.com';
    expect(validateEmail(longEmail)).toBe(false);
  });
});
```

You review: "Those tests look right. Now implement it."

Claude writes the function. You run the tests:

```
> Run the tests
```

All pass. Now you can confidently use this function knowing it's verified.

## Multi-Instance TDD

Use two Claude sessions (Module 1, Lesson 5):

```
Left pane:  Claude writing tests based on your requirements
Right pane: Claude writing implementation
```

This creates a healthy separation — the test writer doesn't see the implementation and vice versa, reducing the chance of circular assumptions.

## Integration Testing

For API endpoints, Claude can write integration tests:

```
> Write integration tests for the POST /api/users endpoint.
> It should create a user, return 201, and store it in the database.
> Test error cases too: duplicate email, missing fields, invalid data.
```

## Exercise

1. Describe a small feature (e.g., a password strength checker)
2. Ask Claude to write tests first
3. Review the tests — do they cover the right cases?
4. Ask Claude to implement the function
5. Run the tests and iterate if any fail
