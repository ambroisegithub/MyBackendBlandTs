import { Schema, model, Document } from 'mongoose';

// Interface for Blacklist document
interface IBlacklist extends Document {
  token: string;
}

// Define Blacklist schema
const BlacklistSchema = new Schema<IBlacklist>({
  token: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create and export Blacklist model
export const Blacklist = model<IBlacklist>('Blacklist', BlacklistSchema);
