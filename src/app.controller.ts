import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAuth } from './dtos/userAuth.dto';
import { JwtDto } from './dtos/Jwt.dto';

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

  @Get('user-dash')
  async getDash(@Body() jwtToken: JwtDto){
    return await this.appService.getDashInfo(jwtToken.access_token);
  }


  @Get()
  getHello(): string {  
    return this.appService.getHello();
  }
}
