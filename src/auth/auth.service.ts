import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';

@Injectable()
export class AuthService {
    private loginStatus;

    async login(app, email: string, pass: string) {
        // email = "zekrom598@gmail.com";
        // pass = "default";
        return await app.auth(email, pass);
    }

}
