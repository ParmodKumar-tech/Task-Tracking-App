import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/EndPoint';
import { useAuth } from '../../authContent';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function Register(){
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}}=useForm();
   
    const navigate=useNavigate();
    const {setUserName,setToken}=useAuth();

    const onSubmit=async(data)=>{
            try{
            const res=await axios.post(`${USER_API_END_POINT}/register`,data);
            
            if(res.data.success){
                toast.success(res.data.message);
                localStorage.setItem("name",res.data.data.name);
                localStorage.setItem("token",res.data.token);
                setToken(res.data.token);
                setUserName(res.data.data.name);
                navigate("/");
                
            }
            
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    
  
    }

    return(
        <div className='w-full h-screen flex items-center bg-pink-200'>
        <form className='m-5 w-[60%]  mx-auto bg-[#f2ececea] border border-gray-400 rounded-md p-5 my-10' onSubmit={handleSubmit(onSubmit)}>
         
        <div className='flex items-center'>
            <h1 className='text-2xl my-2'>Register for an account!</h1>
            <p className='mx-2'>|</p>
            <span 
            className='text-sm mt-1'>Already have an account! 
            <Link to="/login" 
            className='text-pink-600 mx-1'>Login</Link>
            </span>
        </div>
            <div className='flex my-1'>
            <label className='mr-1'>Name</label>
            <span className='text-red-500'>
            {errors.name && errors.name.message}
            </span>
            </div>

            <input
            className='w-full border rounded-md p-1'
            {...register("name", 
            {required:"*Required"})} 
            placeholder="name" />
        
            <div className='flex mt-4'>
            <label className='mr-1'>Email</label>
            <span className='text-red-500'>
            {errors.email && errors.email.message}
            </span>
            </div>

            <input 
            className='w-full border rounded-md p-1'
            {...register("email", 
            {required:"*Required"})} 
            placeholder="email" />


            <div className='flex mt-4'>
            <label className=' mr-2'>Password</label>
            <span className='text-red-500'>
            {errors.password && errors.password.message}
            </span>
            </div>

            <input 
            className='w-full border rounded-md p-1'
            {...register("password", 
            {required:"*Required"})} 
            placeholder="password"/>

            <div className='flex mt-4'>
            <label className=' mr-2'>Country</label>
            <span className='text-red-500'>
            {errors.country && errors.country.message}
            </span>
            </div>

            <input 
            className='w-full border rounded-md p-1'
            {...register("country", 
            {required:"*Required"})} 
            placeholder="country"/>


            <button 
            className='mt-3 p-1 border  rounded-md w-full font-semibold bg-pink-600 text-white' 
            disabled={isSubmitting}>
            {isSubmitting?"Loading...":"Register"}</button>



        </form>
        </div>
    )
}
