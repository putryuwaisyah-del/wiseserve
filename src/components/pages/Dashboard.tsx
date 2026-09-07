type Theme = "light" | "dark";

interface DashboardProps {
  theme?: Theme;
  language?: "en" | "bm";
}

import { Card } from "../ui/Card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Dashboard = ({ theme = "light" }: DashboardProps) => {
  const isDark = theme === "dark";

  const mockMetrics = [
    {
      label: "Weekly Revenue",
      value: "$12,450",
      change: "+4.2%",
      tone: "blue",
    },
    {
      label: "Food Prepared",
      value: "1,240 units",
      change: "This Week",
      tone: "green",
    },
    {
      label: "Food Wasted",
      value: "112 units",
      change: "-1.8% vs last week",
      tone: "amber",
    },
    {
      label: "Waste Value",
      value: "$420.00",
      change: "3.3% of revenue",
      tone: "red",
    },
  ];

  const toneClasses: Record<string, string> = {
    blue: isDark ? "bg-blue-500/10 text-blue-300" : "bg-blue-50 text-blue-600",
    green: isDark
      ? "bg-emerald-500/10 text-emerald-300"
      : "bg-emerald-50 text-emerald-600",
    amber: isDark
      ? "bg-amber-500/10 text-amber-300"
      : "bg-amber-50 text-amber-600",
    red: isDark ? "bg-rose-500/10 text-rose-300" : "bg-rose-50 text-rose-600",
  };

  const weeklyData = [
    { day: "Mon", sales: 1800, waste: 120 },
    { day: "Tue", sales: 2100, waste: 145 },
    { day: "Wed", sales: 1650, waste: 90 },
    { day: "Thu", sales: 2400, waste: 160 },
    { day: "Fri", sales: 2800, waste: 185 },
    { day: "Sat", sales: 3100, waste: 210 },
    { day: "Sun", sales: 2600, waste: 150 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockMetrics.map((m, idx) => (
          <Card key={idx} theme={theme} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span
                className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-slate-400" : "text-slate-400"}`}
              >
                {m.label}
              </span>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${toneClasses[m.tone]}`}
              >
                {m.change}
              </span>
            </div>
            <span
              className={`text-3xl font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              {m.value}
            </span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card theme={theme} className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3
              className={`font-semibold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
            >
              Daily Sales vs. Waste Volume
            </h3>
            <span className="text-xs text-slate-400">Mon - Sun</span>
          </div>
          <div
            className={`h-72 rounded-[22px] border p-3 ${
              isDark
                ? "bg-slate-950/70 border-slate-700"
                : "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200"
            }`}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <CartesianGrid
                  stroke={isDark ? "#334155" : "#e2e8f0"}
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDark ? "#94a3b8" : "#64748b", fontSize: 11 }}
                  tickFormatter={(value: number) => `$${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: isDark ? "#1e293b" : "#f1f5f9" }}
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                    borderRadius: "12px",
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === "sales" ? "Sales" : "Waste",
                  ]}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    color: isDark ? "#cbd5e1" : "#475569",
                    fontSize: 12,
                  }}
                />
                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill={isDark ? "#93c5fd" : "#2563eb"}
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="waste"
                  name="Waste"
                  fill={isDark ? "#fda4af" : "#e11d48"}
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card theme={theme} className="flex flex-col gap-4">
          <h3
            className={`font-semibold tracking-tight ${isDark ? "text-slate-100" : "text-slate-900"}`}
          >
            Top Wasted Items
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { name: "Chicken Teriyaki Bento", qty: "34 units", loss: "$170" },
              { name: "Salmon Sashimi Plate", qty: "18 units", loss: "$144" },
              { name: "Miso Soup Portion", qty: "42 units", loss: "$42" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-2xl border ${
                  isDark
                    ? "bg-slate-800 border-slate-700"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div>
                  <p
                    className={`text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-800"}`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">{item.qty} leftover</p>
                </div>
                <span className="text-sm font-semibold text-rose-500">
                  -{item.loss}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
