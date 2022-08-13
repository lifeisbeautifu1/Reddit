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

@TOEntity('users')
export default class User extends Entity {
  constructor(user?: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @Length(3, 255)
  @Column({ unique: true })
  username: string;

  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Length(6, 255)
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
