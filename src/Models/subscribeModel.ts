import { Schema, model, Document } from 'mongoose';
import Joi from 'joi';

// Validation schema
export const SubscribeSchemaValidate = Joi.object({
    email: Joi.string().email().required(),
    date: Joi.date().default(Date.now),
});

// Creating an interface
export interface ISubscribe extends Document {
    email: string;
    date: Date;
}

// Subscribe schema
const subscribeSchema = new Schema<ISubscribe>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});



// Creating a model
export const Subscribe = model<ISubscribe>('Subscribe', subscribeSchema);
