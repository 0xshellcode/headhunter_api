import { Router } from 'express';

import { createRecord, getRecords } from '../controllers/record.controller';

const router = Router();

router.post('/record', createRecord);
router.get('/record', getRecords);

export default router;
