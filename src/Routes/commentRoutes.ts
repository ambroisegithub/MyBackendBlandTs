import { Router } from 'express';
import CommentsLikesController from "../Controllers/commentsLikesController";
import UserMiddleware from "../Middlewares/UserMiddleware";

const commentRoutes = Router();

// Apply UserMiddleware to routes that require user authentication
commentRoutes.use(UserMiddleware);

// Route for adding a comment to a blog
commentRoutes.post('/:blogId/comments', CommentsLikesController.addComment);

// Route for liking a blog
commentRoutes.post('/:blogId/like', CommentsLikesController.likeBlog);

export default commentRoutes;
