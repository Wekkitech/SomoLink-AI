
import React, { useEffect } from "react";
import { useTraffic } from "../../context/TrafficProvider";
import ByteGraph from "../school/school monitoring cards/ByteGraph";
import DashboardByteGraph from "./DashboardByteGraph";


const API_URL = import.meta.env.VITE_API_URL;
const MAX_POINTS = 180;

export default function UplinkMonitoring() {
  const { setUplinkData, uplinkData } = useTraffic();

  useEffect(() => {
    const iface = "ether1";

    const fetchTraffic = async () => {
      try {
        const res = await fetch(`${API_URL}/traffic/${iface}`);
        const sample = await res.json();

        setUplinkData((prev) => {
          const next = [...prev, sample];
          return next.slice(-MAX_POINTS);
        });
      } catch (e) {
        console.error("Traffic fetch failed", e);
      }
    };

    fetchTraffic();
    const id = setInterval(fetchTraffic, 1000); // WinBox refresh rate
    return () => clearInterval(id);
  }, [setUplinkData]);

  return <DashboardByteGraph data={uplinkData} />;
}
