import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "./model";

interface CustomJwtPayload extends JwtPayload {
    _id: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser | null
}
export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            res.status(403).json({ message: "Not authorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;

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