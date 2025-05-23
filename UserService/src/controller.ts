import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TryCatch from "./TryCatch";
import User from "./model.js";


export const registerUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body
    let user = await User.findOne({ email });
    if (user) {
        res.status(400).json({
            message: "User already exists"
        })
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    res.json({
        message: "User registered successfully",
        data: {
            user,
            token
        }
    })
})

export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({
            message: "User not found"
        })
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400).json({
            message: "Invalid credentials"
        })
        return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
   
    res.json({
        message: "User Login successfully",
        data: {
            user,
            token
        }
    })
})