import { IsDecimal, IsOptional, IsAlpha, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({
    description: 'Latitude of the location',
    example: '37.7749456',
    type: 'decimal',
  })
  @IsDecimal()
  @IsOptional()
  lat?: number;

  @ApiProperty({
    description: 'Longitude of the location',
    example: '37.7749456',
    type: 'decimal',
  })
  @IsDecimal()
  @IsOptional()
  lng?: number;

  @ApiProperty({
    description:
      'Address containing street, number and district. The number is optional',
    examples: [
      'Rua Salvador, 440 - Adrianópolis',
      'Rodovia Beto Carrero World - Armação',
    ],
    type: 'string',
  })
  @IsAlpha()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'City where the address is located',
    examples: ['Penha', 'Manaus'],
    type: 'string',
  })
  @IsAlpha()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'State where the address is located',
    examples: ['Santa Catarinha', 'Amazonas'],
    type: 'string',
  })
  @IsAlpha()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Zip code of the address',
    examples: ['88385-000', '69057-040'],
    type: 'string',
  })
  @Matches(/^\d{5}-?\d{3}$/)
  @IsOptional()
  zipcode?: string;
}
