import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { AuthRequest} from "../types/types";


export const isLoggedIn = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token){
            return res.status(402).json({
                success:false,
                message:"Login required."
            })
        }
        if(!jwtSecret){
            throw new Error("secret key for jwt is not defined.")
        }
        const decoded = jwt.verify(token,jwtSecret);
        req.user = await User.findById((decoded as any).id);
        next();
    } catch (error:any) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}