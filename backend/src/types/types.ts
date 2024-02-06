import { Request } from "express";

export interface NewUserRequestBody{
    name:string;
    email:string;
    password:string;
}

export type LoginUserRequestBody = {
    email:string;
    password:string;
}

export interface AuthRequest extends Request{
    user?:any;
}