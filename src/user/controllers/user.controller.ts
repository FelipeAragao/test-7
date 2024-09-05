import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import userExample from '../helpers/user.example';
import { AppLogger } from 'src/shared/logger/logger.service';

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
    example: { user: userExample },
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
