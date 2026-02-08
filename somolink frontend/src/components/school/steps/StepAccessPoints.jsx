import React, { useState } from "react";

export default function StepAccessPoints({ school, onSave, disabled }) {
  const [mac, setMac] = useState("");
  const [name, setName] = useState("");
  const [hotspotId, setHotspotId] = useState(school.hotspots?.[0]?.id || "");

  if (disabled)
    return <div className="text-gray-500">Please add profiles first.</div>;

  function handleSave(e) {
    e.preventDefault();
    const ap = { id: `ap-${Date.now()}`, mac, name, hotspotId, online: false };
    onSave(ap);
    setMac("");
    setName("");
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Step 4 — Add Access Point</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">MAC Address</label>
          <input
            value={mac}
            onChange={(e) => setMac(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
            placeholder="AA:BB:CC:DD:EE:FF"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            AP Name (optional)
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Assign to Hotspot
          </label>
          <select
            className="mt-1 w-full border-b border-gray-300 py-2"
            value={hotspotId}
            onChange={(e) => setHotspotId(e.target.value)}
          >
            <option value="">— none —</option>
            {school.hotspots?.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-3 py-2 rounded bg-indigo-600 text-white"
          >
            Add AP
          </button>
        </div>
      </form>
    </div>
  );
}
