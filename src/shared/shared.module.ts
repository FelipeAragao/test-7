import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppLoggerModule } from './logger/logger.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configs/envs/main';
import validationSchema from './configs/envs/validation';
import { TypeOrmConfigService } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    AppLoggerModule,
  ],
  exports: [ConfigModule, AppLoggerModule],
  // providers: [MulterConfigService],
})
export class SharedModule {}
