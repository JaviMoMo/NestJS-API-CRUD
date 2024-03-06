import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { SECRET_KEY } from 'src/constants';
import { ValidateUserService } from '../services/validate-user/validate-user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUserService: ValidateUserService) {
    super({
      jwt: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretKey: SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const isValidated = this.validateUserService.validate(payload.email);

    if (!isValidated) {
      return done(new UnauthorizedException('Without Authorization'), false);
    }

    done(null, payload);
  }
}
