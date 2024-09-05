import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

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
      location: {
        lat,
        lng,
        address,
        city,
        state,
        zipcode,
      },
    });

    await this.save(user);
    return user;
  }
}
