import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';

@Injectable()
export class UserService {
    async getDashInfo(app){
        console.log(await app.getFoldersAll());
    }

}
