import React from "react";
import {Navigate, Route} from "react-router-dom";
import user from "../../Models/user";
export const ProtectedRoute = ({ children }) => {
    console.log(user.isLoggedIn())
    if (!user.isLoggedIn()) {
      // user is not authenticated
      return <Navigate to="/app/login" />;
    }
    return children;
  };