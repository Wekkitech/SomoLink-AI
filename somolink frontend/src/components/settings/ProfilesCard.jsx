import React, { useState, useEffect } from "react";
import { UserCog } from "lucide-react";
import Drawer from "../common/Drawer";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Generates server & DNS names from port description
 */
const generateNamesFromDescription = (description = "") => {
  if (!description) return { serverName: "", dnsName: "" };

  const cleaned = description.replace(/^bridge for\s+/i, "").trim();
  const lower = cleaned.toLowerCase();

  const serverName = "hs-" + lower.replace(/\s+/g, "-") + "-server";
  const firstWord = lower.split(" ")[0];
  const dnsName = `${firstWord}.wifi`;

  return { serverName, dnsName };
};

export default function ProfilesCard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [dnsName, setDnsName] = useState("");

  const [portConfigs, setPortConfigs] = useState([]);
  const [portConfigId, setPortConfigId] = useState("");

  const [serverProfiles, setServerProfiles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ======================================================
     LOAD PORT CONFIGS
  ====================================================== */
  useEffect(() => {
    const fetchPortConfigs = async () => {
      try {
        const res = await fetch(`${API_URL}/network/port/configurations`);
        if (!res.ok) throw new Error();
        setPortConfigs(await res.json());
      } catch {
        setError("Unable to load port configurations");
      }
    };

    fetchPortConfigs();
  }, []);

  /* ======================================================
     LOAD SERVER PROFILES
  ====================================================== */
  const fetchServerProfiles = async () => {
    try {
      const res = await fetch(`${API_URL}/hotspot/server/profiles`);
      if (!res.ok) throw new Error();
      setServerProfiles(await res.json());
    } catch {
      setError("Failed to load server profiles");
    }
  };

  useEffect(() => {
    fetchServerProfiles();
  }, []);

  /* ======================================================
     PORT SELECT
  ====================================================== */
  const handlePortSelect = (e) => {
    const selectedId = e.target.value;
    setPortConfigId(selectedId);

    const selectedPort = portConfigs.find(
      (pc) => String(pc.id) === String(selectedId)
    );

    if (selectedPort?.description) {
      const { serverName, dnsName } = generateNamesFromDescription(
        selectedPort.description
      );

      setProfileName(serverName);
      setDnsName(dnsName);
    }
  };

  /* ======================================================
     SUBMIT
  ====================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!profileName || !dnsName || !portConfigId) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/hotspot/create/server/profile/${portConfigId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profileName, dnsName }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.details || "Failed to create profile");
      }

      await fetchServerProfiles(); // 🔥 refresh list

      setProfileName("");
      setDnsName("");
      setPortConfigId("");
      setDrawerOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserCog className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">
              Server Profiles
            </h3>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Configure
          </button>
        </div>

        {serverProfiles.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No configured server profiles.
          </div>
        ) : (
          <ul className="space-y-2">
            {serverProfiles.map((p) => (
              <li
                key={p.id}
                className=" rounded p-2 text-sm text-gray-800"
              >
                <div className="font-medium mb-2">{p.profileName}</div>
                <div className="text-xs text-gray-500">
                  DNS: {p.dnsName} • Port: {p.bridgePortName}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DRAWER */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Create Server Profile"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Port Configuration
            </label>
            <select
              value={portConfigId}
              onChange={handlePortSelect}
              required
              className="w-full border-b py-2"
            >
              <option value="">Select port configuration</option>
              {portConfigs.map((pc) => (
                <option key={pc.id} value={pc.id}>
                  {pc.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Server Name</label>
            <input
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
              className="w-full border-b py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">DNS Name</label>
            <input
              value={dnsName}
              onChange={(e) => setDnsName(e.target.value)}
              required
              className="w-full border-b py-2"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-3 py-2 rounded"
          >
            {loading ? "Creating..." : "Create Server Profile"}
          </button>
        </form>
      </Drawer>
    </>
  );
}
