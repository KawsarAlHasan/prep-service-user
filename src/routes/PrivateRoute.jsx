import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useUserProfile } from "../api/api";

const PrivateRoute = ({ children }) => {
  const { user, isLoading, isError, error } = useUserProfile();

  const location = useLocation();
  const token = localStorage.getItem("token");

  if (isLoading) {
    return <Spin />;
  }

  if (isError || error || !user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
