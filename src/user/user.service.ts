import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { DashInfo } from 'src/dtos/DashInfo.dto';

@Injectable()
export class UserService {
    async getDashInfo(app, uid: string){

        var folResp = await app.getFoldersAll(uid);
        var folder = await folResp.names;

        // Favorites to be done later
        // after note heads works perfectly
        // var favResp = await app.getFavAll();
        // var favorites: Array<Array<string>> = await favResp.fav;

        var folContent = await app.getDisplayNotes(uid, "Default");
        var folContentTest = await folContent.notesRef;

        return {
            "names" : folder,
            "info" : folContentTest,
        };
    }

    

}
