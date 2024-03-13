import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../Models/UserModel';

// Augment the Express Request interface to include a user property
declare module 'express' {
  interface Request {
    user?: IUser; // Define the user property as optional and of type IUser
  }
}

const UserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    // Extract the JWT token from the request headers
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      // If token is missing, return Unauthorized response
      return res.status(401).json({ message: 'Unauthorized, please login' });
    }

    // Verify the JWT token
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || '');

    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.id) {
      // If token is invalid or missing necessary data, return Unauthorized response
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Find the user in the database based on the decoded token
    const user: IUser | null = await User.findById(decodedToken.id);

    if (!user) {
      // If user does not exist, return Unauthorized response
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the user has the required role (e.g., 'user') for the action
    if (user.userRole !== 'user') {
      // If user does not have the required role, return Forbidden response
      return res.status(403).json({ message: 'User does not have required role' });
    }

    // If the user has an account and the required role, attach user information to the request and proceed
    req.user = user;
    next();
  } catch (err: any) {
    // Handle token verification errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized, please login' });
    }
  }
};

export default UserMiddleware;
