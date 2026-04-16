import React, { useState } from 'react'
import TaskDialog from './TaskDialog'
import axios from 'axios';
import { useAuth } from '../authContent';
import toast from 'react-hot-toast';
import { deleteTask, editTask } from '../api/task.api';

export default function Task(props) {
    const [openTask,setOpenTask]=useState(false);
    const {role}=useAuth();
    const [task,setTask]=useState({
        id:props.value._id,
        title:props.value.title,
        status:props.value.status,
        description:props.value.description});
    
    const onEdit=async()=>{
        setOpenTask(true);
    }
    
    const onDelete=async()=>{
        const toastId = toast.loading("deleting task");

        const res=await deleteTask(props.value._id);
        toast.dismiss(toastId);
        if(res.success){
            toast.success(res.message);
            props.onDelete(props.value._id);
        }
    }


    return (
        
        <div className='w-full bg-white border rounded-2xl mx-auto p-2' >
        <div className='flex flex-col'>
        <p className='w-[80%] mx-auto text-xs bg-green-200 '><span className='font-bold'>{props.value.status}</span>
        </p>   

        <h3 className='w-[80%] mx-auto font-semibold'>{props.value.title}</h3>
        <p className='w-[80%] mx-auto' >{props.value.description}</p>
        </div>
        
        {role ==="admin" &&<div className='flex gap-2 w-[80%] mx-auto mt-4'>
          <button className='border rounded p-1 hover:cursor-pointer' onClick={onEdit}>Edit</button>
          <button className='border rounded p-1 hover:cursor-pointer' onClick={onDelete}>Delete</button>
        </div>}

        <TaskDialog
            open={openTask}
            onClose={()=>setOpenTask(false)}
            value={task}
            onTaskAdded={props.onTaskAdded} 
        />
        </div>
  )
}
