import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AppService {
  private app: FirebaseFuncService;

  constructor(private fire: FirebaseFuncService, private auth: AuthService){
    this.app = fire.initialize();
    const email = "zekrom598@gmail.com";
    const pass = "default";
    auth.login(this.app);
  }




  getHello(): string {
    return 'Hello World!';
  }
}
