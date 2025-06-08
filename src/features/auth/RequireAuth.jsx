import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  const hasRequiredRole = roles.some((role) => allowedRoles.includes(role));

  if (!hasRequiredRole) {
    // Redirect to login if user doesn't have required role
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if user has required role
  return <Outlet />;
};

export default RequireAuth;
