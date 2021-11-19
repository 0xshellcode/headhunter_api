import { Request, Response } from 'express';
import Contract from '../models/Contract';

export const createContract = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.title ||
    !req.body.hunter_email ||
    !req.body.talent_email ||
    !req.body.duration ||
    !req.body.payment
  ) {
    return res.status(400).json({ msg: 'Please send all the required data' });
  }

  const contract = await Contract.findOne({ email: req.body.title });

  if (contract) {
    return res.status(400).json({ msg: 'The contract already exists' });
  }

  const newContract = new Contract(req.body);
  await newContract.save();

  console.log('A contract has been created!');

  return res.status(201).json(newContract);
};

export const getContracts = async (req: Request, res: Response) => {
  const existingContracts = await Contract.find().sort('-_id');
  res.json(existingContracts);
};
