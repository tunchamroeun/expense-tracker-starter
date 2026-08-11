# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built dist/
npm run lint     # eslint .
```

No test runner is installed and there is no `test` script, so there is no single-test command. Verify changes with `npm run lint` plus the dev server.

## Architecture

This is the starter project for a Claude Code course (see `README.md`). It is deliberately a rough draft — the course refactors it.

The entire app is one component in `src/App.jsx` (~160 lines). `src/main.jsx` only mounts it in `StrictMode`. There is no router, no API layer, and no persistence — transactions are a hardcoded seed array held in `useState`, so a page refresh discards anything added.

Everything in `App.jsx` is flat and derived on each render:

- Six `useState` hooks: the transaction list, the four add-form fields, and the two filter fields.
- `totalIncome` / `totalExpenses` / `balance` are computed inline from `transactions`.
- `filteredTransactions` is built by chaining `.filter()` over `filterType` and `filterCategory`.
- The `categories` array is the single source for both the add form's category dropdown and the filter dropdown — add a category there and both update.

Styling is plain CSS in `src/App.css` and `src/index.css`. No CSS framework.

## Known intentional issues

These are the course's teaching material, not accidents. Fix them when the task is to fix them; don't silently change them while doing unrelated work.

- **The totals bug**: `amount` is stored as a string (both in the seed data and from `<input type="number">`, which yields `e.target.value` as a string). The `reduce` calls in `src/App.jsx:25-31` therefore string-concatenate instead of adding, so Income, Expenses, and Balance are all wrong.
- **Mislabeled seed row**: "Freelance Work" is `type: "expense"` with `category: "salary"`.
- The UI and code organization are intentionally unpolished.

## Conventions

- Plain JSX, no TypeScript — `@types/react` is installed but unused.
- ESLint flat config (`eslint.config.js`); `no-unused-vars` permits identifiers matching `^[A-Z_]`.
- `dist/` is committed build output and is ignored by ESLint — never edit it by hand.
