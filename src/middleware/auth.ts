import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) throw new Error('Unauthenticated');

  const { username }: any = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOneBy({ username });

  if (!user) throw new Error('Unauthenticated');

  res.locals.user = user;

  next();
};
