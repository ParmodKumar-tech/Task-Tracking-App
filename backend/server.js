import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";

import userRoute from "./src/routes/userRoute.js";
import taskRoute from "./src/routes/taskRoute.js";

const app=express();
dotenv.config();

connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true               
}));

app.use(express.json());

app.use("/api/v1/user",userRoute);
app.use("/api/v1/task",taskRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})



