function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-line">
        <span className="summary-line__label">Income</span>
        <span className="summary-line__fill" aria-hidden="true" />
        <span className="summary-line__value income-amount">${totalIncome}</span>
      </div>
      <div className="summary-line">
        <span className="summary-line__label">Expenses</span>
        <span className="summary-line__fill" aria-hidden="true" />
        <span className="summary-line__value expense-amount">${totalExpenses}</span>
      </div>
      <div className="summary-line summary-line--total">
        <span className="summary-line__label">Balance</span>
        <span className="summary-line__fill" aria-hidden="true" />
        <span className="summary-line__value">${balance}</span>
      </div>
    </div>
  );
}

export default Summary
