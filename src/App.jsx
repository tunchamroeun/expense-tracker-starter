import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingByCategoryChart from './SpendingByCategoryChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import { isIncome, formatAmount, transactionSign, transactionTag } from './format'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, {
      id: Date.now(),
      ...transaction,
      date: new Date().toISOString().split('T')[0],
    }]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const tickerItems = [...transactions].reverse().slice(0, 12);

  return (
    <div className="app">
      {tickerItems.length > 0 && (
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span className="ticker-item" key={`${t.id}-${i}`}>
                <span className={isIncome(t.type) ? "ticker-in" : "ticker-out"}>
                  {transactionTag(t.type)}
                </span>
                {t.description.toUpperCase()}
                <span className={isIncome(t.type) ? "ticker-in" : "ticker-out"}>
                  {transactionSign(t.type)}${formatAmount(t.amount)}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="app-body">
        <header className="app-header">
          <p className="terminal-path">~/finance</p>
          <h1 className="prompt-line">
            <span className="prompt-glyph">&gt;</span> FINANCE_TRACKER.SYS
          </h1>
          <p className="subtitle">// track your income and expenses</p>
        </header>

        <Summary transactions={transactions} />

        <SpendingByCategoryChart transactions={transactions} />

        <TransactionForm categories={categories} onAddTransaction={handleAddTransaction} />

        <TransactionList transactions={transactions} categories={categories} onDeleteTransaction={handleDeleteTransaction} />
      </div>
    </div>
  );
}

export default App
