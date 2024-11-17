import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Signup from '../pages/Auth/Signup'
import Landing from '../pages/Landing/landing'

export default function AuthRoutes() {
  return (
    <>
    <Routes>
        <Route path='/explore' element={<Landing/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </>
  )
}
