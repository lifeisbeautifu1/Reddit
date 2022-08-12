import { Request, Response } from 'express';
import { validate } from 'class-validator';

import { User } from '../entities/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  let errors: any = {};
  const usernameUser = await User.findOneBy({ username });
  const emailUser = await User.findOneBy({ email });
  if (usernameUser) errors.username = 'Username is taken';
  if (emailUser) errors.email = 'Email is taken';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = new User({ username, email, password });

  errors = await validate(user);
  if (errors.length > 0) return res.status(400).json(errors);

  await user.save();

  res.status(201).json(user);
};

export const login = (req: Request, res: Response) => {
  res.status(200).json({ message: 'login' });
};
