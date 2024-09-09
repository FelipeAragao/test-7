import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from '../guards/google.guard';
import { AuthService } from '@auth/services/auth.service';
import { LoginOutput } from '@auth/outputs/login.output';
import { LocalAuthGuard } from '@auth/guards/local.guard';

@ApiTags('authenticate')
@Controller({ path: 'authenticate', version: '1' })
export class AuthController {
  private readonly logger = new Logger('AUTHENTICATION');

  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'User successfully logged in',
    type: LoginOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'User login failed due to invalid credentials',
  })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() { user }) {
    try {
      return this.authService.login(user);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('sso')
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get('sso/callback')
  async googleAuthRedirect(@Request() { user }) {
    try {
      return this.authService.login(user);
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }
}
