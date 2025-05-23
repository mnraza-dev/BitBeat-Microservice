import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('Database connected 🚀 successfully');
    } catch (error) {
        console.log(error);
    }
}
