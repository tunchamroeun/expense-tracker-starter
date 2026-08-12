import { useState } from 'react'

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAddTransaction({ description, amount: Number(amount), type, category });
    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="field field--description">
          <label htmlFor="tx-description">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="field field--amount">
          <label htmlFor="tx-amount">Amount</label>
          <input
            id="tx-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <fieldset className="field field--type">
          <legend>Type</legend>
          <div className="type-toggle">
            <button
              type="button"
              className="is-income"
              aria-pressed={type === 'income'}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button
              type="button"
              className="is-expense"
              aria-pressed={type === 'expense'}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
        </fieldset>

        <div className="field field--category">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="field field--submit">
          <button type="submit">Record transaction</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm
