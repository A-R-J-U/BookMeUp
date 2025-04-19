import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isloggedin, loading } = useAuth();

  if (loading) return null;

  return isloggedin ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
