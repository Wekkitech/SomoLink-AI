import React, { useEffect, useState } from "react";
import { Wifi } from "lucide-react";
import Drawer from "../../common/Drawer";
import { useSchool } from "../../../context/SchoolContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function OpenWlan() {
  const { school } = useSchool();
  const schoolId = school?.id;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [wlanList, setWlanList] = useState([]);

  const [wlanInterface, setWlanInterface] = useState("");
  const [ssidName, setSsidName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FETCH WLAN ================= */

  useEffect(() => {
    if (!schoolId) return;

    const fetchWlan = async () => {
      try {
        const res = await fetch(`${API_URL}/network/wlan/${schoolId}`);
        if (!res.ok) throw new Error("Failed to fetch WLANs");
        setWlanList(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchWlan();
  }, [schoolId]);

  /* ================= SAVE WLAN ================= */

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (!wlanInterface.trim() || !ssidName.trim()) {
      setError("Both fields are required.");
      return;
    }

    const payload = {
      wlanInterface: wlanInterface.trim(),
      ssidName: ssidName.trim(),
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/network/wlan/setup/${schoolId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || "Failed to configure WLAN");
      }

      const newWlan = await res.json();

      setWlanList((prev) => [...prev, newWlan]);
      setWlanInterface("");
      setSsidName("");
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">WLAN</h3>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Configure
          </button>
        </div>

        {/* WLAN List */}
        {wlanList.length === 0 ? (
          <div className="text-gray-500 text-sm">No WLANs created.</div>
        ) : (
          <div className="space-y-3">
            {wlanList.map((wlan, index) => (
              <div
                key={index}
                className=" rounded p-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {wlan.ssidName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Interface:{" "}
                    <span className="font-mono">{wlan.wlanInterface}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Configure WLAN"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Wireless Interface
            </label>
            <input
              type="text"
              value={wlanInterface}
              onChange={(e) => setWlanInterface(e.target.value)}
              placeholder="e.g. wlan1"
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              SSID Name
            </label>
            <input
              type="text"
              value={ssidName}
              onChange={(e) => setSsidName(e.target.value)}
              placeholder="Somolink Wifi"
              className="mt-1 w-full border-b border-gray-300 focus:outline-none py-2"
            />
          </div>

          {error && <p className="text-red-600 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save WLAN"}
          </button>
        </form>
      </Drawer>
    </>
  );
}
