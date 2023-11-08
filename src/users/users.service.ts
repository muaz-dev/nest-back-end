import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  grertingUser(): string {
    return 'Hello World! Muaz Hayee as user';
  }
}
