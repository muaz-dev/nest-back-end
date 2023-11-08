import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Muaz Hayee';
  }
  getApologies(): string {
    return 'I would like to do apologies krub';
  }
}
