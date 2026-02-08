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

export default function RevenueCharts() {
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const apiUrl = import.meta.env.VITE_API_URL; // Vite env variable

  useEffect(() => {
    fetch(`${apiUrl}/analytics/yearly?year=${year}`)
      .then((res) => res.json())
      .then(setYearlyData);

    fetch(
      `${apiUrl}/analytics/monthly?year=${year}&month=${month}`
    )
      .then((res) => res.json())
      .then(setMonthlyData);
  }, [year, month, apiUrl]);

  return (
    <div className="space-y-8">
      {/* Yearly Revenue */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Revenue by Month ({year})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => `KES ${value}`} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Revenue */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">
          Revenue by Day ({month}/{year})
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip formatter={(value) => `KES ${value}`} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
