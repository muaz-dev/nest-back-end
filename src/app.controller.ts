import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('/apologies')
  // getApologies(): string {
  //   return this.appService.getApologies();
  // }
  // @Get('/users')
  // findAllUsers(): any {
  //   return this.appService.findAllUsers();
  // }
}
