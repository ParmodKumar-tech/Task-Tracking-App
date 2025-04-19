import React, { useState } from 'react';
import {Link, NavLink } from 'react-router-dom';
import { useAuth } from '../authContent';

function Navbar(){
    const {userName,setUserName,setToken}=useAuth();
    const [menuItems,setMenuItems]=useState(false);
  
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        setUserName(null);
        setToken(null);

    }


    let handleMenuItems=()=>{
        setMenuItems(!menuItems);
    }

    return(
        <header className='w-full flex items-center gap-2 p-2 z-10'>
        <div className='m-2 p-1 mx-auto flex'>
        
        <div className='p-1 mx-2 rounded items-center justify-center bg-pink-200'>
        <h1 className='text-2xl'>TTA</h1>
        </div>

        <div className='flex flex-col'>
        <Link to="/"><h2 className='font-bold text-xl'>Task Tracking App</h2></Link>
        <p>{userName?'Welcome Back!':'please login/register for view your tasks!'}</p>
        </div>
        
        </div>

        <nav className='mx-auto '>
            <ul className='flex sm:visible md:flex-row invisible '>
            
                {userName?
                <>
                <li className='font-bold'> <NavLink to="/" state={{ showAddTask: true }}>Add Task</NavLink></li>
                <li onClick={handleLogout} className='mx-2 font-bold'><NavLink to="/login">Logout</NavLink></li>
                </>
                :
                <li className='rounded-2xl p-1 bg-pink-600 text-white font-semibold'>
                    <NavLink to="/register">Login/Register</NavLink></li>
                
                }
                    
                <p className='separator my-auto font-bold mx-1'>|</p>
                <p className='username align-middle my-auto mx-2'>
                {userName?userName:"Not login"}</p>

            </ul>
        
            <div 
            className="sm:invisible flex flex-col items-center  gap-1 p-2 cursor-pointer bg-pink-200 w-fit mx-auto rounded" 
            onClick={handleMenuItems}
            >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
        </div>
        
        {menuItems &&<ul className='bg-pink-100 text-center my-2 '>
            {userName?<>
                <li className='font-bold my-2'> <NavLink to="/" state={{ showAddTask: true }}>Add Task</NavLink></li>
                <li onClick={handleLogout} className='mx-2 font-bold'><NavLink to="/login">Logout</NavLink></li>
                </>
                :
                <li className='rounded-2xl p-1 w-fit bg-pink-600 text-white font-semibold'>
                <NavLink to="/register">Login/Register</NavLink></li>
                }
        </ul>}
        
        
        </nav>
        

    
       </header>

    )
}

export default Navbar;