import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { UserModel } from '../models/user.model';
import * as passwordTool from 'password-hash-and-salt';

import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

@Controller('login')
export class AuthController {
  constructor(private usersDB: UsersRepository) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') plainTextPassword: string
  ) {
    const user: UserModel = await this.usersDB.getUser(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      passwordTool(plainTextPassword).verifyAgainst(
        user.passwordHash,
        (err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException(err.message));
          }

          const authJwtToken = jwt.sign(
            { email, roles: user.roles },
            JWT_SECRET
          );

          resolve({ authJwtToken });
        }
      );
    });
  }
}
