import { Router } from 'express';

import { user } from '../middleware/user';
import { createSub, getSub } from '../controllers/subs';

const router = Router();

router.post('/', createSub);

router.get('/:name', user, getSub);

export default router;
