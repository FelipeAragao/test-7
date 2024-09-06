import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @Column({ type: 'varchar', length: 64 })
  password: string;

  @Exclude()
  @Column('decimal', { precision: 10, scale: 7 })
  lat: number;

  @Exclude()
  @Column('decimal', { precision: 10, scale: 7 })
  lng: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Exclude()
  @Column({ type: 'varchar', length: 20 })
  zipcode: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Expose()
  get location() {
    return {
      lat: this.lat,
      lng: this.lng,
      address: this.address,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
    };
  }

  @BeforeInsert()
  hashPassword() {
    this.password = ''; // TODO: Implement hashPassword functions
  }
}
