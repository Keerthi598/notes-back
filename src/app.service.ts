import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';


@Injectable()
export class AppService {
    private app: FirebaseFuncService;

    constructor(private fire: FirebaseFuncService, 
                private auth: AuthService,
                private user: UserService){
        this.app = fire.initialize();
    }

    async logIn(email: string, pass: string) {
      return await this.auth.login(this.app, email, pass);
    }


    async getDashInfo(access_token: string){
      const uid = await this.auth.verify(this.app, access_token);

      //return uid.sub;
      return await this.user.getDashInfo(this.app, uid.sub);
    }


    getHello(): string {
        return 'Hello World!';
    }
}
