import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MessageOutput {
  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  message: string;

  @Expose()
  @ApiProperty()
  userId: string;
}

export class MessageRequestOutput {
  message: MessageOutput;
}
