import { Router } from 'express';
import {
  createContract,
  getContracts,
} from '../controllers/contract.controller';

const router = Router();

router.get('/contract', getContracts);
router.post('/contract', createContract);

export default router;
