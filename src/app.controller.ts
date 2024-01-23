import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAuth } from './dtos/userAuth.dto';
import { JwtDto } from './dtos/Jwt.dto';
import { UserFolder } from './dtos/UserFolder.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Post('user-dash')
  async getDash(@Body() jwtToken: JwtDto){
    return await this.appService.getDashInfo(jwtToken.access_token);
  }

  @Post('folder-files')
  async getFolderFile(@Body() folderInfo: UserFolder){
    return await this.appService.getFolderFiles(folderInfo.access_token, folderInfo.folder);
  }

  @Post('create-folder')
  async createFolder(@Body() folderInfo: UserFolder){
    return await this.appService.createFolder(folderInfo.access_token, folderInfo.folder);
  }
}
