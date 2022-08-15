import { Router } from 'express';

import { getUserSubmissions } from '../controllers/users';
import { user } from '../middleware/user';

const router = Router();

router.get('/:username', user, getUserSubmissions);

export default router;
