import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import 'colors';
import 'express-async-errors';

import { AppDataSource } from './data-source';
import { errorMiddleware } from './middleware/error';
import { trimMiddleware } from './middleware/trim';
import { auth } from './middleware/auth';
import { user } from './middleware/user';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import subsRouter from './routes/subs';
import miscRouter from './routes/misc';
import usersRouter from './routes/users';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(trimMiddleware);
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/subs', subsRouter);
app.use('/api/misc', miscRouter);
app.use('/api/users', usersRouter);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`.green.bold);
  try {
    AppDataSource.initialize();
    console.log('Connected to Datasabe'.green.bold);
  } catch (error) {
    console.log(error);
  }
});
