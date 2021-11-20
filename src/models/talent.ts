import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ITalent extends Document {
  email: string;
  name: string;
  username: string;
  telephone: string;
  password: string;
  state: string;
  reputation: number;
  profession: string;
  skills: string;
  contry: string;
  schedule: string;
  cost: number;
  comparePassword: (password: string) => Promise<boolean>;
}

const talentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
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

  telephone: {
    type: String,
    required: false,
  },

  password: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  contry: {
    type: String,
    required: false,
    default: 'mx',
  },
  profession: {
    type: String,
    required: true,
  },

  reputation: {
    type: Number,
    required: false,
    default: 0,
  },

  skills: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },

  schedule: {
    type: String,
    required: true,
  },
});

talentSchema.pre<ITalent>('save', async function (next) {
  const talent = this;
  if (!talent.isModified()) return next(); // if it has been not modified

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(talent.password, salt);
  talent.password = hash;
  next();
});

talentSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<ITalent>('Talent', talentSchema);
