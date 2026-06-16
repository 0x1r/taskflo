import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";


export default function ProtectedRoute() {
  const {isLoggedin} = useAuthContext();

   if (isLoggedin === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
    { isLoggedin===true ? <Outlet/>: <Navigate to="/login"/> }
    </>
    
  )
}
