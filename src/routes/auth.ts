import express from 'express';


import { auth } from '../middleware/auth';
import { login, register, logout, me } from '../controllers/auth';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/logout', auth, logout);

router.get('/me', auth, me);

export default router;
