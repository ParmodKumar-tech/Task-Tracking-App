import React, { useState } from 'react'
import TaskDialog from './TaskDialog'
import axios from 'axios';
import { TASK_API_END_POINT } from '../utils/EndPoint';
import { useAuth } from '../authContent';
import toast from 'react-hot-toast';

export default function Task(props) {
    const [openTask,setOpenTask]=useState(false);
    const {token}=useAuth();
    const [task,setTask]=useState({
        id:props.value._id,
        title:props.value.title,
        status:props.value.status,
        description:props.value.description});
    
    const onEdit=async()=>{
        const res=await axios.get(`${TASK_API_END_POINT}/tasks/${props.value._id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(res.data.success){
            setTask((prev)=>({...prev,
                title:res.data.data.title,
                status:res.data.data.status,
                description:res.data.data.description
                
            }))
            setOpenTask(true);
            
        }
        

    }
    
    const onDelete=async()=>{
        const res=await axios.delete(`${TASK_API_END_POINT}/tasks/${props.value._id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        if(res.data.success){
            toast.success(res.data.message);
            props.onDelete(props.value._id);
            
        }
    }


    return (
        
        <div className='w-full bg-white border rounded-2xl mx-auto p-2' >
        <div className='flex flex-col'>
        <p className='w-[80%] mx-auto text-xs'>{new Date(props.value.created_date).toLocaleString("en-GB",{
        day:'2-digit',
        month:'short',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        hour12:true

    })} - <span className='font-bold'>{props.value.status}</span>
    </p>   

        <h3 className='w-[80%] mx-auto font-semibold'>{props.value.title}</h3>
        <p className='w-[80%] mx-auto' >{props.value.description}</p>
        </div>
        <div className='flex gap-2 w-[80%] mx-auto'>
          <button className='border rounded p-1 hover:cursor-pointer' onClick={onEdit}>Edit</button>
          <button className='border rounded p-1 hover:cursor-pointer' onClick={onDelete}>Delete</button>
        </div>

        <TaskDialog
            open={openTask}
            onClose={()=>setOpenTask(false)}
            value={task}
            onTaskAdded={props.onTaskUpdated} 
        />


        </div>
  )
}
