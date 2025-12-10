import React from "react";
import styles from "./DevicesTable.module.css";

const DevicesTable = ({ devices, onDisconnect }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Time Connected</th>
            <th>Data Used</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.timeConnected}</td>
              <td>{d.dataUsed}</td>
              <td
                className={
                  d.status === "Online" ? styles.online : styles.offline
                }
              >
                {d.status}
              </td>
              <td>
                <button
                  className={styles.disconnectBtn}
                  onClick={() => onDisconnect(d.id)}
                >
                  Disconnect
                </button>
              </td>
            </tr>
          ))}
          {devices.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.empty}>
                No devices connected
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DevicesTable;
