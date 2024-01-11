import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, FirebaseFuncService]
})
export class AuthModule {}
