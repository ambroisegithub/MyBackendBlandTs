import { Router } from 'express';
import CommentsLikesController from "../Controllers/commentsLikesController";
import UserMiddleware from "../Middlewares/UserMiddleware";
import { Authorization } from '../Middlewares/Authorization';

const commentRoutes = Router();

// Apply UserMiddleware to routes that require user authentication
// commentRoutes.use(UserMiddleware);

// Route for adding a comment to a blog
commentRoutes.post('/comments/:blogId', UserMiddleware,CommentsLikesController.addComment);

// Route for liking a blog
commentRoutes.post('/:blogId/like', UserMiddleware,CommentsLikesController.likeBlog);
// Route for getting all comments
commentRoutes.get('/comments', Authorization,CommentsLikesController.getAllComments); 
commentRoutes.get('/likes', CommentsLikesController.getBlogLikes); 
commentRoutes.delete('/comments/:blogId/:commentId', CommentsLikesController.deleteComment);
commentRoutes.get("/get-total-comment",CommentsLikesController.getTotalComments)
export default commentRoutes;
