import React, { useState } from "react";
import AccessPointsCard from "../school config/AccessPointsCard";
import HotspotCard from "../school config/HotspotCard";
import PortConfigurationsCard from "../school config/PortConfigurationsCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddDevicesCard from "../school config/AddDevicesCard";
import UsersCard from "../school config/UsersCard";
import WLANCard from "../school config/WLANCard";
import { useSchool } from "../../../context/SchoolContext";

export default function SchoolConfig() {
  const { school } = useSchool();
  const [openSections, setOpenSections] = useState({
    networkCore: false,
    hotspot: false,
    accessPoints: false,
    wlan: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Network Core */}
      <div className="bg-white ">
        <button
          onClick={() => toggleSection("networkCore")}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
        >
          <span className="font-semibold text-gray-700">Network Core</span>
          {openSections.networkCore ? <ChevronUp /> : <ChevronDown />}
        </button>
        {openSections.networkCore && (
          <div className="p-4">
            <PortConfigurationsCard
              bridgeConfig={school.bridgeConfiguration}
              school={school}
            />
          </div>
        )}
      </div>
    </div>
  );
}
