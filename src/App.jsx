import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import SpendingByCategoryChart from './SpendingByCategoryChart'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

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

  const today = new Date().toISOString().split('T')[0];
  const receiptNumber = String(transactions.length).padStart(4, '0');

  return (
    <div className="counter">
      <div className="receipt">
        <div className="receipt__edge receipt__edge--top" aria-hidden="true" />
        <div className="receipt__body">
          <header className="receipt__header">
            <h1>Finance Tracker</h1>
            <p className="subtitle">Track your income and expenses</p>
            <div className="receipt__meta">
              <span>No. {receiptNumber}</span>
              <span>{today}</span>
            </div>
          </header>

          <Summary transactions={transactions} />

          <SpendingByCategoryChart transactions={transactions} />

          <TransactionForm categories={categories} onAddTransaction={handleAddTransaction} />

          <TransactionList transactions={transactions} categories={categories} onDeleteTransaction={handleDeleteTransaction} />

          <footer className="receipt__footer">
            <p>— end of statement —</p>
          </footer>
        </div>
        <div className="receipt__edge receipt__edge--bottom" aria-hidden="true" />
      </div>
    </div>
  );
}

export default App
