import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { LocationOutput } from './location.output';

export class UserOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  login: string;

  @Expose()
  @ApiProperty()
  password: string;

  @Expose()
  @ApiProperty()
  location: LocationOutput;
}

export class UserRequestOutput {
  @Expose()
  @ApiProperty()
  user: UserOutput;
}
