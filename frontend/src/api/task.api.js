
import axios from "axios";
const TASK_API_END_POINT=import.meta.env.VITE_TASK_API;

export const editTask=async(id,data)=>{

    try{
        const res=await axios.put(`${TASK_API_END_POINT}/task/${id}`,
        data,
        {withCredentials:true});
        return res.data;
    }

    catch(error){
           return error.response?.data || { 
        success: false,
        message: "failed to edit task."
    }
    }
}


export const deleteTask=async(id)=>{

    try{
        const res=await axios.delete(`${TASK_API_END_POINT}/task/${id}`,
            {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "failed to delete task."
    }
    }
}


export const addTask=async(data)=>{

    try{
        const res=await axios.post(`${TASK_API_END_POINT}/task`, 
        data,
        {withCredentials:true});
        
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "add to failed task."
    }
}
}


export const fetchTasks=async()=>{

    try{
        const res=await axios.get(`${TASK_API_END_POINT}/tasks`,
            {withCredentials:true});
            
        return res.data;
    }

    catch(error){
        return error.response?.data || { 
        success: false,
        message: "failed to fetch tasks."
    }
}
}

