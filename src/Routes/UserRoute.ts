// UserRoutes.ts
// import { verify } from '../Middlewares/AuthMiddleware';
import { Router } from 'express';
import userController  from '../Controllers/UserController';
const userRoutes = Router();
userRoutes.post('/signup', userController.createUser);
userRoutes.get('/all', userController.getAllUsers);
userRoutes.get('/:id', userController.getUserById);
userRoutes.put('/:id', userController.updateUser);
userRoutes.delete('/:id', userController.deleteUser);
userRoutes.post('/login', userController.loginUser);
export default userRoutes;
