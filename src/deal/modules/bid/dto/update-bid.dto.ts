import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateBidDto {
  @ApiProperty({
    description: 'If bid is accepted or not',
    default: false,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  accepted: boolean = false;

  @ApiProperty({
    description: 'Value of the bid',
    type: 'decimal',
    example: '199.99',
  })
  @IsDecimal()
  @IsOptional()
  value: number;

  @ApiProperty({
    description: 'Description of the bid',
    type: 'string',
    example: 'Making this bid to win',
  })
  @IsString()
  @IsOptional()
  description: string;
}
