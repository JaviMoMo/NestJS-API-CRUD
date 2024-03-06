import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ValidateUserService } from '../validate-user/validate-user.service';
import { LoginDTO } from '../../dto/login.dto';
import { SECRET_KEY } from 'src/constants';

@Injectable()
export class LoginService {
  constructor(private validateUserService: ValidateUserService) {}

  async createToken(loginDTO: LoginDTO) {
    const user = await this.validateUserService.validate(loginDTO.email);

    if (!user) {
      throw new Error('User is not registered');
    }

    const hasCorrectPassword = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (!hasCorrectPassword) {
      throw new Error('Password incorrect');
    }

    return {
      token: jwt.sign({ _id: user._id, email: user.email }, SECRET_KEY),
    };
  }
}
