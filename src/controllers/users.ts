import { Request, Response } from 'express';

import User from '../entities/User';
import Post from '../entities/Post';
import Comment from '../entities/Comment';

export const getUserSubmissions = async (req: Request, res: Response) => {
  const user = await User.findOneOrFail({
    where: { username: req.params.username },
    select: ['username', 'createdAt'],
  });

  const posts = await Post.find({
    where: { username: user.username },
    relations: ['comments', 'votes', 'sub'],
  });

  const comments = await Comment.find({
    where: { username: user.username },
    relations: ['post'],
  });

  if (res.locals.user) {
    posts.forEach((p) => p.setUserVote(res.locals.user));
    comments.forEach((c) => c.setUserVote(res.locals.user));
  }

  let submissions: any = [];
  posts.forEach((p) => submissions.push({ type: 'Post', ...p.toJSON() }));
  comments.forEach((p) => submissions.push({ type: 'Comment', ...p.toJSON() }));

  submissions.sort((a, b) => b.createdAt - a.createdAt);

  res.json({ user, submissions });
};
