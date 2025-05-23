import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "./model";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(403).json({ message: "Invalid token format" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;

    if (!decoded || !decoded._id) {
      res.status(403).json({ message: "Invalid token!" });
      return;
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(403).json({ message: "Not authorized" });
  }
};
