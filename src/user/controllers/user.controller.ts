import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppLogger } from 'src/shared/logger/logger.service';
import { UserRequestOutput } from '../outputs/user.output';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(UserController.name);
  }

  @ApiCreatedResponse({
    description: 'User succesfully created',
    type: UserRequestOutput,
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
      console.log(createUserDto);
      const user = await this.userService.create(createUserDto);
      return { user };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  @ApiOkResponse({
    description: 'User found',
    type: UserRequestOutput,
  })
  @ApiNotFoundResponse({
    description: 'User creation failed due to input error',
    example: {
      error: 'User f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(id);

      return { user };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  @ApiOkResponse({
    description: 'User updated',
    type: UserRequestOutput,
  })
  @ApiNotFoundResponse({
    description: 'User update failed due to input error',
    example: {
      error: 'User f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return { user };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
