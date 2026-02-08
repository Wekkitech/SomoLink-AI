import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import { ArrowLeft, MapPin, Hash, Activity } from "lucide-react";
import { useSchool } from "../context/SchoolContext";
import SomolinkLoader from "../components/loaders/SomolinkLoader";

const API_URL = import.meta.env.VITE_API_URL;



export default function SchoolPage () {
  

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { school, setSchool } = useSchool();

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/schools/${id}`);
        if (!res.ok) throw new Error("Failed to fetch school");
        const data = await res.json();

        setSchool({
          ...data,
          devices: data.devices ?? [],
          users: data.users ?? [],
          openWlan: data.openWlan ?? [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id, setSchool]);

  if (loading) return (
    <div className="p-6">
      <p colSpan="4" className="text-center py-6 text-gray-500">
        Loading...
      </p>{" "}
    </div>
  );
  if (!school) return <div className="p-6">School not found</div>;

  return (
    <div className="h-[calc(100vh-3rem)] bg-gray-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-6 flex flex-col">
        {/* ================= HEADER ================= */}
        <div className="shrink-0 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* LEFT */}
            <div className="flex items-start gap-4">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  school.active
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <Activity size={18} />
              </div>

              <div>
                <h1 className="text-2xl font-semibold">{school.name}</h1>

                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Hash size={14} /> {school.code}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {school.location}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => navigate("/schools")}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-white border hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back to schools
            </button>
          </div>

          {/* ================= NAV TABS ================= */}
          <nav className="mt-6 flex gap-6">
            {[ "monitoring", "configuration", "users","devices", "wlan", "hotspot"].map((tab) => (
              <NavLink
                key={tab}
                to={`/school/${id}/${tab}`}
                className={({ isActive }) =>
                  `pb-3 text-sm capitalize ${
                    isActive
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-600"
                  }`
                }
              >
                {tab}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ================= PAGE CONTENT ================= */}
        <div className="flex-1 overflow-y-auto py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
