import { describe, it, expect } from 'vitest'
import { calculateTotalIncome, calculateTotalExpenses, calculateBalance, filterTransactions } from './transactions'

const sample = [
  { id: 1, description: "Salary", amount: "5000", type: "income", category: "salary", date: "2025-01-01" },
  { id: 2, description: "Rent", amount: "1200", type: "expense", category: "housing", date: "2025-01-02" },
  { id: 3, description: "Groceries", amount: "150", type: "expense", category: "food", date: "2025-01-03" },
]

describe('calculateTotalIncome', () => {
  it('sums income amounts as numbers, not strings', () => {
    // KNOWN BUG: amounts are stored as strings, and the reduce in
    // calculateTotalIncome does `sum + t.amount` without converting to a
    // number first, so this currently concatenates strings instead of
    // adding numbers for more than one income transaction.
    const transactions = [
      { type: "income", amount: "100" },
      { type: "income", amount: "50" },
    ]
    expect(calculateTotalIncome(transactions)).toBe(150)
  })

  it('returns 0 when there is no income', () => {
    expect(calculateTotalIncome([{ type: "expense", amount: "50" }])).toBe(0)
  })

  it('returns 0 for an empty transaction list', () => {
    expect(calculateTotalIncome([])).toBe(0)
  })
})

describe('calculateTotalExpenses', () => {
  it('sums expense amounts as numbers, not strings', () => {
    // Same bug as above, mirrored for expenses.
    const transactions = [
      { type: "expense", amount: "150" },
      { type: "expense", amount: "45" },
    ]
    expect(calculateTotalExpenses(transactions)).toBe(195)
  })

  it('returns 0 when there are no expenses', () => {
    expect(calculateTotalExpenses([{ type: "income", amount: "50" }])).toBe(0)
  })
})

describe('calculateBalance', () => {
  it('subtracts expenses from income', () => {
    expect(calculateBalance(500, 200)).toBe(300)
  })

  it('can be negative when expenses exceed income', () => {
    expect(calculateBalance(100, 250)).toBe(-150)
  })
})

describe('filterTransactions', () => {
  it('returns all transactions when no filters are applied', () => {
    expect(filterTransactions(sample)).toEqual(sample)
    expect(filterTransactions(sample, { type: "all", category: "all" })).toEqual(sample)
  })

  it('filters by type only', () => {
    const result = filterTransactions(sample, { type: "expense" })
    expect(result).toHaveLength(2)
    expect(result.every(t => t.type === "expense")).toBe(true)
  })

  it('filters by category only', () => {
    const result = filterTransactions(sample, { category: "food" })
    expect(result).toEqual([sample[2]])
  })

  it('applies both filters together', () => {
    const result = filterTransactions(sample, { type: "expense", category: "housing" })
    expect(result).toEqual([sample[1]])
  })

  it('returns an empty array when no transaction matches both filters', () => {
    const result = filterTransactions(sample, { type: "income", category: "housing" })
    expect(result).toEqual([])
  })
})
