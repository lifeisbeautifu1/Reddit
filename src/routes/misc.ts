import { Router } from 'express';

import { vote } from '../controllers/misc';

const router = Router();

router.post('/vote', vote);

export default router;
