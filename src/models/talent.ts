import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ITalent extends Document {
  email: string;
  name: string;
  password: string;
  state: string;
  reputation: number;
  profession: string;
  skills: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const talentSchema = new Schema({
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

  profession: {
    type: String,
    required: true,
  },

  reputation: {
    type: Number,
    default: 0,
  },

  skills: {
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
