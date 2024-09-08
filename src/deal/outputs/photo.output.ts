import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PhotoOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  location?: string;

  @Expose()
  @ApiProperty()
  path?: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
