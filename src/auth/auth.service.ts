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
            const response = await app.auth(email, pass);
            // const payload = { sub: success };

            // return { 
            //     "access_token": await this.jwtService.signAsync(payload),
            // };
            if (response.message == "success") {
                const payload = { sub: response.uid };

                return {
                    "access_token" : await this.jwtService.signAsync(payload),
                    "message" : "success"
                }
            }

            return {
                "access_token" : "",
                "message" : response.message,
            }

        } catch (error) {
            return { 
                "access_token" : "",
                "message": "Error, Try Again",
            } ;
        }
    }


    async verify(app, access_token: string) {
        try {
            return await this.jwtService.verifyAsync(access_token);
        } catch (error) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

    }

    async createNewUser(app, email: string, pass: string) {
        try {
            const response = await app.createUser(email, pass);

            if (await response.message == "success") {
                const payload = { sub: response.uid };

                return {
                    "access_token" : await this.jwtService.signAsync(payload),
                    "message" : "success"
                }
            }

            return {
                "access_token" : "",
                "message" : response.message,
            }


        } catch (error) {
            return { 
                "access_token" : "",
                "message": "Error, Try Again",
            } ;
        }
    }

}
