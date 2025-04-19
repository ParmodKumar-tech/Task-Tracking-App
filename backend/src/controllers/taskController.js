import Task from "../models/taskModel.js";


export const allTasks=async(req,res)=>{
    const userId=req.userId;
    if(!userId) return res.status(404).json({success:false,message:"User not found!"})
    const tasks=await Task.find({user_id:userId});
    if(!tasks) return res.status(400).json({success:false,message:"No task is added!"});
    return res.status(200).json({success:true,data:tasks});
}

export const specificTask=async(req,res)=>{
    const userId=req.userId;
    const {task_id}=req.params;
    if(!task_id) return res.status(404).json({success:false,message:"Task id not found!"})
    const task=await Task.findById(task_id);
    if(!task) return res.status(404).json({success:false,message:"Task not found!"});
    if(!task.user_id.equals(userId))return res.status(401).json({success:false,message:"Not authorized"});
    return res.status(200).json({success:true,data:task});
}

export const createTask=async(req,res)=>{
    const userId=req.userId;
    const {title,description,status}=req.body;
    const isSameTitleTaskExist=await Task.findOne({title});
    if(isSameTitleTaskExist) return res.status(400).json({success:false,message:`${title} is already exist, please choose different title`});
    const createTask=await Task.create({title,description,status,user_id:userId});
    return res.status(200).json({success:true,message:"Task Added Successfully!",data:createTask});
}

export const updateTask=async(req,res)=>{
    const {task_id}=req.params;
    const task=await Task.findOne({_id:task_id});
    if(!task) return res.status(404).json({success:false,message:"Task not found!"});
    const updateTask= await Task.findByIdAndUpdate({_id:task_id},{...req.body},{new:true})
    return res.status(200).json({success:true,data:updateTask,message:" Update Successfully!"});
}

export const deleteTask=async(req,res)=>{
    const userId=req.userId;
    const {task_id}=req.params;
    const task=await Task.findOne({_id:task_id});
    if(!task) return res.status(404).json({success:false,message:"Task not found!"});
    if(!task.user_id.equals(userId))return res.status(401).json({success:false,message:"Not authorized"});
    const deleteTask= await Task.findByIdAndDelete({_id:task_id});
    return res.status(200).json({success:true,message:"Task deleted Successfully!"});
}

