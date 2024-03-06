import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from 'src/constants';
import { ValidateUserService } from '../services/validate-user/validate-user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private validateUserService: ValidateUserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const token = request.header('access_token');

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload: any = jwt.decode(token);

    try {
      payload = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const user = await this.validateUserService.validate(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;

    return next.handle();
  }
}
