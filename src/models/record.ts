import { model, Schema, Document } from 'mongoose';

export interface Record extends Document {
  title: string;
  email: string;
}

const recordSchema = new Schema({
  title: {
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
});

export default model<Record>('Record', recordSchema);
