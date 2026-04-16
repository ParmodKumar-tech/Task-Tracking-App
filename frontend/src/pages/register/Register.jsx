import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContent';
import toast from 'react-hot-toast';
import { registerUser } from '../../api/user.api';


export default function Register(){
    const {
        register,
        handleSubmit,
        formState:{errors,isSubmitting}}=useForm();
   
    const navigate=useNavigate();
    const {setUserName,setRole}=useAuth();

    const onSubmit=async(data)=>{
            const toastId = toast.loading("please wait...");

            const res=await registerUser(data);
            toast.dismiss(toastId);
            if(res.success){
                toast.success(res.message);
                localStorage.setItem("name",res.data.name);
                localStorage.setItem("role",res.data.role);

                setUserName(res.data.name);
                setRole(res.data.role);
                navigate("/");
                
            }
            else{
                toast.error(res.message)
            }

    }

    return(
        <div className='w-full h-screen flex items-center bg-pink-200'>
        <form className='m-5 w-[80%] md:w-[70%] lg:w-[45%]  mx-auto bg-[#f2ececea] border border-gray-400 rounded-md p-5 my-10' onSubmit={handleSubmit(onSubmit)}>
         
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
            
            <div className='my-3 flex flex-wrap justify-start gap-3'>
            <label htmlFor="role">Role</label>
            <span className='text-red-500'>
            {errors.role && errors.role.message}
            </span>
            
            <label>
                <input type="radio" value="user" {...register("role", { required: true })} />
                    User
                </label>
                <label>
                    <input type="radio" value="admin" {...register("role")} />
                    Admin
                </label>
            </div>


            <button 
            className='mt-3 p-1 border  rounded-md w-full font-semibold bg-pink-600 text-white' 
            disabled={isSubmitting}>
            {isSubmitting?"Loading...":"Register"}</button>


        </form>
        </div>
    )
}
