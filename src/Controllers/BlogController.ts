import { UploadToCloud } from "../Helpers/cloud";

import { Blog, validateBlogModelData } from "../Models/BlogModel";
import { Request, Response } from "express";

class BlogController {
    static async createBlog(req: Request, res: Response) {
        // try {
          const { error } = validateBlogModelData(req.body);
          if (error) {
            return res.status(400).send(error.details[0].message);
          }
    
          if (!req.file) {
            return res.status(400).json({
              message: "Please upload a file",
            });
          }
    
          const result = await UploadToCloud(req.file, res);
    
          const newBlog = new Blog({
            blogTitle: req.body.blogTitle,
            blogDescription: req.body.blogDescription,
            blogDate: req.body.blogDate,
            blogImage: (result as any).secure_url
          });
    
          const savedBlog = await newBlog.save();
    
          return res.status(201).json({
            data: savedBlog,
            message: "Blog successfully created",
          });
        // } catch (error) {
        //     console.error(error);
        //     return res.status(500).json({
        //       error: "Internal Server Error",
        //     });
        //   }
      }
    
      static async updateBlog(req: Request, res: Response) {
        try {
          const blogId = req.params.id;
          const blog = await Blog.findById(blogId);
    
          if (!blog) {
            return res.status(404).json({
              message: "Blog not found",
            });
          }
    
          let result;
          if (req.file) {
            result = await UploadToCloud(req.file, res);
          }
    
          const { blogTitle, blogDescription ,blogDate} = req.body;
    
          const updatedBlog = await Blog.findByIdAndUpdate(
            { _id: blogId },
            {
              blogTitle: blogTitle ? blogTitle : blog.blogTitle,
              blogDescription: blogDescription ? blogDescription : blog.blogDescription,
              blogDate: blogDate ? blogDate : blog.blogDate,
              blogImage: result ? (result as any).secure_url : blog.blogImage,
            },
            { new: true }
          );
    
          return res.status(200).json({
            data: updatedBlog,
            message: "Blog successfully updated",
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
      }
      static async getAllBlogs(req: Request, res: Response) {
        try {
          const blogs = await Blog.find();
          return res.status(200).json({
            data: blogs,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
      }
    
      static async getOneBlog(req: Request, res: Response) {
        try {
          const blog = await Blog.findById(req.params.id);
    
          if (blog) {
            return res.status(200).json({
              data: blog,
            });
          } else {
            return res.status(404).json({
              message: "Blog not found",
            });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            error: "Internal Server Error",
          });
        }
      }
    

      static async deleteBlog(req: Request, res: Response) {
        try {
          const blogId = req.params.id;
          const blog = await Blog.findById(blogId);
    
          if (!blog) {
            return res.status(404).json({
              message: "Blog not found",
            });
        }
  
        await Blog.findByIdAndDelete(blogId);
        return res.status(204).json({
          message: 'User deleted successfully',
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    
}
}

export default BlogController;
