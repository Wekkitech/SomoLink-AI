import React, { useEffect, useState } from "react";
import { Network, Wifi, CheckCircle, XCircle } from "lucide-react";
import Drawer from "../../common/Drawer";

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = [
  "bg-indigo-100 text-indigo-800",
  "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-purple-100 text-purple-800",
];

export default function PortConfigurationsCard({
  bridgeConfig,
  school,
  onConfigured,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ---- StepInterface state (INLINE) ----
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterfaces, setSelectedInterfaces] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState(24);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- Fetch interfaces ----
  useEffect(() => {
    if (!drawerOpen) return;

    const fetchInterfaces = async () => {
      try {
        const res = await fetch(`${API_URL}/network/interfaces`);
        if (!res.ok) throw new Error("Failed to fetch interfaces");
        setInterfaces(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterfaces();
  }, [drawerOpen]);

  // ---- Auto configure ----
  const autoConfigure = () => {
    const thirdOctet = Number(school.id) % 254;
    setIpAddress(`10.10.${thirdOctet}.1`);
    setSubnetMask(24);
    setDescription(`Bridge for ${school.name}`);
  };

  // ---- Save bridge ----
  const handleSave = async (e) => {
    e.preventDefault();

    if (selectedInterfaces.length === 0) {
      alert("Select at least one interface");
      return;
    }

    const payload = {
      interfaces: selectedInterfaces,
      ipAddress,
      subnetMask: Number(subnetMask),
      description,
    };

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/network/configure/bridge/${school.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to configure bridge");

      onConfigured?.(payload);
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert("Bridge configuration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================= UI ======================= */

  if (!bridgeConfig) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded flex items-center justify-between">
        <p className="text-xs text-gray-500">
          No bridge configuration available.
        </p>

        <button
          onClick={() => setDrawerOpen(true)}
          className="text-indigo-600 text-sm"
        >
          Configure
        </button>

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Configure Bridge"
        >
          {/* INLINE FORM */}
          {renderForm()}
        </Drawer>
      </div>
    );
  }

  function renderForm() {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Step 1 — Configure Bridge
        </h3>

        <button
          type="button"
          onClick={autoConfigure}
          className="mb-4 px-3 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
        >
          Auto-configure network
        </button>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Interfaces */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Select Interfaces
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interfaces.map((intf) => (
                <label key={intf} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={intf}
                    checked={selectedInterfaces.includes(intf)}
                    onChange={(e) =>
                      setSelectedInterfaces((prev) =>
                        e.target.checked
                          ? [...prev, intf]
                          : prev.filter((i) => i !== intf)
                      )
                    }
                  />
                  {intf}
                </label>
              ))}
            </div>
          </div>

          {/* IP */}
          <div>
            <label className="block text-sm text-gray-700">IP Address</label>
            <input
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="e.g. 10.10.1.1"
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          {/* Subnet */}
          <div>
            <label className="block text-sm text-gray-700">Subnet Mask</label>
            <select
              value={subnetMask}
              onChange={(e) => setSubnetMask(e.target.value)}
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            >
              {[24, 25, 26, 27].map((m) => (
                <option key={m} value={m}>
                  /{m}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-700">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
            >
              {loading ? "Configuring..." : "Save & Configure Bridge"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-3 rounded space-y-2 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Interface</h3>
        </div>

        <button
          className="text-indigo-600 text-sm"
          onClick={() => setDrawerOpen(true)}
        >
          Reconfigure
        </button>
      </div>

      {/* Name */}
      <h3>
        <span className="text-xs text-gray-500">NAME: </span>
        {bridgeConfig.portName}
      </h3>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure Bridge"
      >
        {renderForm()}
      </Drawer>
    </div>
  );
}
