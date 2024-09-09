import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @ApiProperty({
    description: 'Title of the message',
    type: 'string',
    example: 'Asking about some product feature',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Content of the message',
    type: 'string',
    example: 'Is this product 110V or 220V?',
  })
  @IsOptional()
  message: string;
}
