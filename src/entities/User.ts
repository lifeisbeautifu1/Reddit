import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { IsEmail, Length } from 'class-validator';
import { Exclude, instanceToPlain } from 'class-transformer';
import bcrypt from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  constructor(user?: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
