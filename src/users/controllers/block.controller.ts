// block.controller.ts

import { Controller, Post, Delete, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('block')
export class BlockController {
  constructor(private readonly usersService: UsersService) {}

  @Post(':userId')
  async blockUser(@Param('userId') userId: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }
    user.blocked = true; // Example: Setting blocked status
    await user.save();
  }

  @Delete(':userId')
  async unblockUser(@Param('userId') userId: string): Promise<void> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }
    user.blocked = false; // Example: Setting unblocked status
    await user.save();
  }
}
