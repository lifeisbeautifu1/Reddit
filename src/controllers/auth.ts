import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { Request, Response } from 'express';
import { validate, isEmpty } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { User } from '../entities/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  let errors: any = {};

  const usernameUser = await User.findOneBy({ username });

  const emailUser = await User.findOneBy({ email });

  if (usernameUser) errors.username = 'Username is taken';

  if (emailUser) errors.email = 'Email is taken';

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json(errors);

  const user = new User({ username, email, password });

  errors = await validate(user);

  if (errors.length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json(errors);

  await user.save();

  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const errors: any = {};

  if (isEmpty(username)) errors.username = 'Username must not be empty';

  if (isEmpty(password)) errors.password = 'Password must not be empty';

  if (Object.keys(errors).length > 0)
    return res.status(StatusCodes.BAD_REQUEST).json(errors);

  const user = await User.findOneBy({ username });

  if (!user)
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ password: 'Password is incorrect' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET);

  res.set(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })
  );

  return res.json(user);
};

export const me = (req: Request, res: Response) => {
  return res.json(res.locals.user);
};

export const logout = (req: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
  );
  return res.json({ message: 'Success' });
};
