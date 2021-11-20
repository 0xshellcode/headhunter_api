import { Request, Response } from 'express';
import SpeedDate from '../models/SpeedDate';

export const createSpeedDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.modality ||
    !req.body.hunter_email ||
    !req.body.talent_email
  ) {
    return res.status(400).json({ msg: 'Please send all the required data' });
  }

  const speeddate = await SpeedDate.findOne({ title: req.body.title });

  if (speeddate) {
    return res.status(400).json({ msg: 'The speed date already exists' });
  }

  const newSpeedDate = new SpeedDate(req.body);
  await newSpeedDate.save();

  console.log(
    `Congratulations, the Speed Date ${req.body.title} has been created!`
  );

  return res.status(201).json(newSpeedDate);
};

export const getSpeedDates = async (req: Request, res: Response) => {
  const existingSpeedDates = await SpeedDate.find().sort('-_id');
  res.json({ status: true, speeddates: existingSpeedDates });
};
