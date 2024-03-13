import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

// Validation schema for blog
const blogSchemaValidate = Joi.object({
    blogTitle: Joi.string().required(),
    blogDescription: Joi.string().required(),
    blogDate: Joi.date().required(),
    blogImage: Joi.string(),
    likedBy: Joi.array().items(Joi.string()), // Add likedBy field validation
});

// Validation schema for comment
export const commentSchema = Joi.object({
    blogSubject: Joi.string().required(),
    comment: Joi.string().required(),
    date: Joi.date().default(new Date().toISOString()),
});

// Creating an interface for Comment
interface Comment {
    blogSubject: string;
    comment: string;
    date: string;
}

// Creating an interface for Blog
interface IBlog extends Document {
    blogTitle: string;
    blogDescription: string;
    blogDate: Date;
    blogImage: string;
    comments: Comment[];
    likes: number;
    likedBy: string[]; // Add likedBy field to interface
}

// Blog schema
const blogSchema = new Schema<IBlog>({
    blogTitle: {
        type: String,
        required: true,
    },
    blogDescription: {
        type: String,
        required: true,
    },
    blogDate: {
        type: Date,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    comments: [
        {
            blogSubject: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            date: {
                type: String,
                default: new Date().toISOString(),
            },
        },
    ],
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // Add likedBy field to Mongoose schema
});

// Joi validation for Mongoose model data
export const validateBlogModelData = (data: IBlog) => {
    return blogSchemaValidate.validate(data);
};

// Creating a model
export const Blog = model<IBlog>('Blog', blogSchema);
