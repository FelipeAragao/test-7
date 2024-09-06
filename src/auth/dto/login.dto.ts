import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Login/username of the user',
    type: 'string',
    example: 'john.doe',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Password of the user',
    type: 'string',
    example: 'MyPassword123!',
  })
  @IsString()
  password: string;
}
