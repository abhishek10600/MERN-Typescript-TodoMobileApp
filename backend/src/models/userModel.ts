import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserDocument extends Document{
    _id?:string;
    name?:string;
    password?:string;
    token?:any[];
    createdAt:Date;
    updatedAt:Date;
    isPasswordValidated(password:string):Promise<boolean>;
    getJwtToekn():string

}

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "name is a required field."]
        },
        email:{
            type:String,
            required:[true, "email is a required field."],
            validate:[validator.isEmail, "enter a valid email."]
        },
        password:{
            type:String,
            required:[true,"password is a required field."],
            minLength:[5, "password must contain atleast 5 characters."]
        },
        token:[
            {
                type:Object
            }
        ]
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.isPasswordValidated = function(password:string):Promise<boolean>{
    return bcrypt.compare(password,this.password);
}

userSchema.methods.getJwtToken = function():string{
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({id:this._id}, jwtSecret);
}

const User = mongoose.model<UserDocument>("User",userSchema);

export default User;