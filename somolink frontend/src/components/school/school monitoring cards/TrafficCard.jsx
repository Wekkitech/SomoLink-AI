export default function TrafficCard({ metrics }) {
  const traffic = metrics?.totalBps || 0;

  return (
    <div className="bg-white border border-gray-200 p-4 rounded">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Traffic (bps)</h3>
        <div className="text-xs text-gray-500">
          {metrics?.timestamp
            ? new Date(metrics.timestamp).toLocaleString()
            : "—"}
        </div>
      </div>

      <div className="h-28 flex items-center">
        <svg
          width="100%"
          height="60"
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#c7d2fe"
            strokeWidth="3"
            points={`0,20 15,15 30,10 45,12 60,6 75,9 90,3 100,8`}
          />
        </svg>
      </div>

      <div className="mt-2 text-sm font-medium text-indigo-600">
        {(traffic / 1024).toFixed(1)} Kbps
      </div>
    </div>
  );
}
