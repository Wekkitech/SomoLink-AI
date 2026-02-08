import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyRevenue() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/analytics/monthly?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then(setMonthlyData);
  }, [month, apiUrl, year]);

  return (
    <div className=" p-4  ">
      <h2 className="text-md font-semibold mb-4 text-gray-800">
        Revenue by Day ({month}/{year})
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart
          data={monthlyData}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          {/* Subtle grid */}
          <CartesianGrid
            stroke="#e6e6e6"
            strokeDasharray="4 4"
            vertical={false}
          />

          {/* X & Y Axes */}
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis
            tickFormatter={(value) => `KES ${value}`}
            tick={{ fontSize: 12, fill: "#6b7280" }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value) => `KES ${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              border: "none",
            }}
            itemStyle={{ color: "#10b981" }}
          />

          {/* Smooth green line with gradient fill */}
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4, fill: "#10b981" }}
            activeDot={{
              r: 6,
              fill: "#10b981",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            fill="url(#colorRevenue)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
