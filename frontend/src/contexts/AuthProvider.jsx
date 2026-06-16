import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedin, setisLoggedin] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Auth check failed");
        }
        const data = await response.json();
        setisLoggedin(data.authenticated);
      } catch (err) {
        console.error(err);
        setisLoggedin(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedin, setisLoggedin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
