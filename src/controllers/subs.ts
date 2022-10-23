import { Request, Response } from 'express';
import { isEmpty } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

import User from '../entities/User';
import Sub from '../entities/Sub';
import Post from '../entities/Post';
import { makeId } from '../utils/helpers';
import { AppDataSource } from '../data-source';

export const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  let errors: any = {};

  if (isEmpty(name)) errors.name = 'Name must not be empty';

  if (isEmpty(title)) errors.title = 'Title must not be empty';

  let sub = await AppDataSource.getRepository(Sub)
    .createQueryBuilder('sub')
    .where('LOWER(sub.name) = :name', { name: name.toLowerCase() })
    .getOne();

  if (sub) errors.name = 'Sub exists already';

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json(errors);

  sub = new Sub({ name, description, title, user });
  await sub.save();
  res.json(sub);
};

export const getSub = async (req: Request, res: Response) => {
  const { name } = req.params;

  const sub = await Sub.findOneOrFail({
    where: { name },
    // relations: ['posts'],
  });

  const posts = await Post.find({
    where: { subName: name },
    order: { createdAt: 'DESC' },
    relations: ['comments', 'votes'],
  });

  sub.posts = posts;

  if (res.locals.user) {
    sub.posts.forEach((p) => p.setUserVote(res.locals.user));
  }

  return res.json(sub);
};

export const searchSubs = async (req: Request, res: Response) => {
  const { name } = req.params;
  if (isEmpty(name)) res.status(400).json({ error: 'Name must not be empty' });
  const subs = await AppDataSource.getRepository(Sub)
    .createQueryBuilder()
    .where('LOWER(name) LIKE :name', {
      name: `${name.toLowerCase().trim()}%`,
    })
    .getMany();
  res.json(subs);
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, callback) => {
      const name = makeId(15);

      callback(null, name + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file: any, callback: FileFilterCallback) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
      ? callback(null, true)
      : callback(new Error('Not an image'));
  },
});

export const uploadSubImage = async (req: Request, res: Response) => {
  const sub: Sub = res.locals.sub;

  console.log(sub);

  const type = req.body.type;

  if (type !== 'image' && type !== 'banner') {
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Invalid type' });
  }

  let oldImageUrn: string = '';

  if (type === 'image') {
    oldImageUrn = sub.imageUrn ?? '';
    sub.imageUrn = req.file.filename;
  } else if (type === 'banner') {
    oldImageUrn = sub.bannerUrn ?? '';
    sub.bannerUrn = req.file.filename;
  }

  await sub.save();

  if (oldImageUrn !== '') {
    fs.unlinkSync(`public//images//${oldImageUrn}`);
  }

  return res.json(sub);
};
