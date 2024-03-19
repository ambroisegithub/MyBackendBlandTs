// BlogRoutes.ts
import { Router } from 'express';
import upload  from '../Helpers/multer'; 
import BlogController from '../Controllers/BlogController';

import { Authorization } from '../Middlewares/Authorization';


const blogRoutes = Router();

blogRoutes.post('/post-blog', upload.single('blogImage'), Authorization,BlogController.createBlog);
<<<<<<< HEAD
blogRoutes.put('/update-blog/:id', upload.single('blogImage'), Authorization,BlogController.updateBlog);
blogRoutes.get('/getall-blog', BlogController.getAllBlogs);
blogRoutes.get('/getone-blog/:id', BlogController.getOneBlog);
blogRoutes.delete('/delete-blog/:id', BlogController.deleteBlog);

=======
blogRoutes.put('/update-blog/:id', upload.single('blogImage'), BlogController.updateBlog);
blogRoutes.get('/getall-blog',BlogController.getAllBlogs);
blogRoutes.get('/getone-blog/:id', BlogController.getOneBlog);
blogRoutes.delete('/delete-blog/:id', Authorization,BlogController.deleteBlog);
>>>>>>> f1ddbc9c516b1fe88392b642ec4f629385494894
export default blogRoutes;
