import 'reflect-metadata';
import { DataSource } from 'typeorm';
import User from './entities/User';
import Post from './entities/Post';
import Sub from './entities/Sub';
import Comment from './entities/Comment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'harry',
  password: '89179645957',
  database: 'reddit',
  synchronize: true,
  logging: true,
  entities: [User, Post, Sub, Comment],
  migrations: [],
  subscribers: [],
});
