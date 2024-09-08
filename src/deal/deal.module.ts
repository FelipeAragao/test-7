import { Module } from '@nestjs/common';
import { DealService } from './services/deal.service';
import { DealController } from './controllers/deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@user/user.module';
import { DealRepository } from './repositories/deal.repository';
import { Photo } from './entities/photo.entity';
import { PhotoRepository } from './repositories/photo.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterConfigService } from '@shared/configs/multer.config';
import { UserRepository } from '@user/repositories/user.repository';

@Module({
  imports: [
    SharedModule,
    UserModule,
    TypeOrmModule.forFeature([Deal, Photo]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MulterConfigService,
    }),
  ],
  controllers: [DealController],
  providers: [DealService, DealRepository, PhotoRepository, UserRepository],
})
export class DealModule {}
