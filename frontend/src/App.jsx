import React from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Profile from './pages/Profile'
import ProtectedWrapper from './pages/ProtectedWrapper'


const App = () => {


  return (
    <>
    <Routes>
      <Route path='/' element={<ProtectedWrapper><Home/></ProtectedWrapper>}   />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/profile" element={<ProtectedWrapper><Profile/></ProtectedWrapper>}/>
    </Routes>
    <ToastContainer  />
    </>
  )
}

export default App