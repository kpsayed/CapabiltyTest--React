import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, token } = useSelector((state) => state.student);

  // If no token or user doesn't have the required role, redirect to Home
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children; // If role matches, render the protected route
};

export default ProtectedRoute;
