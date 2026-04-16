import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validUser=async(req,res,next)=>{
    const authCookies= req.cookies;
    
    if (!authCookies) {
        return res.status(401).json({ success:false,message: "Unauthorized" });
    }
    
    try{
        const token = authCookies.authToken;
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decode.id;
        next();
    }
    catch(error){
        return res.status(401).json({
            message:"Not authorized, token failed"}
    )}
}