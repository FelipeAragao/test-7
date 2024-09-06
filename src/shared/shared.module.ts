import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppLoggerModule } from './logger/logger.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configs/main';
import validationSchema from './configs/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host', 'localhost'),
        port: configService.get<number>('database.port', 5432),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        schema: configService.get<string>('database.schema'),
        applicationName: configService.get<string>('database.applicationName'),
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        debug: configService.get<string>('env') === 'local',
      }),
    }),
    AppLoggerModule,
  ],
  exports: [ConfigModule, AppLoggerModule],
  providers: [],
})
export class SharedModule {}
