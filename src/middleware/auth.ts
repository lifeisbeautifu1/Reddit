import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import User from '../entities/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const user: User | undefined = res.locals.user;

  if (!user) throw new Error('Unauthenticated');

  next();
};
