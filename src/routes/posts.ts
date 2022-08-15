import { Router } from 'express';

import {
  createPost,
  getPosts,
  getPost,
  commentOnPost,
} from '../controllers/posts';

import { auth } from '../middleware/auth';
import { user } from '../middleware/user';

const router = Router();

router.post('/', user, auth, createPost);

router.get('/', user, getPosts);

router.get('/:identifier/:slug', user, getPost);

router.post('/:identifier/:slug/comments', user, auth, commentOnPost);

export default router;
