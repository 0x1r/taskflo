import React from 'react'
import { useNavigate } from 'react-router';
import { useAuthContext } from '../contexts/AuthProvider';

export default function User() {
  const navigate = useNavigate();
   const { setisLoggedin } = useAuthContext();
  const handleLogout=async()=>{
    console.log("logout");
    const response =await fetch("http://localhost:3000/api/v1/logout",{
      method:"POST",
      credentials:"include"
    })
    const data=await response.json();
    console.log(data)
    if(data.message==="logged out"){
      navigate("/login")
      setisLoggedin(false);
    }
  }
  return (
    <div className='flex items-center justify-center'>
      <button className='px-2 py-1 bg-red-500 rounded-lg' onClick={handleLogout}> logout</button>
    </div>
  )
}
