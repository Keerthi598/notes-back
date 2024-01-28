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

    async createFolder(access_token: string, folderName: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.createFolder(this.app, uid.sub, folderName);
    }

    async createFile(access_token: string, folderName: string) {
      const uid = await this.auth.verify(this.app, access_token);

      return await this.user.createFile(this.app, uid.sub, folderName);
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

    
}
