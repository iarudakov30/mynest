import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp();
    const request = host.getRequest();
    console.log('AuthenticationGuard');

    const user = request['user'];

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
