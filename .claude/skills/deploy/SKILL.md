---
name: deploy
description: Deploy the app - run tests, build the production bundle, and push to staging. Use when the user asks to deploy, ship, or release this project.
---

# Deploy

Run these steps in order. Stop and report if any step fails — do not continue to the next step.

## 1. Tests

This project currently has no test runner installed and no `test` script in `package.json` (see CLAUDE.md). If a `test` script now exists, run it (e.g. `npm test`) and stop on failure. Otherwise, skip this step and tell the user tests were skipped because no test runner is configured.

## 2. Build the production bundle

```bash
npm run build
```

This runs `vite build` into `dist/`. Stop and report the error if the build fails.

## 3. Push to staging

There is no staging deployment target configured in this repo (no CI, no gh-pages, no staging branch). Before pushing anything, ask the user:

- Where staging is (e.g. a `staging` git branch, a hosting provider, a remote server)
- What should be pushed (the source commit, or the built `dist/` output)
- Confirm before running any push, since pushing is a hard-to-reverse, shared-state action

Do not guess or invent a staging target — always confirm with the user first.
