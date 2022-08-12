import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'harry',
  password: '89179645957',
  database: 'reddit',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
