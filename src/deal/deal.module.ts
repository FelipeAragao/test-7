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
import { BidController } from './modules/bid/controllers/bid.controller';
import { BidService } from './modules/bid/services/bid.service';
import { BidRepository } from './modules/bid/repositories/bid.repository';
import { MessageController } from './modules/message/controllers/message.controller';
import { MessageService } from './modules/message/services/message.service';
import { MessageRepository } from './modules/message/repositories/message.repository';

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
  controllers: [DealController, BidController, MessageController],
  providers: [
    DealService,
    BidService,
    MessageService,
    DealRepository,
    PhotoRepository,
    BidRepository,
    MessageRepository,
    UserRepository,
  ],
})
export class DealModule {}
