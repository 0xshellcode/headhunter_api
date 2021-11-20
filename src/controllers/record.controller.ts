import { Request, Response } from 'express';
import Record from '../models/record';

export const createRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email) {
    return res.status(400).json({ msg: 'Please send your email' });
  }

  const newRecord = new Record(req.body);
  await newRecord.save();

  console.log('A record has been created!');

  return res.status(201).json(newRecord);
};

export const getRecords = async (req: Request, res: Response) => {
  const existingRecords = await Record.find().sort('-_id');
  res.json({ status: true, records: existingRecords });
};
