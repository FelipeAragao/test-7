import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('sso.google.googleClientId'),
      clientSecret: configService.get<string>('sso.google.googleClienteSecret'),
      callbackURL: configService.get<string>('sso.google.googleCallbackUrl'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    { emails, id }: Profile,
    done: VerifyCallback,
  ) {
    const verifiedEmails = [];

    for (const { value, verified } of emails) {
      if (verified) {
        verifiedEmails.push(value);
      }
    }

    const user = await this.authService.validateUser(verifiedEmails, id);
    done(null, user);
  }
}
