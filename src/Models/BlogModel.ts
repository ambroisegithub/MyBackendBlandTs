import { Schema, model } from 'mongoose';
import Joi from 'joi';

// Validation schema
export const BlogSchemaValidate = Joi.object({
    blogTitle: Joi.string().required(),
    blogDescription: Joi.string().required(),
    blogDate: Joi.date().required(),
    blogImage: Joi.string(),
});

// Creating an interface
interface IBlog {
    blogTitle: string;
    blogDescription: string;
    blogDate: Date;
    blogImage: string;
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
});

// Joi validation for Mongoose model data
export const validateBlogModelData = (data: IBlog) => {
    return BlogSchemaValidate.validate(data);
};

// Creating a model
export const Blog = model<IBlog>('Blog', blogSchema);
