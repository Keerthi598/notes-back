import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service'; 
import { JwtDto } from './dtos/Jwt.dto';
import { UserFolder } from './dtos/UserFolder.dto';
import { GetFile } from './dtos/GetFile.dto';
import { UploadFile } from './dtos/UploadFile.dto';
import { UserUpdatePass } from './dtos/UserPassUpDate.dto';
import { UserAuth } from './dtos/UserAuth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  async GetHello() {
    return "Hello World";
  }


  @Post('sign-in')
  async logIn(@Body() userAuth: UserAuth) {
    try{
      return await this.appService.logIn(userAuth.email, userAuth.pass);
    }
    catch(error)
    {
      //return "This";
      //return { "message": "Incorrect email/password"}
    }
  }

  @Post('sign-up')
  async createUser(@Body() userAuth: UserAuth) {
    try{
      return await this.appService.createNewUser(userAuth.email, userAuth.pass);
    }
    catch(error)
    {

    }
  }

  @Post('user-fol')
  async getAllFol(@Body() jwtToken: JwtDto){
    return await this.appService.getFolAll(jwtToken.access_token);
  }

  @Post('user-dash')
  async getDashFolders(@Body() jwtToken: JwtDto) {
    return await this.appService.getDashBoard(jwtToken.access_token);
  }

  @Post('user-fav')
  async getAllFav(@Body() jwtToken: JwtDto) {
    return await this.appService.getFavAll(jwtToken.access_token);
  }

  @Post('folder-files')
  async getFolderFile(@Body() folderInfo: UserFolder){
    return await this.appService.getFolderFiles(folderInfo.access_token, folderInfo.folder);
  }

  //
  //
  //

  @Post('create-folder')
  async createFolder(@Body() folderInfo: UserFolder){
    return await this.appService.createFolder(folderInfo.access_token, folderInfo.folder);
  }

  @Post('delete-folder')
  async deleteUserFolder(@Body() folderInfo: UserFolder) {
    return await this.appService.deleteFolder(folderInfo.access_token, folderInfo.folder);
  }

  //
  //
  //

  @Post('create-file')
  async createFile(@Body() folderInfo: UserFolder){
    return await this.appService.createFile(folderInfo.access_token, folderInfo.folder);
  }

  @Post('delete-file')
  async deleteFile(@Body() fileInfo: UploadFile) {
    return await this.appService.deleteFile(fileInfo.access_token, fileInfo.folder, fileInfo.fileId, fileInfo.isFavorite);
  }

  //
  //
  //

  @Post('get-file')
  async getFile(@Body() fileInfo: GetFile){
    return await this.appService.getFile(fileInfo.access_token, fileInfo.folder, fileInfo.fileId);
  }

  @Post('upload-file')
  async uplaodFile(@Body() fileInfo: UploadFile){
    return await this.appService.uploadFile(fileInfo.access_token, fileInfo.folder, fileInfo.fileId, fileInfo.content, fileInfo.isFavorite);
  }

  @Post('fav-this')
  async toggleFav(@Body() fileInfo: UploadFile) {
    return await this.appService.toggleFav(fileInfo.access_token, fileInfo.folder, fileInfo.fileId, fileInfo.content, fileInfo.isFavorite);
  }


  @Post('get-email')
  async getUserEmail(@Body() jwt: JwtDto) {
    return this.appService.getUserEmail(jwt.access_token);
  }

  @Post('change-cred')
  async changeUserCred(@Body() newInfo: UserUpdatePass) {
    return this.appService.changeUserPass(newInfo.access_token, newInfo.newPass);
  }

  @Post('reset-pass')
  async resetPass(@Body() userAuth: UserAuth) {
    return await this.appService.ResetPassWord(userAuth.email);
  }


  @Post('delete-user')
  async deleteUser(@Body() jwt: JwtDto) {
    this.appService.deleteUser(jwt.access_token);
    return true;
  }
  
}
