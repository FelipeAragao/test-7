import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login({ login, password }: LoginDto) {
    const user = await this.userService.findByLogin(login);

    if (
      !user ||
      !(await this.userService.validatePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user);

    return user;
  }
}
