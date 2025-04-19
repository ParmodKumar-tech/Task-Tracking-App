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


    const handleMenuItems=()=>{
        setMenuItems(!menuItems);
    }

    const handleAutoCloseMenu=()=>{
        setMenuItems(false);
    }
    return(
        <header className='mb-2 w-screen bg-green-300 flex items-center gap-2 p-2 z-10'>
        
        <div className='w-[50%] mx-2 p-2 flex items-center'>
    
        <div className='p-1 mx-2 h-fit rounded items-center justify-center bg-pink-200'>
        <h1 className='text-2xl'>TTA</h1>
        </div>

        <div className='flex flex-col'>
        <Link to="/"><h2 className='font-bold sm:text-xl lg:text-xl'>Task Tracking App</h2></Link>
        <p className='hidden lg:block'>{userName?'Welcome Back!':'please login/register for view your tasks!'}</p>
        </div>
        
        </div>

        <nav className='w-[50%] flex md:flex-row md:h-fit items-center justify-center'>
            <ul className={menuItems?'w-screen left-0 bg-green-300 flex flex-col items-start absolute h-auto  border top-[13%]':
                'hidden md:flex'}>
                {userName &&
                <div className='flex flex-col sm:flex-row p-2 gap-7 items-start '>
                <li onClick={handleAutoCloseMenu} className='font-bold'> <NavLink to="/" state={{ showAddTask: true }}>Add Task</NavLink></li>
                <li onClick={handleLogout} className='mx-2 font-bold'><NavLink to="/login">Logout</NavLink></li>
                </div>
                }

                {!userName &&
                <li onClick={handleAutoCloseMenu} className='rounded-2xl p-1 bg-pink-600 text-white font-semibold'>
                    <NavLink to="/register">Login/Register</NavLink></li>
                
                }
                    
                {
                <div className='hidden md:flex'>    
                <p className='separator my-auto font-bold mx-1'>|</p>
                <p className='username align-middle my-auto mx-2'>
                {userName?userName:"Not login"}</p>
                </div>
                }
            </ul>
            
        </nav>
        
        <div 
            className="w-auto mr-5 md:hidden lg:hidden flex flex-col  gap-1 p-2 cursor-pointer bg-pink-200 rounded" 
            onClick={handleMenuItems}
            >
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            </div>
       </header>

    )
}

export default Navbar;