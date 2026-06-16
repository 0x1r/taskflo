import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { includes } from "zod";
import { useAuthContext } from "../contexts/AuthProvider";

export default function GoogleOidc() {
  const navigate = useNavigate  ();
  const [URLSearchParam] = useSearchParams();
  const { isLoggedin, setisLoggedin } = useAuthContext();

  useEffect(() => {
    console.log(URLSearchParam.get("code"));
    const code = URLSearchParam.get("code");
    if (code) {
      console.log(code);
      async function fetchtoken() {
        const response = await fetch(
          "http://localhost:3000/api/v1/fetchtoken",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          },
        );
        const data = await response.json();
        console.log("data", data);
        if (data.message === "Google login successful") {
          setisLoggedin(true);
          navigate("/dashboard"); // ← navigate immediately here, don't rely on parent
        }
      }
      fetchtoken();
    }
  }, [URLSearchParam]);

  return (
    <>
      <div className="text-gray-500 text-xs bg-blue-500 w-30 px-1 py-2">
        <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=321136532266-p5plictd6pv3g3dnq2toeho8ccrbu0vi.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http://localhost:5173/login">
          Login with google
        </a>
      </div>
    </>
  );
}
