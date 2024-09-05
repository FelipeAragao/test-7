import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 7 })
  lat: number;

  @Column('decimal', { precision: 10, scale: 7 })
  lng: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  state: string;

  @Column({ type: 'varchar', length: 20 })
  zipcode: string;

  @OneToMany(() => User, (user) => user.location)
  users: User[];
}
