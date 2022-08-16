import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import Post from '../entities/Post';
import Sub from '../entities/Sub';
import Comment from '../entities/Comment';

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

export const getPosts = async (req: Request, res: Response) => {
  const currentPage: number = (req.query.page || 1) as number;
  const postsPerPage: number = (req.query.count || 6) as number;
  const posts = await Post.find({
    order: { createdAt: 'DESC' },
    relations: ['comments', 'votes', 'sub'],
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });
  if (res.locals.user) {
    posts.forEach((p) => p.setUserVote(res.locals.user));
  }
  res.json(posts);
};

export const getPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  const post = await Post.findOneOrFail({
    where: { identifier, slug },
    relations: ['sub', 'votes', 'comments', 'comments.votes'],
  });

  if (res.locals.user) {
    post.setUserVote(res.locals.user);
    post.comments.forEach((c) => c.setUserVote(res.locals.user));
  }



  res.json(post);
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { identifier, slug } = req.params;

  const { body } = req.body;

  const post = await Post.findOneByOrFail({
    identifier,
    slug,
  });

  const comment = new Comment({
    user: res.locals.user,
    body,
    post,
  });

  await comment.save();

  res.json(comment);
};
