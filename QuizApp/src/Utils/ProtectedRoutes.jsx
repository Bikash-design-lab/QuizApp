import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Get auth token from localStorage
  return authToken ? children : <Navigate to="/Register" />; // Redirect to Register if not authenticated
};

export default ProtectedRoutes;
