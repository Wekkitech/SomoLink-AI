import { useSchool } from "../../../context/SchoolContext";
import AccessPointsCard from "../school config/AccessPointsCard";
import DevicesCard from "../school config/DevicesCard";
import HotspotCard from "../school config/HotspotCard";

export default function SchoolOverview() {
  const { school } = useSchool();
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Assets Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DevicesCard devices={school.devices} />
          <AccessPointsCard accessPoints={school.accessPoints} />
          <HotspotCard hotspots={school.hotspots} />
        </div>
      </section>
    </div>
  );
}
