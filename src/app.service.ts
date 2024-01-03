import { Injectable, Inject } from '@nestjs/common';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { firestore, initializeApp } from "firebase-admin";


@Injectable()
export class AppService {
  constructor(private fire: FirebaseFuncService){
    console.log("It's me, Hi")
    const db = this.fire.initializeFirebase();
    this.fire.getData(db);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
