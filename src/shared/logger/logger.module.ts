import { AppLogger } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class AppLoggerModule {}
