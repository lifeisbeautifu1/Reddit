import { Router } from 'express';

import { createSub } from '../controllers/subs';

const router = Router();

router.post('/', createSub);

export default router;
