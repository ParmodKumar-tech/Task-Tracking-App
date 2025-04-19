import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AuthContent=createContext();
export const useAuth=()=>{return useContext(AuthContent)};

export const AuthProvider=({children})=>{
    const [token,setToken]=useState(null);
    const [userName,setUserName]=useState(null);


    useEffect(()=>{
        const token=localStorage.getItem("token");
        const currentUserName=localStorage.getItem("name");
        if(!token){toast.error("token not exists!, login again!")};
        setToken(token);setUserName(currentUserName)
    },[])

    const value={token,setToken,userName,setUserName};
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>
}

