import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


export const register=async(req,res)=>{
    const {name,email,password,country}=req.body;
    const isUserExist=await User.findOne({email});
    
    if(isUserExist) return res.status(409).json({success:false,
    message:"User already exists!"});

    const newUser=await User.create({name,email,password,country});
    const token=generateToken(newUser._id);
    
    return res.status(200).json({
        success:true,
        message:"Register Successfully!" ,
        data:newUser,
        token});
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    const isUserExist= await User.findOne({email});
    
    if(!isUserExist) return res.status(404).json({success:false,message:"User not found, register now!"});
    const isPasswordCorrect=await  bcrypt.compare(password,isUserExist.password);
    
    if(!isPasswordCorrect) return res.status(400).json({status:false,message:"Password is incorrect."});
    const token=generateToken(isUserExist._id);

    return res.status(200).json({
        success:true,
        message:"Login Successfully!",
        data:{id:isUserExist._id,name:isUserExist.name},token});
}
