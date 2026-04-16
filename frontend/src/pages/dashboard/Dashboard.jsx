import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Task from '../../components/Task';
import TaskDialog from '../../components/TaskDialog';
import { fetchTasks } from '../../api/task.api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [tasks,setTasks]=useState([]);


  const params = new URLSearchParams(location.search);
  const taskStatusFilter=params.get("status") || "All Tasks";

  useEffect(() => {
    if (location.state?.showAddTask) {
        setOpenAddTask(true);
        navigate(location.pathname, { replace: true });}

      onFetchTask()
    
  }, [location.state, navigate, location.pathname]);


  
  const onFetchTask=async()=>{
    const res=await fetchTasks();

    if(res.success){
      setTasks(res.data); 
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
        <Task key={idx} value={task} onTaskAdded={onFetchTask} 
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
      onTaskAdded={onFetchTask} />

    </div>
  )
}
