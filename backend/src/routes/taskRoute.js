import express from "express";
import { createTask, deleteTask, updateTask, allTasks,specificTask } from "../controllers/taskController.js";
import { validUser } from "../middleware/authUser.js";

const router=express.Router();

router 
    .route("/tasks")
    .get(validUser,allTasks)

router 
    .route("/tasks")
    .post(validUser,createTask)

router 
    .route("/tasks/:task_id")
    .get(validUser,specificTask)

router 
    .route("/tasks/:task_id")
    .put(validUser,updateTask)
    
router 
    .route("/tasks/:task_id")
    .delete(validUser,deleteTask)
    
export default router;    
