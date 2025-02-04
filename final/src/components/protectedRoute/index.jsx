import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login"); // Redirect to login if not logged in
    return null; // Optionally return null or a loading indicator while redirecting
  }

  return children; // Return protected content if logged in
};

export default ProtectedRoute; // Make sure this is a default export
