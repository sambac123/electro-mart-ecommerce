import React, { useState } from 'react'
import Header from './Header'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

export default function MainPage() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode,setDarkMode]=useState(false);
  
  if (!user) {
    return <h1>Please Login</h1>;
  }

  return (
    <>
    <div className={darkMode ? "bg-gray-900" : ""}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className="p-5 max-w-6xl mx-auto bg-slate-100">
        <h2 className="text-xl mb-4 px-10">
          Welcome      <span className='text-blue-500 font-bold'>{user?.userName} 👋</span> 
        </h2>
        {user.role === "ADMIN" 
          ? <AdminDashboard /> 
          : <UserDashboard />}
      </div>
      </div>
    </>
  )
}