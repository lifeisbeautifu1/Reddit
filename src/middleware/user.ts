import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';

export const user = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) return next();

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOneBy({ username });

  res.locals.user = user;

  next();
};
