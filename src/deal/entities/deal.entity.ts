import { Exclude, Expose } from 'class-transformer';
import { User } from '@user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum DealType {
  SELLING = 1,
  TRADE = 2,
  WISH = 3,
}

export enum UrgencyType {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
}

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DealType })
  type: DealType;

  @Column({ type: 'decimal' })
  value: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 256, nullable: true, name: 'trade_for' })
  tradeFor: string;

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

  @Column({ type: 'enum', enum: UrgencyType, name: 'urgency' })
  urgencyType: UrgencyType;

  @Column({ type: 'date', name: 'limit_date' })
  limitDate: Date;

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

  @Expose()
  get urgency() {
    return {
      type: this.urgencyType,
      limitDate: this.limitDate,
    };
  }

  @ManyToOne(() => User, (user) => user.deals)
  user: User;
}
