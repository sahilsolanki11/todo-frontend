import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token → send user back to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → show the protected page
  return children;
};

export default ProtectedRoute;
