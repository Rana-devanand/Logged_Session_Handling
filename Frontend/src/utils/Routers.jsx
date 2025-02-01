import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from "../Components/Login"
import SignUp from '../Components/Signup'
import Profile from '../Components/Profile'

function Routers() {
  return (
  <>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path='profile' element={<Profile/>} />
    </Routes>
  </>
  )
}

export default Routers