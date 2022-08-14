import { Request, Response } from 'express';

import Post from '../entities/Post';
import Vote from '../entities/Vote';
import User from '../entities/User';
import Comment from '../entities/Comment';

import { AppDataSource } from '../data-source';

export const vote = async (req: Request, res: Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;

  if (![-1, 0, 1].includes(value)) {
    return res.status(400).json({ value: 'Value must be -1, 0 or 1' });
  }

  const user: User = res.locals.user;

  let post = await Post.findOneByOrFail({ identifier, slug });

  let vote: Vote | undefined;

  let comment: Comment | undefined;

  if (commentIdentifier) {
    comment = await Comment.findOneByOrFail({ identifier: commentIdentifier });

    vote = await AppDataSource.getRepository(Vote)
      .createQueryBuilder('vote')
      .where('vote.username = :name AND vote.commentId = :commentId', {
        name: user.username,
        commentId: comment.id,
      })
      .getOne();
  } else {
    vote = await AppDataSource.getRepository(Vote)
      .createQueryBuilder('vote')
      .where('vote.username = :name AND vote.postId = :postId', {
        name: user.username,
        postId: post.id,
      })
      .getOne();
  }

  if (!vote && value === 0) {
    return res.status(404).json({ error: 'Vote not found' });
  } else if (!vote) {
    vote = new Vote({ user, value });
    if (comment) vote.comment = comment;
    else vote.post = post;
    await vote.save();
  } else if (value === 0) {
    await vote.remove();
  } else if (vote.value !== value) {
    vote.value = value;
    await vote.save();
  }

  post = await Post.findOneOrFail({
    where: { identifier, slug },
    relations: ['comments', 'comments.votes', 'sub', 'votes'],
  });

  post.setUserVote(user);

  post.comments.forEach((c) => c.setUserVote(user));

  res.json(post);
};

export default vote;
