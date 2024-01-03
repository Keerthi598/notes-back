import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseFuncModule } from './firebase-func/firebase-func.module';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [FirebaseFuncModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FirebaseFuncService, AuthService],
})


export class AppModule {
}
