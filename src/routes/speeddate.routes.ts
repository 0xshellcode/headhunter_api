import { Router } from 'express';
import {
  createSpeedDate,
  getSpeedDates,
} from '../controllers/speeddate.controller';

const router = Router();

router.post('/speeddate', createSpeedDate);
router.get('/speeddate', getSpeedDates);

export default router;
