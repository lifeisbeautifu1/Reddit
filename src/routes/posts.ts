import { Router } from 'express';

import {
  createPost,
  getPosts,
  getPost,
  commentOnPost,
} from '../controllers/posts';

import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, createPost);

router.get('/', getPosts);

router.get('/:identifier/:slug', getPost);

router.post('/:identifier/:slug/comments', auth, commentOnPost);

export default router;
