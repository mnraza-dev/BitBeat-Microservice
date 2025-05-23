import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../config/db';
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.listen(port, () => {
connectDB();
    console.log(`Server running at http://localhost:${port}`);
});