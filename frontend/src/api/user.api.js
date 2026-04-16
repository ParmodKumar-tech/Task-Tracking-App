
import axios from "axios";
const USER_API_END_POINT=import.meta.env.VITE_USER_API;

export const registerUser=async(data)=>{
    try{
        const res=await axios.post(`${USER_API_END_POINT}/register`,
            data,
            {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "Registration failed"
    };
    }
}

export const loginUser=async(data)=>{
    try{
        const res=await axios.post(`${USER_API_END_POINT}/login`,
            data,
            {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "login failed"
    }
}
}



export const logoutUser=async()=>{

    try{
        const res=await axios.get(`${USER_API_END_POINT}/logout`,
            {withCredentials:true});
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "logout failed"
    };
    }
}
