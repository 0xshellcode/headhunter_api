import { Request, Response } from 'express';
import Project from '../models/Project';

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.category ||
    !req.body.payment
  ) {
    return res.status(400).json({ msg: 'Please send all the required data' });
  }

  const project = await Project.findOne({ title: req.body.title });

  if (project) {
    return res.status(400).json({ msg: 'The project already exists' });
  }

  const newProject = new Project(req.body);
  await newProject.save();

  console.log('A project has been created!');

  return res.status(201).json(newProject);
};

export const getProjects = async (req: Request, res: Response) => {
  const existingProjects = await Project.find().sort('-_id');
  res.json({ status: true, projects: existingProjects });
};
