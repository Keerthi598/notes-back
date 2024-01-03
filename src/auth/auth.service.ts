import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';

@Injectable()
export class AuthService {

    async login(app) {
        const email = "zekrom598@gmail.com";
        const pass = "default";

        const loginStatus = app.auth(email, pass);
    }
}
