import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAuth } from './dtos/userAuth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sign-in')
  async logIn(@Body() userAuth: UserAuth) {
    return await this.appService.logIn(userAuth.email, userAuth.pass);
  }

  @Get('user-dash')
  async getDash(){
    return await this.appService.getDashInfo();
  }


  @Get()
  getHello(): string {  
    return this.appService.getHello();
  }
}
