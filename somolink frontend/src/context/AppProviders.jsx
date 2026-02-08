import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { SchoolProvider } from "./SchoolContext";
import { TrafficProvider } from "./TrafficProvider";

const AppProviders = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <SchoolProvider>
        <TrafficProvider>{children}</TrafficProvider>
      </SchoolProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppProviders;
