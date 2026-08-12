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
    <div className="panel category-chart">
      <h2 className="prompt-line"><span className="prompt-glyph">&gt;</span> spending_by_category.chart</h2>
      {chartData.length === 0 ? (
        <p className="empty-row">No expenses recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f5a623" stopOpacity={1} />
                <stop offset="100%" stopColor="#8a6318" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#26302b" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={{ stroke: "#3a463f" }}
              tick={{ fill: "#8b958e", fontSize: 12, fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#8b958e", fontSize: 12, fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              cursor={{ fill: "rgba(245, 166, 35, 0.08)" }}
              formatter={(value) => [`$${value}`, "Spent"]}
              contentStyle={{
                background: "#171d19",
                border: "1px solid #3a463f",
                borderRadius: 2,
                fontFamily: "var(--font-mono)",
                fontSize: 13,
              }}
              labelStyle={{ color: "#e7e2d6" }}
              itemStyle={{ color: "#f5a623" }}
            />
            <Bar dataKey="amount" fill="url(#barFill)" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingByCategoryChart
