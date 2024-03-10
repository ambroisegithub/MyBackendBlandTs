// BlogRoutes.ts
import { Router } from 'express';
import upload  from '../Helpers/multer'; 
import BlogController from '../Controllers/BlogController';

const blogRoutes = Router();

blogRoutes.post('/post-blog', upload.single('blogImage'), BlogController.createBlog);
blogRoutes.put('/update-blog/:id', upload.single('blogImage'), BlogController.updateBlog);
blogRoutes.get('/getall-blog', BlogController.getAllBlogs);
blogRoutes.get('/getone-blog/:id', BlogController.getOneBlog);
blogRoutes.delete('/delete-blog/:id', BlogController.deleteBlog);

export default blogRoutes;
