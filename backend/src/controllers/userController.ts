import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody } from "../types/types";
import User from "../models/userModel";

export const registerUser = async(req:Request<NewUserRequestBody>,res:Response,next:NextFunction)=>{
    try {
        const {name,email,password} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message:"name is missing."
            })
        }
        if(!email){
            return res.status(400).json({
                success:false,
                message:"email is missing."
            })
        }
        if(!password){
            return res.status(400).json({
                success:false,
                message:"password is missing."
            })
        }
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User with this email already exists."
            })
        }
        user = await User.create({
            name,
            email,
            password
        })
        user.password = undefined as any;
        res.status(201).json({
            success:true,
            message:"Account created successfully.",
            user
        })
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}