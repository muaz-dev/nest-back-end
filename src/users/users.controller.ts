import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.grertingUser();
  }

  @Get('/1')
  findAllUsers(): any {
    return this.usersService.findAllUsers();
  }

  @Post('/create')
  async create(@Body() userData: any): Promise<any[]> {
    return this.usersService.addUser(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: any,
  ): Promise<boolean> {
    return this.usersService.updateUser(id, updateData);
  }
}
