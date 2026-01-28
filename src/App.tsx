import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PreviousOrders from "./pages/PreviousOrders";
import LoginView from "./pages/LoginView";
import React from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("jwt"))
  );

  // Optional: keep auth state in sync
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsAuthenticated(Boolean(token));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginView />} />

        <Route
          path="/orders"
          element={
            isAuthenticated ? (
              <PreviousOrders />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/orders" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
