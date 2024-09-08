import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Deal } from './deal.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  path?: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Deal, (deal) => deal.photos)
  deal: Deal;
}
