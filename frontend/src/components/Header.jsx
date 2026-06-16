import React, { useEffect, useState } from "react";
import TaskFloLogo from "./TaskFloLogo";
import Profile from "./Profile.jsx";
import { useAuthContext } from "../contexts/AuthProvider.jsx";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchprofile() {
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
        setProfile(data);
        console.log("fetchprofile", data, profile);
      } catch (err) {
        console.error(err);
      }
    }
    fetchprofile();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between bg-blue-500 h-10 ">
        <TaskFloLogo />
        <Profile data={profile} />
      </div>
    </>
  );
}
