import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginView from "./pages/LoginView";
import RegisterView from "./pages/RegisterView";
import PreviousOrders from "./pages/PreviousOrders";
import ForgotPasswordView from "./pages/ForgotPasswordView";
import ResetPasswordView from "./pages/ResetPasswordView";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/reset-password" element={<ResetPasswordView />} />

        <Route
          path="/orders"
          element={
            isAuthenticated ? <PreviousOrders /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/orders" : "/login"} replace />}
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
