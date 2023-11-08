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

  @Get('/apologies') // Corrected the path here
  getApologies(): string {
    return this.appService.getApologies(); // You might want to call a different method in AppService that returns apologies
  }
}
