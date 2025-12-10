import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SomoPrincipalDashboard.module.css";
import {
  DeviceSearchBar,
  DevicesTable,
} from "@/pages/Somo/pages/SomoPrinicipalDashboard/widgets";
import { LogoBlock } from "@/components";

const mockDevices = [
  {
    id: 1,
    name: "Device A",
    timeConnected: "10:30 AM",
    dataUsed: "2.4GB",
    status: "Online",
  },
  {
    id: 2,
    name: "Device B",
    timeConnected: "10:32 AM",
    dataUsed: "1.1GB",
    status: "Online",
  },
  {
    id: 3,
    name: "Device C",
    timeConnected: "10:35 AM",
    dataUsed: "3.0GB",
    status: "Online",
  },
  {
    id: 4,
    name: "Device D",
    timeConnected: "10:40 AM",
    dataUsed: "500MB",
    status: "Offline",
  },
];

function exportDevicesToCsv(devices) {
  const headers = ["Device Name", "Time Connected", "Data Used", "Status"];
  const rows = devices.map((d) => [
    d.name,
    d.timeConnected,
    d.dataUsed,
    d.status,
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "connected-devices.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const SomoPrincipalDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState(mockDevices);

  const filteredDevices = useMemo(() => {
    if (!search.trim()) return devices;
    return devices.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [devices, search]);

  const handleDisconnect = (id) => {
    setDevices((prev) => prev.filter((d) => d.id !== id));
  };

  const handleLogout = () => {
    navigate("/somo/login");
  };

  const handleExport = () => {
    exportDevicesToCsv(filteredDevices);
  };

  return (
    <div className="page-somo">
      <div className={`page-container ${styles.wrapper}`}>
        <div className={styles.schoolCard}>
          <LogoBlock
            theme="somo"
            title={`Welcome to SomoLink`}
            text="Free Education Access to all Students"
          />
          <h2 className={styles.schoolName}>School A Primary School</h2>
          <p className={styles.role}>Admin</p>
        </div>

        <div className={styles.content}>
          <p className={styles.connectedText}>
            Connected Devices: {filteredDevices.length}
          </p>

          <DeviceSearchBar
            value={search}
            onChange={setSearch}
            onFilterClick={() => {}}
          />

          <DevicesTable
            devices={filteredDevices}
            onDisconnect={handleDisconnect}
          />

          <div className={styles.bottomRow}>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
            <button className={styles.exportBtn} onClick={handleExport}>
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SomoPrincipalDashboard;
