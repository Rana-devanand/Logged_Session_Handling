import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from "../Components/Login"
import SignUp from '../Components/Signup'

function Routers() {
  return (
  <>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  </>
  )
}

export default Routers