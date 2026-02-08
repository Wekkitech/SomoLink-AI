// RouterDiagram.jsx
import React, { useState, useEffect } from "react";
import { Wifi, Cpu } from "lucide-react";
import Drawer from "../common/Drawer";

export default function RouterDiagram() {
  const [interfaces, setInterfaces] = useState([]);
  const [drawerPort, setDrawerPort] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch interfaces from backend (RAW strings)
  const fetchInterfaces = async () => {
    try {
      const res = await fetch(`${API_URL}/network/router/interfaces`);
      const data = await res.json();
      setInterfaces(data);
    } catch (err) {
      console.error("Error fetching interfaces:", err);
    }
  };

  // Poll every 5 seconds
  useEffect(() => {
    fetchInterfaces();
    const interval = setInterval(fetchInterfaces, 5000);
    return () => clearInterval(interval);
  }, []);

  // Enable / Disable using ADMIN state only
  const togglePort = async (port) => {
    setLoading(true);
    try {
      const action =
        port.disabled === "true" ? "enable" : "disable";

      await fetch(
        `${API_URL}/network/interface/${port.name}/${action}`,
        { method: "POST" }
      );

      await fetchInterfaces();
    } catch (err) {
      console.error(`Error toggling port ${port.name}:`, err);
    } finally {
      setLoading(false);
      setDrawerPort(null);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 w-full col-span-4">
        {/* Ports Container */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg p-4 shadow-inner overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-700 font-semibold flex items-center gap-2">
              <Cpu size={14} /> Router Ports
            </h3>

            {/* LED Legend */}
            <div className="flex items-center gap-3 text-[10px] text-gray-600">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span>Up</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Down</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>Disabled</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {interfaces.map((port) => (
              <div
                key={port.name}
                className="flex flex-col items-center p-1 bg-gray-100 border border-gray-300 rounded-md w-12 flex-shrink-0 cursor-pointer hover:shadow-md"
                onClick={() => setDrawerPort(port)}
              >
                <div className="relative w-10 h-10 rounded bg-gray-400 border border-gray-100 flex items-center justify-center mb-1">
                  {port.type === "SFP" ? (
                    <Wifi size={10} className="text-blue-400" />
                  ) : (
                    <div className="w-2 h-2 bg-gray-500 rounded-sm" />
                  )}

                  {/* LED */}
                  <div
                    className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full ${
                      port.disabled === "true"
                        ? "bg-yellow-500"
                        : port.running === "true"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>

                <span className="text-gray-800 text-[10px] font-semibold text-center truncate max-w-full">
                  {port.name}
                </span>
                <span className="text-gray-400 text-[9px] text-center truncate max-w-full">
                  {port.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer */}
      {drawerPort && (
        <Drawer
          open={!!drawerPort}
          onClose={() => setDrawerPort(null)}
          title={`Configure Port: ${drawerPort.name}`}
        >
          <div className="bg-white rounded p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-semibold">
                Type:
              </span>
              <span className="text-sm text-gray-800">
                {drawerPort.type}
              </span>
            </div>

            {/* Admin State */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-semibold">
                Admin State:
              </span>
              <span
                className={`text-sm font-medium ${
                  drawerPort.disabled === "false"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {drawerPort.disabled === "false"
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </div>

            {/* Link State */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 font-semibold">
                Link State:
              </span>
              <span
                className={`text-sm font-medium ${
                  drawerPort.running === "true"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {drawerPort.running === "true" ? "Up" : "Down"}
              </span>
            </div>

            {!["pppoe-out1","lo","bridge","sfp-sfpplus1","ether1"].includes(drawerPort.name)  && <button
              onClick={() => togglePort(drawerPort)}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded text-sm disabled:opacity-50"
            >
              {loading
                ? drawerPort.disabled === "true"
                  ? "Enabling..."
                  : "Disabling..."
                : drawerPort.disabled === "true"
                ? "Enable Port"
                : "Disable Port"}
            </button>}
          </div>
        </Drawer>
      )}
    </>
  );
}
