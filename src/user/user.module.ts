import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { nanoid } from 'nanoid';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    FirebaseFuncService,
  ]
})
export class UserModule {}
