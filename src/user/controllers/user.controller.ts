import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  NotFoundException,
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

  @ApiOkResponse({
    description: 'User found',
    example: { user: userExample },
  })
  @ApiNotFoundResponse({
    description: 'User creation failed due to input error',
    example: {
      error: 'User f59cfd6f-4b65-4e95-b65d-814cbe32b817 not found',
    },
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return { user };
    // try {
    // } catch (error) {
    //   console.log(error);
    //   return { error: error.message };
    // }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
