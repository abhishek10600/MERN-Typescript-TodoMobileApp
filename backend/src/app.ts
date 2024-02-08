import express, { NextFunction, Request, Response } from "express";
import UserRouter from "./routes/userRoute";
import TaskRouter from "./routes/taskRoute";

const app = express();

app.use(express.json());

app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.send("hello world!");
})

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/tasks",TaskRouter);

export default app;