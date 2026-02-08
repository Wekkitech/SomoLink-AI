import React, { useState } from "react";

export default function StepProfiles({  onSave, disabled }) {
  const [name, setName] = useState("");
  const [speed, setSpeed] = useState("");
  const [duration, setDuration] = useState("");

  if (disabled) {
    return <div className="text-gray-500">Please create a hotspot first.</div>;
  }

  function handleSave(e) {
    e.preventDefault();
    const profile = { id: `p-${Date.now()}`, name, speed, duration };
    onSave(profile);
    setName("");
    setSpeed("");
    setDuration("");
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Step 3 — Profiles</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Profile Name</label>
          <input
            className="mt-1 w-full border-b border-gray-300 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Speed (e.g. 2Mbps)
          </label>
          <input
            className="mt-1 w-full border-b border-gray-300 py-2"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">
            Duration (e.g. 1h)
          </label>
          <input
            className="mt-1 w-full border-b border-gray-300 py-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-3 py-2 rounded bg-indigo-600 text-white"
          >
            Add Profile
          </button>
        </div>
      </form>
    </div>
  );
}
