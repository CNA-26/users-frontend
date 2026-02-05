import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginView from "./pages/LoginView";
import RegisterView from "./pages/RegisterView";
import PreviousOrders from "./pages/PreviousOrders";

function App() {
  const isAuthenticated = Boolean(localStorage.getItem("jwt"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
