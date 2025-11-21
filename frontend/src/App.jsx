import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import { Splash, Somo, Jiji } from "@/pages";

// Somo Pages
import { SomoAdminLogin, SomoSignup } from "@/pages/Somo/pages";

// Jiji Pages
import { JijiLogin, JijiSignup, Payment } from "@/pages/Jiji/pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Splash Page */}
      <Route path="/" element={<Splash />} />

      {/* Somo Pages */}
      <Route path="/somo">
        <Route index element={<Somo />} />

        {/* Admin login */}
        <Route path="login" element={<SomoAdminLogin />} />

        {/* Admin signup */}
        <Route path="signup" element={<SomoSignup />} />
      </Route>

      {/* Jiji Pages */}
      <Route path="/jiji">
        <Route index element={<Jiji />} />
        <Route path="login" element={<JijiLogin />} />
        <Route path="signup" element={<JijiSignup />} />
        <Route path="payment/:packageId" element={<Payment />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
