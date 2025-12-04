import React from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const UserContextData = createContext();

const UserContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("weatherapp_token"));
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("weatherapp_token");

  async function getProfile() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/user/getProfile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response)
        setProfile(response.data.profile);
      } else {
        console.log(response.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getProfile();
    }
  }, [loggedIn]);

  return <>
    <UserContextData.Provider value={{profile,setLoggedIn}} >{children}</UserContextData.Provider>
  </>;
};

export default UserContext;
