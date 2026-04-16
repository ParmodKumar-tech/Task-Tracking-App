import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


export const register=async(req,res)=>{
    const {name,email,password,role}=req.body;
    try{
        const newUser=await User.create({name,email,password,role});
        const token=generateToken(newUser._id);

        return res.cookie("authToken",token,{
        httpOnly:true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === "production",
        path: "/",
        })
        .status(200).json({
        success:true,
        message:"Register Successfully!" ,
        data:newUser,
    });
    }

    catch(error){
        if(error.code===11000){
            return res.status(409).json({
                success:false,
                message:"User already exists!"});
        }
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const isUserExist= await User.findOne({email});
        if(!isUserExist) return res.status(404).json({
            success:false,
            message:"User not found, register now!"
        });
        const isPasswordCorrect=await bcrypt.compare(password,isUserExist.password);
        if(!isPasswordCorrect) return res.status(400).json({
            status:false,
            message:"Password is incorrect."
        });

        const token=generateToken(isUserExist._id);

        return res.cookie("authToken",token,{
        httpOnly:true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,  
        secure: process.env.NODE_ENV === "production",
        path: "/",
        })
        .status(200).json({
            success:true,
            message:"Login Successfully!",
            data:{id:isUserExist._id,name:isUserExist.name,role:isUserExist.role},
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error."
        })
    }
   
}


export const logout=(req,res)=>{

    res.clearCookie("authToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
    });
    
    return res.status(200).json({
        success:true,
        message:"Logged out successfully"
    })
    
}
