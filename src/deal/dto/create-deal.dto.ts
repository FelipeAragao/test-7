import { DealType, UrgencyType } from '@deal/entities/deal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from '@user/dto/create-user.location.dto';
import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UrgencyDto } from './create-deal.urgency.dto';
import { Type } from 'class-transformer';

export class CreateDealDto {
  @ApiProperty({
    description: 'Deal type (SELLING, TRADE, WISH)',
    enum: DealType,
    example: DealType.SELLING,
    type: 'enum',
  })
  @IsEnum(DealType)
  type: DealType;

  @ApiProperty({
    description: 'Value of the deal',
    example: (100.0).toFixed(2),
    type: 'decimal',
  })
  @IsDecimal()
  value: number;

  @ApiProperty({
    description: 'Description of the deal',
    example: 'I need a bike for my wedding.',
    type: 'string',
  })
  @IsString()
  description: string;

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
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty({
    description: 'Urgency of the deal',
    example: {
      type: UrgencyType.LOW,
      limitDate: new Date(2024, 9, 7),
    },
    type: 'object',
  })
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => UrgencyDto)
  urgency: UrgencyDto;
}
