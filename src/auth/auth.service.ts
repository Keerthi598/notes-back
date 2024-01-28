import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { scryptSync } from 'crypto';

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
            return { "message": false} ;
        }
    }

    async verify(app, access_token: string) {
        try {
            return await this.jwtService.verifyAsync(access_token);
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

}
