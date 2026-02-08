import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { useAuth } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

// 🔹 JWT decode helper (inline to avoid broken imports)
const decodeJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setUserProfile } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      // 🔹 Save tokens
      login(data.accessToken, data.refreshToken);

      // 🔹 Decode JWT → real user data
      const decoded = decodeJwt(data.accessToken);

      setUserProfile({
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        username: decoded.username,
        role: decoded.role,
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* ===== Header ===== */}
        <div className="mb-6 text-center">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            SomoLink
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Access your network management dashboard
          </p>
        </div>

        {/* ===== Card ===== */}
        <div className="p-6">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="admin@isp.co.ke"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Network Management Platform
        </p>
      </div>
    </div>
  );
}
