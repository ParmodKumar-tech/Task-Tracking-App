import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Task from '../../components/Task';
import { TASK_API_END_POINT } from '../../utils/EndPoint';
import TaskDialog from '../../components/TaskDialog';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [tasks,setTasks]=useState([]);
  const token=localStorage.getItem("token");

  const params = new URLSearchParams(location.search);
  const taskStatusFilter=params.get("status") || "All Tasks";

  useEffect(() => {
    if (location.state?.showAddTask) {
        setOpenAddTask(true);
        navigate(location.pathname, { replace: true });}

      fetchTask()
    
  }, [location.state, navigate, location.pathname]);

  const fetchTask=async()=>{
    try{
    const res=await axios.get(`${TASK_API_END_POINT}/tasks`,
    {headers:{
      Authorization:`Bearer ${token}`
    }});
  
    if(res.data.success){
      setTasks(res.data.data); 
    }
   
    }
    catch(error){
      console.log(error.message)
      toast.error(error.response.data.message);
    }


}
  const filteredTasks=tasks.filter((task)=>{
    if(taskStatusFilter==="All Tasks") return true
    if(taskStatusFilter==="In Progress Task") return task.status ==="In Progress"
    if(taskStatusFilter==="Not Started Task") return task.status ==="Not Started"
    if(taskStatusFilter==="Completed Task") return task.status ==="Completed"
    return true;
  })


  return (
    <div className='flex flex-col p-2 w-[90%] my-1 mx-auto border-black rounded-xl h-screen bg-pink-200'>
      <div className='flex justify-between p-2'>
        <h1 className='text-xl font-bold'>{`${taskStatusFilter}`}</h1>
      </div>

      <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  p-2'>
       
       {filteredTasks?.map((task,idx)=>{
        return (  
        <Task key={idx} value={task} onTaskUpdated={fetchTask} 
        onDelete={(deleteId)=>{
          setTasks((prev)=>prev.filter(t=>t._id!==deleteId))
        }}/> 
        )        
        })

      }
      </div>

      <TaskDialog 
      open={openAddTask} 
      onClose={() => setOpenAddTask(false)}
      onTaskAdded={fetchTask} />

    </div>
  )
}
