import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedWrapper = ({children}) => {

    const token = localStorage.getItem("weatherapp_token");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    })

    if(!token){
        return null;
    }



  return (
    <>
    {children}
    </>
  )
}

export default ProtectedWrapper