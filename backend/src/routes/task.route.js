import express from "express";
import { createTask, deleteTask, updateTask, allTasks,getTask } from "../controllers/task.controller.js";
import { validUser } from "../middlewares/authUser.middleware.js";
import { createTaskValidation, updateTaskValidation } from "../validations/task.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router=express.Router();

router 
    .route("/tasks")
    .get(validUser,allTasks)

router 
    .route("/task")
    .post(validUser,validate(createTaskValidation),createTask)

router 
    .route("/task/:task_id")
    .get(validUser,getTask)

router 
    .route("/task/:task_id")
    .put(validUser,validate(updateTaskValidation),updateTask)
    
router 
    .route("/task/:task_id")
    .delete(validUser,deleteTask)
    
export default router;    
