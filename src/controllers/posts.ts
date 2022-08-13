import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Post from '../entities/Post';
import Sub from '../entities/Sub';

export const createPost = async (req: Request, res: Response) => {
  const { title, body, sub } = req.body;

  const user = res.locals.user;

  if (title.trim() === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({
      title: 'Title must not be empty',
    });
  }

  const subRecord = await Sub.findOneByOrFail({ name: sub });

  const post = new Post({ title, body, user, sub: subRecord });

  await post.save();

  res.json(post);
};
