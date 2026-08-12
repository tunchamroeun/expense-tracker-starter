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
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#d9d5c7" strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={{ stroke: "#b9b3a0" }}
              tick={{ fill: "#756f64", fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#756f64", fontSize: 11, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              formatter={(value) => [`$${value}`, "Spent"]}
              contentStyle={{ background: "#f3f2ec", border: "1px solid #221f1c", borderRadius: 0, fontFamily: "var(--font-mono)", fontSize: 12 }}
              cursor={{ fill: "rgba(44, 79, 128, 0.08)" }}
            />
            <Bar dataKey="amount" fill="#2c4f80" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategoryChart
