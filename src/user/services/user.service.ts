import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserOutput } from '../outputs/user.output';
import { genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(this.configService.get('saltRounds'), 10);
    const salt = await genSalt(saltRounds);

    return hash(password, salt);
  }

  async create(createUserDto: CreateUserDto): Promise<UserOutput> {
    const { password, ...input } = createUserDto;
    const hashPassword = await this.hashPassword(password);

    return await this.userRepository.createUser({
      ...input,
      password: hashPassword,
    });
  }

  async findOne(id: string): Promise<UserOutput> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserOutput> {
    if (updateUserDto.password) {
      const hashPassword = await this.hashPassword(updateUserDto.password);
      updateUserDto.password = hashPassword;
    }

    const user = await this.userRepository.updateUser(id, updateUserDto);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
