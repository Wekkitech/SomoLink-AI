import React, { useState, useEffect } from "react";
import PackagesCard from "../components/settings/PackagesCard";
import Drawer from "../components/common/Drawer";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProfilesCard from "../components/settings/ProfilesCard";
import MikrotikConfigCard from "../components/settings/MikrotikConfigCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Settings() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const [packages, setPackages] = useState([]);
  const [packagesFetched, setPackagesFetched] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch packages only when accordion is opened
  useEffect(() => {
    if (activeAccordion === "packages" && !packagesFetched) {
      const fetchPackages = async () => {
        try {
          const res = await fetch(`${API_URL}/hotspot/user/profiles`);
          if (!res.ok) throw new Error("Failed to fetch packages");
          const data = await res.json();
          setPackages(
            data.map((p) => ({
              ...p,
              speedUpload: p.rateLimitUpload / 1024,
              speedDownload: p.rateLimitDownload / 1024,
              amount: p.amount,
              sessionTimeout: p.sessionTimeout,
              profileName: p.profileName,
            }))
          );
          setPackagesFetched(true);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPackages();
    }
  }, [activeAccordion, packagesFetched]);

  // Generic toggle for accordion
  const toggleAccordion = (name) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">ISP Settings</h1>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Packages Accordion */}
          <div className="bg-white rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-t"
              onClick={() => toggleAccordion("packages")}
            >
              <span>Packages</span>
              <span>
                {activeAccordion === "packages" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </span>
            </button>

            {activeAccordion === "packages" && (
              <div className="p-4 space-y-4">
                <PackagesCard
                  setDrawerOpen={setDrawerOpen}
                  drawerOpen={drawerOpen}
                  packages={packages}
                  onConfigure={() => setDrawerOpen(true)}
                />
              </div>
            )}
          </div>

          {/* Server Profiles Accordion */}
          <div className="bg-white rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-t"
              onClick={() => toggleAccordion("serverProfiles")}
            >
              <span>Server Profiles</span>
              <span>
                {activeAccordion === "serverProfiles" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </span>
            </button>

            {activeAccordion === "serverProfiles" && (
              <div className="p-4 space-y-4">
                {/* Replace with your ServerProfileCard component */}
                <ProfilesCard />
              </div>
            )}
          </div>
          <div className="bg-white rounded">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-sm font-semibold text-gray-700 rounded-t"
              onClick={() => toggleAccordion("mikrotik")}
            >
              <span>Mikrotik File Upload</span>
              <span>
                {activeAccordion === "mikrotik" ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </span>
            </button>

            {activeAccordion === "mikrotik" && (
              <div className="p-4 space-y-4">
                {/* Replace with your ServerProfileCard component */}
                <MikrotikConfigCard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
