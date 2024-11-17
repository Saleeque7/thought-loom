import { useState } from 'react'
import HomeRoutes from './Routes/HomeRoutes'
import AuthRoutes from './Routes/AuthRoutes'
import { Routes ,Route } from 'react-router-dom'
import { ProtectedRoute, PublicRoute } from './utils/Middleware/ProtectedRoute'


function App() {


  return (
      <>
    <Routes>
      <Route element={<ProtectedRoute/>}>
      <Route path='/*' element={<HomeRoutes/>}/>
      </Route>
      <Route element={<PublicRoute/>}>
      <Route path='/auth/*' element={<AuthRoutes/>}/>
        </Route>  
    </Routes >
     
    </>
  )
}

export default App
