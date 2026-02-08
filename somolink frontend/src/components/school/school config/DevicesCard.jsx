import React from "react";
import { Server } from "lucide-react";

export default function DevicesCard({ devices = [] }) {
  const total = devices.length;
  const online = total; // assume all online
  const offline = 0; // assume none offline

  return (
    <div className="bg-white border border-gray-200 p-4 rounded">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-700">Devices</h3>
      </div>

      {total === 0 ? (
        <div className="text-sm text-gray-500">No devices connected.</div>
      ) : (
        <div className="flex justify-between text-sm">
          <div>
            <div className="font-medium">{total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>

          <div>
            <div className="font-medium text-green-600">{online}</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>

          <div>
            <div className="font-medium text-red-600">{offline}</div>
            <div className="text-xs text-gray-400">Offline</div>
          </div>
        </div>
      )}
    </div>
  );
}
