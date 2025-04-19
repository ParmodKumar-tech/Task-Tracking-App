import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validUser=async(req,res,next)=>{
    const authHeader= req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success:false,message: "Unauthorized" });
    }
    
    const token = authHeader.split(" ")[1];
    try{
       const decode=jwt.verify(token,process.env.JWT_SECRET);
       req.userId=decode.id;
       next();
    }
    catch(error){
        return res.status(401).json({
            message:"Not authorized, token failed"}
    )}
}