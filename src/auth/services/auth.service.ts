import { Injectable } from '@nestjs/common';
import { UserOutput } from 'src/user/outputs/user.output';
import { UserService } from 'src/user/services/user.service';
import { LoginOutput } from '../outputs/login.output';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<UserOutput> {
    const user = await this.userService.findByLogin(login);

    if (
      user &&
      (await this.userService.validatePassword(password, user.password))
    ) {
      return user;
    }

    return null;
  }

  async login(user: UserOutput): Promise<LoginOutput> {
    return {
      token: this.jwtService.sign({
        login: user.login,
        sub: user.id,
      }),
      user,
    };
  }
}
