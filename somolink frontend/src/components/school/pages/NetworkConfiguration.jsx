import React, { useEffect, useState } from "react";
import { Network, Wifi } from "lucide-react";
import Drawer from "../../common/Drawer";
import { useSchool } from "../../../context/SchoolContext";

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = [
  "bg-indigo-100 text-indigo-800",
  "bg-green-100 text-green-800",
  "bg-blue-100 text-blue-800",
  "bg-yellow-100 text-yellow-800",
  "bg-pink-100 text-pink-800",
  "bg-purple-100 text-purple-800",
];

export default function NetworkConfiguration() {
  const { school } = useSchool();

  const [bridgeConfig, setBridgeConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // ---- Form state ----
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterfaces, setSelectedInterfaces] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState(24);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BRIDGE CONFIG ================= */

  useEffect(() => {
    if (!school?.id) return;

    const fetchBridgeConfig = async () => {
      try {
        setConfigLoading(true);

        const res = await fetch(
          `${API_URL}/network/bridge/configuration/${school.id}`
        );

        if (res.ok) {
          const data = await res.json();
          setBridgeConfig(data);
        } else {
          setBridgeConfig(null);
        }
      } catch (err) {
        console.error(err);
        setBridgeConfig(null);
      } finally {
        setConfigLoading(false);
      }
    };

    fetchBridgeConfig();
  }, [school?.id]);

  /* ================= FETCH INTERFACES (DRAWER) ================= */

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

    // Pre-fill if editing
    if (bridgeConfig) {
      setSelectedInterfaces(bridgeConfig.interfaces || []);
      setSubnetMask(bridgeConfig.subnetMask);
      setDescription(bridgeConfig.description);

      if (bridgeConfig.cidr) {
        setIpAddress(bridgeConfig.cidr.split("/")[0]);
      }
    }
  }, [drawerOpen, bridgeConfig]);

  /* ================= HELPERS ================= */

  const autoConfigure = () => {
    const thirdOctet = Number(school.id) % 254;
    setIpAddress(`10.10.${thirdOctet}.1`);
    setSubnetMask(24);
    setDescription(`Bridge for ${school.name}`);
  };

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

      if (!res.ok) throw new Error("Failed");

      setDrawerOpen(false);

      // Refresh config
      const refreshed = await fetch(
        `${API_URL}/network/bridge/configuration/${school.id}`
      );
      setBridgeConfig(await refreshed.json());
    } catch (err) {
      console.error(err);
      alert("Bridge configuration failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORM ================= */

  const renderForm = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Configure Bridge</h3>

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
            className="mt-1 w-full border-b border-gray-300 py-2"
          />
        </div>

        {/* Subnet */}
        <div>
          <label className="block text-sm text-gray-700">Subnet Mask</label>
          <select
            value={subnetMask}
            onChange={(e) => setSubnetMask(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
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
            className="mt-1 w-full border-b border-gray-300 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
        >
          {loading ? "Configuring..." : "Save & Configure"}
        </button>
      </form>
    </div>
  );

  /* ================= UI ================= */

  if (configLoading) {
    return (
      <div className="bg-white border p-3 rounded text-sm text-gray-500">
        Loading network configuration...
      </div>
    );
  }

  if (!bridgeConfig) {
    return (
      <div className="bg-white border p-3 rounded flex justify-between">
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
          {renderForm()}
        </Drawer>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 p-4 rounded space-y-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-700">
            Network Bridge Configuration
          </h3>
        </div>

        <button
          onClick={() => setDrawerOpen(true)}
          className="text-indigo-600 text-sm"
        >
          Reconfigure
        </button>
      </div>

      {/* Name */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Name</p>
        <p className="font-medium text-gray-800">{bridgeConfig.portName}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-xs text-gray-500 uppercase">Description</p>
        <p className="text-gray-700">{bridgeConfig.description || "—"}</p>
      </div>

      {/* Network */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">CIDR</p>
          <p className="font-mono text-gray-800">{bridgeConfig.cidr}</p>
        </div>
      </div>

      {/* DHCP */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase">DHCP Pool</p>
          <p className="font-mono text-gray-800">
            {bridgeConfig.dhcpPoolRange}
          </p>
        </div>

        
      </div>

      {/* Interfaces */}
      <div>
        <p className="text-xs text-gray-500 uppercase mb-2">
          Attached Interfaces
        </p>

        <div className="flex flex-wrap gap-2">
          {bridgeConfig.interfaces.map((intf, idx) => (
            <span
              key={intf}
              className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                COLORS[idx % COLORS.length]
              }`}
            >
              <Wifi className="w-3 h-3" />
              {intf}
            </span>
          ))}
        </div>
      </div>

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
