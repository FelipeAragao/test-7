import { Module } from '@nestjs/common';
import { DealService } from './services/deal.service';
import { DealController } from './controllers/deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deal } from './entities/deal.entity';
import { SharedModule } from '@shared/shared.module';
import { UserModule } from '@user/user.module';
import { DealRepository } from './repositories/deal.repository';

@Module({
  imports: [SharedModule, UserModule, TypeOrmModule.forFeature([Deal])],
  controllers: [DealController],
  providers: [DealService, DealRepository],
})
export class DealModule {}
