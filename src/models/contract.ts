import { model, Schema, Document } from 'mongoose';

export interface IContract extends Document {
  title: string;
  duration: number;
  payment: number;
  hunter_email: string;
  talent_email: string;
  confirmation: boolean;
}

const contractSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  hunter_email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  talent_email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  confirmation: { type: Boolean, default: false },
});

export default model<IContract>('Contract', contractSchema);
