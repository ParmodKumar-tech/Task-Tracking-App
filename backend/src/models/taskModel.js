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
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    created_date:
    {
        type:Date,
        default:Date.now
    },
    completed_date:{
        type:Date
    },


})

const taskModel=mongoose.model("Task",taskSchema);
export default taskModel;