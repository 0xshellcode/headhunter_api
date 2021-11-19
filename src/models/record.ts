import { model, Schema, Document } from 'mongoose';

export interface IRecord extends Document {
  email: string;
  projects: Array<string>;
}

const recordSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  projects: {
    type: Array,
    required: false,
  },
});

export default model<IRecord>('Record', recordSchema);
