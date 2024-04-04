import { Router } from 'express';
import CommentsLikesController from "../Controllers/commentsLikesController";
import UserMiddleware from "../Middlewares/UserMiddleware";

const commentRoutes = Router();

// Apply UserMiddleware to routes that require user authentication
commentRoutes.use(UserMiddleware);

// Route for adding a comment to a blog
commentRoutes.post('/comments/:blogId', CommentsLikesController.addComment);

// Route for liking a blog
commentRoutes.post('/:blogId/like', CommentsLikesController.likeBlog);
// Route for getting all comments
commentRoutes.get('/comments', CommentsLikesController.getAllComments); 
commentRoutes.get('/likes', CommentsLikesController.getBlogLikes); 
commentRoutes.delete('/comments/:blogId/:commentId', CommentsLikesController.deleteComment);
export default commentRoutes;
