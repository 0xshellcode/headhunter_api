import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IHeadHunter extends Document {
  name: string;
  email: string;
  password: string;
  state: string;
  company: string;
  projects: string;
  reputation: number;
  comparePassword: (password: string) => Promise<boolean>;
}

const headHunterSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  company: {
    type: String,
    required: false,
  },

  projects: {
    type: String,
    required: false,
  },

  reputation: {
    type: Number,
    default: 0,
  },
});

headHunterSchema.pre<IHeadHunter>('save', async function (next) {
  const headhunter = this;
  if (!headhunter.isModified()) return next(); // if it has been not modified

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(headhunter.password, salt);
  headhunter.password = hash;
  next();
});

headHunterSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IHeadHunter>('HeadHunter', headHunterSchema);
