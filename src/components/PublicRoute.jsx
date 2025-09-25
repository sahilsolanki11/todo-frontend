import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If logged in → redirect to todos
  if (token) {
    return <Navigate to="/todos" />;
  }

  return children;
};

export default PublicRoute;
