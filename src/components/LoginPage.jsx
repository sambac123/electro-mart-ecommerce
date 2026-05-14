import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUserSwitch } from "react-icons/ai";
import authAPI from '../api/AuthApi';
export default function LoginPage() {
    const [userEmail, setUserEmail]=useState("");
    const [password, setPassword]=useState();
    const [isAdmin,setAdmin]=useState(false);
    const navigate=useNavigate();
    const login = async()=>{
      try{
        const res = await authAPI.post("/login",{
          email : userEmail,
          password: password
        })
        const user = res.data;
        localStorage.setItem("user",JSON.stringify(user))
       navigate("/main")
      }
      catch(err){
        alert(err.response?.data || "Login failed")
      }
    }
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
         <p>{isAdmin ? "Admin Login" : "User Login"}</p>
         <p>Secure Login Spring Boot & MySQL</p>
       </div>
   
       <div className="w-72 h-64 flex flex-col justify-center items-center rounded shadow-xl/60 ">
         <h2>{isAdmin ? "ADMIN" : "USER"}</h2>
   
         <input type="email" name="email" placeholder="Enter user Email" className="border p-1 w-60" onChange={e=>setUserEmail((e.target.value))}/><br/>
   
         <input type="password" name="password" placeholder="Enter password" className="border p-1 w-60" onChange={e=>setPassword((e.target.value))}/><br/>
   
         <button onClick={login} className="bg-blue-500 text-white px-4 py-1 rounded">
           {isAdmin ? "Admin Login" : "User Login"}
         </button>
         <div className='py-2'>
         <p>New User ? 
            <Link to="/signup" className='text-blue-500'>Signup</Link>
         </p>
         </div>
       </div>
   
     </div>
   </div>
       </div>
       </>
  )
}
