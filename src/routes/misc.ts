import { Router } from 'express';

import { vote, topSubs } from '../controllers/misc';
import { auth } from '../middleware/auth';
import { user } from '../middleware/user';

const router = Router();

router.post('/vote', user, auth, vote);

router.get('/top-subs', topSubs);

export default router;
