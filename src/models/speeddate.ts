import { model, Schema, Document } from 'mongoose';

export interface SpeedDate extends Document {
  title: string;
  description: string;
  modality: string;
  email: string;
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
  email: {
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
