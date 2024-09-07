import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
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

  @Exclude()
  @ApiProperty()
  password: string;

  @Exclude()
  @ApiProperty()
  googleId: string;

  @Expose()
  @ApiProperty()
  location: LocationOutput;
}

export class UserRequestOutput {
  @Expose()
  @ApiProperty()
  user: UserOutput;
}
