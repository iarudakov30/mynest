import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserModel } from '../models/user.model';
import * as passwordTool from 'password-hash-and-salt';

@Controller('users')
export class UserController {
  constructor(private usersDB: UsersRepository) {}

  @Post()
  async addUser(
    @Body() user: UserModel,
    @Body('password') password: string
  ): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      passwordTool(password).hash((err, hash) => {
        if (err) {
          reject(new ForbiddenException(err.message));
        }
        user.passwordHash = hash;
        resolve(this.usersDB.addUser(user));
      });
    });
  }
}
