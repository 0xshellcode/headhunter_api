import { Request, Response } from 'express';
import Talent, { ITalent } from '../models/talent';
// import HeadHunter, { IHeadHunter } from '../models/headhunter';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(talent: ITalent) {
  return jwt.sign({ id: talent.id, email: talent.email }, config.jwtSecret, {
    expiresIn: 86400,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Please Send your email and password' });
  }

  const talent = await Talent.findOne({ email: req.body.email });

  if (talent) {
    return res.status(400).json({ msg: 'The Talent already exists' });
  }

  const newTalent = new Talent(req.body);
  await newTalent.save();

  return res.status(201).json(newTalent);
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Please Send your email and password' });
  }

  const talent = await Talent.findOne({ email: req.body.email });

  if (!talent) {
    // If the talent does not exists
    return res.status(400).json({ msg: 'The Talent does not exists' });
  }

  const isMatch = await talent.comparePassword(req.body.password);

  if (isMatch) {
    return res.status(200).json({ token: createToken(talent) });
  }

  return res.status(400).json({
    msg: 'The email or password are not correct',
  });
};
