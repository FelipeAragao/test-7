import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BidOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  accepted: boolean;

  @ApiProperty()
  @Expose()
  value: number;

  @ApiProperty()
  @Expose()
  description: string;
}

export class MultipleBidsRequestOutput {
  @ApiProperty()
  @Expose()
  bids: BidOutput[];
}

export class SingleBidRequestOutput {
  @ApiProperty()
  @Expose()
  bid: BidOutput;
}
