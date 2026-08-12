import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function SpendingByCategoryChart({ transactions }) {
  const spendingByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const chartData = Object.entries(spendingByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="category-chart">
      <h2>Spending by Category</h2>
      {chartData.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e1e0d9" />
            <XAxis dataKey="category" tickLine={false} axisLine={{ stroke: "#c3c2b7" }} tick={{ fill: "#52514e", fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: "#52514e", fontSize: 12 }} />
            <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
            <Bar dataKey="amount" fill="#2a78d6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategoryChart
