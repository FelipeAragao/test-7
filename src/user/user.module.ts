import { AppLogger } from 'src/shared/logger/logger.service';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, AppLogger],
})
export class UserModule {}
