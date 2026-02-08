import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * StepInterface
 * - Fetches router interfaces from backend
 * - Allows auto-generation of valid IP + subnet
 * - Posts ConfigureBridgeRequest to backend
 */
export default function StepInterface({ school, onSave }) {
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterfaces, setSelectedInterfaces] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState(24);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // ---- Fetch available interfaces ----
  useEffect(() => {
    const fetchInterfaces = async () => {
      try {
        const res = await fetch(`${API_URL}/network/interfaces`);
        if (!res.ok) throw new Error("Failed to fetch interfaces");
        const data = await res.json();
        setInterfaces(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterfaces();
  }, []);

  // ---- Auto-generate valid private network ----
  const autoConfigure = () => {
    // 10.10.X.1/24 where X is school id (safe & predictable)
    const thirdOctet = Number(school.id) % 254;
    setIpAddress(`10.10.${thirdOctet}.1`);
    setSubnetMask(24);
    setDescription(`Bridge for ${school.name}`);
  };

  // ---- Submit bridge configuration ----
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

      onSave(payload);
    } catch (err) {
      console.error(err);
      alert("Bridge configuration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Step 1 — Configure Bridge</h3>

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
                  onChange={(e) => {
                    setSelectedInterfaces((prev) =>
                      e.target.checked
                        ? [...prev, intf]
                        : prev.filter((i) => i !== intf)
                    );
                  }}
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
