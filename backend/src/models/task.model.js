import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },
    description:
    {
        type:String,
        required:true
    },
    status:
    {
        type:String,
        enum:["Completed","In Progress","Not Started"],
        default:"Not Started"
    },

},{timestamps:true})

const taskModel=mongoose.model("task",taskSchema);
export default taskModel;