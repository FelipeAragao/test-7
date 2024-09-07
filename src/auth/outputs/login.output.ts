import { ApiProperty } from '@nestjs/swagger';
import { UserOutput } from 'src/user/outputs/user.output';

export class LoginOutput {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserOutput;
}
