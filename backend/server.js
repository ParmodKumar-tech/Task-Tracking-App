import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/db.config.js";
import dns from "dns";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import taskRoute from "./src/routes/task.route.js";

dns.setServers(["1.1.1.1","8.8.8.8"]);

const app=express();
dotenv.config();

connectDB();
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true               
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user",userRoute);
app.use("/api/v1",taskRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening...`);
})



