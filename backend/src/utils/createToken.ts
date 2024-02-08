import { Response } from "express";
import User from "../models/userModel"

export const createToken = async(res:Response,user:any)=>{
    try {
        const newToken = user.getJwtToken();
        if(user.token.length){
            user.token.pop();
            const token = [{
                    token:newToken,
                    signedAt: Date.now().toString()
                }];
                user.token = token;
                await User.findByIdAndUpdate(user._id,{token})
        }else{
            const token = [{
                    token:newToken,
                    signedAt:Date.now().toString()
                }]
            await User.findByIdAndUpdate(user._id,{token});
        }
        user.password = undefined;
        user.token = undefined;
        res.status(200).json({
            success:true,
            token:newToken,
            user
        })
    } catch (error:any) {
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"Internal server error."
        })
    }
}