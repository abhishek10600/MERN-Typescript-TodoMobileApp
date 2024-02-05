import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectToDatabase from "./config/database";

connectToDatabase();

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`App running on port ${port}`)
})