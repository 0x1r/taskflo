import { Navigate, Outlet } from "react-router";

import { useAuthContext } from "../contexts/AuthProvider";
import { useEffect } from "react";

export default function PublicRoute() {
  const { isLoggedin } = useAuthContext();
  return (
    <>{isLoggedin === true ? <Navigate to="/dashboard" /> :<Outlet /> }</>
  );
}
