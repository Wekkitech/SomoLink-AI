import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { minute: "2-digit", second: "2-digit" });
}

function formatBps(value) {
  if (value > 1_000_000) return `${(value / 1_000_000).toFixed(1)} Mbps`;
  if (value > 1_000) return `${(value / 1_000).toFixed(1)} Kbps`;
  return `${value} bps`;
}

export default function TrafficChart({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="text-sm font-medium text-gray-700 mb-3">
        Interface Traffic
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              minTickGap={30}
            />

            <YAxis tickFormatter={formatBps} />

            <Tooltip
              formatter={formatBps}
              labelFormatter={(label) => new Date(label).toLocaleTimeString()}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="rxBps"
              stroke="#2563eb"
              dot={false}
              name="Download"
            />

            <Line
              type="monotone"
              dataKey="txBps"
              stroke="#16a34a"
              dot={false}
              name="Upload"
            />

            <Line
              type="monotone"
              dataKey="totalBps"
              stroke="#9333ea"
              dot={false}
              name="Total"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
