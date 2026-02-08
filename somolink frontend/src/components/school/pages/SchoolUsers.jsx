import React, { useEffect, useState } from "react";
import {
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useSchool } from "../../../context/SchoolContext";
import Drawer from "../../common/Drawer";

const API_URL = import.meta.env.VITE_API_URL;

export default function SchoolUsers() {
  const { school } = useSchool();
  const schoolId = school?.id;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // UI-only states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage] = useState(1);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "SCHOOL_ADMIN",
  });

  /* ================= FETCH USERS ================= */

  useEffect(() => {
    if (!schoolId) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/users/${schoolId}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        setUsers(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [schoolId]);

  /* ================= ADD USER ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/add/${schoolId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId, ...form }),
      });

      if (!response.ok) throw new Error("Failed to add user");

      const newUser = await response.json();
      setUsers((prev) => [...prev, newUser]);
      setDrawerOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <div className="bg-white border border-gray-200 rounded flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 ">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-700">Users</h3>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="text-indigo-600 text-sm"
          >
            Add User
          </button>
        </div>

        {/* Search */}
        <div className="p-2">
          <div className="relative max-w-xs">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:border-gray-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-6 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Username
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold">
                  Role
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {loading && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-sm">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                users.map((user) => (
                  <tr key={user.id} className="">
                    <td className="py-4 pl-6 text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user.username}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs">
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}

              {!loading && users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (UI only) */}
        <div className="flex items-center justify-between px-4 py-3 ">
          <p className="text-sm">
            Showing {users.length ? 1 : 0} to {users.length} of {users.length}
          </p>

          <div className="flex items-center gap-2">
            <button disabled className="p-2 border rounded disabled:opacity-50">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-sm">Page {currentPage} of 1</span>

            <button disabled className="p-2 border rounded disabled:opacity-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add User"
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          />

          <div className="flex gap-2">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded p-2 text-sm"
          >
            <option value="ISP_ADMIN">ISP Admin</option>
            <option value="SCHOOL_ADMIN">School Admin</option>
            <option value="IT_SUPPORT">IT Support</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded text-sm"
          >
            Add User
          </button>
        </form>
      </Drawer>
    </>
  );
}
