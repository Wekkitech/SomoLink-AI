import React, { useState } from "react";
import { Cpu } from "lucide-react";
import Drawer from "../../common/Drawer";

const API_URL = import.meta.env.VITE_API_URL;

export default function AddDevicesCard({ devices = [], schoolId }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deviceList, setDeviceList] = useState(devices);

  const [form, setForm] = useState({
    deviceName: "",
    macAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/schools/add/device/${schoolId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to add device");
      }

      const data = await res.json();

      // Update list
      setDeviceList((prev) => [...prev, data]);

      // Reset form
      setForm({ deviceName: "", macAddress: "" });

      setMessage({ type: "success", text: "Device added successfully" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Devices</h3>
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Add Device
          </button>
        </div>

        {deviceList.length === 0 ? (
          <div className="text-gray-500 text-sm">No devices added.</div>
        ) : (
          <ul className="space-y-2">
            {deviceList.map((d) => (
              <li
                key={d.id}
                className="flex items-center justify-between pb-2"
              >
                <div>
                  <div className="text-sm font-medium">{d.deviceName}</div>
                  <div className="text-xs text-gray-400">{d.macAddress}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add Device"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div
              className={`text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className="text-xs text-gray-500">Device Name</label>
            <input
              name="deviceName"
              value={form.deviceName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Tablet-Classroom-01"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">MAC Address</label>
            <input
              name="macAddress"
              value={form.macAddress}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="A1:B2:C3:D4:E5:F6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded text-sm disabled:opacity-50"
          >
            {loading ? "Adding device..." : "Add Device"}
          </button>
        </form>
      </Drawer>
    </>
  );
}
