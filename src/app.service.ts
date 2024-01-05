import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AppService {
    private app: FirebaseFuncService;

    constructor(private fire: FirebaseFuncService, private auth: AuthService){
        this.app = fire.initialize();
    }

    async logIn(email: string, pass: string) {
      return await this.auth.login(this.app, email, pass);
    }





    getHello(): string {
        console.log(this.fire.isUserSignedIn());
        return 'Hello World!';
    }
}
