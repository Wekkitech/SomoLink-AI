import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";

/**
 * @param {Array<string>} roles - allowed roles e.g. ["ISP_ADMIN", "SCHOOL_ADMIN"]
 */
export default function PrivateRoute({ roles = [] }) {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but user not loaded yet
  if (!user) {
    return null; // or loading spinner
  }

  // Role check
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
