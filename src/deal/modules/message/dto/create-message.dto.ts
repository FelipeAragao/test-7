import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Title of the message',
    type: 'string',
    example: 'Asking about some product feature',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of the message',
    type: 'string',
    example: 'Is this product 110V or 220V?',
  })
  @IsString()
  message: string;
}
