import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
