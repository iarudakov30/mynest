import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void): any {
    console.log('GetUserMiddleware');
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, JWT_SECRET);
      if (user) {
        console.log('Found user details in JWT: ', user);
        req['user'] = user;
      }
    } catch (e) {
      console.log('Error handling authentication JWT: ', e);
    }
    next();
  }
}
