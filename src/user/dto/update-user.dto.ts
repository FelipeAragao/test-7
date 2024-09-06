import {
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsString,
  ValidateNested,
  Matches,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './update-user.location.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    type: 'string',
  })
  @Matches(/^(?![ .]+$)[a-zA-Z .]*$/gm)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User email',
    example: 'john.doe@example.com',
    type: 'string',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User login',
    example: 'john_doe',
    type: 'string',
  })
  @IsString()
  @IsOptional()
  login?: string;

  @ApiProperty({
    description: 'User password',
    example: 'MyPassword!123',
    type: 'string',
  })
  @IsStrongPassword({ minLength: 8 })
  @IsOptional()
  password?: string;

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
  @IsOptional()
  @Type(() => LocationDto)
  location?: LocationDto;
}
