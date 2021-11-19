import { model, Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  payment: number;
  status: string;
}

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Inactive',
  },
});

export default model<IProject>('Project', projectSchema);
