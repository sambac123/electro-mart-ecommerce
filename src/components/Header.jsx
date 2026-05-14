import React, { useState } from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import API from '../api/API';

export default function Header({darkMode, setDarkMode}) {

  const navigate = useNavigate();
  // const [darkMode,setDarkMode]=useState(false)
  const [showProfile,setShowProfile]=useState(false)
  const userData=JSON.parse(localStorage.getItem("user"))

  const [userName,setUsername]=useState(userData?.userName)
  const [email ,setEmail]=useState(userData?.email)
  const [role]=useState(userData?.role)
  const [image,setImage]=useState(userData?.empImage)

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleImage=(e)=>{
    const file = e.target.files[0];
    if(!file)return ;
    const reader = new FileReader();
    reader.onloadend=()=>{
      setImage(reader.result)
    }
    if(file){
      reader.readAsDataURL(file)
    }
  }
  const updateProfile= async()=>{
    try{
      const res = await API.post("/update-profile",{
      userId:userData?.userId,
      email:email,
      userName: userName,
      empImage:image
      });
      localStorage.setItem("user",JSON.stringify(res.data))
      alert("Profile Updated ✅")
      setShowProfile(false)
    }
    catch(err){
      console.error(err)
      alert("Update failed ❌")
    }
  }

  return (
    <nav className="border-gray-200 mb-10 p-6 text-blue-500 shadow-xl/30">
      <div className="w-full mx-auto">
        <div className="mx-2 flex flex-wrap items-center justify-between">

          {/* Logo */}
          <span className="self-center font-bold text-2xl">
            ElectroMart
          </span>

          {/* Menu */}
          <ul className="flex items-center gap-6">

            {/* Dark Mode */}
            <li className="cursor-pointer">
              <MdOutlineDarkMode className='text-2xl cursor-pointer'   onClick={()=>setDarkMode(!darkMode)} />
            </li>

            {/* Profile */}
            <li className="flex items-center gap-1 cursor-pointer" onClick={()=>setShowProfile(true)}>
              <CgProfile className='text-2xl' />
              Profile
            </li>

            {/* Logout */}
            <li 
              onClick={logout}
              className="flex items-center gap-1 cursor-pointer"
            >
              <MdLogout className='text-2xl' />
              Logout
            </li>

          </ul>

        </div>
      </div>
          {/* POPUP PROFILE EDIT */}
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center bg-gray-200/40">

          <div className="bg-white p-6 rounded-lg shadow-xl w-200">

            <h2 className="text-xl font-bold mb-4 text-center">
              Edit Profile
            </h2>

            {/* IMAGE */}
            {image && (
              <img src={image} alt='profile' className='w-20 h-20 rounded-full mx-auto mb-3 object-cover'/>
            )}

            {/* UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="mb-3 w-full"
            />

            {/* USERNAME */}
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Username"
            />

            {/* EMAIL (READ ONLY) */}
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              readOnly
              className="border p-2 w-full mb-2 bg-gray-100"
            />

            {/* ROLE (READ ONLY) */}
            <input
              type="text"
              value={role}
              readOnly
              className="border p-2 w-full mb-3 bg-gray-100"
            />

            {/* BUTTONS */}
            <button
              onClick={updateProfile}
              className="bg-blue-500 text-white w-full py-2 rounded mb-2"
            >
              Save
            </button>

            <button
              onClick={() => setShowProfile(false)}
              className="text-red-500 w-full"
            >
              Close
            </button>

          </div>

        </div>
      )}
    </nav>
    
  )
}