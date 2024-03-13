import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

// Validation schema
export const ContactUsSchemaValidate = Joi.object({
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
});

// Creating an interface
export interface IContactUs extends Document {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    subject: string;
    message: string;
}

// Contact Us schema
const contactUsSchema = new Schema<IContactUs>({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

// Joi validation for Mongoose model data
export const validateContactUsModelData = (data: IContactUs) => {
    return ContactUsSchemaValidate.validate(data);
};

// Creating a model
export const ContactUs = model<IContactUs>('ContactUs', contactUsSchema);
