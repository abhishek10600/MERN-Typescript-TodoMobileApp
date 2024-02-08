import mongoose, { Document } from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true, "title is a required field."]
        },
        description:{
            type:String
        },
        isComplete:{
            type:Boolean,
            default:false
        },
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Task = mongoose.model("Task", taskSchema);

export default Task;
