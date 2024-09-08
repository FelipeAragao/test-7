import { ApiProperty } from '@nestjs/swagger';
import { UserOutput } from '@user/outputs/user.output';

export class LoginOutput {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserOutput;
}
