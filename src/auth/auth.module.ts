import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AdminService } from 'src/admin/admin.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '14400s' },
    })
  ],
  providers: [
    AuthService, 
    FirebaseFuncService,
    AdminService
  ]
})
export class AuthModule {}
