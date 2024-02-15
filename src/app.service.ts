import { Injectable } from '@nestjs/common';
import { FirebaseFuncService } from './firebase-func/firebase-func.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';


@Injectable()
export class AppService {
    private app: FirebaseFuncService;

    constructor(private fire: FirebaseFuncService, 
                private auth: AuthService,
                private user: UserService) {
        this.app = fire.initialize();
        this.auth.initAdmin();
    }

    async logIn(email: string, pass: string) {
      return await this.auth.login(this.app, email, pass);
    }

    async getDashBoard(access_token: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.getDashFolders(this.app, uid.sub);
    }


    async getFolAll(access_token: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.getAllUserFolders(this.app, uid.sub);
    }

    async getFavAll(access_token: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.getAllFav(this.app, uid.sub);
    }

    async getFolderFiles(access_token: string, folder: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.getFolderFiles(this.app, uid.sub, folder);
    }

    //
    //
    //

    // Create Folder
    async createFolder(access_token: string, folderName: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.createFolder(this.app, uid.sub, folderName);
    }

    // Delete Folder
    async deleteFolder(access_token: string, folderName: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.deleteFolder(this.app, uid.sub, folderName);
    }

    //
    //
    //

    // Create File
    async createFile(access_token: string, folderName: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.createFile(this.app, uid.sub, folderName);
    }

    // Delete File
    async deleteFile(access_token: string, folderName: string, fileId: string, isFavorite: boolean) {
      const uid = await this.auth.verify(this.app, access_token);
      return await this.user.deleteFile(this.app, uid.sub, folderName, fileId, isFavorite);
    }




    async getFile(access_token: string, folderName: string, fileId: string) {
      const uid = await this.auth.verify(this.app, access_token);
      return await this.user.getFile(this.app, uid.sub, folderName, fileId);
    }

    async uploadFile(access_token: string, folderName: string, fileId: string, content: string, isFavorite: boolean) {
      const uid = await this.auth.verify(this.app, access_token);
      return await this.user.uploadFile(this.app, uid.sub, folderName, fileId, content, isFavorite);
    }

    async toggleFav(access_token: string, folderName: string, fileId: string, content: string, isFavorite: boolean) {
      const uid = await this.auth.verify(this.app, access_token);
      return await this.user.toggleFav(this.app, uid.sub, folderName, fileId, content, isFavorite);
    }



    async createNewUser(email: string, pass: string) {
      return await this.auth.createNewUser(this.app, email, pass);
    }
    

    async getUserEmail(access_token: string) {
      return await this.auth.getEmail(access_token);
    }

    async changeUserPass(access_token: string, newPass: string) {
      return await this.auth.changePass(access_token, newPass);
    }

    async ResetPassWord(email: string) {
      return await this.app.sendResetLink(email);
    }


    async deleteUser(access_token: string) {
      this.auth.deleteUser(this.app, access_token);
    }
}
