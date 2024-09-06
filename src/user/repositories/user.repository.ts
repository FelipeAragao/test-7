import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      name,
      email,
      login,
      password,
      location: { lat, lng, address, city, state, zipcode },
    } = createUserDto;

    const user = this.create({
      name,
      email,
      login,
      password,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
    });

    await this.save(user);
    return user;
  }

  async findByUniqueAttribute(
    attribute: keyof User,
    value: string,
  ): Promise<User | undefined> {
    return this.findOne({ where: { [attribute]: value } });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const {
      name,
      email,
      login,
      password,
      location: { lat, lng, address, city, state, zipcode } = {},
    } = updateUserDto;

    const input = Object.entries({
      name,
      email,
      login,
      password,
      lat,
      lng,
      address,
      city,
      state,
      zipcode,
    }).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {},
    );

    const user = await this.preload({
      id,
      ...input,
    });

    if (user) {
      return this.save(user);
    }

    return;
  }
}
