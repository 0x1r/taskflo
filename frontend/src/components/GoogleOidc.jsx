import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { includes } from "zod";
import { useAuthContext } from "../contexts/AuthProvider";

export default function GoogleOidc() {
  const navigate = useNavigate();
  const { isLoggedin, setisLoggedin } = useAuthContext();

  const handlePopup = () => {
    window.open(
      "http://localhost:3000/api/v1/google",
      "auth-popup",
      "width=950,height=850",
    );
  };
  useEffect(() => {
    const handleStorage = (e) => {
      // console.log("fired");
      const sid = localStorage.getItem("sid");
      console.log(sid);
      if (sid === "true") {
        localStorage.removeItem("sid");
        setTimeout(() => {
          setisLoggedin(true);
          navigate("/dashboard");
        }, 500);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <>
      <div className="text-gray-500 text-xs bg-blue-500 w-30 px-1 py-2">
        <button onClick={handlePopup}>Login With Google</button>
      </div>
    </>
  );
}
