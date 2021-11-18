import { Request, Response } from 'express';
import HeadHunter, { IHeadHunter } from '../models/headhunter';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(headhunter: IHeadHunter) {
  return jwt.sign(
    { id: headhunter.id, email: headhunter.email },
    config.jwtSecret,
    {
      expiresIn: 86400,
    }
  );
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Please Send your email and password' });
  }

  const headhunter = await HeadHunter.findOne({ email: req.body.email });

  if (headhunter) {
    return res.status(400).json({ msg: 'The Talent already exists' });
  }

  const newHeadHunter = new HeadHunter(req.body);
  await newHeadHunter.save();

  return res.status(201).json(newHeadHunter);
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: 'Please Send your email and password' });
  }

  const headhunter = await HeadHunter.findOne({ email: req.body.email });

  if (!headhunter) {
    // If the headhunter does not exists
    return res.status(400).json({ msg: 'The headhunter does not exists' });
  }

  const isMatch = await headhunter.comparePassword(req.body.password);

  if (isMatch) {
    return res.status(200).json({ token: createToken(headhunter) });
  }

  return res.status(400).json({
    msg: 'The email or password are not correct',
  });
};
