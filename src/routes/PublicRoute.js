import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  let isAuth = localStorage.getItem("AccessToken");
  return !isAuth ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default PublicRoute;
