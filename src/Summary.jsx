import { formatAmount } from './format'

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
      <div className="summary-register">
        <h3>Income</h3>
        <p className="income-amount">${formatAmount(totalIncome)}</p>
      </div>
      <div className="summary-register">
        <h3>Expense</h3>
        <p className="expense-amount">${formatAmount(totalExpenses)}</p>
      </div>
      <div className="summary-register">
        <h3>Balance</h3>
        <p className={balance < 0 ? "expense-amount" : "balance-amount"}>
          {balance < 0 ? "-" : ""}${formatAmount(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary
