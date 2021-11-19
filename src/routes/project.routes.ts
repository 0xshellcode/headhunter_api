import { Router } from 'express';

import { createProject, getProjects } from '../controllers/project.controller';

const router = Router();

router.get('/project', getProjects);
router.post('/project', createProject);

export default router;
