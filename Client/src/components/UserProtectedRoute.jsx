import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/Signin" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

    if (allowedRoles.includes(userRole)) {
      return <Component {...rest} />;
    } else {
      return <Navigate to="/Signin" />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/404" />;
  }
};

export default UserProtectedRoute;
