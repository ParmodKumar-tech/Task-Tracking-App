import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AuthContent=createContext();
export const useAuth=()=>{return useContext(AuthContent)};

export const AuthProvider=({children})=>{
    const [userName,setUserName]=useState(null);
    const [role,setRole]=useState(null);

    useEffect(()=>{
        const currentUserName=localStorage.getItem("name");
        const role=localStorage.getItem("role");
        setUserName(currentUserName);
        setRole(role);
    },[])

    const value={userName,setUserName,role,setRole};
    return <AuthContent.Provider value={value}>{children}</AuthContent.Provider>
}

