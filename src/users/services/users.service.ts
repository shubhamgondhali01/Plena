// users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async update(id: string, updatedUser: User): Promise<User | null> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    existingUser.name = updatedUser.name;
    existingUser.surname = updatedUser.surname;
    existingUser.username = updatedUser.username;
    existingUser.birthdate = updatedUser.birthdate;
    return await existingUser.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async search(username?: string, minAge?: number, maxAge?: number): Promise<User[]> {
    let query = this.userModel.find();

    if (username) {
      query = query.where('username').equals(username);
    }

    if (minAge !== undefined && maxAge !== undefined) {
      const currentYear = new Date().getFullYear();
      const minBirthYear = currentYear - maxAge - 1;
      const maxBirthYear = currentYear - minAge;
      const minBirthdate = new Date(minBirthYear, 0, 1).getTime(); // Convert Date to number
      const maxBirthdate = new Date(maxBirthYear, 11, 31).getTime(); // Convert Date to number
      query = query.where('birthdate').gte(minBirthdate).lte(maxBirthdate);
    } else if (minAge !== undefined) {
      const currentYear = new Date().getFullYear();
      const minBirthYear = currentYear - minAge - 1;
      const minBirthdate = new Date(minBirthYear, 0, 1).getTime(); // Convert Date to number
      query = query.where('birthdate').gte(minBirthdate);
    } else if (maxAge !== undefined) {
      const currentYear = new Date().getFullYear();
      const maxBirthYear = currentYear - maxAge;
      const maxBirthdate = new Date(maxBirthYear, 11, 31).getTime(); // Convert Date to number
      query = query.where('birthdate').lte(maxBirthdate);
    }

    return await query.exec();
  }
}
