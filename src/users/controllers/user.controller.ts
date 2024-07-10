// user.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.findById(id);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }

  @Get('search')
  async searchUsers(
    @Query('username') username?: string,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
  ): Promise<User[]> {
    return await this.usersService.search(username, minAge, maxAge);
  }
}
