import { Router } from 'express';

import { vote } from '../controllers/misc';
import { auth } from '../middleware/auth';
import { user } from '../middleware/user';

const router = Router();

router.post('/vote', user, auth, vote);

export default router;
