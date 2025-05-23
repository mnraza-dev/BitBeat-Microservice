import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "./model";

export interface AuthenticatedRequest extends Request {
    user?: IUser
}
export const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string;
        if (!token) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (!decoded || !decoded._id) {
            res.status(403).json({ message: "Invalid Token !" });
            return;
        }
        const userId = decoded._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            res.status(403).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: "Not authorized" });
    }
}