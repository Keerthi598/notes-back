import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseFuncModule } from './firebase-func/firebase-func.module';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';


@Module({
  imports: [FirebaseFuncModule, UserModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseFuncService, 
    AuthService, 
    UserService,
    AdminService
  ],
})


export class AppModule {
}
