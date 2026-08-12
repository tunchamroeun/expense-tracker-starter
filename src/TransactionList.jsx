import { useState } from 'react'

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const handleDelete = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDeleteTransaction(t.id);
    }
  };

  return (
    <div className="panel transactions">
      <h2 className="prompt-line"><span className="prompt-glyph">&gt;</span> transactions.log</h2>
      <div className="filters">
        <label className="field">
          <span className="field-label">Type</span>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field">
          <span className="field-label">Category</span>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th></th>
              <th className="col-amount">Amount</th>
              <th className="col-action"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="empty-row">No entries match this filter.</td>
              </tr>
            )}
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{t.date}</td>
                <td>{t.description}</td>
                <td className="col-category">{t.category}</td>
                <td>
                  <span className={t.type === "income" ? "tag tag-in" : "tag tag-out"}>
                    {t.type === "income" ? "IN" : "OUT"}
                  </span>
                </td>
                <td className={t.type === "income" ? "income-amount col-amount" : "expense-amount col-amount"}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </td>
                <td className="col-action">
                  <button className="delete-btn" onClick={() => handleDelete(t)}>[ x ]</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList
