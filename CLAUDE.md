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

`src/main.jsx` only mounts `App` in `StrictMode`. There is no router, no API layer, and no persistence — transactions are a hardcoded seed array held in `useState`, so a page refresh discards anything added.

The app is split into five components, all in `src/`:

- **`App.jsx`** — owns the `transactions` state (seed array) and the `categories` array. Renders a scrolling ticker of recent transactions, `Summary`, `SpendingByCategoryChart`, `TransactionForm`, and `TransactionList`, passing `transactions`/`categories` down as props. `handleAddTransaction` appends a new transaction (stamping `id` via `Date.now()` and today's `date`) and is passed to `TransactionForm` as `onAddTransaction`. `handleDeleteTransaction` removes a transaction by `id` and is passed to `TransactionList` as `onDeleteTransaction`.
- **`Summary.jsx`** — takes `transactions` as a prop and derives `totalIncome`, `totalExpenses`, and `balance` from it internally via `.filter().reduce()`.
- **`SpendingByCategoryChart.jsx`** — takes `transactions` as a prop, sums expense amounts per category, and renders a `recharts` bar chart.
- **`TransactionForm.jsx`** — owns its own form field state (description, amount, type, category). On submit, calls `onAddTransaction` with `{ description, amount, type, category }` (`amount` converted to a number) and resets its fields. Takes `categories` as a prop for the category `<select>`.
- **`TransactionList.jsx`** — owns `filterType`/`filterCategory` state and derives `filteredTransactions` by chaining `.filter()` over them. Takes `transactions`, `categories`, and `onDeleteTransaction` as props; each row has a delete button that confirms via `window.confirm` before calling `onDeleteTransaction`.

`src/format.js` holds shared formatting helpers (`isIncome`, `formatAmount`, `transactionSign`, `transactionTag`) used by `App.jsx`, `Summary.jsx`, `TransactionList.jsx`, and `SpendingByCategoryChart.jsx` to keep amount/sign display consistent.

The `categories` array in `App.jsx` is the single source for both the add form's category dropdown and the filter dropdown — add a category there and both update.

Styling is plain CSS in `src/App.css` and `src/index.css`. No CSS framework.

## Known intentional issues

These are the course's teaching material, not accidents. Fix them when the task is to fix them; don't silently change them while doing unrelated work.

- **Mislabeled seed row**: "Freelance Work" is `type: "expense"` with `category: "salary"` in `App.jsx`.
- The UI and code organization are intentionally unpolished.

## Conventions

- Plain JSX, no TypeScript — `@types/react` is installed but unused.
- ESLint flat config (`eslint.config.js`); `no-unused-vars` permits identifiers matching `^[A-Z_]`.
- `dist/` is committed build output and is ignored by ESLint — never edit it by hand.
