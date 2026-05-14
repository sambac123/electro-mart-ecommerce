import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUserSwitch } from "react-icons/ai";
import AuthApi from '../api/AuthApi';
export default function HomePage() {
    const [username, setUserName]=useState("");
    const [userEmail, setUserEmail]=useState("");
    const [password, setPassword]=useState();
    const [isAdmin,setAdmin]=useState(false);
    const navigate=useNavigate();

  const signup = async () => {
  try {
    const res = await AuthApi.post("/signup", {
      userName: username,
      email: userEmail,
      password: password,
      role: isAdmin ? "ADMIN" : "USER"
    });

    alert(res.data);
    localStorage.setItem("Email", userEmail);
    navigate("/verify");

  } catch (err) {
    console.error(err);
    alert(err.response?.data || "Signup failed ❌");
  }
};
  return (
    <>
    <div>
        <div className='absolute top-2 right-2 border rounded p-3 bg-blue-500 shadow-lg shadow-blue-500/50 text-white'>
       <button onClick={()=>setAdmin (!isAdmin)} className='flex '><AiOutlineUserSwitch className='text-2xl'/> Switch to {isAdmin ? "User" :"Admin"} </button>
       </div>
     <div className="flex justify-center items-center h-screen ">
  <div className="flex gap-5 text-center">

    <div className="w-72 h-64 flex flex-col justify-center items-center text-white rounded shadow-xl/60 font-bold bg-blue-500 gap-5 ">
      <h3 className='text-3xl '>ElectroMart</h3>
      <p>{isAdmin ? "Admin Signup" : "User Signup"}</p>
      <p>Secure Login Spring Boot & MySQL</p>
    </div>

    <div className="w-72 h-64 flex flex-col justify-center items-center rounded shadow-xl/60 ">
      <h2>{isAdmin ? "ADMIN" : "USER"}</h2>

      <input type="text" name="name" placeholder="Enter User Name" className="border p-1 w-60" onChange={e=>setUserName((e.target.value))}/><br/>

      <input type="email" name="email" placeholder="Enter user Email" className="border p-1 w-60" onChange={e=>setUserEmail((e.target.value))}/><br/>

      <input type="password" name="password" placeholder="Enter password" className="border p-1 w-60" onChange={e=>setPassword((e.target.value))}/><br/>

      <button onClick={signup} className="bg-blue-500 text-white px-4 py-1 rounded">
        {isAdmin ? "Admin Signup" : "User Signup"}
      </button>
      <p>Already have an account ?
        <Link to="/login" className='text-blue-500'>Login</Link>
      </p>
    </div>

  </div>
</div>
    </div>
    </>
  )
}
