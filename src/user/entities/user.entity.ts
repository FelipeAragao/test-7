import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Deal } from '@deal/entities/deal.entity';
import { Bid } from '@deal/modules/bid/entities/bid.entity';
import { Message } from '@deal/modules/message/entities/message.entity';

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

  @Exclude()
  @Column({ type: 'varchar', length: 32, name: 'google_id', nullable: true })
  googleId: string;

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

  @OneToMany(() => Deal, (deal) => deal.user)
  deals: Deal[];

  @OneToMany(() => Bid, (bid) => bid.user, { cascade: true })
  bids: Bid[];

  @OneToMany(() => Message, (msg) => msg.user, { cascade: true })
  messages: Message[];
}
