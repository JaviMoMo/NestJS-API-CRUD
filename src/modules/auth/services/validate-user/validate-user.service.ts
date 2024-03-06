import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/user.entity';

@Injectable()
export class ValidateUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validate(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!email || !user) return false;

    return user;
  }
}
