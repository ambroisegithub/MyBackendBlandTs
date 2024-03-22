import Jwt from "jsonwebtoken";
import { User } from "../Models/UserModel";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  id: string;
 
}
export const Authorization = async (req: Request, res: Response, next: any) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;

    if (token) {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        return res.status(500).json({
          message: "JWT_SECRET is not defined in the environment variables.",
        });
      }

      const decoded = Jwt.verify(token as string, jwtSecret) as JwtPayload | void;

      if (!decoded) {
        // Handle the case when decoding fails (e.g., invalid token)
        return res.status(401).json({
          message: "Invalid token.",
        });
      }

      const user = await User.findById(decoded.id);

      if (user?.userRole === "admin") {
        next();
      } else {
        return res.status(401).json({
          message: "This action is permitted only for admins.",
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Check if your token is valid.",
    });
  }
};
