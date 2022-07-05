// import React from "react";
import { Navigate, Redirect } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Redirect to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
