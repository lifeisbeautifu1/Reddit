import express from 'express';
import morgan from 'morgan';
import 'colors';

import { AppDataSource } from './data-source';
import { errorMiddleware } from './middleware/error';
import { trimMiddleware } from './middleware/trim';
import authRouter from './routes/auth';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('dev'));
app.use(trimMiddleware);

app.use('/api/auth', authRouter);
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
