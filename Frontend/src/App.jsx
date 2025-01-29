import React from 'react'
import Login from './Components/Login'
import { Routes, Route } from "react-router-dom"
// import Dashboard from './Components/Dashboard'
import Routers from "./utils/Routers"
// import Profile from './Components/Profile'
// import NotFound from './Components/NotFound'

function App() {
  return (
    <div className="app-container">
      <Routers/>
    </div>
  )
}

export default App