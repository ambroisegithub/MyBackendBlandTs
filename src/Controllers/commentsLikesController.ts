import { Request, Response } from "express";
import { Blog } from "../Models/BlogModel";
import { IUser } from "../Models/UserModel";
import Joi from 'joi';

// Joi validation schema for adding comment
const commentSchema = Joi.object({
    comment: Joi.string().required(),
    blogSubject: Joi.string().required(),

});

// Joi validation schema for liking a blog
const likeSchema = Joi.object({
    blogId: Joi.string().required(),
});

export default class CommentsLikesController {
    static async addComment(req: Request, res: Response) {
     
            const { error } = commentSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const blogId = req.params.blogId;
            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }
          
            const user = req.user as IUser;
            if (!user) {
                return res.status(401).json({ message: "User authentication required" });
            }

            const newComment: any = {
                fullName: user.fullName,
                blogSubject: req.body.blogSubject,
                comment: req.body.comment

            };

            blog.comments.push(newComment);
            await blog.save();

            return res.status(201).json({ message: "Comment added successfully" });

    }

    static async likeBlog(req: Request, res: Response) {

            const { error } = likeSchema.validate(req.params);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const blogId = req.params.blogId;
            const blog = await Blog.findById(blogId);

            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            const user = req.user as IUser;
            if (!user) {
                return res.status(401).json({ message: "User authentication required" });
            }

            if (blog.likedBy.includes(user.id)) {
                return res.status(400).json({ message: "You have already liked this blog" });
            }

            blog.likes++;
            blog.likedBy.push(user.id);
            await blog.save();

            return res.status(201).json({ message: "Blog liked successfully", likes: blog.likes });
    
    }
}
