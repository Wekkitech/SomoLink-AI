import React, { useState } from "react";
import { Users, X } from "lucide-react";
import Drawer from "../../common/Drawer";

export default function UsersCard({ users: initialUsers = [], schoolId }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "SCHOOL_ADMIN",
  });
    const API_URL = import.meta.env.VITE_API_URL;


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
      setForm({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "SCHOOL_ADMIN",
      });

      alert(`User ${newUser.username} added successfully`);
    } catch (err) {
      console.error(err);
      alert("Error adding user. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
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

        {users.length === 0 ? (
          <div className="text-gray-500 text-sm">No users added.</div>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{u.username}</div>
                  <div className="text-xs text-gray-400">{u.role}</div>
                  <div className="text-xs text-gray-400">{u.email}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Add User"
      >
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-xs font-medium text-gray-600">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-1 text-sm"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-1 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-gray-600">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-1 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-1 text-sm"
            >
              <option value="ISP_ADMIN">ISP Admin</option>
              <option value="SCHOOL_ADMIN">School Admin</option>
              <option value="IT_SUPPORT">IT Support</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded text-sm"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </form>
      </Drawer>
    </>
  );
}
