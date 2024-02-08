import { NextFunction, Request, Response } from "express";
import { NewTaskRequestBody} from "../types/types";
import Task from "../models/taskModel";

export const newTask = async(req:Request<{},{},NewTaskRequestBody>,res:Response,next:NextFunction)=>{
    try {
        const userId = (req as any).user._id;
        const {title,description} = req.body;
        if(!title){
            return res.status(400).json({
                success:false,
                message:"title is missing."
            })
        }

        const task = await Task.create({
            title,
            description,
            user:userId
        })

        res.status(201).json({
            success:true,
            message:"Task created successfully.",
            task
        })
        
    } catch (error:any) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}