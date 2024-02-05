import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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
                type:String
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

userSchema.methods.isPasswordValid = function(password:string){
    return bcrypt.compare(password,this.password);
}

userSchema.methods.getJwtToken = function(){
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret){
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({id:this._id}, jwtSecret);
}

const User = mongoose.model("User",userSchema);

export default User;