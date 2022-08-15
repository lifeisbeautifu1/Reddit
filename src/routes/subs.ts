import { Router } from 'express';

import { user } from '../middleware/user';
import { auth } from '../middleware/auth';
import { ownSub } from '../middleware/ownSub';
import {
  createSub,
  getSub,
  searchSubs,
  uploadSubImage,
  upload,
} from '../controllers/subs';

const router = Router();

router.post('/', createSub);

router.get('/:name', user, getSub);

router.get('/search/:name', searchSubs);

router.post(
  '/:name/image',
  user,
  auth,
  ownSub,
  upload.single('file'),
  uploadSubImage
);

export default router;
