import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseFuncService]
})
export class UserModule {}
