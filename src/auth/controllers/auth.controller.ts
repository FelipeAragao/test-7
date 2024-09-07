import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/auth/guards/local.guard';
import { LoginOutput } from 'src/auth/outputs/login.output';
import { AuthService } from 'src/auth/services/auth.service';
import { GoogleAuthGuard } from '../guards/google.guard';

@ApiTags('authenticate')
@Controller({ path: 'authenticate', version: '1' })
export class AuthController {
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
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('sso')
  async googleAuth(@Request() _request) {}

  @UseGuards(GoogleAuthGuard)
  @Get('sso/callback')
  async googleAuthRedirect(@Request() { user }) {
    try {
      return this.authService.login(user);
    } catch (error) {
      console.log(error);
    }
  }
}
