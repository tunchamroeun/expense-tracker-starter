export function isIncome(type) {
  return type === "income";
}

export function formatAmount(amount) {
  return amount.toFixed(2);
}

export function transactionSign(type) {
  return isIncome(type) ? "+" : "-";
}

export function transactionTag(type) {
  return isIncome(type) ? "IN" : "OUT";
}
