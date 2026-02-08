import React, { useState } from "react";

/**
 * Hotspot step: requires an interface to be present.
 */
export default function StepHotspot({ school, onSave, disabled }) {
  const [name, setName] = useState("");
  const [interfaceId, setInterfaceId] = useState(
    school.interfaces?.[0]?.id || ""
  );
  const [profileId, setProfileId] = useState("");

  if (disabled) {
    return (
      <div className="text-gray-500">Please configure an interface first.</div>
    );
  }

  function handleSave(e) {
    e.preventDefault();
    const hotspot = {
      id: `hs-${Date.now()}`,
      name,
      interfaceId,
      profileId,
      online: false,
    };
    onSave(hotspot);
    setName("");
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Step 2 — Create Hotspot</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Hotspot Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. SchoolHotspot1"
            className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Assign Interface
          </label>
          <select
            value={interfaceId}
            onChange={(e) => setInterfaceId(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          >
            {school.interfaces?.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} — {i.ip}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Initial Profile (optional)
          </label>
          <select
            value={profileId}
            onChange={(e) => setProfileId(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          >
            <option value="">— select —</option>
            {school.profiles?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-3 py-2 rounded bg-indigo-600 text-white"
          >
            Create Hotspot
          </button>
        </div>
      </form>
    </div>
  );
}
