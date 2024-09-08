import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DealModule } from './deal/deal.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule, DealModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
