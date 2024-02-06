import { NextFunction, Request, Response } from "express";
import { AuthRequest, LoginUserRequestBody, NewUserRequestBody } from "../types/types";
import User from "../models/userModel";
import { createToken } from "../utils/createToken";

export const registerUser = async(req:Request<{},{},NewUserRequestBody>,res:Response,next:NextFunction)=>{
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
        createToken(res,user);
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

export const loginUser = async(req:Request<{},{},LoginUserRequestBody>,res:Response,next:NextFunction)=>{
    try {
        const {email,password} = req.body;
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
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password."
            })
        }
        const isPasswordValidated = user.isPasswordValidated(password);
        if(!isPasswordValidated){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password."
            })
        }
        createToken(res,user);
    } catch(error:any) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}

export const logoutUser = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        if(req.headers && req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const userId = req.user._id;
            if(!token){
                return res.status(401).json({
                    success:false,
                    message:"Authorization failed."
                })
            }
            const setToken:any[] = [];
            await User.findByIdAndUpdate(userId, {token:setToken});
            res.status(200).json({
                success:true,
                message:"Logged out succesfully."
            })
        }
    } catch (error:any) {
        console.log(error.message);
        res.status(500).json({
            success:true,
            message:"Internal server error."
        })
    }
}