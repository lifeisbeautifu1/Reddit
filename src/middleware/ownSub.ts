import { Request, Response, NextFunction } from 'express';

import Sub from '../entities/Sub';
import User from '../entities/User';

export const ownSub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;

  const sub = await Sub.findOneByOrFail({ name: req.params.name });

  if (sub.username !== user.username) {
    return res.status(403).json({ error: "You don't own this sub" });
  }

  res.locals.sub = sub;

  next();
};
