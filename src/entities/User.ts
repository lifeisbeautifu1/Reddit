import bcrypt from 'bcryptjs';
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import { Exclude } from 'class-transformer';

import Entity from './Entity';
import Post from './Post';
import Vote from './Vote';

@TOEntity('users')
export default class User extends Entity {
  constructor(user?: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @Length(3, 255, {
    message: 'Must be at least 3 characters long',
  })
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail(undefined, {
    message: 'Must be a valid email address',
  })
  @Length(1, 255, {
    message: 'Email is empty',
  })
  @Column({ unique: true })
  email: string;

  @Length(6, 255, {
    message: 'Must be at least 6 characters long',
  })
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
