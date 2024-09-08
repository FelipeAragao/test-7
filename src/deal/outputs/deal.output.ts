import { DealType } from '@deal/entities/deal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationOutput } from '@user/outputs/location.output';
import { Expose } from 'class-transformer';
import { UrgencyOutput } from './urgency.output';
import { PhotoOutput } from './photo.output';

export class DealOutput {
  @Expose()
  @ApiProperty()
  type: DealType;

  @Expose()
  @ApiProperty()
  value: number;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  tradeFor?: string;

  @Expose()
  @ApiProperty()
  location: LocationOutput;

  @Expose()
  @ApiProperty()
  urgency: UrgencyOutput;

  @Expose()
  @ApiProperty()
  photos: PhotoOutput[];
}

export class DealRequestOutput {
  @Expose()
  @ApiProperty()
  deal: DealOutput;
}
