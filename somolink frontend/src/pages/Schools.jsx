import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Activity, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 5;

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });

  /* ================= FETCH SCHOOLS ================= */
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/schools/all`);
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  /* ================= ADD SCHOOL ================= */
  const handleAddSchool = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/schools/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create school");

      const createdSchool = await res.json();
      setSchools((prev) => [createdSchool, ...prev]);
      setShowModal(false);
      setFormData({ name: "", location: "" });
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FILTER ================= */
  const filteredSchools = useMemo(() => {
    if (!searchTerm) return schools;

    const term = searchTerm.toLowerCase();
    return schools.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.location?.toLowerCase().includes(term) ||
        s.code?.toLowerCase().includes(term)
    );
  }, [schools, searchTerm]);

  const totalPages = Math.ceil(filteredSchools.length / PAGE_SIZE);
  const pagedSchools = filteredSchools.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  /* ================= UI ================= */
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] space-y-4">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Schools</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add School
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            className="pl-9 pr-3 py-2 w-full border rounded-md text-sm"
          />
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white border border-gray-200 rounded-lg flex flex-col flex-1 overflow-hidden">
        {/* TABLE SCROLL AREA */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b text-gray-600 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                pagedSchools.map((school, i) => (
                  <tr
                    key={school.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3">
                      <NavLink
                        to={`/school/${school.id}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {school.name}
                      </NavLink>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{school.code}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {school.location}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {school.active ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                          <TrendingUp size={14} />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-100 text-red-700">
                          <Activity size={14} />
                          Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

              {!loading && pagedSchools.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No schools found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION (FIXED BOTTOM) ================= */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
          <p className="text-sm text-gray-600">
            Showing {filteredSchools.length ? page * PAGE_SIZE + 1 : 0} to{" "}
            {Math.min(page * PAGE_SIZE + PAGE_SIZE, filteredSchools.length)} of{" "}
            {filteredSchools.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 border rounded disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm">
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

      {/* ================= ADD SCHOOL MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Add School</h3>
            <form onSubmit={handleAddSchool} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <input
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schools;
