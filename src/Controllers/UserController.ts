import { Request, Response } from 'express';
import { User, validateUserModelData } from '../Models/UserModel'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Blacklist} from '../Models/BlacklistModel';
class UserController {
  // CREATE User (Signup)
  static async createUser(req: Request, res: Response) {
    try {
        const { error } = validateUserModelData(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({
                message: 'This user already exists',
            });
        }

        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            gender: req.body.gender,
            password: hashedPassword,
            userRole: req.body.userRole || 'user', // Use the provided userRole or default to 'user'
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET || '', {
            expiresIn: '5d',
        });

        return res.status(201).json({
            token,
            user: savedUser,
            message: 'User successfully added',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


  // READ All Users
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // READ Single User
  static async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        return res.status(200).json({
          data: user,
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
// update user

static async updateUser(req: Request, res: Response) {
    try {
        const { error } = validateUserModelData(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const { fullName, email, gender, password, userRole } = req.body;

        // Check if the password is provided, then hash it
        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            {
                fullName: fullName ? fullName : user.fullName,
                email: email ? email : user.email,
                gender: gender ? gender : user.gender,
                password: hashedPassword,
                userRole: userRole || user.userRole || 'user', // Use the provided userRole, or the existing userRole, or default to 'user'
            },
            { new: true }
        );

        return res.status(200).json({
            data: updatedUser,
            message: 'User successfully updated',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

  // DELETE User
  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      await User.findByIdAndDelete(userId);
      return res.status(204).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


// user Login 

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid credentials',
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', {
        expiresIn: '5d',
      });

      return res.status(200).json({
        token,
        user,
        message: 'Login successful',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  static async logout(req: Request, res: Response) {
    try {
      const authHeader = req.headers['cookie']; // get the session cookie from request header
      if (!authHeader) return res.sendStatus(204); // No content

      const cookie = authHeader.split('=')[1]; // If there is, split the cookie string to get the actual jwt token
      const accessToken = cookie.split(';')[0];

      const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
      if (checkIfBlacklisted) return res.sendStatus(204); // if true, send a no content response.

      // otherwise blacklist token
      const newBlacklist = new Blacklist({
        token: accessToken,
      });
      await newBlacklist.save();

      // Also clear request cookie on client
      res.setHeader('Clear-Site-Data', '"cookies"');
      res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }
}

export default UserController;