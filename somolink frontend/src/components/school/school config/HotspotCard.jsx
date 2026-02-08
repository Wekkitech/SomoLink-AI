import React, { useState } from "react";
import { Wifi, X } from "lucide-react";
import Drawer from "../../common/Drawer";

export default function HotspotCard({ hotspots = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Hotspot</h3>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Configure
          </button>
        </div>

        {/* Hotspot List */}
        {hotspots.length === 0 ? (
          <div className="text-gray-500 text-sm">No hotspot created.</div>
        ) : (
          <ul className="space-y-2">
            {hotspots.map((h) => (
              <li key={h.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{h.name}</div>
                  <div className="text-xs text-gray-400">
                    Interface: {h.interfaceId}
                  </div>
                </div>
                <div
                  className={`h-2 w-2 rounded-full ${
                    h.online ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure Hotspot"
      >
        {/* Placeholder content */}
        <p className="text-sm text-gray-700">
          Hotspot configuration form goes here.
        </p>
      </Drawer>
    </>
  );
}
