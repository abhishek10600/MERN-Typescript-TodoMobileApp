import mongoose from "mongoose";

const connectToDatabase = () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("MONGODB_URI is not defined in the environment variables");
        process.exit(1);
    }

    mongoose.connect(uri).then(() => {
        console.log("Connected to the database successfully");
    }).catch((error) => {
        console.error("Connection to the database failed");
        console.error(error);
        process.exit(1);
    });
};

export default connectToDatabase;