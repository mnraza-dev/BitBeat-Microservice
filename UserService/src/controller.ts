import { Request, Response } from "express";
export const registerUser =
    async (req: Request, res: Response) => {
        res.json({
            message: "User registered successfully"
        });

    }

export const loginUser =
    (req: Request, res: Response) => {
        res.json({
            message: "User logged in successfully"
        })
    }