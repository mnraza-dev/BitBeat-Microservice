import { Request, Response } from "express";

import TryCatch from "./TryCatch";
export const registerUser = TryCatch(async (req: Request, res: Response) => {
    res.json({
        message: "User registered successfully"
    })
})
export const loginUser =
    (req: Request, res: Response) => {
        res.json({
            message: "User logged in successfully"
        })
    }