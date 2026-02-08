import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppProviders from "./context/AppProviders";

import AppLayout from "./layouts/AppLayout";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/Dashboard";
import Schools from "./pages/Schools";
import Ports from "./pages/Ports";
import Settings from "./pages/Settings";
import SchoolPage from "./pages/SchoolPage";
import UserProfilePage from "./pages/UserProfilePage";

import SchoolOverview from "./components/school/pages/SchoolOverview";
import SchoolMonitoring from "./components/school/pages/SchoolMonitoring";
import SchoolConfig from "./components/school/pages/SchoolConfig";
import SchoolDevices from "./components/school/pages/SchoolDevices";
import SchoolUsers from "./components/school/pages/SchoolUsers";
import OpenWlan from "./components/school/pages/OpenWlan";
import Hotspot from "./components/school/pages/Hotspot";
import NetworkConfiguration from "./components/school/pages/NetworkConfiguration";
import PrivateRoute from "./utils/PrivateRoute";
import FinancePage from "./pages/FinancePage";
import Revenue from "./components/finance/pages/Revenue";
import Transactions from "./pages/Transactions";
import TransactionsPage from "./pages/Transactions";
import MonthlyRevenue from "./components/finance/pages/MonthlyRevenue";
import YearlyRevenue from "./components/finance/pages/YearlyRevenue";

export default function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* ===== AUTH ===== */}
          <Route path="/login" element={<Login />} />

          {/* ===== PROTECTED APP ===== */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfilePage />} />

              {/* ISP ADMIN ONLY */}
              <Route element={<PrivateRoute roles={["ISP_ADMIN"]} />}>
                <Route path="/schools" element={<Schools />} />
                <Route path="/ports" element={<Ports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>

              {/* SCHOOL ROUTES */}
              <Route path="/school/:id" element={<SchoolPage />}>
                <Route index element={<Navigate to="monitoring" replace />} />

                {/* <Route path="overview" element={<SchoolOverview />} /> */}
                <Route path="monitoring" element={<SchoolMonitoring />} />
                <Route
                  path="configuration"
                  element={<NetworkConfiguration />}
                />
                <Route path="users" element={<SchoolUsers />} />
                <Route path="devices" element={<SchoolDevices />} />
                <Route path="wlan" element={<OpenWlan />} />
                <Route path="hotspot" element={<Hotspot />} />
              </Route>
              <Route path="/transactions" element={<TransactionsPage />} />

              <Route path="/finance" element={<FinancePage />}>
                <Route
                  index
                  element={<Navigate to="monthly/revenue" replace />}
                />
                <Route path="monthly/revenue" element={<MonthlyRevenue />} />
                <Route path="yearly/revenue" element={<YearlyRevenue />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}
