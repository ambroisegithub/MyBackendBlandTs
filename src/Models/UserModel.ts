import { Schema, model } from 'mongoose';
import Joi from 'joi';

// Validation schema
export const UserSchemaValidate = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    userRole: Joi.string().valid('admin', 'user').default('user'), 
});


// Creating an interface
interface IUser {
    fullName: string;
    email: string;
    gender: string;
    password: string;
    userRole: string;
}

// User schema
const userSchema = new Schema<IUser>({
    fullName: {
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

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
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
