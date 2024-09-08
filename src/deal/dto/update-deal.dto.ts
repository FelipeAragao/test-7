import { DealType, UrgencyType } from '@deal/entities/deal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from '@user/dto/update-user.location.dto';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UrgencyDto } from './update-deal.urgency.dto';
import { Type } from 'class-transformer';

export class UpdateDealDto {
  @ApiProperty({
    description: 'Deal type (SELLING, TRADE, WISH)',
    enum: DealType,
    example: DealType.SELLING,
    type: 'enum',
  })
  @IsOptional()
  @IsEnum(DealType)
  type: DealType;

  @ApiProperty({
    description: 'Value of the deal',
    example: (100.0).toFixed(2),
    type: 'decimal',
  })
  @IsOptional()
  @IsDecimal()
  value?: number;

  @ApiProperty({
    description: 'Description of the deal',
    example: 'I need a bike for my wedding.',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'If deal is a trade, for what the deal will be traded for',
    example: 'Used skateboard',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  tradeFor?: string;

  @ApiProperty({
    description: 'User location',
    example: {
      lat: '37.7749456',
      lng: '37.7749456',
      address: 'Rua Salvador, 440 - Adrianópolis',
      city: 'Manaus',
      state: 'Amazonas',
      zipcode: '69057040',
    },
    type: 'object',
  })
  @IsOptional()
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiProperty({
    description: 'Urgency of the deal',
    example: {
      type: UrgencyType.LOW,
      limitDate: new Date(2024, 9, 7),
    },
    type: 'object',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UrgencyDto)
  urgency?: UrgencyDto;
}
