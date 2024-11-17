import React from 'react'
import { Routes ,Route } from 'react-router-dom'
import Home from '../pages/Dashboard/Home'
import Write from '../pages/Dashboard/Write'
import Edit from '../pages/Dashboard/Edit'
import Profile from '../pages/Dashboard/Profile'
import Article from '../pages/Dashboard/Article'


export default function HomeRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/article/:id' element={<Article/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path='/edit-article/:id' element={<Edit/>}/>
        <Route path='/profile/*' element={<Profile/>}/>
    </Routes>
    </>
  )
}
