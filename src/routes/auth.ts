import { Router } from 'express';

import { auth } from '../middleware/auth';
import { user } from '../middleware/user';
import { login, register, logout, me } from '../controllers/auth';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/logout', user, auth, logout);

router.get('/me', user, auth, me);

export default router;
