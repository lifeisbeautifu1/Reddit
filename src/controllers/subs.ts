import { Request, Response } from 'express';
import { isEmpty } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import User from '../entities/User';
import Sub from '../entities/Sub';
import Post from '../entities/Post';
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

  const sub = await Sub.findOneByOrFail({ name });

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
