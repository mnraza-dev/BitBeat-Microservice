import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if (!token) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Not authorized" });
    }
}