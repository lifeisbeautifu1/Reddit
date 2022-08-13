import { Router } from 'express';

import { createPost } from '../controllers/posts';

const router = Router();

router.post('/', createPost);

export default router;
