import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail } from 'class-validator';
import { Location } from './location.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 128 })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', unique: true, length: 64 })
  login: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @ManyToMany(() => Location, (location) => location.users, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  location: Location;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  udpatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = ''; // TODO: Implement hashPassword functions
  }
}
