import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from 'src/firebase-func/firebase-func.service';
import { nanoid } from 'nanoid';
import { clear } from 'console';
import { clearIndexedDbPersistence } from 'firebase/firestore';

@Injectable()
export class UserService {
    // All folders for the user
    async getAllUserFolders(app, uid: string){

        var folResp = await app.getFoldersAll(uid);
        var folder = await folResp.names;

        return {
            "names" : folder
        };
    }


    async getDashFolders(app, uid: string) {
        var dashFilesResp = await app.getDashFiles(uid);
        var dashfiles = await dashFilesResp.dashRef;

        return {
            "dashFiles" : dashfiles
        };
    }


    async getAllFav(app, uid: string) {
        var favResp = await app.getFavAll(uid);
        var favFol = await favResp.favFileMap;

        return {
            folder: favFol
        };
    }

    // All files in one specific folder
    async getFolderFiles(app, uid: string, folder: string) {
        var fol = await app.getDisplayNotes(uid, folder);
        var folFiles = await fol.notesRefMap;

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
        
        var newFile =  await app.createFile(uid, folderName, tempFileId);

        return {
            fileId: tempFileId,
            folder: folderName,
            file: newFile,
        };
    }

    async getFile(app, uid: string, folderName: string, fileId: string){
        fileId += ".txt";

        return {
            fileData: await app.getFileInfo(uid, folderName, fileId),
            fileMetaData: await app.getFileMetaData(uid, folderName, fileId),
        }
    }

    async uploadFile(app, uid: string, folderName: string, fileId: string, content: string, isFavorite: boolean) {
        fileId += ".txt";

        return app.upFileInfo(uid, folderName, fileId, content, isFavorite);
    }

    async toggleFav(app, uid: string, folderName: string, fileId: string, content: string, isFavorite: boolean) {
        fileId += ".txt";

        if(isFavorite)
        {      
            await app.toggleIsFavorite(uid, folderName, fileId, content);
        }

        else if (!isFavorite){
            await app.toggleFavoriteOff(uid, folderName, fileId, content);
        }

        return true;
    }


    async deleteFile(app, uid: string, folderName: string, fileId: string, isFavorite: boolean) {
        //fileId += ".txt";

        return await app.deleteUserFile(uid, folderName, fileId, isFavorite);
    }


    async deleteFolder(app, uid: string, folderName: string) {
        return await app.deleteUserFolder(uid, folderName);
    }
}
