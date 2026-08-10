export function calculateTotalIncome(transactions) {
  return transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateTotalExpenses(transactions) {
  return transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function calculateBalance(totalIncome, totalExpenses) {
  return totalIncome - totalExpenses;
}

export function filterTransactions(transactions, { type = "all", category = "all" } = {}) {
  let filtered = transactions;
  if (type !== "all") {
    filtered = filtered.filter(t => t.type === type);
  }
  if (category !== "all") {
    filtered = filtered.filter(t => t.category === category);
  }
  return filtered;
}
