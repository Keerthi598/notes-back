import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { DashInfo } from 'src/dtos/DashInfo.dto';

@Injectable()
export class UserService {
    async getDashInfo(app){
        //var currDash: DashInfo;

        var folResp = await app.getFoldersAll();
        var folder = await folResp.names;

        // Favorites to be done later
        // after note heads works perfectly
        // var favResp = await app.getFavAll();
        // var favorites: Array<Array<string>> = await favResp.fav;


        return folder;
    }

}
