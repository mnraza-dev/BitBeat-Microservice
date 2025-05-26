import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
dotenv.config();
import userRoutes from './route.js';

const app = express();
const port = process.env.PORT || 7000;
app.use(express.json());

app.use("/api/v1/", userRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server running at http://localhost:${port}`);
});