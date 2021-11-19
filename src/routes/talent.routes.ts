import { Router } from 'express';
import { signIn, signUp } from '../controllers/talent.controller';

const router = Router();

router.post('/talent/signup', signUp);
router.post('/talent/signin', signIn);

export default router;
