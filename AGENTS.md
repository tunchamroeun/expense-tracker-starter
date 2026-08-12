# AGENTS.md

## Git Commit Subagent Guidelines

When requested to create git commits or commit code changes in this workspace:
- Delegate the commit generation and execution to the `git-committer` subagent.
- Ensure the subagent is executed with `model: flash_lite` (the cheapest Gemini model).
- Commit messages should adhere to Conventional Commits specification.
