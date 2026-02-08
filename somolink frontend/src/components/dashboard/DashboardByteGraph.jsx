
import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardByteGraph = ({data}) => {
 
  const MAX_POINTS = 180; // Fixed window size

  // FIX: Pre-fill the array to prevent "squeezing"
  const processedData = useMemo(() => {
    const buffer = new Array(MAX_POINTS).fill(null);
    return buffer.map((_, index) => {
      // Offset logic: aligns the latest data to the right
      const dataIndex = index - (MAX_POINTS - data.length);
      const point = data[dataIndex];
      return {
        x: index,
        rxKbps: point ? (point.rxBps || 0) / 1000 : null,
        txKbps: point ? (point.txBps || 0) / 1000 : null,
      };
    });
  }, [data]);

  const isHighTraffic = useMemo(() => {
    return data.some((d) => d.rxBps / 1000 > 500 || d.txBps / 1000 > 500);
  }, [data]);

  const MAX_SCALE = isHighTraffic ? 5000 : 500;
  const TICKS = isHighTraffic ? [0, 2500, 5000] : [0, 250, 500];

  if (!data || data.length === 0) {
    return (
      <div className="h-max w-full bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
        Loading Router Stats...
      </div>
    );
  }

  const latest = data[data.length - 1] || { rxBps: 0, txBps: 0 };

  return (
    <div
      className="bg-[#f4f4f4] border-gray-300 rounded h-max w-full  overflow-hidden font-sans"
    >
      

      {/* Chart Area */}
      <div className="h-36 w-full bg-white relative px-1 pt-1 overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processedData}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#f0f0f0"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="x"
              type="number"
              domain={[0, MAX_POINTS - 1]}
              hide
            />

            <YAxis
              orientation="right"
              domain={[0, MAX_SCALE]}
              ticks={TICKS}
              tick={{ fontSize: 9, fill: "#999" }}
              tickFormatter={(val) =>
                val === 0
                  ? "0"
                  : `${val >= 1000 ? val / 1000 + "M" : val + "k"}`
              }
              width={35}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                border: "1px solid #ccc",
                borderRadius: "2px",
                fontSize: "10px",
                padding: "4px",
              }}
              cursor={{ stroke: "#ddd", strokeWidth: 1 }}
              labelStyle={{ display: "none" }}
              formatter={(val) => [`${val.toFixed(1)} kbps`]}
            />

            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="txKbps"
              stroke="#0066cc"
              fill="transparent"
              strokeWidth={1.5}
            />
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="rxKbps"
              stroke="#22ad00"
              fill="transparent"
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Centered Baseline Legend */}
      <div className="flex items-center justify-center gap-8 py-2 bg-white border-t border-gray-200">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">
            Tx:
          </span>
          <span className="text-xs font-mono font-bold text-blue-600">
            {(latest.txBps / 1000).toFixed(1)}
          </span>
          <span className="text-[9px] text-gray-400">kbps</span>
        </div>

        <div className="w-[1px] h-3 bg-gray-200"></div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[9px] font-bold text-gray-400 uppercase">
            Rx:
          </span>
          <span className="text-xs font-mono font-bold text-green-600">
            {(latest.rxBps / 1000).toFixed(1)}
          </span>
          <span className="text-[9px] text-gray-400">kbps</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardByteGraph;
