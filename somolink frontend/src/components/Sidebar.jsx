import { NavLink } from "react-router-dom";
import {
  User,
  LogOut,
  Home,
  Building,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const { user } = useUser();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 py-3 px-6 rounded hover:bg-indigo-100 hover:text-indigo-700 transition ${
      isActive ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-700"
    }`;

  const handleLogout = () => logout();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 text-gray-900 transform z-50 transition-transform
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:inset-auto flex flex-col`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold p-6 border-b border-gray-200">
          SomoLink
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-2 flex-1">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="w-4 h-4" /> Dashboard
          </NavLink>

          <NavLink
            to="/schools"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Building className="w-4 h-4" /> Schools
          </NavLink>

          <NavLink
            to="/finance"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <CreditCard className="w-4 h-4" /> Finance
          </NavLink>
       

          <NavLink
            to="/transactions"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <FileText className="w-4 h-4" /> Transactions
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings className="w-4 h-4" /> Settings
          </NavLink>
        </nav>

        {/* USER + LOGOUT (BOTTOM) */}
        {user && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            <NavLink
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <User className="w-6 h-6 text-gray-600" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{user.username}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </NavLink>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
