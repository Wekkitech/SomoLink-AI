import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,

} from "lucide-react";

const PAGE_SIZE = 8;

export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  // ================= Fetch Transactions =================
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          page,
          size: PAGE_SIZE,
          search,
          status: statusFilter,
        });
        const res = await fetch(`${API_URL}/payments?${query}`);
        const data = await res.json();

        setTransactions(data.transactions || []);
        setTotalTransactions(data.total || 0);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [page, search, statusFilter]);

  const totalPages = Math.ceil(totalTransactions / PAGE_SIZE);

  function formatDate(isoTimestamp) {
    if (!isoTimestamp) return ""; // handle null/undefined

    const date = new Date(isoTimestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) return isoTimestamp;

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };

    return date.toLocaleString("en-GB", options);
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>

      
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-3">
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search phone, school, receipt..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 pr-3 py-2 w-full border rounded-md text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
          className="border rounded-md px-3 py-2 text-sm w-full md:w-40"
        >
          <option value="">All Status</option>
          <option value="PAID">Success</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      {/* ================= TABLE + PAGINATION ================= */}
      <div className="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
        {/* TABLE SCROLL AREA */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b text-gray-600 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Phone</th>

                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  Package
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  Receipt Number
                </th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Loading transactions...
                  </td>
                </tr>
              ) : transactions.length > 0 ? (
                transactions.map((tx, i) => (
                  <tr
                    key={tx.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(tx.paidAt)}
                    </td>
                    <td className="px-4 py-3">{tx.phoneNumber}</td>

                    <td className="px-4 py-3 hidden lg:table-cell">
                      {tx.profileName}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {tx.mpesaReceiptNumber}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      KES {tx.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          tx.status === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION (FIXED BOTTOM) ================= */}
        <div className="shrink-0 border-t px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-600">
            Showing {transactions.length ? page * PAGE_SIZE + 1 : 0}–{" "}
            {Math.min(page * PAGE_SIZE + PAGE_SIZE, totalTransactions)} of{" "}
            {totalTransactions}
          </p>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm text-gray-700">
              Page {page + 1} of {totalPages || 1}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page + 1 >= totalPages}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
