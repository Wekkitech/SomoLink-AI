import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header / Topbar */}
        <header className="h-14 flex sticky top-0 items-center justify-between p-4 border-b border-b-gray-200 bg-white md:hidden">
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              className="text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Branding */}
            <h1 className="text-sm font-semibold text-gray-800">Somolink</h1>
          </div>
        </header>

        {/* Desktop spacer (keeps alignment clean) */}
        <div className="hidden md:block h-4" />

        {/* Routed pages */}
        <main className="flex-1 px-4 md:px-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
