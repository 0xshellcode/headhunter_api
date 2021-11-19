import { Router } from 'express';
import {
  signIn,
  signUp,
  getHeadHunters,
} from '../controllers/headhunter.controller';

const router = Router();

router.post('/headhunter/signup', signUp);
router.post('/headhunter/signin', signIn);
router.get('headhunter', getHeadHunters);

export default router;
