import React, { useEffect, useState } from "react";
import Drawer from "../common/Drawer";

const API_URL = import.meta.env.VITE_API_URL;

export default function PackagesCard({
  onConfigure,
  drawerOpen,
  setDrawerOpen,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Drawer form state
  const [newPackage, setNewPackage] = useState({
    profileName: "",
    speedUpload: "",
    speedDownload: "",
    sessionTimeout: "1h",
    idleTimeout: "10m",
    amount: "",
    description: "",
  });

  const handleSavePackage = async (e) => {
    e.preventDefault();

    const payload = {
      profileName: newPackage.profileName,
      rateLimitUpload: Math.round(Number(newPackage.speedUpload) * 1024), // convert Mbps to kbps
      rateLimitDownload: Math.round(Number(newPackage.speedDownload) * 1024),
      sessionTimeout: newPackage.sessionTimeout,
      idleTimeout: newPackage.idleTimeout,
      amount: parseFloat(newPackage.amount),
      description: newPackage.description,
    };

    try {
      const res = await fetch(`${API_URL}/hotspot/create/user/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save package");
      const savedPackage = await res.json();

      setPackages((prev) => [
        ...prev,
        {
          ...savedPackage,
          speedUpload: savedPackage.rateLimitUpload / 1024,
          speedDownload: savedPackage.rateLimitDownload / 1024,
        },
      ]);

      setDrawerOpen(false);
      setNewPackage({
        profileName: "",
        speedUpload: "",
        speedDownload: "",
        sessionTimeout: "1h",
        idleTimeout: "10m",
        amount: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save package");
    }
  };

  // Fetch packages from backend
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/hotspot/user/profiles`);
      if (!res.ok) throw new Error("Failed to fetch packages");
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Convert Kbps to Mbps
  const kbpsToMbps = (kbps) => (kbps / 1024).toFixed(2);

  return (
    <div className="space-y-2 border border-gray-200 p-4 rounded">
      {loading ? (
        <div className="text-gray-500 text-sm">Loading packages...</div>
      ) : packages.length === 0 ? (
        <div className="text-gray-500 text-sm">No packages defined.</div>
      ) : (
        <ul className="space-y-2">
          {packages.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between p-3 rounded bg-gray-50"
            >
              <div className="space-y-1">
                <div className="text-sm font-medium">{p.profileName}</div>
                <div className="text-xs text-gray-500">
                  Upload: {kbpsToMbps(p.rateLimitUpload)} Mbps • Download:{" "}
                  {kbpsToMbps(p.rateLimitDownload)} Mbps • Session:{" "}
                  {p.sessionTimeout} • KES {p.amount.toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => onConfigure(p)}
                className="text-indigo-600 text-sm"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => onConfigure(null)}
        className="mt-2 text-sm text-indigo-600 hover:underline"
      >
        + Add New Package
      </button>
      {/* Drawer for creating a new package */}
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setNewPackage({
            profileName: "",
            speedUpload: "",
            speedDownload: "",
            sessionTimeout: "1h",
            idleTimeout: "10m",
            amount: "",
            description: "",
          });
        }}
        title="Create Package"
      >
        <form className="space-y-4" onSubmit={handleSavePackage}>
          <div>
            <label className="block text-sm text-gray-700">Profile Name</label>
            <input
              type="text"
              value={newPackage.profileName}
              onChange={(e) =>
                setNewPackage({ ...newPackage, profileName: e.target.value })
              }
              required
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">
                Upload Limit (Mbps)
              </label>
              <input
                type="number"
                value={newPackage.speedUpload}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, speedUpload: e.target.value })
                }
                min={0}
                step={0.01}
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Download Limit (Mbps)
              </label>
              <input
                type="number"
                value={newPackage.speedDownload}
                onChange={(e) =>
                  setNewPackage({
                    ...newPackage,
                    speedDownload: e.target.value,
                  })
                }
                min={0}
                step={0.01}
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">
                Session Timeout
              </label>
              <input
                type="text"
                value={newPackage.sessionTimeout}
                onChange={(e) =>
                  setNewPackage({
                    ...newPackage,
                    sessionTimeout: e.target.value,
                  })
                }
                placeholder="e.g., 1h"
                required
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">
                Idle Timeout
              </label>
              <input
                type="text"
                value={newPackage.idleTimeout}
                onChange={(e) =>
                  setNewPackage({ ...newPackage, idleTimeout: e.target.value })
                }
                placeholder="e.g., 10m"
                className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Amount (KES)</label>
            <input
              type="number"
              value={newPackage.amount}
              onChange={(e) =>
                setNewPackage({ ...newPackage, amount: e.target.value })
              }
              min={0}
              step="0.01"
              required
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Description</label>
            <input
              type="text"
              value={newPackage.description}
              onChange={(e) =>
                setNewPackage({ ...newPackage, description: e.target.value })
              }
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 rounded border text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white"
            >
              Save Package
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
