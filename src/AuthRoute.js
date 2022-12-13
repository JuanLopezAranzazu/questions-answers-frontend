import React from "react";
// router
import { useLocation } from "wouter";

const ProtectedRoute = ({ isLogged, children }) => {
  const [location, setLocation] = useLocation();

  if (!isLogged) {
    setLocation("/login");
  }
  return children;
};

export default ProtectedRoute;
