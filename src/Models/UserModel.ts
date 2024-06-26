import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

// Validation schema
export const UserSchemaValidate = Joi.object({
    fullName: Joi.string().required(),
    phoneNumber:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    userRole: Joi.string().valid('admin', 'user').default('user'), 
});

// Creating an interface
export interface IUser extends Document {
    fullName: string;
    phoneNumber:string;
    email: string;
    password: string;
    userRole: string;
    createdAt:Date,
    updatedAt:Date,
}

// User schema
const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
 
    userRole: {
        type: String,
        enum: ['admin', 'user'], 
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
});

// Joi validation for Mongoose model data
export const validateUserModelData = (data: IUser) => {
    return UserSchemaValidate.validate(data);
};

// Creating a model
export const User = model<IUser>('User', userSchema);
