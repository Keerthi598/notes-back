import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';

@Module({
  providers: [AuthService, FirebaseFuncService]
})
export class AuthModule {}
