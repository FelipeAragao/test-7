import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configs/envs/main';
import validationSchema from './configs/envs/validation';
import { TypeOrmConfigService } from './configs/typeorm.config';
import { LoggerModule } from 'nestjs-pino';
import { loggerFactory } from './factories/logger.factory';

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
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: loggerFactory,
    }),
  ],
  exports: [ConfigModule],
})
export class SharedModule {}
