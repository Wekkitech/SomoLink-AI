import React, { useEffect, useState } from "react";
import { Cpu, ChevronLeft, ChevronRight } from "lucide-react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Drawer from "../../common/Drawer";
import { useSchool } from "../../../context/SchoolContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function SchoolDevices() {
  const { school } = useSchool();
  const schoolId = school?.id;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI only
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);

  const [form, setForm] = useState({
    deviceName: "",
    macAddress: "",
  });

  const [message, setMessage] = useState(null);

  /* ================= FETCH DEVICES ================= */

  useEffect(() => {
    if (!schoolId) return;

    const fetchDevices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/schools/devices/${schoolId}`);
        if (!res.ok) throw new Error("Failed to fetch devices");
        setDevices(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [schoolId]);

  /* ================= ADD DEVICE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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

      if (!res.ok) throw new Error("Failed to add device");

      const data = await res.json();
      setDevices((prev) => [...prev, data]);
      setForm({ deviceName: "", macAddress: "" });
      setMessage({ type: "success", text: "Device added successfully" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="bg-white border border-gray-200 rounded flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
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

        {/* Search */}
        <div className="p-6">
          <div className="relative max-w-xs">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-indigo-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-6 text-left text-sm font-semibold">
                  Device Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  MAC Address
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  School
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {loading && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-sm">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                devices.map((device) => (
                  <tr key={device.id} className="">
                    <td className="py-4 pl-6 text-sm font-medium">
                      {device.deviceName}
                    </td>
                    <td className="px-3 py-4 text-sm font-mono text-gray-500">
                      {device.macAddress}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {device.schoolName}
                    </td>
                  </tr>
                ))}

              {!loading && devices.length === 0 && (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No devices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (UI only) */}
        <div className="flex items-center justify-between px-4 py-3 ">
          <p className="text-sm">
            Showing {devices.length ? 1 : 0} to {devices.length} of{" "}
            {devices.length}
          </p>

          <div className="flex items-center gap-2">
            <button disabled className="p-2 border rounded disabled:opacity-50">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-sm">Page {currentPage} of 1</span>

            <button disabled className="p-2 border rounded disabled:opacity-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add Device"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <div>
            <label className="text-xs text-gray-500">Device Name</label>
            <input
              name="deviceName"
              value={form.deviceName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-sm"
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
