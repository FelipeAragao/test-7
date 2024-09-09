import { Deal } from '@deal/entities/deal.entity';
import { User } from '@user/entities/user.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @ManyToOne(() => User, (user) => user.messages, { eager: true })
  user: User;

  @Exclude()
  @ManyToOne(() => Deal, (deal) => deal.messages)
  deal: Deal;

  @Expose()
  get userId(): string {
    return this.user.id;
  }
}
