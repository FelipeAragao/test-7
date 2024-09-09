import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRequestOutput } from '../outputs/user.output';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller({ path: 'users', version: '1' })
export class UserController {
  private readonly logger = new Logger('USERS');

  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'User succesfully created',
    type: UserRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'User creation failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiBadRequestResponse({
    description: 'User creation failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return { user };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'User found',
    type: UserRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'User retrieval failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'User cnot found',
    example: {
      error: 'User f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log('Retrieve user by ID');

    try {
      const user = await this.userService.findById(id);

      return { user };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }

  @ApiOkResponse({
    description: 'User updated',
    type: UserRequestOutput,
  })
  @ApiUnauthorizedResponse({
    description: 'User update failed due to authorization error',
    example: {
      error: 'Unauthorized',
    },
  })
  @ApiNotFoundResponse({
    description: 'User update failed due to input error',
    example: {
      error: 'User f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @ApiBadRequestResponse({
    description: 'User update failed due to input error',
    example: {
      error: 'Bad request',
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return { user };
    } catch ({ message, status }) {
      this.logger.error({
        message: message,
        status: status,
      });
      return { error: message };
    }
  }
}
