import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";

export default function PublicRoute() {
   const { isLoggedin } = useAuthContext();

  return (
    <>
    { isLoggedin===true ? <Outlet/>: <Navigate to="/login"/> }
    </>
    
  )
}
