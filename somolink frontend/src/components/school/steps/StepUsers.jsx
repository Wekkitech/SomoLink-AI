import React, { useState } from "react";

export default function StepUsers({ school, onSave, disabled }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Principal");

  if (disabled)
    return (
      <div className="text-gray-500">Please add at least one AP first.</div>
    );

  function handleSave(e) {
    e.preventDefault();
    const user = { id: `u-${Date.now()}`, name, email, role };
    onSave(user);
    setName("");
    setEmail("");
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Step 5 — Add Principal / Support
      </h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 w-full border-b border-gray-300 py-2"
          >
            <option>Principal</option>
            <option>Support</option>
          </select>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="px-3 py-2 rounded bg-indigo-600 text-white"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
