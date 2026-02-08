import React, { useState, useEffect } from "react";
import { Wifi } from "lucide-react";
import Drawer from "../../common/Drawer";
import { useSchool } from "../../../context/SchoolContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Hotspot() {
  const { school } = useSchool();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [hotspots, setHotspots] = useState();

  const [form, setForm] = useState({
    interfaceName: "",
    hotspotName: "",
    profileName: "",
    userProfileId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** Fetch existing hotspots for the bridge */
  useEffect(() => {
    if (!school || !school.bridgeId) return;

    fetch(`${API_URL}/hotspot/${school.bridgeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.details) {
          setHotspots();
        } else {
          setHotspots(data); 
        }
      })
      .catch((err) => console.error(err));
  }, [school, school.bridgeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        hotspotName: form.hotspotName,
      };

      const res = await fetch(`${API_URL}/hotspot/setup/${school.bridgeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || "Failed to create hotspot");
      }

      const newHotspot = await res.json();
      setHotspots((prev) => [...prev, newHotspot]);
      setDrawerOpen(false);
      setForm({
        hotspotName: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        {!hotspots ? (
          <div className="text-gray-500 text-sm">No hotspot created.</div>
        ) : (
          <ul className="space-y-2">
            <li key={hotspots.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">
                  {hotspots.hotspotName}
                </div>
                <div className="text-xs text-gray-400">
                  Interface: {hotspots.interfaceName}
                </div>
                <div className="text-xs text-gray-400">
                  Profile: {hotspots.profileName}
                </div>
                <div className="text-xs text-gray-400">
                  Created At: {new Date(hotspots.createdAt).toLocaleString()}
                </div>
              </div>
              <div
                className={`h-2 w-2 rounded-full ${
                  hotspots.configured ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </li>
          </ul>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure Hotspot"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div>
            <label className="text-xs text-gray-500">Hotspot Name</label>
            <input
              type="text"
              name="hotspotName"
              value={form.hotspotName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Enter hotspot name"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded text-sm disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Hotspot"}
          </button>
        </form>
      </Drawer>
    </>
  );
}
