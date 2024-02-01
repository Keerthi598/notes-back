import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { applicationDefault, cert } from "firebase-admin/app";
import { auth } from 'firebase-admin';


@Injectable()
export class AdminService {
    private app;

    constructor() {
    }

    async initAdmin() {
        const admin = await require("firebase-admin");
        var serviceAccount = await require('../../NotesAdminFb.json');

        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://notes-a7479.firebaseio.com',
            storageBucket: 'gs://notes-a7479.appspot.com',
        }); 
    }

    async verifyUid(uid: string) {
        return admin.auth().getUser(uid)
        .then( (user) => {
            return true;
        })
        .catch( (error) => {
            return false;
        })
    }


    async getUserEmail(uid: string) {
        return admin.auth().getUser(uid)
        .then( (user) => {
            return user.email;
        })
        .catch( (error) => {
            return "";
        })
    }

    async updatePassWord(uid: string, newPassword: string) {
        return admin.auth()
        .updateUser(uid, {
            password: newPassword,
        })
        .then((userRecord) => {
            return { "message" :  true};
        })
        .catch((error) => {
            return { "message" :  false};
        })
    }
}
 