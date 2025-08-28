import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  return authToken ? children : <Navigate to="/Register" />;
};

export default ProtectedRoutes;
