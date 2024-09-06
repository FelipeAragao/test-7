import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  IsString,
  ValidateNested,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './create-user.location.dto copy';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    type: 'string',
  })
  @Matches(/^(?![ .]+$)[a-zA-Z .]*$/gm)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: 'string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User login',
    example: 'john_doe',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyPassword!123',
    type: 'string',
  })
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User location',
    example: {
      lat: 37.7749456,
      lng: 37.7749456,
      address: 'Rua Salvador, 440 - Adrianópolis',
      city: 'Manaus',
      state: 'Amazonas',
      zipcode: 69057040,
    },
    type: 'object',
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => LocationDto)
  location: LocationDto;
}
