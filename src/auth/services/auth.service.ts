import { Injectable } from '@nestjs/common';
import { LoginOutput } from '../outputs/login.output';
import { JwtService } from '@nestjs/jwt';
import { UserOutput } from '@user/outputs/user.output';
import { UserService } from '@user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private async runEmailLookup(
    emails: string[],
    googleId: string,
  ): Promise<UserOutput> {
    for (let index = 0; index < emails.length; index++) {
      const email = emails[index];
      const user = await this.userService.findByEmail(email);

      if (!user?.googleId) {
        const idAdded = await this.userService.addGoogleId(email, googleId);

        if (idAdded) {
          throw new Error(`Failed to add Google Id to user ${email}`);
        }

        user.googleId = googleId;
        return user;
      } else if (user?.googleId === googleId) {
        return user;
      }
    }
  }

  private async runLoginLookup(
    login: string,
    password: string,
  ): Promise<UserOutput> {
    const user = await this.userService.findByLogin(login);

    if (
      user &&
      (await this.userService.validatePassword(password, user.password))
    ) {
      return user;
    }
  }

  /**
   * Used for Google SSO Auth
   */
  async validateUser(
    identifier: string[],
    validator: string,
  ): Promise<UserOutput>;
  /**
   * Used for Basic Authentication
   */
  async validateUser(
    identifier: string,
    validator: string,
  ): Promise<UserOutput>;
  async validateUser(
    identifier: string | string[],
    validator: string,
  ): Promise<UserOutput> {
    if (typeof identifier === 'object') {
      return this.runEmailLookup(identifier, validator);
    }

    return this.runLoginLookup(identifier, validator);
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
