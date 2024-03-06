import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user.entity';
import { Model } from 'mongoose';
import { CreateUsersDTO } from '../../dto/create-users.dto';

@Injectable()
export class CreateUsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUsersDTO: CreateUsersDTO): Promise<User> {
    try {
      const userRegistered = await this.userModel.findOne({
        email: createUsersDTO.email,
      });

      if (userRegistered) {
        throw new Error('User is already registered');
      }

      const newUser = new this.userModel(createUsersDTO);
      newUser.password = await bcrypt.hash(createUsersDTO.password, 10);

      return newUser.save();
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
