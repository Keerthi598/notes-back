import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { scryptSync } from 'crypto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private adminService: AdminService
        ) {}

    async initAdmin() {
        this.adminService.initAdmin();
    }

    async login(app, email: string, pass: string) {
        try {
            const response = await app.auth(email, pass);
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
            var uid = await this.jwtService.verifyAsync(access_token);
            if (await this.adminService.verifyUid(uid.sub)) {
                return uid;
            }
            else {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
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


    async getEmail(access_token: string) {
        try {
            var uid = await this.jwtService.verifyAsync(access_token);
            var email: string = await this.adminService.getUserEmail(uid.sub);

            return { "email" : email };
        } catch ( error ) {
            return { "email" : "" };
        }
    }

    async changePass(access_token: string, newPass: string) {
        var uid = await this.jwtService.verifyAsync(access_token);
        return await this.adminService.updatePassWord(uid.sub, newPass);
    }

}
