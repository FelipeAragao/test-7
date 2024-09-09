import { Deal } from '@deal/entities/deal.entity';
import { User } from '@user/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  accepted: boolean;

  @Column({ type: 'decimal' })
  value: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @ManyToOne(() => User, (user) => user.bids, { eager: true })
  user: User;

  @Exclude()
  @ManyToOne(() => Deal, (deal) => deal.bids, { eager: true })
  @JoinColumn()
  deal: Deal;

  @Expose()
  get userId(): string {
    return this.user.id;
  }
}
