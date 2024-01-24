import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UserService {
    async getDashInfo(app, uid: string){

        var folResp = await app.getFoldersAll(uid);
        var folder = await folResp.names;

        // Favorites to be done later
        // after note heads works perfectly
        // var favResp = await app.getFavAll();
        // var favorites: Array<Array<string>> = await favResp.fav;

        // var folContent = await app.getDisplayNotes(uid, "Default");
        // var folContentTest = await folContent.notesRef;

        return {
            "names" : folder
        };
    }

    async getFolderFiles(app, uid: string, folder: string) {
        var fol = await app.getDisplayNotes(uid, folder);
        var folFiles = await fol.notesRef;

        return {
            folder : folFiles
        };
    }

    async createFolder(app, uid: string, folderName: string) {
        return await app.createFolder(uid, folderName);
    }

    async createFile(app, uid: string, folderName: string) {
        var tempFileId = nanoid(16);

        tempFileId += ".txt";
        
        // Add to folder
        var newFile =  await app.createFile(uid, folderName, tempFileId);

        // Add to database


        return {
            fileId: tempFileId,
            folder: folderName,
            file: newFile,
        };
    }

    async getFile(app, uid: string, folderName: string, fileId: string){
        fileId += ".txt";

        return true;
    }

}
