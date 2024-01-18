import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async login(app, email: string, pass: string) {
        try {
            const success = await app.auth(email, pass);
            //console.log("Yeah");
            const payload = { sub: success };

            return { 
                "access_token": await this.jwtService.signAsync(payload),
            };
        } catch (error) {
            console.log(";_:");
            return { "message": false} ;
            // Handle the error or throw it again if needed
            //throw error;
        }
    }

    async verify(app, access_token: string) {
        return await this.jwtService.decode(access_token);
    }

}
