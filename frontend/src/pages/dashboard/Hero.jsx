import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate();
  const [activeFilter,setActiveFilter]=useState("All Tasks");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const current = params.get("status") || "All Tasks";
    setActiveFilter(current);
  }, [location.search]);

  const handleClick = (state) => {
    setActiveFilter(state);
    navigate(`/?status=${state}`);
  };

  const links=[
    {label:"All", value:"all" ,state:{taskStatus:"All Tasks"}},
    {label:"Completed", value:"complete", state:{taskStatus:"Completed Task"}},
    {label:"In Progress", value:"in-progress", state:{taskStatus:"In Progress Task"}},
    {label:"Not Started", value:"not-started", state:{taskStatus:"Not Started Task"}}
  ]
    
  
  return (
    <div className='hidden md:block'>
      <ul className='w-[80%] flex mx-auto  gap-3 sm:justify-end z-10'> 
        {links.map((link)=>{
          return (
          <li 
          
          key={link.value} 
          onClick={()=>handleClick(link.state.taskStatus)}
          className={activeFilter == link.state.taskStatus? 'bg-pink-200 rounded border p-1 border-black':
          'rounded border p-1 border-b-blue-500 hover:cursor-pointer'}
          >
          <span>{link.label}</span>
          
          </li> 
          )
        })}
        
        </ul>
    </div>
  )

}