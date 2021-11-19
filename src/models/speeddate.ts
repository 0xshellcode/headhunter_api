import { model, Schema, Document } from 'mongoose';

export interface SpeedDate extends Document {
  title: string;
  description: string;
  modality: string;
  hunter_email: string;
  talent_email: string;
  date: Date;
}

const speedDateSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modality: {
    type: String,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model<SpeedDate>('SpeedDate', speedDateSchema);
