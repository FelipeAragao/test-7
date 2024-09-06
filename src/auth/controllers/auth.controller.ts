import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';

@ApiTags('authenticate')
@Controller({ path: 'authenticate', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'User authenticated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    example: {
      error: 'Unauthorized',
    },
  })
  @Post()
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      console.log(error);
    }
  }
}
