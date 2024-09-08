import { UrgencyType } from '@deal/entities/deal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, MinDate } from 'class-validator';

export class UrgencyDto {
  @ApiProperty({
    description: 'Urgency type (LOW, MEDIUM, HIGH)',
    enum: UrgencyType,
    example: UrgencyType.LOW,
    type: 'enum',
  })
  @IsOptional()
  @IsEnum(UrgencyType)
  type?: UrgencyType;

  @ApiProperty({
    description: 'Date when the urgency limit should be reached',
    example: '2024-09-10',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  limitDate?: Date;
}
