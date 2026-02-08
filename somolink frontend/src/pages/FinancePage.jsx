import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Wallet, Calendar, CreditCard } from "lucide-react";
import SomolinkLoader from "../components/loaders/SomolinkLoader";

/* ================= STAT CARD ================= */
function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-1">
      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
        <Icon size={16} />
        {label}
      </div>
      <div className="text-gray-800 font-semibold text-lg sm:text-xl">
        {value}
      </div>
      <div className="text-gray-400 text-xs">{sub}</div>
    </div>
  );
}

/* ================= FINANCE PAGE ================= */
export default function FinancePage() {
  const [financeData, setFinanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL; // Vite env variable

  useEffect(() => {
    async function fetchFinanceData() {
      try {
        const res = await fetch(`${apiUrl}/analytics/finance`);
        if (!res.ok) throw new Error("Failed to fetch finance data");
        const data = await res.json();
        setFinanceData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load finance data");
      } finally {
        setLoading(false);
      }
    }

    fetchFinanceData();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center">
        <SomolinkLoader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-gray-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col">
        {/* ================= HEADER + STATS ================= */}
        <div className="pt-4 sm:pt-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Finance
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Payments, revenue & transaction history
          </p>

          {/* ================= STATS ================= */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon={Wallet}
              label="Total Revenue"
              value={`KES ${financeData.totalRevenue.toFixed(2)}`}
              sub="All-time collections"
            />
            <StatCard
              icon={Calendar}
              label="Today's Revenue"
              value={`KES ${financeData.todaysRevenue.toFixed(2)}`}
              sub="Collected today"
            />
            <StatCard
              icon={CreditCard}
              label="Transactions"
              value={financeData.totalTransactions}
              sub={`Successful: ${financeData.successfulTransactions}, Failed: ${financeData.failedTransactions}`}
            />
          </div>

          {/* ================= TABS ================= */}
          <nav className="mt-6 flex flex-wrap gap-4 sm:gap-6">
            {[
              {id:1, name: "Monthly revenue", url: "monthly/revenue" },
              {id:2, name: "Yearly revenue", url: "yearly/revenue" },
            ].map((tab) => (
              <NavLink
                key={tab.id}
                to={`/finance/${tab.id ===1 ? 'monthly/revenue' : 'yearly/revenue'}`}
                className={({ isActive }) =>
                  `pb-3 text-sm capitalize transition ${
                    isActive
                      ? "border-b-2 border-indigo-600 text-indigo-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto py-4 sm:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
