import { UrgencyType } from '@deal/entities/deal.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UrgencyOutput {
  @Expose()
  @ApiProperty()
  type: UrgencyType;

  @Expose()
  @ApiProperty()
  limitDate: Date;
}
