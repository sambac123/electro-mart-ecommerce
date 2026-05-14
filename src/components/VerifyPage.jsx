import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authAPI from '../api/AuthApi'

export default function VerifyPage() {

  const [otp, setOtp] = useState("")
  const navigate = useNavigate()

  // get email from localStorage (you stored during signup)
  const email = localStorage.getItem("Email")

  const verifyOtp = async () => {
    try {
      const res = await authAPI.post("/verify", {
        email: email,
        otp: otp
      })

      alert("OTP Verified Successfully ✅")
      navigate("/login")

    } catch (err) {
      alert(err.response?.data || "Invalid OTP ❌")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-80 h-64 flex flex-col justify-center items-center shadow-xl rounded p-5 gap-4">

        <h2 className="text-2xl font-bold">Verify OTP</h2>

        <p className="text-sm text-gray-500">
          OTP sent to: {email}
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOtp}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Verify
        </button>

      </div>

    </div>
  )
}