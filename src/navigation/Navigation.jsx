import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Header from '../components/Header'
import HomePage from '../components/HomePage'
import LoginPage from '../components/LoginPage'
import VerifyPage from "../components/VerifyPage"
import MainPage from '../components/MainPage'

export default function Navigation() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Navigate to="/signup"/>}/>
            <Route path='/signup' element={<HomePage/>} />
            <Route path='/verify' element={<VerifyPage/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/main' element={<MainPage/>}/>
        </Routes>
    </div>
  )
}
