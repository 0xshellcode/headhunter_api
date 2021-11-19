import { Router } from 'express';
import { getTalents, signIn, signUp } from '../controllers/talent.controller';

const router = Router();

router.post('/talent/signup', signUp);
router.post('/talent/signin', signIn);
router.get('/talent', getTalents);
export default router;
